'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { submitShippingForm, type ShippingFormState } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Loader2, Truck } from 'lucide-react';
import Link from 'next/link';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving Address... </> : <>Save and Continue <ArrowRight className="ml-2 h-4 w-4" /></>}
    </Button>
  );
}

export default function ShippingPage() {
  const initialState: ShippingFormState = { message: '', success: false };
  const [state, formAction] = useFormState(submitShippingForm, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !state.success && state.errors) {
        const errorSummary = state.errors.map(e => `${e.path.join('.')}: ${e.message}`).join('\n');
        toast({
          variant: 'destructive',
          title: 'Error submitting form',
          description: state.message + "\n" + errorSummary || 'Please correct the errors and try again.',
        });
      } else if (state.success && state.message) {
         // Handled by showing link to checkout
      }
  }, [state, toast]);

  if (state.success) {
    return (
      <div className="max-w-md mx-auto text-center py-10">
        <Truck className="mx-auto h-16 w-16 text-green-500 mb-6" />
        <h1 className="text-2xl font-headline font-bold mb-4 text-accent">{state.message}</h1>
        <p className="text-muted-foreground mb-6">Your shipping details have been saved.</p>
        <Button size="lg" asChild>
          <Link href="/checkout">Proceed to Checkout</Link>
        </Button>
      </div>
    );
  }


  const getErrorForField = (fieldName: string) => {
    return state.errors?.find(err => err.path.includes(fieldName))?.message;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold text-accent">Shipping Details</h1>
        <p className="mt-2 text-lg text-foreground">
          Please provide your shipping address to continue with your order.
        </p>
      </header>

      <Card className="shadow-xl">
        <CardHeader>
           <div className="flex items-center gap-2 mb-2">
            <Truck className="h-6 w-6 text-accent" />
            <CardTitle className="font-headline text-2xl">Delivery Address</CardTitle>
          </div>
          <CardDescription>Where should we send your handcrafted items?</CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" name="fullName" placeholder="John Doe" className="mt-1 bg-background" />
              {getErrorForField('fullName') && <p className="text-sm text-destructive mt-1">{getErrorForField('fullName')}</p>}
            </div>
            <div>
              <Label htmlFor="addressLine1">Address Line 1</Label>
              <Input id="addressLine1" name="addressLine1" placeholder="123 Main St" className="mt-1 bg-background" />
              {getErrorForField('addressLine1') && <p className="text-sm text-destructive mt-1">{getErrorForField('addressLine1')}</p>}
            </div>
            <div>
              <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
              <Input id="addressLine2" name="addressLine2" placeholder="Apt, suite, etc." className="mt-1 bg-background" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" placeholder="Anytown" className="mt-1 bg-background" />
                {getErrorForField('city') && <p className="text-sm text-destructive mt-1">{getErrorForField('city')}</p>}
              </div>
              <div>
                <Label htmlFor="state">State / Province</Label>
                <Input id="state" name="state" placeholder="CA" className="mt-1 bg-background" />
                {getErrorForField('state') && <p className="text-sm text-destructive mt-1">{getErrorForField('state')}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                <Input id="zipCode" name="zipCode" placeholder="90210" className="mt-1 bg-background" />
                {getErrorForField('zipCode') && <p className="text-sm text-destructive mt-1">{getErrorForField('zipCode')}</p>}
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" placeholder="United States" className="mt-1 bg-background" />
                 {getErrorForField('country') && <p className="text-sm text-destructive mt-1">{getErrorForField('country')}</p>}
              </div>
            </div>
             <div>
              <Label htmlFor="phoneNumber">Phone Number (Optional)</Label>
              <Input id="phoneNumber" name="phoneNumber" type="tel" placeholder="(555) 123-4567" className="mt-1 bg-background" />
              {getErrorForField('phoneNumber') && <p className="text-sm text-destructive mt-1">{getErrorForField('phoneNumber')}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
