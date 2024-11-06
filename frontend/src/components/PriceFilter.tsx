type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

const PriceFilter = ({ onChange, selectedPrice }: Props) => {
  return (
    <div>
      <h4 className="text-md font-semibold b-2">Max Price</h4>
      <select
        className="border-2 p-2 rounded-md w-full"
        value={selectedPrice}
        onChange={(e) =>
          onChange(e.target.value ? parseInt(e.target.value) : undefined)
        }
      >
        <option value="">Select Max Price</option>
        {[50, 100, 200, 300, 500].map((price) => (
          <option value={price}>{price}</option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
