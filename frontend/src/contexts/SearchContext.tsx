import { createContext, useContext, useState } from "react";

type SearchContextType = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId: string;
  saveSearchValues: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId?: string
  ) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const SearchContextProvider = ({ children }: Props) => {
  const [destination, setDestination] = useState<string>("");
  const [checkIn, setCheckIn] = useState<Date>(new Date());
  const [checkOut, setCheckOut] = useState<Date>(new Date());
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(0);
  const [hotelId, setHotelId] = useState<string>("");
  const saveSearchValues = (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId?: string
  ) => {
    setDestination(destination);
    setAdultCount(adultCount);
    setChildCount(childCount);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    if (hotelId) {
      setHotelId(hotelId);
    }
  };
  return (
    <SearchContext.Provider
      value={{
        saveSearchValues,
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        hotelId,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context as SearchContextType;
};
