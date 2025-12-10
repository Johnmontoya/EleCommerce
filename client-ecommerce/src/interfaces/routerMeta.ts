export interface IRouterMeta {
  name?: string;
  path: string;
  isShow: boolean;
  isAuth?: boolean;
  isCommon?: boolean;
  file?: string;
  requiresLayout?: boolean;
}

export type RouterMetaType = {
  [key: string]: IRouterMeta;
};

const routerMeta: RouterMetaType = {
  HomePage: {
    name: "Home",
    path: "/",
    isShow: true,
    isCommon: true,
    requiresLayout: true,
    file: "HomePage",
  },
  LoginPage: {
    name: "Login",
    path: "/login",
    isShow: true,
    isAuth: false,
    file: "Auth/LoginPage",
    requiresLayout: false,
  },
  RegisterPage: {
    name: "Register",
    path: "/register",
    isShow: true,
    isAuth: false,
    file: "Auth/RegisterPage",
    requiresLayout: false,
  },
  DashboardPage: {
    name: "Dashboard",
    path: "/dashboard",
    isShow: true,
    isAuth: false,
    file: "Dashboard/DashboardPage",
    requiresLayout: true,
  },
  ListProductsPage: {
    name: "Details",
    path: "/product/:id",
    isShow: true,
    isAuth: false,
    file: "Products/DetailsPage",
    requiresLayout: true,
  },
  DetailsPage: {
    name: "ListProduct",
    path: "/products",
    isShow: true,
    isAuth: false,
    file: "Products/ListProductPage",
    requiresLayout: true,
  },
  ShoppingCartPage: {
    name: "Cart",
    path: "/cart",
    isShow: true,
    isAuth: false,
    file: "Cart/ShoppingCartPage",
    requiresLayout: true,
  },
  WishlistPage: {
    name: "WishList",
    path: "/wishlist",
    isShow: true,
    isAuth: false,
    file: "Cart/WishListPage",
    requiresLayout: true,
  },
  ContactPage: {
    name: "Contact",
    path: "/contact",
    isShow: true,
    isAuth: false,
    file: "Contact/ContactPage",
    requiresLayout: true,
  },
  FAQPage: {
    name: "FaQ",
    path: "/faq",
    isShow: true,
    isAuth: false,
    file: "FaQ/FAQPage",
    requiresLayout: true,
  },
  BlogNewsPage: {
    name: "BlogNews",
    path: "/blog",
    isShow: true,
    isAuth: false,
    file: "Blog/BlogNewsPage",
    requiresLayout: true,
  }
};

export default routerMeta;
