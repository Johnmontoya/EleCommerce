export interface TabContent {
  title: string;
  content: string;
}

export interface Brand {
  name: string;
  checked: boolean;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  offerPrice?: number,
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  rating?: number;
  images?: string[];
  description?: string[];
}