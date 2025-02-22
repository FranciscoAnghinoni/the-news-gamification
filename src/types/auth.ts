export interface FormInputs {
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface User {
  email: string;
  is_admin: number;
}
