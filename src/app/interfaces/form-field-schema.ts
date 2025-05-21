export interface FieldSchema {
  name: string
  label: string
  type: 'text' | 'email' | 'number' | 'password' | 'textarea'
  colSpan?: number // Optional: number of columns to span
  required?: boolean
}
