import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ProductsComponent } from './component/products/products.component';
import { CustomersComponent } from './component/customers/customers.component';
import { NewProductComponent } from './component/products/new-product/new-product.component';
import { EditProductComponent } from './component/products/edit-product/edit-product.component';
import {HttpClientModule} from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NewCustomerComponent } from './component/customers/new-customer/new-customer.component';
import { EditCustomerComponent } from './component/customers/edit-customer/edit-customer.component';
import { BillsComponent } from './component/bills/bills.component';
import { BillInformationComponent } from './component/bills/bill-information/bill-information.component';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";



export function kcFactory(kcService: KeycloakService){
  return () => {
    kcService.init({
      config: {
        realm: "control-realm",
        url: "http://localhost:8080",
        clientId: "e-commerce-client"
      },
      initOptions: {
        onLoad: "login-required",
        checkLoginIframe: true
      }
    })
  }
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    ProductsComponent,
    CustomersComponent,
    NewProductComponent,
    EditProductComponent,
    NewCustomerComponent,
    EditCustomerComponent,
    BillsComponent,
    BillInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    NgbPaginationModule,
    NgbAlertModule,
    KeycloakAngularModule
  ],
  providers: [
    {provide: APP_INITIALIZER, deps: [KeycloakService], useFactory: kcFactory, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
