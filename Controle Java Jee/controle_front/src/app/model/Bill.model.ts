import {Product} from "./Product.model";
import {Customer} from "./Customer.model";

export interface Bill{
  id: number;
  billingDate: Date;
  productItems: ProductItem[];
  customerId: number;
  totalToPay: number;
  customer: Customer;
}

export interface ProductItem{
  id: number;
  quantity: number;
  price: number;
  productId: number;
  product: Product;
}
