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
import { ToasterService } from "../../service/toaster.service";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { UserService } from "../../service/user.service";
import { DynamicButtonComponent } from "../../childs/dynamic-button/dynamic-button.component";

@Component({
  selector: "app-reset-password",
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule,DynamicButtonComponent],
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
    private userService: UserService,
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
      //receive password form inpuut filed with check validation
      const newPassword = this.profileForm.get("password")?.value;

      //call auth service for reset password
      const success = this.userService.resetPassword(newPassword);

      if (success) {
        this.toaster.showToast("Reset password successfully!", "success");
        //reset form
        this.profileForm.reset();
        console.log(this.userService.getCurrentUser());
      } else {
        this.toaster.showToast("Failed to Reset Password.", "error");
      }
    } else {
      // Show all validation errors immediately
      this.profileForm.markAllAsTouched();
    }
  }
}
