import { Component, Input } from "@angular/core";
import { FieldSchema } from "../../../interfaces/form-field-schema";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-dynamic-form-field",
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./dynamic-form-field.component.html",
  styleUrl: "./dynamic-form-field.component.css",
})
export class DynamicFormFieldComponent {
  @Input() field!: FieldSchema;  // ✅ Accepts only single field now
  @Input() form!: FormGroup;

  
  getControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  getErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName);
    if (control?.hasError("required")) {
      return "This field is required.";
    }
    return "Invalid input.";
  }

  // ngOnInit(){
  //   console.log("input",this.field)
  //   // console.log("input",this.form)

  // }
}
