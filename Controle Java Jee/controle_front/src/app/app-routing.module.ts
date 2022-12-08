import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeaderComponent} from "./component/header/header.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {ProductsComponent} from "./component/products/products.component";
import {CustomersComponent} from "./component/customers/customers.component";

const routes: Routes = [
  {path: "", component: HeaderComponent, children: [
      {path: "", component: DashboardComponent},
      {path: "products", component: ProductsComponent},
      {path: "customers", component: CustomersComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
