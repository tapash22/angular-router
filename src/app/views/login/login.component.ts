import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { CommonModule } from '@angular/common';

export type LoginPayload  = Pick<User, 'email'| 'password'>

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData: LoginPayload ={
    email:'',
    password:''
  }

  errorMessage: string | null = null;

  constructor(private authService: AuthService) {}

  // loginUser() {
  //   const { email, password } = this.loginData;

  //   if (!email || !password) {
  //     this.errorMessage = 'Both email and password are required.';
  //     return;
  //   }

  //   const isLoggedIn = this.authService.login(email, password);

  //   if (isLoggedIn) {
  //     this.errorMessage = null;
  //     console.log('Login successful ✅');
  //     // Redirect to dashboard or home page
  //     this.authService.navigateByUrl('/dashboard');
  //   } else {
  //     this.errorMessage = 'Invalid email or password. Please try again.';
  //   }
  // }

  isLoading = false;

  loginUser() {
  this.errorMessage = null;
  const { email, password } = this.loginData;

  if (!email || !password) {
    this.errorMessage = 'Both email and password are required.';
    return;
  }

  this.isLoading = true;

  setTimeout(() => {
    const isLoggedIn = this.authService.login(email, password);
    this.isLoading = false;

    if (isLoggedIn) {
      this.authService.navigateByUrl('/dashboard');
    } else {
      this.errorMessage = 'Invalid email or password.';
    }
  }, 500); 
}


}
