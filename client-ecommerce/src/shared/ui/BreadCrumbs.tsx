import { Link, useLocation } from "react-router-dom";

const BreadCrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": window.location.origin
      },
      ...pathnames.map((name, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": name.charAt(0).toUpperCase() + name.slice(1),
        "item": `${window.location.origin}/${pathnames.slice(0, index + 1).join("/")}`
      }))
    ]
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <div className="flex justify-start items-center py-2 px-1 font-mono uppercase tracking-widest text-[10px]">
        <Link to={"/"} className="flex items-center justify-center group">
          <p className="text-zinc-500 group-hover:text-[#00f0ff] transition-colors font-bold">
            [BASE]
          </p>
        </Link>
        <ol className="inline-flex items-center space-x-2 ml-2">
          {/* Mapeamos los segmentos restantes */}
          {pathnames.map((name, index) => {
            // Construye la URL acumulativa (ej: "/productos", luego "/productos/123")
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;

            return (
              <div key={routeTo} aria-current={isLast ? "page" : undefined}>
                <div className="flex items-center space-x-2">
                  <span className="text-zinc-700 font-bold">/</span>
                  {isLast ? (
                    // Si es el último, es texto resaltado
                    <span className="text-[#00f0ff] font-black [text-shadow:_0_0_8px_#00f0ff80]">
                      {name}
                    </span>
                  ) : (
                    <Link
                      to={routeTo}
                      className="text-white hover:text-[#00f0ff] transition-colors font-bold"
                    >
                      {name}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </ol>
      </div>
    </>
  );
};

export default BreadCrumbs;
