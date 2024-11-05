import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForms";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();
  const existingImageUrls = watch("imageUrls") || [];
  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrl)
    );
  };

  return (
    <div className="flex flex-col  gap-3">
      <h2 className="text-2xl font-bold">Images</h2>
      <input
        multiple
        type="file"
        accept="image/*"
        className="w-full text-grey-700 font-semibold"
        {...register("imageFiles", {
          validate: (imageFiles) => {
            const totalLength =
              imageFiles.length + (existingImageUrls?.length || 0); // now selected + already in the database
            if (totalLength == 0) {
              return "At least One Image is required";
            } else if (totalLength > 6) {
              return "Total number of image should be less than or equal to 6";
            } else return true;
          },
        })}
      />
      {errors.imageFiles && (
        <span className="text-sm text-red-600 font-normal">
          {errors.imageFiles.message}
        </span>
      )}

      {Array.isArray(existingImageUrls) && (
        <div className="grid grid-cols-6 gap-4">
          {existingImageUrls.map((url, index) => (
            <div key={index} className="relative group">
              <img src={url} className="min-h-full object-cover" />
              <button
                onClick={(e) => handleDelete(e, url)}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImagesSection;
