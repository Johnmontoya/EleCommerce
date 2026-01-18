interface PaginationProps {
  itemsPerPage: number,
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  indexOfFirstItem: number,
  indexOfLastItem: number,
  data: any[] | undefined,
  title?: string,
}
const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, currentPage, setCurrentPage, indexOfFirstItem, indexOfLastItem, data, title }) => {
  const totalData = data?.length || 0;
  const totalPages = Math.ceil(totalData / itemsPerPage);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <>
      {totalPages > 0 && (
        <div className="px-6 py-4 flex items-center justify-between">
          <p className="text-slate-400 text-sm">
            Mostrando <span className="font-bold text-slate-200">{indexOfFirstItem + 1}</span> -{" "}
            <span className="font-bold text-slate-200">
              {Math.min(indexOfLastItem, totalData)}
            </span>{" "}
            de <span className="font-bold text-slate-200">{totalData}</span> {title}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>

            <div className="hidden md:flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-all ${currentPage === number
                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                    : "bg-slate-700 hover:bg-slate-600 text-slate-300"
                    }`}
                >
                  {number}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Pagination;
