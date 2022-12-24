import {Injectable} from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {PageProduct, Product} from "../../model/Product.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService{
  products!: Product[];

  constructor(private http: HttpClient) {

  }


  public getProducts() : Observable<Product[]>{
    return this.http.get<Product[]>("http://localhost:8084/products");

  }

  public handleProductDelete(id: number) : Observable<void>{

    return this.http.delete<void>("http://localhost:8084/products/"+id);

  }

  addNewProduct(product: Product): Observable<Product> {
    product.id= 0;
    return this.http.post<Product>("http://localhost:8084/products", product);

  }
  editNewProduct(product: Product): Observable<Product> {
    console.log(product)
    return this.http.put<Product>("http://localhost:8084/products/" + product.id, product);

  }

}
