import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

interface PaginationProps {
  totalPages: number,
  currentPage: number,
  onPageChange: React.Dispatch<React.SetStateAction<number>>
}
const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {

  return (
    <div className="flex justify-center items-center gap-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <BiChevronLeft size={20} />
      </button>

      {[1, 2, 3, "...", 8].map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${currentPage === page
            ? "bg-cyan-500 text-white"
            : page === "..."
              ? "text-slate-500 cursor-default"
              : "bg-slate-700 hover:bg-slate-600 text-slate-300"
            }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <BiChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
