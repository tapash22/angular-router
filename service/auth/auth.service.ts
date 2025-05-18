import { inject, Injectable } from "@angular/core";
import { User } from "../../src/app/interfaces/user"; 
import { Router } from "@angular/router";
import { MOCK_USERS } from "../../src/app/localStore/user-data";
import { LoginPayload } from "../../src/app/interfaces/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private users: User[] = MOCK_USERS;

  private currentUser: User | null = null;
  private router = inject(Router)

  constructor() {}

  login(email: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      this.currentUser = user;
      localStorage.setItem("currentUser", JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout():void{
    this.currentUser = null
    localStorage.removeItem('currentUser')
    this.navigateByUrl('/auth/login')
  }

  getCurrentUser():User | null{

    if(!this.currentUser){
      const userData = localStorage.getItem("currentUser")
  
      if(userData){
        this.currentUser = JSON.parse(userData) as User;
      }
    }
    return this.currentUser
  }

  isAuthenticated(): boolean{
    return !!this.getCurrentUser()
  }

  hasRole(role: 'admin' |'manager'|'officer'|'user'): boolean{
    return this.getCurrentUser()?.role === role
  }

  navigateByUrl(url:string):void{
    this.router.navigateByUrl(url,{replaceUrl:true})
  }
}
