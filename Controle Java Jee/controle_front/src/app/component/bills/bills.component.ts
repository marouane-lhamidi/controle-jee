import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BillService} from "../../services/bill/bill.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {Bill} from "../../model/Bill.model";
import {EditCustomerComponent} from "../customers/edit-customer/edit-customer.component";
import {BillInformationComponent} from "./bill-information/bill-information.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  bills!: Bill[];
  searchFormGroup! : FormGroup;

  constructor(private billService : BillService,
              private fb: FormBuilder,
              public authUser: AuthenticationService,
              public modalService: NgbModal) { }

  ngOnInit(): void {

    this.searchFormGroup= this.fb.group({
      keyword: this.fb.control(null)
    })
    this.getPageBills();

  }
  getPageBills(){
    this.billService.getBills().subscribe(date=> this.bills = date)
  }


  openInformationModal(b: Bill) {
    const modalRef = this.modalService.open(BillInformationComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.bill = b;

  }
}
