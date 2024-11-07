import { HotelType } from "../../../backend/src/shared/types";

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

const BookingDetailSummary = ({
  hotel,
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
}: Props) => {
  return (
    <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit ">
      <h2 className="text-xl font-bold">Your Booking Details</h2>
      <div className="border-b py-2">
        Location{" "}
        <span className="font-bold">{`${hotel.name} , ${hotel.city} , ${hotel.country}`}</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          Check-in
          <div className="font-bold ">{checkIn.toDateString()}</div>
        </div>
        <div>
          Check-out
          <div className="font-bold">{checkOut.toDateString()}</div>
        </div>
      </div>
      <div className=" text-nowrap py-2">
        Total length of stay <span className="font-bold">{numberOfNights}</span>
      </div>
      <div>
        Guests{" "}
        <div className="font-bold">
          {adultCount} adults & {childCount} children
        </div>
      </div>
    </div>
  );
};

export default BookingDetailSummary;
