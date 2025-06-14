'use client';

import Link from 'next/link';
import { Menu, ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { NAV_LINKS, AUTH_LINKS, SITE_NAME } from '@/lib/constants';
import type { NavLink } from '@/lib/constants';
import { useCart } from '@/contexts/cart-context';
import { useEffect, useState } from 'react';

const Header = () => {
  const { cartItems } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = mounted ? cartItems.reduce((sum, item) => sum + item.quantity, 0) : 0;

  const NavLinksRenderer = ({ links, className, onLinkClick }: { links: NavLink[], className?: string, onLinkClick?: () => void }) => (
    <nav className={className}>
      {links.map((link) => (
        <Button key={link.href} variant="ghost" asChild onClick={onLinkClick}>
          <Link href={link.href}>{link.label}</Link>
        </Button>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-2xl font-headline font-bold text-accent hover:text-accent/90 transition-colors">
          {SITE_NAME}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          <NavLinksRenderer links={NAV_LINKS} className="space-x-1" />
          <div className="w-px h-6 bg-border mx-2"></div>
          <NavLinksRenderer links={AUTH_LINKS} className="space-x-1" />
           {/* Placeholder for admin link - show if authenticated as admin */}
          {/* <Button variant="ghost" asChild><Link href={ADMIN_LINK.href}>{ADMIN_LINK.label}</Link></Button> */}
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart" aria-label="Shopping Cart">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                  {totalItems}
                </span>
              )}
            </Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs p-6 bg-background">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center mb-4">
                   <Link href="/" className="text-xl font-headline font-bold text-accent">
                      {SITE_NAME}
                    </Link>
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                  </SheetClose>
                </div>
                <NavLinksRenderer links={NAV_LINKS} className="flex flex-col space-y-2" onLinkClick={() => document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}))} />
                <hr className="my-4 border-border" />
                <NavLinksRenderer links={AUTH_LINKS} className="flex flex-col space-y-2" onLinkClick={() => document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}))} />
                {/* <Button variant="ghost" asChild className="w-full justify-start" onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}))}><Link href={ADMIN_LINK.href}>{ADMIN_LINK.label}</Link></Button> */}
                <Button variant="ghost" asChild className="w-full justify-start" onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}))}>
                  <Link href="/cart" className="flex items-center">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Cart {totalItems > 0 && `(${totalItems})`}
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
