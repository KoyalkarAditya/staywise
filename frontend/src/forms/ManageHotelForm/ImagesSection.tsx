import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForms";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col  gap-3">
      <h2 className="text-2xl font-bold">Images</h2>
      <input
        multiple
        type="file"
        accept="image/*"
        className="w-full text-grey-700 font-semibold"
        {...register("imageUrls", {
          validate: (imageUrls) => {
            if (imageUrls.length == 0) {
              return "At least One Image is required";
            } else if (imageUrls && imageUrls.length > 6) {
              return "Total number of image should be less than or equal to 6";
            } else return true;
          },
        })}
      />
      {errors.imageUrls && (
        <span className="text-sm text-red-600 font-normal">
          {errors.imageUrls.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
