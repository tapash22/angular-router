import { inject, Injectable } from "@angular/core";
import { User,RegistrationPayload } from "../../interfaces/user";
import { Router } from "@angular/router";
import { MOCK_USERS } from "../../localStore/user-data";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private router = inject(Router) //import router

  private users: User[] = MOCK_USERS //import user array

  private currentUser: User | null = null;

  constructor() {}

  //login method
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

//logout method

  logout():void{
    this.currentUser = null
    localStorage.removeItem('currentUser')
    this.navigateByUrl('/login')
  }

//registration method
  register(newUser: RegistrationPayload): boolean {
  const exists = this.users.some((u) => u.email === newUser.email);

  if (exists) {
    return false; // Email already in use
  }

  const userToSave: User = {
    id: this.users.length ? this.users.length+1 : 1,  // unique ID
    name: newUser.name,
    email: newUser.email,
    password: newUser.password,
    role: 'user',  // default role
  };

  this.users.push(userToSave);
  localStorage.setItem('user', JSON.stringify(this.users));
  return true;
}


//current user information

  getCurrentUser():User | null{

    if(!this.currentUser){
      const userData = localStorage.getItem("currentUser")
  
      if(userData){
        this.currentUser = JSON.parse(userData) as User;
      }
    }
    return this.currentUser
  }

  getAllUsers():User[] | [] {
   return this.users;
  }


  isAuthenticated(): boolean{
    return !!this.getCurrentUser()
  }

  //role check
  hasRole(role: 'admin' |'manager'|'officer'|'user'): boolean{
    return this.getCurrentUser()?.role === role
  }

  //router nagivation
  navigateByUrl(url:string):void{
    this.router.navigateByUrl(url,{replaceUrl:true})
  }
}
