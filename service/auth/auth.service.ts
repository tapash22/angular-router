import { inject, Injectable } from "@angular/core";
import { User } from "../../interfaces/user";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private users: User[] = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      password: "password123",
      role: "admin",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      password: "password123",
      role: "manager",
    },
    {
      id: 3,
      name: "Carol Williams",
      email: "carol@example.com",
      password: "password123",
      role: "officer",
    },
    {
      id: 4,
      name: "David Lee",
      email: "david@example.com",
      password: "password123",
      role: "user",
    },
  ];

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
    this.navigateByUrl('/login')
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
