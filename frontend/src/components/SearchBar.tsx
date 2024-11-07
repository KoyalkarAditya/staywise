import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();
  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );

    navigate("/search");
  };
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  return (
    <form
      onSubmit={handleSubmit}
      className=" mt-3  p-3  bg-blue-300 rounded-md shadow-md grid  grid-cols-2 lg:grid-cols-4 items-center gap-4"
    >
      <div className="flex flex-row items-center flex-1 bg-white p-2 ">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          type="text"
          placeholder="where are u going?"
          className="text-md  w-full focus:outline-none"
          onChange={(e) => {
            setDestination(e.target.value);
          }}
          value={destination}
        />
      </div>
      <div className="flex flex-1 bg-white px-2 py-1 ">
        <label className="flex items-center">
          Adults:
          <input
            type="number"
            className="w-full p-1 focus:outline-none font-bold"
            min={1}
            max={20}
            value={adultCount}
            onChange={(e) => setAdultCount(parseInt(e.target.value))}
          />
        </label>
        <label className="flex items-center">
          Children:
          <input
            type="number"
            className="w-full p-1 focus:outline-none font-bold"
            min={0}
            max={20}
            value={childCount}
            onChange={(e) => setChildCount(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div className="col-span-1 flex gap-2">
        <div className="flex-1">
          <DatePicker
            selected={checkIn}
            onChange={(date) => setCheckIn(date as Date)}
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            selectsStart
            placeholderText="Check-in Date"
            className="w-full bg-white text-sm p-2 focus:outline-none"
          />
        </div>
        <div className="flex-1">
          <DatePicker
            selected={checkOut}
            onChange={(date) => setCheckOut(date as Date)}
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            selectsEnd
            placeholderText="Check-out Date"
            className="w-full bg-white text-sm p-2 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex   gap-1 ">
        <button
          type="submit"
          className="w-[70%] bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 rounded-md"
        >
          Search
        </button>
        <button className="w-[30%] bg-red-600 text-white h-full p-2 font-bold hover:bg-red-500 rounded-md">
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
