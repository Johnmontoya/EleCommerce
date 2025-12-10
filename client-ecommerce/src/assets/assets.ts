import Slide1 from "./images/carousel/slideshow1.png";
import Slide2 from "./images/carousel/slideshow2.png";
import Slide3 from "./images/carousel/slideshow3.png";
import Slide4 from "./images/carousel/slideshow4.png";
import Slide5 from "./images/carousel/slideshow5.jpg";
import Banner1 from "./images/carousel/banner1.png";
import Banner2 from "./images/carousel/banner2.png";
import tablet from "./images/category/tab.png";
import console from "./images/category/console.png";
import smartwatch from "./images/category/reloj.png";
import speaker from "./images/category/parlantes.png";
import computer from "./images/category/computer.png";
import product1 from "./images/products/product1.png";
import product2 from "./images/products/product2.png";
import product3 from "./images/products/product3.png";
import Features1 from "./images/features/delivery.png";
import Features2 from "./images/features/shield.png";
import Features3 from "./images/features/product.png";
import Features4 from "./images/features/headphones.png";
import productData from "./images/products/product1/product1.png";
import productData2 from "./images/products/product2/product2.png";
import Free from "./images/free.png";
import Women from './images/women.png'


import phone from './images/category/phone.png';

export const Assets = {
  carouselSlides: [Slide1, Slide2, Slide3, Slide4, Slide5],
  // Exportar individualmente también por si las necesitas
  Slide1,
  Slide2,
  Slide3,
  Slide4,
  Slide5,
  Banner1,
  Banner2,
  product1,
  product2,
  product3,
  Features1,
  Features2,
  Features3,
  Features4,
  productData,
  productData2,
  Free,
  phone,
  computer,
  speaker,
  console,
  Women
};

export const categories = [
  { name: "Tablet", icon: tablet, color: "bg-blue-100" },
  { name: "Smartphone", icon: phone, color: "bg-purple-100" },
  { name: "Game Console", icon: console, color: "bg-orange-100" },
  { name: "Smartwatch", icon: smartwatch, color: "bg-yellow-100" },
  { name: "Audio", icon: speaker, color: "bg-pink-100" },
  { name: "Computer", icon: computer, color: "bg-indigo-100" },
];

export const products = [
  {
    name: "MACBOOK PRO 16",
    desc: "3K Retina Touch Display",
    image: product1,
    color: "bg-blue-50",
  },
  {
    name: "SMART SPEAKER",
    desc: "Dual-Speaker True sound",
    image: product2,
    color: "bg-pink-50",
  },
  {
    name: "BAMBOO SPEAKER",
    desc: "Sound that Speaks for Itself",
    image: product3,
    color: "bg-cyan-50",
  },
];

