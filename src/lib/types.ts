export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock?: number;
  dataAiHint?: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
};

export type CalendarEvent = {
  id: string;
  date: Date;
  title: string;
  description?: string;
  location?: string;
};
