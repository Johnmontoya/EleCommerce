interface PaginationProps {
  itemsPerPage: number,
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  indexOfFirstItem: number,
  indexOfLastItem: number,
  data: unknown[] | undefined,
  title?: string,
}
const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, currentPage, setCurrentPage, indexOfFirstItem, indexOfLastItem, data, title }) => {
  const totalData = data?.length || 0;
  const totalPages = Math.ceil(totalData / itemsPerPage);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <>
      {totalPages > 0 && (
        <div className="px-6 py-4 flex items-center justify-between font-mono bg-black border border-zinc-800 relative mt-4">
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-50" />

          <p className="text-zinc-500 text-[10px] uppercase tracking-widest hidden sm:block">
            [RECORDS: <span className="font-bold text-white">{indexOfFirstItem + 1}</span> -{" "}
            <span className="font-bold text-white">
              {Math.min(indexOfLastItem, totalData)}
            </span>{" "}
            / <span className="font-bold text-[#00f0ff]">{totalData}</span> {title}]
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-transparent border border-zinc-700 hover:border-[#00f0ff] text-zinc-400 hover:text-[#00f0ff] rounded-none font-bold text-[10px] uppercase tracking-widest transition-all disabled:opacity-30 disabled:hover:border-zinc-700 disabled:hover:text-zinc-400 disabled:cursor-not-allowed"
            >
              [PREV]
            </button>

            <div className="hidden md:flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`w-8 h-8 rounded-none font-bold text-[10px] transition-all border flex items-center justify-center ${currentPage === number
                    ? "bg-[#00f0ff]/10 border-[#00f0ff] text-[#00f0ff] [text-shadow:_0_0_8px_#00f0ff]"
                    : "bg-black border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white"
                    }`}
                >
                  {number}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-transparent border border-zinc-700 hover:border-[#00f0ff] text-zinc-400 hover:text-[#00f0ff] rounded-none font-bold text-[10px] uppercase tracking-widest transition-all disabled:opacity-30 disabled:hover:border-zinc-700 disabled:hover:text-zinc-400 disabled:cursor-not-allowed"
            >
              [NEXT]
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Pagination;
