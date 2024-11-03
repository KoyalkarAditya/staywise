import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options";
import { HotelFormData } from "./ManageHotelForms";

const TypeSection = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<HotelFormData>();

  const selectedType = watch("type");
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3"> Type</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
        {hotelTypes.map((type, index) => (
          <label
            key={index}
            className={`${
              selectedType == type
                ? "bg-blue-600 text-white"
                : "bg-slate-300 text-black"
            } p-2 rounded-xl text-center text-nowrap cursor-pointer`}
          >
            <input
              type="radio"
              value={type}
              {...register("type", {
                required: "This field is required",
              })}
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-sm text-red-600 font-normal">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default TypeSection;
