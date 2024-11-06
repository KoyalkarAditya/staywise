import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";
const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [selectedSortOption, setSelectedSortOption] = useState<string>("");
  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption: selectedSortOption,
  };
  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    apiClient.SearchHotels(searchParams)
  );
  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;
    setSelectedStars((prev) =>
      event.target.checked
        ? [...prev, starRating]
        : prev?.filter((star) => star !== starRating)
    );
  };
  const handleHotelTypesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedType = event.target.value;
    setSelectedHotelTypes((prev) =>
      event.target.checked
        ? [...prev, selectedType]
        : prev?.filter((type) => type !== selectedType)
    );
  };
  const handleHotelFacilitiesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFacility = event.target.value;
    setSelectedFacilities((prev) =>
      event.target.checked
        ? [...prev, selectedFacility]
        : prev?.filter((facility) => facility !== selectedFacility)
    );
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 lg:sticky p-5 h-fit top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter By
          </h3>
          <StarRatingFilter
            onChange={handleStarsChange}
            selectedStars={selectedStars}
          />
          <HotelTypesFilter
            onChange={handleHotelTypesChange}
            selectedTypes={selectedHotelTypes}
          />
          <FacilitiesFilter
            onChange={handleHotelFacilitiesChange}
            selectedFacilities={selectedFacilities}
          />
          <PriceFilter
            onChange={setSelectedPrice}
            selectedPrice={selectedPrice}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Hotels found{" "}
            {search.destination ? `in ${search.destination}` : ""}
          </span>{" "}
          <select
            value={selectedSortOption}
            onChange={(e) => setSelectedSortOption(e.target.value)}
            className="p-2 border-2 rounded-md"
          >
            <option value="">Sort by</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price per Night (low to high)
            </option>
            <option value="pricePerNightDesc">
              Price per Night (high to low)
            </option>
          </select>
        </div>
        {hotelData?.data.map((hotel) => (
          <SearchResultCard hotel={hotel} />
        ))}
        <div>
          <Pagination
            onPageChange={(page: number) => setPage(page)}
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
