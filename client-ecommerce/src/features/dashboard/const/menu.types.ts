import { BiCategoryAlt, BiCreditCard, BiUser } from "react-icons/bi";
import { CiLock, CiViewList } from "react-icons/ci";
import { MdDashboard, MdOutlinePreview } from "react-icons/md";
import { LuPackagePlus } from "react-icons/lu";

export const navLinksMobile = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Pedidos", link: "/dashboard/orders" },
  { name: "Rastrear envios", link: "tracking" },
  { name: "Liste de deseos", link: "/wishlist" },
  { name: "Perfil de usuario", link: "/dashboard/profile" },
  { name: "Metodos de pago", link: "/dashboard/payments" },
];

export const menuItems = [
  { name: "Dashboard", icon: MdDashboard, link: '/dashboard' },
  { name: "Pedidos", icon: CiLock, link: '/dashboard/orders' }, // Agregado /dashboard
  { name: "Perfil de usuario", icon: BiUser, link: '/dashboard/profile', badge: '' },
  { name: "Metodos de pago", icon: BiCreditCard, link: '/dashboard/payments' },
];

export const menuAdmin = [
  { name: "Showcase", icon: MdOutlinePreview, link: "/dashboard/display-sections", badge: '' },
  { name: "Lista de Productos", icon: LuPackagePlus, link: "/dashboard/products", badge: '' },
  { name: "Lista de Categorias", icon: BiCategoryAlt, link: "/dashboard/categories" },
  { name: "Lista de Usuarios", icon: BiUser, link: "/dashboard/users" },
  { name: "Lista de Pedidos", icon: CiViewList, link: "/dashboard/allorders" }
];
