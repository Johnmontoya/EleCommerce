import type { Product } from "../types/product.types";

export const categories = [
    "Smartphones",
    "Laptops",
    "Tablets",
    "Audio",
    "Gaming Consoles",
    "Smartwatches",
    "Accessories",
  ];

export const products: Product[] = [
    {
      id: 1,
      name: "AeroBlade Gaming Laptop",
      price: 1799.0,
      originalPrice: 1999.0,
      image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage.png",
      category: "Laptops",
      brand: "Sony",
    },
    {
      id: 2,
      name: "Aura Wireless Headphones",
      price: 249.0,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      category: "Audio",
      brand: "Sony",
    },
    {
      id: 3,
      name: "Quantum X Smartphone",
      price: 999.0,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
      category: "Smartphones",
      brand: "Samsung",
    },
    {
      id: 4,
      name: "Chrono Smartwatch V2",
      price: 329.0,
      originalPrice: 379.0,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      category: "Smartwatches",
      brand: "Apple",
    },
    {
      id: 5,
      name: "Vortex Gaming Console",
      price: 499.0,
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
      category: "Gaming Consoles",
      brand: "Sony",
    },
    {
      id: 6,
      name: "MatrixPad Pro Tablet",
      price: 649.0,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
      category: "Tablets",
      brand: "Apple",
    },
  ];  

 export const product: Product = {
    id: 1,
      name: "Nike Pegasus 41 shoes",
      category: "Sports",
      price: 189,
      offerPrice: 159,
      rating: 4,
      image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage.png",
      images: [
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage.png",
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage2.png",
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage3.png",
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage4.png",
      ],
      description: [
        "High-quality material",
        "Comfortable for everyday use",
        "Available in different sizes",
      ],
      brand: ""
    };