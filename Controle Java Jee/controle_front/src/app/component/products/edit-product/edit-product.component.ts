import { Component, OnInit, Input } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Product} from "../../../model/Product.model";
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ProductService} from "../../../services/product/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  errorMessage!: string;
  editProductFormGroup! : FormGroup;

  @Input() product!: Product;
  constructor(private fb: FormBuilder,
              private serviceProduct: ProductService,
              public activeModal: NgbActiveModal,
              private router: Router) { }

  ngOnInit(): void {

    this.editProductFormGroup = this.fb.group({
      id: this.fb.control(this.product.id ),
      name: this.fb.control(this.product.name, [Validators.required, Validators.minLength(4)]),
      price: this.fb.control(this.product.price, [Validators.required]),
      quantity: this.fb.control(this.product.quantity),
    })
  }

  handelEditProduct() {
    let product = this.editProductFormGroup.value;
    this.serviceProduct.editNewProduct(product).subscribe({
      next: (data)=>{
        this.activeModal.close();
        window.location.reload()
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
