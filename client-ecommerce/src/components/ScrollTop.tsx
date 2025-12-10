import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // ⚠️ Esta es la línea mágica que fuerza el scroll arriba ⚠️
    window.scrollTo(0, 0); 
  }, [pathname]); // Se ejecuta cada vez que cambia la ruta

  return null;
};

export default ScrollToTop;