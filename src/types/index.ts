export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  features: string[];
  brand: string;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  products?: Product[];
  suggestions?: string[];
}

export interface ChatSession {
  id: string;
  userId: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface SearchFilter {
  category?: string;
  priceRange?: [number, number];
  brand?: string;
  rating?: number;
  inStock?: boolean;
}