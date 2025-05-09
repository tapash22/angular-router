import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../service/auth/auth.service";
import { CommonModule } from "@angular/common";
import { RegistrationPayload } from "../../interfaces/user";

@Component({
  selector: "app-registration",
  imports: [FormsModule, CommonModule],
  templateUrl: "./registration.component.html",
  styleUrl: "./registration.component.css",
})
export class RegistrationComponent {
  registerUser: RegistrationPayload = {
    name: "",
    email: "",
    password: "",
  };

  errorMessage: string | null = null;

  constructor(private authService: AuthService) {}

  isLoading = false;

  createUser() {
    this.errorMessage = null;

    const { name, email, password } = this.registerUser;
    console.log("this is register user information",this.registerUser)

    localStorage.setItem('userEmail', JSON.stringify({email}));

    if (!name || !email || !password) {
      this.errorMessage = "All field are required.";
      return;
    }
    this.isLoading = true;

    setTimeout(() => {
      const isRegistered = this.authService.register(this.registerUser);
      if (isRegistered) {
        this.authService.navigateByUrl("/login");
      } else {
        this.errorMessage = "This email is already registered";
      }
    }, 500);
  }
}
