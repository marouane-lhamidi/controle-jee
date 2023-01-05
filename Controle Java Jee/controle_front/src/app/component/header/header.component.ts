import { Component, OnInit } from '@angular/core';
import {SecurityService} from "../../services/keycloak/security.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public securityService: SecurityService) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.securityService.kcService.logout(window.location.origin)
  }

  async login(){
    await this.securityService.kcService.login({
      redirectUri: window.location.origin
    })
  }
}
