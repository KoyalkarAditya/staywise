import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn,
      checkOut: search.checkOut,
    },
  });
  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate("/sign-in", {
      state: { from: location },
    });
  };
  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate(`/hotel/${hotelId}/booking`);
  };
  return (
    <div className="flex flex-col p-4 gap-4 bg-blue-500">
      <h3 className="text-md font-bold">${pricePerNight} per night</h3>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
        className="flex flex-col gap-3"
      >
        <div className="grid grid-cols-2 gap-4">
          <DatePicker
            selected={checkIn}
            onChange={(date) => setValue("checkIn", date as Date)}
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            selectsStart
            placeholderText="Check-in Date"
            className="w-full bg-white text-sm p-2 focus:outline-none"
          />
          <DatePicker
            selected={checkOut}
            onChange={(date) => setValue("checkOut", date as Date)}
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            selectsStart
            placeholderText="Check-in Date"
            className="w-full bg-white text-sm p-2 focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-2 bg-white  gap-4 col-g">
          <label className="items-center flex">
            Adults:
            <input
              className="w-full p-1 focus:outline-none font-bold"
              type="number"
              min={1}
              max={20}
              {...register("adultCount", {
                required: "This field is required",
                min: {
                  value: 1,
                  message: "There must be at least one adult",
                },
                valueAsNumber: true,
              })}
            />
          </label>
          <label className="items-center flex">
            Children:
            <input
              className="w-full p-1 focus:outline-none font-bold"
              type="number"
              min={0}
              max={20}
              {...register("childCount", {
                valueAsNumber: true,
              })}
            />
          </label>
          {errors.adultCount && (
            <span className="text-red-500 font-semibold text-sm">
              {errors.adultCount.message}
            </span>
          )}
        </div>
        {isLoggedIn ? (
          <button
            type="submit"
            className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-800 text-xl rounded-md"
          >
            Book Now
          </button>
        ) : (
          <button
            type="submit"
            className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-800 text-xl rounded-md"
          >
            Sign In to Book
          </button>
        )}
      </form>
    </div>
  );
};

export default GuestInfoForm;