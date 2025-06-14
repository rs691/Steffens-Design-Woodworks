'use client';

import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { CheckCircle, CreditCard, Lock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CheckoutPage() {
  const { cartItems, getCartTotal } = useCart();
  // In a real app, shipping cost would be calculated based on address and cart.
  // And shipping address would be retrieved from previous step or user profile.
  const shippingCost = cartItems.length > 0 ? 10.00 : 0; // Example flat rate
  const taxes = getCartTotal() * 0.08; // Example 8% tax
  const orderTotal = getCartTotal() + shippingCost + taxes;

  // Placeholder for payment submission
  const handlePayment = () => {
    alert('Payment processing placeholder. In a real app, this would integrate with a payment gateway.');
    // Potentially clear cart and redirect to an order confirmation page.
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <CheckCircle className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-headline font-bold mb-4 text-accent">Nothing to Checkout</h1>
        <p className="text-lg text-foreground mb-8">Your cart is empty. Add some items to proceed to checkout.</p>
        <Button size="lg" asChild>
          <Link href="/shop">Shop Now</Link>
        </Button>
      </div>
    );
  }


  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold text-accent">Checkout</h1>
        <p className="mt-2 text-lg text-foreground">
          Review your order and complete your purchase.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-accent">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between border-b pb-2 last:border-b-0 last:pb-0">
                <div className="flex items-center">
                  <div className="w-16 h-16 relative rounded-md overflow-hidden mr-4 shrink-0">
                    <Image src={item.imageUrl || 'https://placehold.co/64x64.png'} alt={item.name} fill sizes="64px" className="object-cover" data-ai-hint="product thumbnail" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-medium text-primary-foreground">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <hr className="my-3"/>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span>Subtotal:</span> <span>${getCartTotal().toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping:</span> <span>${shippingCost.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Taxes:</span> <span>${taxes.toFixed(2)}</span></div>
            </div>
            <hr className="my-3"/>
            <div className="flex justify-between text-xl font-bold text-accent">
              <span>Order Total:</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>
          </CardContent>
           <CardFooter>
            <Link href="/cart" className="text-sm text-accent hover:underline">Edit Cart</Link>
          </CardFooter>
        </Card>

        {/* Payment Details Placeholder */}
        <Card className="shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="h-6 w-6 text-accent" />
              <CardTitle className="font-headline text-2xl">Payment Details</CardTitle>
            </div>
            <CardDescription>Securely enter your payment information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* This would be replaced by a payment gateway integration (e.g., Stripe Elements) */}
            <div className="p-6 border border-dashed border-border rounded-md text-center bg-muted/50">
              <Lock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="font-semibold text-lg text-primary-foreground">Payment Gateway Placeholder</p>
              <p className="text-sm text-muted-foreground">
                In a real application, this section would contain secure input fields for credit card details or other payment methods.
              </p>
            </div>
            <Button size="lg" className="w-full" onClick={handlePayment}>
              Complete Purchase (${orderTotal.toFixed(2)})
            </Button>
          </CardContent>
          <CardFooter>
             <p className="text-xs text-muted-foreground text-center w-full">
                <Lock className="inline h-3 w-3 mr-1" /> Your payment information is processed securely.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
