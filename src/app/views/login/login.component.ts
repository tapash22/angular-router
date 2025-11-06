import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { CommonModule } from '@angular/common';
import { LoginPayload, User} from '../../interfaces/user';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginData: LoginPayload = {
    email: '',
    password: '',
  };
  showPassword = false;

  iconEye = faEye;
  iconEyeClose = faEyeSlash;

  errorMessage: string | null = null;
      private authService = inject(AuthService)


  ngOnInit(): void {
    const preFill = localStorage.getItem('userEmail');

    if (preFill) {
      const { email } = JSON.parse(preFill);
      this.loginData.email = email;
    }
  }

  isLoading = false;

  loginUser() {
    this.errorMessage = null;
    const { email, password } = this.loginData;
    console.log(this.loginData);

    if (!email || !password) {
      this.errorMessage = 'Both email and password are required.';
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      const isLoggedIn = this.authService.login(email, password); // Pass as object

      this.isLoading = false;

      if (isLoggedIn) {
        const userJson = localStorage.getItem('currentUser');
        const currentUser: User = userJson ? JSON.parse(userJson) : null;

        if (currentUser?.role) {
          const pathDirection =
            currentUser.role === 'user' ? 'employee' : currentUser.role;
          this.authService.navigateByUrl(`/dashboard/${pathDirection}`);
        } else {
          this.errorMessage = 'User role not found.';
        }
      } else {
        this.errorMessage = 'Invalid email or password.';
      }
    }, 500);
  }
}
