import { BiCategoryAlt, BiCreditCard, BiHeart, BiUser } from "react-icons/bi";
import { BsTruck } from "react-icons/bs";
import { CiLock } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import { LuPackagePlus } from "react-icons/lu";

export const navLinksMobile = [
  { name: "Dashboard", link: "/" },
  { name: "Pedidos", link: "/" },
  { name: "Rastrear envios", link: "/" },
  { name: "Liste de deseos", link: "/" },
  { name: "Perfil de usuario", link: "/" },
  { name: "Metodos de pago", link: "/" },
];

export const menuItems = [
  { name: "Dashboard", icon: MdDashboard, link: '/dashboard' },
  { name: "Pedidos", icon: CiLock, link: '/orders' },
  { name: "Rastrear envio", icon: BsTruck, link: 'send' },
  { name: "Lista de deseos", icon: BiHeart, link: '/listwish', badge: 8 },
  { name: "Perfil de usuario", icon: BiUser, link: 'profile' },
  { name: "Metodos de pago", icon: BiCreditCard, link: 'payments' },
];

export const menuAdmin = [
  { name: "Lista de Productos", icon: LuPackagePlus, link: "/dashboard/products" },
  { name: "Lista de Categorias", icon: BiCategoryAlt, link: "/dashboard/categories" },
  { name: "Lista de Usuarios", icon: BiUser, link: "/dashboard/users" },
];
