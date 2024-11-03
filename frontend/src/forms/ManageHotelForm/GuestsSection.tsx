import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForms";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3"> Guests per Room</h2>
      <div className="flex flex-row gap-3 items-center">
        <label className="text-gray-800 text-sm font-bold flex-1">
          Adults
          <input
            className="border-2 mt-2 rounded-md w-full py-2 px-2 font-normal"
            type="number"
            {...register("adultCount", {
              required: "This field is required",
            })}
            min={0}
          />
          {errors.adultCount && (
            <span className="text-sm text-red-600 font-normal">
              {errors.adultCount.message}
            </span>
          )}
        </label>
        <label className="text-gray-800 text-sm font-bold flex-1">
          Children
          <input
            className="border-2 mt-2 rounded-md w-full py-2 px-2 font-normal"
            type="number"
            {...register("childCount", {
              required: "This field is required",
            })}
            min={0}
          />
          {errors.childCount && (
            <span className="text-sm text-red-600 font-normal">
              {errors.childCount.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};
export default GuestsSection;
