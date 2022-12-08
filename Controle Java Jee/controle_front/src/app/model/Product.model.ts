export interface Product{
  id: number;
  name: string;
  price: number;
  quantity: number;
}
export interface Category{
  id: string;
  name: string;
  description: string;
}
export interface Brand{
  id: string;
  name: string;
  description: string;
}
export interface Tag{
  id: string;
  name: string;
  description: string;
}
export interface PageProduct{
  products: Product[];
  page: number;
  size: number;
  totalPages: number;
}
