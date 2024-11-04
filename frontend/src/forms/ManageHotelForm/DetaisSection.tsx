import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForms";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col  gap-3">
      <h2 className="text-3xl font-bold">Add Hotel</h2>
      <label className="text-gray-800 text-sm font-bold flex-1">
        Name
        <input
          className="border-2 mt-2 rounded-md w-full py-2 px-2 font-normal"
          type="text"
          {...register("name", { required: "This field is required" })}
        />
        {errors.name && (
          <span className="text-sm text-red-600 font-normal">
            {errors.name.message}
          </span>
        )}
      </label>
      <div className="flex flex-col md:flex-row gap-3">
        <label className="text-gray-800 text-sm font-bold flex-1">
          City
          <input
            className="border-2 mt-2 rounded-md w-full py-2 px-2 font-normal"
            type="text"
            {...register("city", { required: "This field is required" })}
          />
          {errors.city && (
            <span className="text-sm text-red-600 font-normal">
              {errors.city.message}
            </span>
          )}
        </label>
        <label className="text-gray-800 text-sm font-bold flex-1">
          Country
          <input
            className="border-2 mt-2 rounded-md w-full py-2 px-2 font-normal"
            type="text"
            {...register("country", { required: "This field is required" })}
          />
          {errors.country && (
            <span className="text-sm text-red-600 font-normal">
              {errors.country.message}
            </span>
          )}
        </label>
      </div>
      <label className="text-gray-800 text-sm font-bold flex-1">
        Description
        <textarea
          className="border-2 mt-2 rounded-md w-full py-2 px-2 font-normal min-h-[150px]"
          {...register("description", {
            required: "This field is required",
          })}
        />
        {errors.description && (
          <span className="text-sm text-red-600 font-normal">
            {errors.description.message}
          </span>
        )}
      </label>
      <div className="flex flex-row gap-3 items-center">
        <label className="text-gray-800 text-sm font-bold flex-1">
          Price Per Night
          <input
            className="border-2 mt-2 rounded-md w-full py-2 px-2 font-normal"
            type="number"
            {...register("pricePerNight", {
              required: "This field is required",
            })}
            min={0}
          />
          {errors.pricePerNight && (
            <span className="text-sm text-red-600 font-normal">
              {errors.pricePerNight.message}
            </span>
          )}
        </label>
        <label className="text-gray-800 text-sm font-bold flex-1">
          Star Rating
          <select
            {...register("starRating", {
              required: "This field is required",
            })}
            className="w-full mt-2 rounded border-2 p-2 text-gray-800"
          >
            <option value="" className="text-sm font-bold">
              Select as Rating
            </option>
            {[1, 2, 3, 4, 5].map((val, index) => (
              <option value={val} key={index}>
                {val}
              </option>
            ))}
          </select>
          {errors.starRating && (
            <span className="text-sm text-red-600 font-normal">
              {errors.starRating.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default DetailsSection;
