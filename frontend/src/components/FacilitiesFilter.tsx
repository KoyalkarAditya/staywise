import { hotelFacilities } from "../config/hotel-options";

type Props = {
  selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FacilitiesFilter = ({ selectedFacilities, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 p-5">
      <h4 className="text-md font-semibold mb-2">Hotel Facilities</h4>
      {hotelFacilities.map((facility) => (
        <label className="flex items-center space-x-2 gap-2">
          <input
            type="checkbox"
            className="rounded"
            value={facility}
            checked={selectedFacilities.includes(facility)}
            onChange={onChange}
          />
          {facility}
        </label>
      ))}
    </div>
  );
};

export default FacilitiesFilter;
