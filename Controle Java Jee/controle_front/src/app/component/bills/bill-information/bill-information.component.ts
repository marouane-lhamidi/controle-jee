import {Component, Input, OnInit} from '@angular/core';
import {Customer} from "../../../model/Customer.model";
import {Bill} from "../../../model/Bill.model";

@Component({
  selector: 'app-bill-information',
  templateUrl: './bill-information.component.html',
  styleUrls: ['./bill-information.component.css']
})
export class BillInformationComponent implements OnInit {

  @Input() bill!: Bill;
  constructor() { }
  ngOnInit(): void {
  }

}
