// src/app/(pages)/register/actions.ts
"use server"; // Essential directive for Server Actions

import { z } from 'zod';
// import { cookies } from 'next/headers'; // Example if you need cookies
// import { redirect } from 'next/navigation'; // Example if you need redirects

// Define the Zod schema for your registration data
const registerSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // path of error
});

// This is your Server Action. It MUST be an async function.
// It typically takes FormData as an argument when used with <form action={...}>
export async function registerUser(formData: FormData) {
  // Log the form data for debugging (remove in production if sensitive)
  console.log("Received form data:", Object.fromEntries(formData.entries()));

  // Parse and validate the form data using the Zod schema
  const parsed = registerSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    // If validation fails, return the errors.
    // In a real application, you'd likely pass these back to the client
    // using useState or a form state management library.
    console.error("Validation errors:", parsed.error.flatten().fieldErrors);
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: 'Validation failed.',
    };
  }

  // Destructure the validated data
  const { email, password } = parsed.data;

  try {
    // --- IMPORTANT: Replace this with your actual user registration logic ---
    // Example: Call an authentication service, create a user in a database, etc.
    // For demonstration, we'll simulate an async operation.
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

    // Example: Store user data (e.g., in a database or external auth service)
    console.log(`Registering user with email: ${email} and password: (hidden)`);
    // Example: Set a cookie upon successful registration (requires `next/headers`)
    // cookies().set('auth_token', 'some_jwt_token', { httpOnly: true, secure: true });

    // --- End of actual user registration logic ---

    console.log("User registered successfully!");

    // You can return data to the client component, e.g., a success message.
    // If you need to redirect, use `redirect` from 'next/navigation'.
    // For example: redirect('/dashboard');
    return {
      success: true,
      message: 'Registration successful!',
    };

  } catch (error) {
    console.error("Error during registration:", error);
    // Return an error object if something goes wrong during the registration process
    return {
      errors: {
        server: "An unexpected error occurred during registration. Please try again.",
      },
      message: 'Registration failed due to a server error.',
    };
  }
}
