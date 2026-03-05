import { BiCategoryAlt, BiCreditCard, BiUser } from "react-icons/bi";
import { CiLock, CiViewList } from "react-icons/ci";
import { MdDashboard, MdOutlinePreview } from "react-icons/md";
import { LuPackagePlus } from "react-icons/lu";

export const navLinksMobile = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Pedidos", link: "/dashboard/orders" },
  { name: "Perfil de usuario", link: "/dashboard/profile" },
  { name: "Metodos de pago", link: "/dashboard/payments" },
];

export const navLinksMobileAdmin = [
  { name: "Showcase", link: "/dashboard/display-sections" },
  { name: "Lista de Productos", link: "/dashboard/products" },
  { name: "Lista de Categorias", link: "/dashboard/categories" },
  { name: "Lista de Usuarios", link: "/dashboard/users" },
  { name: "Lista de Pedidos", link: "/dashboard/allorders" },
];

export const menuItems = [
  { name: "Dashboard", icon: MdDashboard, link: '/dashboard' },
  { name: "Pedidos", icon: CiLock, link: '/dashboard/orders' },
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
