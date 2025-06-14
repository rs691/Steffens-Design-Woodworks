'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { registerUser, type RegisterFormState } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UserPlus } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registering...</> : 'Create Account'}
    </Button>
  );
}

export default function RegisterPage() {
  const initialState: RegisterFormState = { message: '', success: false };
  const [state, formAction] = useFormState(registerUser, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: 'Registration Successful',
          description: state.message,
        });
        // Optionally redirect or clear form here
      } else if (state.errors) {
        const errorSummary = state.errors.map(e => `${e.path.join('.')}: ${e.message}`).join('\n');
        toast({
          variant: 'destructive',
          title: 'Registration Failed',
          description: state.message + "\n" + errorSummary || 'Please correct the errors and try again.',
        });
      }
    }
  }, [state, toast]);


  const getErrorForField = (fieldName: string) => {
    return state.errors?.find(err => err.path.includes(fieldName))?.message;
  }

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <UserPlus className="mx-auto h-12 w-12 text-accent mb-4" />
          <CardTitle className="font-headline text-3xl">Create an Account</CardTitle>
          <CardDescription>Join Steffen's Showcase to save your preferences and track orders.</CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-6">
             {state.success && (
              <p className="text-sm text-green-600 bg-green-100 p-3 rounded-md">{state.message}</p>
            )}
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" className="mt-1 bg-background" />
              {getErrorForField('email') && <p className="text-sm text-destructive mt-1">{getErrorForField('email')}</p>}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="••••••••" className="mt-1 bg-background" />
              {getErrorForField('password') && <p className="text-sm text-destructive mt-1">{getErrorForField('password')}</p>}
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" className="mt-1 bg-background" />
              {getErrorForField('confirmPassword') && <p className="text-sm text-destructive mt-1">{getErrorForField('confirmPassword')}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <SubmitButton />
            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{' '}
              <Button variant="link" asChild className="p-0 h-auto text-accent">
                <Link href="/login">Log in</Link>
              </Button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
