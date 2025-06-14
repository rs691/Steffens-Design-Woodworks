'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { loginUser, type LoginFormState } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2, LogIn } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging In...</> : 'Log In'}
    </Button>
  );
}

export default function LoginPage() {
  const initialState: LoginFormState = { message: '', success: false };
  const [state, formAction] = useFormState(loginUser, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: 'Login Successful',
          description: state.message,
        });
        // Redirect to dashboard or homepage
        // For example: router.push('/');
      } else {
         const errorSummary = state.errors ? state.errors.map(e => `${e.path.join('.')}: ${e.message}`).join('\n') : state.message;
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: errorSummary || 'Please check your credentials and try again.',
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
          <LogIn className="mx-auto h-12 w-12 text-accent mb-4" />
          <CardTitle className="font-headline text-3xl">Welcome Back!</CardTitle>
          <CardDescription>Log in to access your account and continue shopping.</CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-6">
            {!state.success && state.message && !state.errors && (
              <p className="text-sm text-destructive bg-red-100 p-3 rounded-md">{state.message}</p>
            )}
             {state.success && state.message && (
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
            <div className="flex items-center justify-between">
              {/* <div className="flex items-center space-x-2">
                <Checkbox id="remember-me" />
                <Label htmlFor="remember-me" className="text-sm font-normal">Remember me</Label>
              </div> */}
              <Button variant="link" asChild className="p-0 h-auto text-sm text-accent">
                <Link href="/forgot-password">Forgot password?</Link>
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <SubmitButton />
            <p className="text-sm text-center text-muted-foreground">
              Don't have an account?{' '}
              <Button variant="link" asChild className="p-0 h-auto text-accent">
                <Link href="/register">Sign up</Link>
              </Button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
