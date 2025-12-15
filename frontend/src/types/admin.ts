export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";
export type UserRole = "customer" | "admin";
export type ProductCategory = "electronics" | "clothing" | "accessories" | "home" | "sports" | "books";
export type AdminSection = "dashboard" | "products" | "orders" | "users" | "settings";

// Product types
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  images?: string[];
  stock: number;
  rating: number;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Order types
export interface OrderItem {
  product: Product | string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  orderId: string;
  user?: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

// User types
export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  isVerified?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Stats types
export interface DashboardStats {
  products: number;
  orders: number;
  users: number;
  revenue: number;
}

// Form types
export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  featured?: boolean;
}

export interface UserFormData {
  name: string;
  email: string;
  role: UserRole;
}