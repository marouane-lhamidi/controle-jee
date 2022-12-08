import { Component, OnInit } from '@angular/core';
import {Product} from "../../model/Product.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EditProductComponent} from "./edit-product/edit-product.component";
import {NewProductComponent} from "./new-product/new-product.component";


declare let window: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productsGetting: any;
  formAddProduct: any;
  formUpdateProduct: any;
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
              private router: Router,
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

  handleSearchGroup() {
    this.currentAction= "Search";
    let keyword = this.searchFormGroup.value.keyword;
    this.productService.searchProduct(keyword, this.currentPage, this.pageSize).subscribe({
      next: (data)=>{
        this.products=data.products
        this.totalPages= data.totalPages
      },
      error: (err)=>{
        this.errorMessage= err;
      }

    })
  }
  goToLastPage(){
    this.currentPage = this.totalPages-1;
    if (this.currentAction == "all")
      this.getPageProducts();
    else
      this.handleSearchGroup();
  }
  goToPage(i: number){
    this.currentPage = i;
    if (this.currentAction == "all")
      this.getPageProducts();
    else
      this.handleSearchGroup();
  }

  handelAddProduct() {
    this.router.navigateByUrl("/admin/new-product")
  }

  handleProductEdit(p: Product) {
    console.log("hi")
    this.router.navigateByUrl("/admin/edit-product/" + p.id);
  }
}
