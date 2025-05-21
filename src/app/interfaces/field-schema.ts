export interface FieldSchema {
  name: string;
  type: "text" | "email" | "number" | "password" | "textarea";
  label: string;
  required?: boolean;
  colSpan?: number;
}
