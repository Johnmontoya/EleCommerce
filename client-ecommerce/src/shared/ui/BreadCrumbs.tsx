import { HiOutlineSlash } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";

const BreadCrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="max-w-7xl mx-auto flex justify-start items-center px-4 py-4">
      <Link to={"/"} className="flex items-center justify-center">
        <p className="ml-1 text-sm font-medium text-slate-100 hover:text-cyan-600 md:ml-1">
          Home
        </p>
      </Link>
      <ol className="inline-flex items-center space-x-1 md:space-x-1">
        {/* Enlace inicial a Home */}

        {/* Mapeamos los segmentos restantes */}
        {pathnames.map((name, index) => {
          // Construye la URL acumulativa (ej: "/productos", luego "/productos/123")
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <div key={routeTo} aria-current={isLast ? "page" : undefined}>
              <div className="flex items-center">
                <HiOutlineSlash className="text-slate-100" size={18} />
                {isLast ? (
                  // Si es el último, es solo texto sin enlace
                  <span className="ml-1 text-sm font-medium text-cyan-500 md:ml-1">
                    {/* Formatea el nombre (ej: "123" -> "Producto 123", o usa un hook para nombres reales) */}
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="ml-1 text-sm font-medium text-slate-100 hover:text-cyan-600 md:ml-1"
                  >
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </ol>
    </div>
  );
};

export default BreadCrumbs;
