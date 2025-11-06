import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ToasterService } from '../../service/toaster.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../service/user.service';
import { DynamicButtonComponent } from '../../childs/dynamic-button/dynamic-button.component';
import { Observable, scan, Subject } from 'rxjs';
import { WindowSizeService } from '../../service/window-size/window-size.service';
@Component({
  selector: 'app-reset-password',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    DynamicButtonComponent,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  profileForm: FormGroup;
  showPassword = false;

  iconEye = faEye;
  iconEyeClose = faEyeSlash;

  // declear  Rx.jx

  clickCount = 0;
  private clickSubject = new Subject<void>();

  // width = 0;
  // height = 0;
  size$: Observable<{ width: number; height: number }>;

  smoothedWidth = 0;
  targetWidth = 0;

  // declear end  Rx.jx
private fb = inject(FormBuilder)
    private userService = inject(UserService)
    private toaster = inject(ToasterService)
    private windowSizeService = inject(WindowSizeService)
  constructor(
  ) {
    this.profileForm = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator },
    );

    // implement Rx.jx

    this.size$ = this.windowSizeService.size$;
    this.clickSubject
      .pipe(
        scan((count) => count + 1, 0), // accumulate count
      )
      .subscribe((count) => {
        this.clickCount = count;
        console.log(this.clickCount);
      });

    // implement Rx.jx end
  }
  ngOnInit() {
    this.size$.subscribe((size) => {
      this.targetWidth = size.width / 4;
      this.animateWidth();
    });
  }

  animateWidth() {
    const step = () => {
      const diff = this.targetWidth - this.smoothedWidth;
      if (Math.abs(diff) < 1) {
        this.smoothedWidth = this.targetWidth;
        return;
      }
      this.smoothedWidth += diff * 0.2; // 10% easing
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onUpdate() {
    if (this.profileForm.valid) {
      //receive password form inpuut filed with check validation
      const newPassword = this.profileForm.get('password')?.value;

      //call auth service for reset password
      const success = this.userService.resetPassword(newPassword);

      if (success) {
        this.toaster.showToast('Reset password successfully!', 'success');
        //reset form
        this.profileForm.reset();
        console.log(this.userService.getCurrentUser());
      } else {
        this.toaster.showToast('Failed to Reset Password.', 'error');
      }
    } else {
      // Show all validation errors immediately
      this.profileForm.markAllAsTouched();
    }
  }

  onClick() {
    this.clickSubject.next(); // manually trigger the scan
  }
}
