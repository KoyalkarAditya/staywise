import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForms";
import { hotelFacilities } from "../../config/hotel-options";
const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<HotelFormData>();
  const selectedFacilities = watch("facilities") || [];
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3"> Facilities</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
        {hotelFacilities.map((facility, index) => (
          <label
            key={index}
            className="text-nowrap flex gap-1 font-semibold items-center"
          >
            <input
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "At least one facility is required";
                  }
                },
              })}
              type="checkbox"
              value={facility}
              className="w-4 h-4"
            />
            <span
              className={`${
                selectedFacilities.includes(facility)
                  ? "text-blue-600"
                  : "text-slate-800"
              }`}
            >
              {facility}
            </span>
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-sm text-red-600 font-normal">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
