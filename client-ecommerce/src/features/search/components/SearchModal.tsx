import React, { useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import { useProductSearch } from "../hooks/useProductSearch";
import { SearchResultItem } from "./SearchResultItem";
import ButtonAction from "../../../shared/ui/ButtonAction";
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
    <div className="fixed z-50 inset-0 bg-slate-900/80 backdrop-blur-sm overflow-y-auto h-full w-full px-4 flex items-start justify-center pt-20">
      <div className="w-full relative mx-auto shadow-2xl rounded-2xl bg-linear-to-br from-slate-800 to-slate-900 border-2 border-cyan-500/30 max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-slate-700">
          <h1 className="text-slate-100 font-bold text-lg">
            Busca el producto que deseas
          </h1>
          <ButtonAction
            onClick={onClose}
            text=""
            variant="secondary"
            type="button"
          >
            <MdClose size={24} />
          </ButtonAction>
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <SearchBar
            value={query}
            onChange={search}
            isLoading={isLoading}
            placeholder="Buscar productos, categorías, marcas..."
          />
        </div>

        {/* Results */}
        <div className="px-4 pb-4 max-h-96 overflow-y-auto">
          {isLoading && query && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-cyan-400 border-t-transparent rounded-full" />
            </div>
          )}

          {!isLoading && results.length === 0 && query && (
            <div className="text-center py-8">
              <p className="text-slate-400 mb-2">
                No se encontraron productos para "{query}"
              </p>
              <p className="text-slate-500 text-sm">
                Intenta con otros términos de búsqueda
              </p>
            </div>
          )}

          {!isLoading && results.length === 0 && !query && (
            <div className="text-center py-8">
              <p className="text-slate-400 text-sm">
                Comienza a escribir para buscar productos
              </p>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-2">
              <p className="text-slate-400 text-sm mb-3">
                {results.length} resultado{results.length !== 1 ? "s" : ""}{" "}
                encontrado{results.length !== 1 ? "s" : ""}
              </p>
              {results.map((product) => (
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