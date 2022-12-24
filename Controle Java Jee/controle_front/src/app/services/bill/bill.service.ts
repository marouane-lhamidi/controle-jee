import { Injectable } from '@angular/core';
import {Bill} from "../../model/Bill.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BillService {


  Bills!: Bill[];

  constructor(private http: HttpClient) {

  }


  public getBills() : Observable<Bill[]>{
    return this.http.get<Bill[]>("http://localhost:8086/fullBills");

  }

}
