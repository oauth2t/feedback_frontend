'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';

// Define what our form data looks like
type FormData = {
  name: string;
  email: string;
  age: number;
  message: string;
};

// Props for our form field component
type FormFieldProps = {
  label: string;
  name: keyof FormData;
  type?: string;
  placeholder: string;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  validation?: any;
  isTextArea?: boolean;
  rows?: number;
};

export default function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  register,
  errors,
  validation,
  isTextArea = false,
  rows = 4
}: FormFieldProps) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      {isTextArea ? (
        <textarea
          {...register(name, validation)}
          className="form-input"
          rows={rows}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          {...register(name, validation)}
          className="form-input"
          placeholder={placeholder}
        />
      )}
      {errors[name] && <p className="error-message">{errors[name]?.message}</p>}
    </div>
  );
} 