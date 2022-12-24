import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ProductService} from "../../../services/product/product.service";
import {ProductsComponent} from "../products.component";
import {Product} from "../../../model/Product.model";
import {Router} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  errorMessage!: string;
  addProductFormGroup! : FormGroup;
  @Input() product!: Product;
  constructor( public activeModal: NgbActiveModal ,private fb: FormBuilder, private serviceProduct: ProductService) { }

  ngOnInit(): void {
    this.addProductFormGroup = this.fb.group({
      name: this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      price: this.fb.control(null, [Validators.required]),
      quantity: this.fb.control(null),
    })

  }


  handelAddProduct() {
    let product = this.addProductFormGroup.value;
    this.serviceProduct.addNewProduct(product).subscribe({
      next: (data)=>{
        this.activeModal.close();
        window.location.reload();
      },
      error : (err)=>{
        this.errorMessage = err;
        alert("Product added wrongly")
      }
    })
  }

  getErrorMessage(field: string, errors: ValidationErrors) {
    if(errors['required']) {
      return field +" is Required";
    } else if(errors['minlength']) {
      return field+" should have at least "+errors['minlength']['requiredLength']+" Characters";
    } else return "";
  }

}
