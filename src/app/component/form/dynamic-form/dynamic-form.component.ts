import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";


@Component({
  selector: "app-dynamic-form",
  imports: [ReactiveFormsModule],
  templateUrl: "./dynamic-form.component.html",
  styleUrl: "./dynamic-form.component.css",
})
export class DynamicFormComponent {
  @Input() form!: FormGroup;
  @Input() title?: string = '';
  @Input() submitBtnTitle: string = 'Submit';
  @Input() color: string = 'bg-blue-600';
  @Input() disableIfInvalid: boolean = true;

  @Output() formSubmit = new EventEmitter<any>();

  handleSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
      console.log("child",this.form.value)
      this.form.reset(); 
    }
  }
}
