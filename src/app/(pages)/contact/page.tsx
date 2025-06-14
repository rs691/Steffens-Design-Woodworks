'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { submitContactForm, type ContactFormState } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Mail, Send } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? 'Sending...' : <>Send Message <Send className="ml-2 h-4 w-4" /></>}
    </Button>
  );
}

export default function ContactPage() {
  const initialState: ContactFormState = { message: '', success: false };
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        // This would be a success notification, not necessarily a toast.
        // For now, we'll log it or use a simple alert for success.
        // A proper success message display could be added above the form.
        console.log("Success:", state.message);
         toast({
          title: "Message Sent!",
          description: state.message,
        });
      } else if (state.errors) {
        toast({
          variant: 'destructive',
          title: 'Error submitting form',
          description: state.message || 'Please correct the errors and try again.',
        });
      }
    }
  }, [state, toast]);
  

  return (
    <div className="max-w-2xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold text-accent">Get in Touch</h1>
        <p className="mt-2 text-lg text-foreground">
          We'd love to hear from you! Whether you have a question about our products, a custom request, or just want to say hello, please fill out the form below.
        </p>
      </header>

      <Card className="shadow-xl">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-6 w-6 text-accent" />
            <CardTitle className="font-headline text-2xl">Contact Us</CardTitle>
          </div>
          <CardDescription>Fill in your details and message below.</CardDescription>
        </CardHeader>
        <CardContent>
          {state.success && state.message && (
             <div className="mb-4 p-3 rounded-md bg-green-100 text-green-700 border border-green-300">
               <p>{state.message}</p>
             </div>
           )}
          <form action={formAction} className="space-y-6">
            <div>
              <Label htmlFor="name" className="font-semibold">Full Name</Label>
              <Input id="name" name="name" type="text" placeholder="John Doe" required className="mt-1 bg-background" />
              {state.errors?.name && <p className="text-sm text-destructive mt-1">{state.errors.name.join(', ')}</p>}
            </div>
            <div>
              <Label htmlFor="email" className="font-semibold">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required className="mt-1 bg-background" />
              {state.errors?.email && <p className="text-sm text-destructive mt-1">{state.errors.email.join(', ')}</p>}
            </div>
            <div>
              <Label htmlFor="message" className="font-semibold">Message</Label>
              <Textarea id="message" name="message" placeholder="Your message here..." required rows={6} className="mt-1 bg-background" />
              {state.errors?.message && <p className="text-sm text-destructive mt-1">{state.errors.message.join(', ')}</p>}
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
