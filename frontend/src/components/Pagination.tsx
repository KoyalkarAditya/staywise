export type PaginationProps = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, pages, onPageChange }: PaginationProps) => {
  const pageNumbers: number[] = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="flex justify-center ">
      <ul className="flex border gap-4">
        {pageNumbers.map((number) => (
          <li
            className={`px-2 py-1 border border-slate-400 rounded-md ${
              page == number ? "bg-blue-700 text-white" : ""
            }`}
          >
            <button className="py-1 px-2" onClick={() => onPageChange(number)}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
