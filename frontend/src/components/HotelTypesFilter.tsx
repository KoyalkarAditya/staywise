import { hotelTypes } from "../config/hotel-options";

type Props = {
  selectedTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelTypesFilter = ({ selectedTypes, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 p-5">
      <h4 className="text-md font-semibold mb-2">Hotel types</h4>
      {hotelTypes.map((type) => (
        <label className="flex items-center space-x-2 gap-2">
          <input
            type="checkbox"
            className="rounded"
            value={type}
            checked={selectedTypes.includes(type)}
            onChange={onChange}
          />
          {type}
        </label>
      ))}
    </div>
  );
};

export default HotelTypesFilter;
