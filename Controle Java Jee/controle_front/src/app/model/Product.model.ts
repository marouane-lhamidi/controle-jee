export interface Product{
  id: number;
  name: string;
  price: number;
  quantity: number;
}
export interface PageProduct{
  products: Product[];
  page: number;
  size: number;
  totalPages: number;
}
