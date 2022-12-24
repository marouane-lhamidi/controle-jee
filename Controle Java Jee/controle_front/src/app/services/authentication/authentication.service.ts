import { Injectable } from '@angular/core';
import {AppUser} from "../../model/user.model";
import {UUID} from "angular2-uuid";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  users: AppUser[]= [];
  authenticatedUser: AppUser | undefined;

  constructor() {
    this.users.push({userId: UUID.UUID(), username: "user1", password: "1234", role: ["USER"]})
    this.users.push({userId: UUID.UUID(), username: "admin", password: "1234", role: ["ADMIN", "USER"]})
    this.users.push({userId: UUID.UUID(), username: "user2", password: "1234", role: ["USER"]})
  }

  public login(username: string, password: string): Observable<AppUser>{
    let appUser= this.users.find(user => user.username==username);
    if (!appUser) return throwError(()=> new Error("User Not Found"))
    if (appUser.password!=password)return throwError(()=> new Error("Bad Credntials"))
    return of(appUser);
  }

  public logout(): Observable<boolean>{
    this.authenticatedUser= undefined;
    localStorage.removeItem("authUser");
    return of(true);
  }

  public authenticateUser(appUser: AppUser): Observable<boolean>{
    this.authenticatedUser= appUser;
    localStorage.setItem("authUser", JSON.stringify({username: appUser.username, roles: appUser.role, jwt: "JWT_TOKEN"}))
    return of(true);
  }

  public hasRole(role: string): boolean{
    return this.authenticatedUser!.role.includes(role);
  }

  public isAuthenticated(){
    return this.authenticatedUser!=undefined;
  }
}
