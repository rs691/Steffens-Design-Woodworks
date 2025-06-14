'use server';

import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // path of error
});


export type RegisterFormState = {
  message: string;
  errors?: z.ZodIssue[];
  success: boolean;
};

export async function registerUser(
  prevState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {
  
  const data = Object.fromEntries(formData.entries());
  const validatedFields = RegisterSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      message: 'Validation failed. Please check your input.',
      errors: validatedFields.error.issues,
      success: false,
    };
  }

  // In a real application, you would create a user in your database here.
  // For example: await createUser(validatedFields.data.email, validatedFields.data.password);
  console.log('User registration submitted:', validatedFields.data.email);

  return {
    message: 'Registration successful! You can now log in.',
    success: true,
  };
}
