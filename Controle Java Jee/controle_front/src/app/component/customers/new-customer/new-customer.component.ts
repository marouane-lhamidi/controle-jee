import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Customer} from "../../../model/Customer.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomerService} from "../../../services/customer/customer.service";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  errorMessage!: string;
  addCustomerFormGroup! : FormGroup;
  @Input() customer!: Customer;
  constructor( public activeModal: NgbActiveModal ,private fb: FormBuilder, private serviceCustomer: CustomerService) { }

  ngOnInit(): void {
    this.addCustomerFormGroup = this.fb.group({
      name: this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      email: this.fb.control(null, [Validators.required, Validators.minLength(4)]),
    })

  }


  handelAddCustomer() {
    let customer = this.addCustomerFormGroup.value;
    this.serviceCustomer.addNewCustomer(customer).subscribe({
      next: (data)=>{
        this.activeModal.close();
        window.location.reload();
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
