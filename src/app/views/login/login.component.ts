import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../service/auth/auth.service";
import { CommonModule } from "@angular/common";
import { LoginPayload, User, RegistrationPayload } from "../../interfaces/user";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-login",
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent implements OnInit {
  loginData: LoginPayload = {
    email: "",
    password: "",
  };

  // registerUser: RegistrationPayload | null = null;

  errorMessage: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const preFill = localStorage.getItem("userEmail");

    if (preFill) {
      const { email } = JSON.parse(preFill);
      this.loginData.email = email;
    }
  }

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
    console.log(this.loginData)

    if (!email || !password) {
      this.errorMessage = "Both email and password are required.";
      return;
    }

    this.isLoading = true;

  setTimeout(() => {
    const isLoggedIn = this.authService.login(email,password); // Pass as object

    this.isLoading = false;

    if (isLoggedIn) {
      const userJson = localStorage.getItem('currentUser');
      const currentUser = userJson ? JSON.parse(userJson) : null;

      if (currentUser?.role) {
        this.authService.navigateByUrl(`/dashboard/${currentUser.role}`);
      } else {
        this.errorMessage = "User role not found.";
      }
    } else {
      this.errorMessage = "Invalid email or password.";
    }
  }, 500);
  }
}
