import { Injectable } from '@angular/core';
import {Customer} from "../../model/Customer.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customers!: Customer[];

  constructor(private http: HttpClient) {

  }


  public getCustomers() : Observable<Customer[]>{
    return this.http.get<Customer[]>("http://localhost:8085/customers");

  }

  public handleCustomerDelete(id: number) : Observable<void>{

    return this.http.delete<void>("http://localhost:8085/customers/"+id);

  }

  addNewCustomer(customer: Customer): Observable<Customer> {
    customer.id= 0;
    return this.http.post<Customer>("http://localhost:8085/customers", customer);

  }
  editNewCustomer(customer: Customer): Observable<Customer> {
    console.log(customer)
    return this.http.put<Customer>("http://localhost:8085/customers/" + customer.id, customer);

  }
}
