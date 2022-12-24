import { Component, OnInit } from '@angular/core';
import {Product} from "../../model/Product.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductService} from "../../services/product/product.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EditProductComponent} from "./edit-product/edit-product.component";
import {NewProductComponent} from "./new-product/new-product.component";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productsGetting: any;
  product!: Product;
  products!: Product[];
  currentPage: number=0;
  pageSize: number=5;
  totalPages: number=0;
  errorMessage! : string;
  searchFormGroup! : FormGroup;
  currentAction : string="all";

  constructor(private productService : ProductService,
              private fb: FormBuilder,
              public authUser: AuthenticationService,
              public modalService: NgbModal) { }

  ngOnInit(): void {

    this.searchFormGroup= this.fb.group({
      keyword: this.fb.control(null)
    })
    this.getPageProducts();

  }
  getPageProducts(){
    this.productService.getProducts().subscribe(date=> {
      this.productsGetting= date;
      this.products = this.productsGetting._embedded.products;
    })
  }


  openAddProduct(){
    this.modalService.open(NewProductComponent);
  }

  openEditModal(product: Product) {
    const modalRef = this.modalService.open(EditProductComponent);
    modalRef.componentInstance.product = product;
  }

  handleProductDelete(p: Product) {
    let conf = confirm("Are you sur you want to delete")
    if (!conf) return;
    this.productService.handleProductDelete(p.id).subscribe({
      next: (data)=>{
        let id = this.products.indexOf(p);
        this.products.splice(id, 1);
      },
      error: (err)=>{
        this.errorMessage= err;
      }
    })

  }

}
