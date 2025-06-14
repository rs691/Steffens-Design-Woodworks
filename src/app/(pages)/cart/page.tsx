'use client';

import { useCart } from '@/contexts/cart-context';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MinusCircle, PlusCircle, Trash2, ShoppingBag, CreditCard } from 'lucide-react';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-headline font-bold mb-4 text-accent">Your Cart is Empty</h1>
        <p className="text-lg text-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Button size="lg" asChild>
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-headline font-bold mb-8 text-center text-accent">Your Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <Card key={item.id} className="flex flex-col sm:flex-row items-center p-4 shadow-md">
              <div className="w-24 h-24 sm:w-32 sm:h-32 relative rounded-md overflow-hidden mb-4 sm:mb-0 sm:mr-6 shrink-0">
                <Image
                  src={item.imageUrl || 'https://placehold.co/150x150.png'}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 96px, 128px"
                  className="object-cover"
                  data-ai-hint="product image"
                />
              </div>
              <div className="flex-grow text-center sm:text-left">
                <h2 className="text-xl font-headline font-semibold text-primary-foreground">{item.name}</h2>
                <p className="text-accent font-medium text-lg">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-2 my-4 sm:my-0 sm:mx-6">
                <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(item.id, item.quantity - 1)} aria-label="Decrease quantity">
                  <MinusCircle className="h-5 w-5" />
                </Button>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  className="w-16 text-center h-10 bg-background"
                  aria-label={`Quantity for ${item.name}`}
                  min="1"
                />
                <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(item.id, item.quantity + 1)} aria-label="Increase quantity">
                  <PlusCircle className="h-5 w-5" />
                </Button>
              </div>
              <Button variant="outline" size="icon" onClick={() => removeFromCart(item.id)} className="text-destructive hover:bg-destructive/10" aria-label={`Remove ${item.name} from cart`}>
                <Trash2 className="h-5 w-5" />
              </Button>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="shadow-xl sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-accent">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-lg">
                <span>Subtotal</span>
                <span className="font-semibold">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <hr />
              <div className="flex justify-between text-xl font-bold text-primary-foreground">
                <span>Total</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3">
              <Button size="lg" className="w-full" asChild>
                <Link href="/shipping">Proceed to Shipping <CreditCard className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button variant="outline" className="w-full" onClick={clearCart}>
                Clear Cart
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
