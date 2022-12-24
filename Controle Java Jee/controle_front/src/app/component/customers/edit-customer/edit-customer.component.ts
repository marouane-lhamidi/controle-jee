import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Customer} from "../../../model/Customer.model";
import {CustomerService} from "../../../services/customer/customer.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  errorMessage!: string;
  editCustomerFormGroup! : FormGroup;

  @Input() customer!: Customer;
  constructor(private fb: FormBuilder,
              private serviceCustomer: CustomerService,
              public activeModal: NgbActiveModal) { }

  ngOnInit(): void {

    this.editCustomerFormGroup = this.fb.group({
      id: this.fb.control(this.customer.id ),
      name: this.fb.control(this.customer.name, [Validators.required, Validators.minLength(4)]),
      email: this.fb.control(this.customer.email, [Validators.required, Validators.minLength(4)])
    })
  }

  handelEditCustomer() {
    let customer = this.editCustomerFormGroup.value;
    this.serviceCustomer.editNewCustomer(customer).subscribe({
      next: (data)=>{
        this.activeModal.close();
        window.location.reload()
      },
      error : (err)=>{
        this.errorMessage = err;
        alert("Customer added wrongly")
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
