'use server';

import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }), // Min 1 for login, actual length check would be during registration
});


export type LoginFormState = {
  message: string;
  errors?: z.ZodIssue[];
  success: boolean;
};

export async function loginUser(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  
  const data = Object.fromEntries(formData.entries());
  const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      message: 'Validation failed. Please check your input.',
      errors: validatedFields.error.issues,
      success: false,
    };
  }

  // In a real application, you would authenticate the user against your database.
  // For example: const user = await authenticateUser(validatedFields.data.email, validatedFields.data.password);
  // if (!user) return { message: "Invalid email or password.", success: false };
  console.log('User login attempt:', validatedFields.data.email);

  // Simulate successful login
  if (validatedFields.data.email === "admin@example.com" && validatedFields.data.password === "password") {
     return {
        message: 'Login successful! Redirecting...',
        success: true,
      };
  }


  // Simulate failed login for other credentials
  if (validatedFields.data.email !== "test@example.com" || validatedFields.data.password !== "password123") {
     return {
        message: 'Invalid email or password.',
        success: false,
        errors: [{path: ['email'], message: 'Invalid credentials'}, {path: ['password'], message: 'Invalid credentials'}] 
      };
  }
  
  return {
    message: 'Login successful! Redirecting...',
    success: true,
  };
}
