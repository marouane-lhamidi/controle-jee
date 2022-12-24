import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CustomerService} from "../../services/customer/customer.service";
import {Customer} from "../../model/Customer.model";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NewCustomerComponent} from "../customers/new-customer/new-customer.component";
import {EditCustomerComponent} from "../customers/edit-customer/edit-customer.component";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customersGetting: any;
  customer!: Customer;
  customers!: Customer[];
  currentPage: number=0;
  pageSize: number=5;
  totalPages: number=0;
  errorMessage! : string;
  searchFormGroup! : FormGroup;
  currentAction : string="all";

  constructor(private customerService : CustomerService,
              private fb: FormBuilder,
              public authUser: AuthenticationService,
              public modalService: NgbModal) { }

  ngOnInit(): void {

    this.searchFormGroup= this.fb.group({
      keyword: this.fb.control(null)
    })
    this.getPageCustomers();

  }
  getPageCustomers(){
    this.customerService.getCustomers().subscribe(date=> {
      this.customersGetting= date;
      this.customers = this.customersGetting._embedded.customers;
    })
  }


  openAddCustomer(){
    this.modalService.open(NewCustomerComponent);
  }

  openEditModal(customer: Customer) {
    const modalRef = this.modalService.open(EditCustomerComponent);
    modalRef.componentInstance.customer = customer;
  }

  handleCustomerDelete(p: Customer) {
    let conf = confirm("Are you sur you want to delete")
    if (!conf) return;
    this.customerService.handleCustomerDelete(p.id).subscribe({
      next: (data)=>{
        let id = this.customers.indexOf(p);
        this.customers.splice(id, 1);
      },
      error: (err)=>{
        this.errorMessage= err;
      }
    })

  }

}