export const product = [
  {
    name: "Control Inalámbrico Xbox Series X|S – Carbon Black",
    slug: "control-inalambrico-xbox-series-xs-carbon-black",
    description:
      "Control inalámbrico original Xbox Series X|S con diseño mejorado, agarre texturizado, cruceta híbrida y conectividad Bluetooth para PC, Xbox y dispositivos móviles.",
    price: 289900,
    priceDiscount: 24.9,
    stock: 85,
    sku: "XBX-CNTRL-CB-2024",
    barcode: "889842705059",
    brand: "Xbox",
    category: "67b5a3eac1239c9cb4e4c823",
    images: [
      "https://cdn.mi-tienda.com/products/xbox-controller-carbon/1.jpg",
      "https://cdn.mi-tienda.com/products/xbox-controller-carbon/2.jpg",
      "https://cdn.mi-tienda.com/products/xbox-controller-carbon/3.jpg",
    ],
    tags: ["xbox", "gaming", "control", "series x", "series s"],
    rating: 4.8,
    reviewsCount: 234,
    variants: [
      {
        name: "Color",
        options: ["Carbon Black", "Robot White", "Pulse Red", "Shock Blue"],
      },
    ],
    attributes: [
      {
        name: "Compatibilidad",
        value: "Xbox Series X|S, Xbox One, PC, Android, iOS",
      },
      { name: "Conectividad", value: "Bluetooth / Xbox Wireless" },
      {
        name: "Alimentación",
        value: "2 pilas AA o batería recargable opcional",
      },
    ],
    dimensions: {
      weight: 0.28,
      width: 17,
      height: 17,
      depth: 7,
    },
    shipping: {
      free: true,
      cost: 0,
    },
    isDigital: false,
    digitalFile: null,
    relatedProducts: ["67b5a400c1239c9cb4e4c829", "67b5a3f8c1239c9cb4e4c825"],
    soldCount: 520,
    isPublished: true,
  },
  {
    name: "Audífonos Inalámbricos Pro X",
    slug: "audifonos-inalambricos-pro-x",
    description:
      "Audífonos Bluetooth con cancelación activa de ruido, 30 horas de batería y estuche de carga rápida.",
    price: 249900,
    priceDiscount: 19,
    stock: 65,
    sku: "AUD-PROX-2024",
    barcode: "8909876543211",
    brand: "SoundMax",
    category: "67b5a3eac1239c9cb4e4c823",
    images: [
      "https://cdn.mi-tienda.com/products/pro-x/1.jpg",
      "https://cdn.mi-tienda.com/products/pro-x/2.jpg",
    ],
    tags: ["audífonos", "bluetooth", "tecnología"],
    rating: 4.8,
    reviewsCount: 112,
    variants: [{ name: "Color", options: ["Negro", "Blanco"] }],
    attributes: [
      { name: "Duración de Batería", value: "30 horas" },
      { name: "Cancelación de Ruido", value: "ANC activa" },
    ],
    dimensions: { weight: 0.18, width: 6, height: 4, depth: 3 },
    shipping: { free: true, cost: 0 },
    isDigital: false,
    relatedProducts: [],
    soldCount: 890,
    isPublished: true,
  },
  {
    name: "Silla Ergonómica OfficeFlow",
    slug: "silla-ergonomica-officeflow",
    description:
      "Silla ergonómica profesional con soporte lumbar ajustable, malla respirable y pistón de gas clase 3.",
    price: 599900,
    priceDiscount: 48,
    stock: 42,
    sku: "CHA-OFF-FLW-2024",
    barcode: "8805647382910",
    brand: "ComfortPro",
    category: "67b5a3f8c1239c9cb4e4c825",
    images: [
      "https://cdn.mi-tienda.com/products/officeflow/1.jpg",
      "https://cdn.mi-tienda.com/products/officeflow/2.jpg",
    ],
    tags: ["sillas", "ergonomía", "oficina"],
    rating: 4.6,
    reviewsCount: 37,
    variants: [{ name: "Color", options: ["Negro", "Gris"] }],
    attributes: [
      { name: "Material", value: "Malla + Aluminio" },
      { name: "Altura Ajustable", value: "Sí" },
    ],
    dimensions: { weight: 12, width: 65, height: 120, depth: 65 },
    shipping: { free: false, cost: 19900 },
    isDigital: false,
    relatedProducts: [],
    soldCount: 156,
    isPublished: true,
  },
  {
    name: "Reloj SmartFit Series 6",
    slug: "reloj-smartfit-series-6",
    description:
      "Reloj inteligente con sensor cardíaco, GPS integrado, resistencia al agua y 14 modos deportivos.",
    price: 329900,
    priceDiscount: 27,
    stock: 80,
    sku: "WCH-SF6-2024",
    barcode: "7801112345678",
    brand: "SmartFit",
    category: "67b5a400c1239c9cb4e4c829",
    images: [
      "https://cdn.mi-tienda.com/products/smartfit6/1.jpg",
      "https://cdn.mi-tienda.com/products/smartfit6/2.jpg",
    ],
    tags: ["smartwatch", "fitness", "tecnología"],
    rating: 4.5,
    reviewsCount: 94,
    variants: [{ name: "Correa", options: ["Negro", "Azul", "Rojo"] }],
    attributes: [
      { name: "Resistencia al Agua", value: "IP68" },
      { name: "Batería", value: "10 días" },
    ],
    dimensions: { weight: 0.05, width: 4, height: 1, depth: 25 },
    shipping: { free: true, cost: 0 },
    isDigital: false,
    relatedProducts: [],
    soldCount: 460,
    isPublished: true,
  },
  {
    name: "Curso de Edición de Video Profesional",
    slug: "curso-edicion-video-pro",
    description:
      "Curso digital completo de edición de video con Adobe Premiere y DaVinci Resolve. Acceso de por vida.",
    price: 199900,
    priceDiscount: 12,
    stock: 9999,
    sku: "CRS-VID-PRO",
    barcode: "DIGI001234567",
    brand: "MasterCourses",
    category: "67b5a410c1239c9cb4e4c830",
    images: ["https://cdn.mi-tienda.com/products/course-video-pro/cover.jpg"],
    tags: ["curso", "digital", "video"],
    rating: 4.9,
    reviewsCount: 210,
    variants: [],
    attributes: [
      { name: "Duración", value: "12 horas" },
      { name: "Modalidad", value: "Online" },
    ],
    dimensions: { weight: 0, width: 0, height: 0, depth: 0 },
    shipping: { free: true, cost: 0 },
    isDigital: true,
    relatedProducts: [],
    soldCount: 1200,
    isPublished: true,
    digitalFile:
      "https://cdn.mi-tienda.com/products/course-video-pro/download.zip",
  },
  {
    name: "Camiseta Oversize Essential",
    slug: "camiseta-oversize-essential",
    description:
      "Camiseta oversize unisex de algodón premium 240gsm. Suave, resistente y con ajuste relajado.",
    price: 89900,
    priceDiscount: 39,
    stock: 120,
    sku: "TSH-ESS-OVS-001",
    barcode: "7701234567893",
    brand: "UrbanWear",
    category: "67b5a3d9c1239c9cb4e4c821",
    images: [
      "https://cdn.mi-tienda.com/products/oversize-essential/1.jpg",
      "https://cdn.mi-tienda.com/products/oversize-essential/2.jpg",
    ],
    tags: ["camisetas", "oversize", "unisex"],
    rating: 4.7,
    reviewsCount: 58,
    variants: [
      { name: "Color", options: ["Negro", "Blanco", "Arena", "Gris"] },
      { name: "Talla", options: ["S", "M", "L", "XL"] },
    ],
    attributes: [
      { name: "Material", value: "Algodón 100%" },
      { name: "Gramaje", value: "240 gsm" },
    ],
    dimensions: { weight: 0.25, width: 30, height: 3, depth: 25 },
    shipping: { free: true, cost: 0 },
    isDigital: false,
    relatedProducts: [],
    soldCount: 340,
    isPublished: true,
  },
  {
    name: "Audífonos Inalámbricos Pro X",
    slug: "audifonos-inalambricos-pro-x",
    description:
      "Audífonos Bluetooth con cancelación activa de ruido, 30 horas de batería y estuche de carga rápida.",
    price: 249900,
    priceDiscount: 19,
    stock: 65,
    sku: "AUD-PROX-2024",
    barcode: "8909876543211",
    brand: "SoundMax",
    category: "67b5a3eac1239c9cb4e4c823",
    images: [
      "https://cdn.mi-tienda.com/products/pro-x/1.jpg",
      "https://cdn.mi-tienda.com/products/pro-x/2.jpg",
    ],
    tags: ["audífonos", "bluetooth", "tecnología"],
    rating: 4.8,
    reviewsCount: 112,
    variants: [{ name: "Color", options: ["Negro", "Blanco"] }],
    attributes: [
      { name: "Duración de Batería", value: "30 horas" },
      { name: "Cancelación de Ruido", value: "ANC activa" },
    ],
    dimensions: { weight: 0.18, width: 6, height: 4, depth: 3 },
    shipping: { free: true, cost: 0 },
    isDigital: false,
    relatedProducts: [],
    soldCount: 890,
    isPublished: true,
  },
  {
    name: "Silla Ergonómica OfficeFlow",
    slug: "silla-ergonomica-officeflow",
    description:
      "Silla ergonómica profesional con soporte lumbar ajustable, malla respirable y pistón de gas clase 3.",
    price: 599900,
    priceDiscount: 48,
    stock: 42,
    sku: "CHA-OFF-FLW-2024",
    barcode: "8805647382910",
    brand: "ComfortPro",
    category: "67b5a3f8c1239c9cb4e4c825",
    images: [
      "https://cdn.mi-tienda.com/products/officeflow/1.jpg",
      "https://cdn.mi-tienda.com/products/officeflow/2.jpg",
    ],
    tags: ["sillas", "ergonomía", "oficina"],
    rating: 4.6,
    reviewsCount: 37,
    variants: [{ name: "Color", options: ["Negro", "Gris"] }],
    attributes: [
      { name: "Material", value: "Malla + Aluminio" },
      { name: "Altura Ajustable", value: "Sí" },
    ],
    dimensions: { weight: 12, width: 65, height: 120, depth: 65 },
    shipping: { free: false, cost: 19900 },
    isDigital: false,
    relatedProducts: [],
    soldCount: 156,
    isPublished: true,
  },
  {
    name: "Reloj SmartFit Series 6",
    slug: "reloj-smartfit-series-6",
    description:
      "Reloj inteligente con sensor cardíaco, GPS integrado, resistencia al agua y 14 modos deportivos.",
    price: 329900,
    priceDiscount: 27,
    stock: 80,
    sku: "WCH-SF6-2024",
    barcode: "7801112345678",
    brand: "SmartFit",
    category: "67b5a400c1239c9cb4e4c829",
    images: [
      "https://cdn.mi-tienda.com/products/smartfit6/1.jpg",
      "https://cdn.mi-tienda.com/products/smartfit6/2.jpg",
    ],
    tags: ["smartwatch", "fitness", "tecnología"],
    rating: 4.5,
    reviewsCount: 94,
    variants: [{ name: "Correa", options: ["Negro", "Azul", "Rojo"] }],
    attributes: [
      { name: "Resistencia al Agua", value: "IP68" },
      { name: "Batería", value: "10 días" },
    ],
    dimensions: { weight: 0.05, width: 4, height: 1, depth: 25 },
    shipping: { free: true, cost: 0 },
    isDigital: false,
    relatedProducts: [],
    soldCount: 460,
    isPublished: true,
  },
  {
    name: "Curso de Edición de Video Profesional",
    slug: "curso-edicion-video-pro",
    description:
      "Curso digital completo de edición de video con Adobe Premiere y DaVinci Resolve. Acceso de por vida.",
    price: 199900,
    priceDiscount: 12,
    stock: 9999,
    sku: "CRS-VID-PRO",
    barcode: "DIGI001234567",
    brand: "MasterCourses",
    category: "67b5a410c1239c9cb4e4c830",
    images: ["https://cdn.mi-tienda.com/products/course-video-pro/cover.jpg"],
    tags: ["curso", "digital", "video"],
    rating: 4.9,
    reviewsCount: 210,
    variants: [],
    attributes: [
      { name: "Duración", value: "12 horas" },
      { name: "Modalidad", value: "Online" },
    ],
    dimensions: { weight: 0, width: 0, height: 0, depth: 0 },
    shipping: { free: true, cost: 0 },
    isDigital: true,
    relatedProducts: [],
    soldCount: 1200,
    isPublished: true,
    digitalFile:
      "https://cdn.mi-tienda.com/products/course-video-pro/download.zip",
  },
];
