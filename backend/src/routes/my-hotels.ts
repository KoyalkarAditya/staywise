import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel from "../models/hotel";
import { HotelType } from "../shared/types";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage(); // telling multer we upload images in memory (ex : cloud)
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities is required "),
  ],
  upload.array("imageFiles", 6), // an array of up to 6 images will be found in imageFiles
  async (req: Request, res: Response) => {
    try {
      const imageFiles = (req.files as Express.Multer.File[]) || [];

      const newHotel: HotelType = req.body;

      const imageURLs = await uploadImages(imageFiles);
      newHotel.imageUrls = imageURLs;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;
      const hotel = new Hotel(newHotel);
      await hotel.save();

      res.status(201).send(hotel);
    } catch (e) {
      console.log("error creating hotel", e);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({
      userId: req.userId,
    });
    res.json(hotels);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Error fetching details",
    });
  }
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const hotel = await Hotel.findOne({
      userId: req.userId,
      _id: id,
    });
    res.json(hotel);
  } catch (e) {
    res.status(500).json({ message: "Error fetching hotels" });
  }
});

router.put(
  "/:hotelId",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    try {
      const updatedHotel: HotelType = req.body;
      updatedHotel.lastUpdated = new Date();

      const hotel = await Hotel.findOneAndUpdate(
        {
          _id: req.params.hotelId,
          userId: req.userId,
        },
        updatedHotel,
        { new: true }
      );

      if (!hotel) {
        res.status(404).json({
          message: "Hotel not found",
        });
        return;
      }
      const imageFiles = (req.files as Express.Multer.File[]) || [];
      const newUrls = await uploadImages(imageFiles);
      hotel.imageUrls = [...newUrls, ...(updatedHotel.imageUrls || [])];

      await hotel.save();

      res.status(201).json(hotel);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const base64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + base64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });
  const imageURLs = await Promise.all(uploadPromises);
  return imageURLs;
}
