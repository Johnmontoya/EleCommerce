import React, { useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import { useProductSearch } from "../hooks/useProductSearch";
import { SearchResultItem } from "./SearchResultItem";
import { SearchBar } from "./SearchBar";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { results, isLoading, query, search, clearResults } = useProductSearch();

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!isOpen) {
      clearResults();
    }
  }, [isOpen]);

  // Cerrar con ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 bg-[#020202]/90 backdrop-blur-md overflow-y-auto h-full w-full px-4 flex items-start justify-center pt-20">
      <div className="w-full relative mx-auto bg-[#0a0a0a] border border-[#00f0ff] max-w-2xl shadow-[0_0_30px_rgba(0,240,255,0.1)]">
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00f0ff] -translate-x-1 -translate-y-1"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00f0ff] translate-x-1 -translate-y-1"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00f0ff] -translate-x-1 translate-y-1"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00f0ff] translate-x-1 translate-y-1"></div>

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-zinc-800 bg-[#050505]">
          <div className="flex items-center gap-3">
            <div className="w-2 h-6 bg-[#00f0ff] animate-pulse"></div>
            <h1 className="text-[#00f0ff] font-mono tracking-widest uppercase text-sm font-bold">
              [BÚSQUEDA_DEL_SISTEMA]
            </h1>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-[#ff0055] transition-colors p-1 border border-transparent hover:border-[#ff0055] bg-transparent"
            type="button"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <SearchBar
            value={query}
            onChange={search}
            isLoading={isLoading}
            placeholder="[CONSULTA_DE_PRODUCTO_O_CATEGORÍA...]"
          />
        </div>

        {/* Results */}
        <div className="px-4 pb-4 max-h-96 overflow-y-auto custom-scrollbar">
          {isLoading && query && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin h-10 w-10 border-2 border-[#00f0ff] border-t-transparent rounded-none" />
            </div>
          )}

          {!isLoading && results.length === 0 && query && (
            <div className="text-center py-12 border border-zinc-800 border-dashed bg-[#050505] mt-2">
              <p className="text-[#ff0055] font-mono tracking-widest uppercase text-sm mb-2">
                [ERR: NO SE ENCONTRARON COINCIDENCIAS "{query}"]
              </p>
              <p className="text-zinc-500 font-mono text-xs uppercase tracking-wider">
                [RECOMMENDATION: MODIFICAR_PARAMETROS_DE_BÚSQUEDA]
              </p>
            </div>
          )}

          {!isLoading && results.length === 0 && !query && (
            <div className="text-center py-12 border border-zinc-900 bg-[#050505] mt-2">
              <div className="w-8 h-8 mx-auto mb-4 border border-zinc-700 flex items-center justify-center">
                <div className="w-2 h-2 bg-zinc-700 animate-pulse"></div>
              </div>
              <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                [ESPERANDO_FLUJO_DE_ENTRADA]
              </p>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-3 mt-2">
              <p className="text-[#00f0ff] font-mono bg-[#00f0ff]/10 border border-[#00f0ff]/30 px-3 py-1 text-[10px] tracking-widest uppercase inline-block mb-2">
                [{results.length} REGISTRO{results.length !== 1 ? "S" : ""} RECUPERADO]
              </p>
              {results?.map((product) => (
                <SearchResultItem
                  key={product.id}
                  data={product}
                  success={true}
                  onClose={onClose}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};