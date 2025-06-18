import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from "@angular/forms";
import { AuthService } from "../../service/auth/auth.service";
import { ToasterService } from "../../service/toaster.service";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-reset-password",
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: "./reset-password.component.html",
  styleUrl: "./reset-password.component.css",
})
export class ResetPasswordComponent {
  profileForm: FormGroup;
  showPassword: boolean = false;

  iconEye = faEye;
  iconEyeClose = faEyeSlash;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toaster: ToasterService
  ) {
    this.profileForm = this.fb.group(
      {
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/
            ),
          ],
        ],
        confirmPassword: ["", Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get("password")?.value;
    const confirmPassword = form.get("confirmPassword")?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onUpdate() {
    if (this.profileForm.valid) {
      const newPassword = this.profileForm.get("password")?.value;

      const success = this.authService.updatePassword(newPassword);

      if (success) {
        this.toaster.showToast("Reset password successfully!", "success");
        this.profileForm.reset();
        console.log(this.authService.getCurrentUser());
      } else {
        this.toaster.showToast("Failed to Reset Password.", "error");
      }
    } else {
      // Show all validation errors immediately
      this.profileForm.markAllAsTouched();
    }
  }
}
