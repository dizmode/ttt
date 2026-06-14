export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
  image: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type ShippingInfo = {
  name: string;
  email: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  notes?: string;
};

export type OrderRequest = {
  items: CartItem[];
  shipping: ShippingInfo;
};

export type OrderResponse = {
  orderId: string;
};
