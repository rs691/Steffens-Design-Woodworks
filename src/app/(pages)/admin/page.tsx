import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Settings, Users, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

// This is a placeholder admin page. In a real application, this page would be protected
// and provide actual administrative functionalities.

export default function AdminPage() {
  const adminSections = [
    { title: "Manage Products", description: "Add, edit, or remove products from the shop.", icon: ShoppingBag, href: "/admin/products" },
    { title: "View Orders", description: "Track customer orders and manage fulfillment.", icon: Settings /* Using Settings as placeholder, better icon needed */, href: "/admin/orders" },
    { title: "User Management", description: "View and manage registered users.", icon: Users, href: "/admin/users" },
    { title: "Site Settings", description: "Configure general site settings and preferences.", icon: Settings, href: "/admin/settings" },
  ];

  return (
    <div>
      <header className="text-center mb-12">
        <ShieldCheck className="mx-auto h-16 w-16 text-accent mb-4" />
        <h1 className="text-4xl font-headline font-bold text-accent">Admin Dashboard</h1>
        <p className="mt-2 text-lg text-foreground">
          Welcome to the administrative area for Steffen's Showcase.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {adminSections.map((section) => (
          <Link key={section.title} href={section.href} className="block">
            <Card className="h-full hover:shadow-lg hover:border-accent transition-all duration-200">
              <CardHeader className="flex-row items-center gap-4 pb-2">
                <section.icon className="h-8 w-8 text-accent" />
                <CardTitle className="font-headline text-xl">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{section.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 border border-dashed border-border rounded-md bg-muted/30">
        <h3 className="text-xl font-headline font-semibold text-center text-primary-foreground mb-3">Developer Note</h3>
        <p className="text-sm text-muted-foreground text-center">
          This is a placeholder admin page. In a production environment, this page would require authentication and authorization,
          and the links would lead to actual administrative interfaces.
        </p>
      </div>
    </div>
  );
}
