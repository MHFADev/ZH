export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: "main" | "side" | "drink";
  image: string;
  sizes?: string[];
};
