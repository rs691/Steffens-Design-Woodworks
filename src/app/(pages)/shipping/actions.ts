'use server';

import { z } from 'zod';

export const ShippingAddressSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  addressLine1: z.string().min(5, "Address line 1 is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State/Province is required"),
  zipCode: z.string().min(3, "ZIP/Postal code is required"),
  country: z.string().min(2, "Country is required"),
  phoneNumber: z.string().min(7, "A valid phone number is required").optional(),
});

export type ShippingFormState = {
  message: string;
  errors?: z.ZodIssue[];
  success: boolean;
  submittedData?: z.infer<typeof ShippingAddressSchema>;
};

export async function submitShippingForm(
  prevState: ShippingFormState,
  formData: FormData
): Promise<ShippingFormState> {
  
  const data = Object.fromEntries(formData.entries());
  const validatedFields = ShippingAddressSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      message: 'Validation failed. Please check your input.',
      errors: validatedFields.error.issues,
      success: false,
    };
  }

  // In a real application, you would save this address, possibly associate with user or order.
  console.log('Shipping form submitted:', validatedFields.data);

  // Typically, you'd redirect to checkout or payment page here.
  // For now, just return success and data.
  return {
    message: 'Shipping address saved successfully! Proceed to checkout.',
    success: true,
    submittedData: validatedFields.data
  };
}
