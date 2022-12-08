import {Injectable, OnInit} from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {Brand, Category, PageProduct, Product, Tag} from "../model/Product.model";
import {UUID} from "angular2-uuid";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService{
  products!: Product[];
  productsGetting: any;

  constructor(private http: HttpClient) {

  }


  public getProducts() : Observable<Product[]>{
    return this.http.get<Product[]>("http://localhost:8084/products");

  }


  public getProductsPage(page: number, size: number) : Observable<PageProduct>{
    let index= page*size;
    let pagesNumber = ~~(this.products.length/size);
    if (this.products.length % size != 0)
      pagesNumber++;
    let pageProduct= this.products.slice(index, index+size);
    return of({products: pageProduct, page: page, size: size, totalPages: pagesNumber});

  }
  public handleProductDelete(id: number) : Observable<void>{

    return this.http.delete<void>("http://localhost:8084/products/"+id);

  }


  searchProduct(keyword: string, page: number, size: number): Observable<PageProduct> {
    let products = this.products.filter(p=> p.name.includes(keyword))
    let index= page*size;
    let pagesNumber = ~~(products.length/size);
    if (products.length % size != 0)
      pagesNumber++;
    let pageProduct= products.slice(index, index+size);

    return of({products: pageProduct, page: page, size: size, totalPages: pagesNumber});
  }

  addNewProduct(product: Product): Observable<Product> {
    product.id= 0;
    return this.http.post<Product>("http://localhost:8084/products", product);

  }
  editNewProduct(product: Product): Observable<Product> {
    console.log(product)
    return this.http.put<Product>("http://localhost:8084/products/" + product.id, product);

  }

  getProductById(productId: number): Observable<Product>{
    let product=  this.products.find(value => value.id == productId);
    if (product == undefined) return  throwError(() => new Error("Product Not Found"));
    return of(product);
  }

  updateProduct(product: Product): Observable<Product> {
    this.products = this.products.map(p => (p.id == product.id) ? product : p);
    return of(product);
  }
}
