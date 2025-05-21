import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FieldSchema } from '../../../interfaces/form-field-schema';
import { CommonModule } from '@angular/common';
import { DynamicFormFieldComponent } from '../../childs/dynamic-form-field/dynamic-form-field.component';

@Component({
  selector: 'app-dynamic-form',
  imports: [CommonModule, ReactiveFormsModule,DynamicFormFieldComponent],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css'
})
export class DynamicFormComponent  {
  @Input() fields!: FieldSchema[] 
  @Input() field!: FieldSchema;
  @Input() title = 'Dynamic Form';
  @Input() submitBtnTitle = 'Submit';
  @Input() disableIfInvalid = true;
  @Input() color = 'bg-green-600';
  @Input() gridColsClass = 'grid-cols-1 md:grid-cols-2';

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const group: Record<string, any> = {};
    this.fields.forEach(field => {
      group[field.name] = field.required
        ? this.fb.control('', Validators.required)
        : this.fb.control('');
    });
    this.form = this.fb.group(group);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    }
  }
}
