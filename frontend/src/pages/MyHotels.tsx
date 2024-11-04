import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
const MyHotels = () => {
  const { showToast } = useAppContext();
  const { data: hotelData } = useQuery("fetchHotels", apiClient.fetchMyHotels, {
    onError: () => {
      showToast({
        message: "Error fetching hotels",
        type: "ERROR",
      });
    },
  });
  if (!hotelData) {
    return <span>No hotels found</span>;
  }
  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to={"/add-hotel"}
          className="flex bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 font-bold text-white"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-6">
        {hotelData.map((hotel, index) => (
          <div
            key={index}
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-5 gap-5"
          >
            <h2 className="text-xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="grid md:text-nowrap grid-cols-5 gap-2 text-sm">
              <div className="border border-slate-300 rounded-sm p-1 flex items-center ">
                <BsMap className="mr-2 w-4 h-4" />
                {hotel.city},{hotel.country}
              </div>
              <div className="border border-slate-300 rounded-sm p-1 flex items-center ">
                <BsBuilding className="mr-2 w-4 h-4" />
                {hotel.type}
              </div>
              <div className="border border-slate-300 rounded-sm p-1 flex items-center ">
                <BiMoney className="mr-2 w-4 h-4" />${hotel.pricePerNight} per
                night
              </div>
              <div className="border border-slate-300 rounded-sm p-1 flex items-center ">
                <BiHotel className="mr-2 w-4 h-4" />
                {hotel.adultCount} adults , {hotel.childCount} children
              </div>
              <div className="border border-slate-300 rounded-sm p-1 flex items-center ">
                <BiStar className="mr-2 w-4 h-4" />
                {hotel.starRating} star Rating
              </div>
            </div>
            <div className="flex justify-end">
              <Link
                className="flex bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 font-bold text-white"
                to={`/edit-hotel/${hotel._id}`}
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MyHotels;
