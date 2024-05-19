export interface Product {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  price: number;
}

export interface ProductsStore {
  currentProduct?: Product;
  products?: Product[];
  hit?: Product[];
  new?: Product[];
  loading: boolean;
}
