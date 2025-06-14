import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Brush, Store, CalendarDays, Lightbulb, Mail } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/30">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl md:text-6xl text-accent">
            Steffen's Sign and Design
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-foreground md:text-xl">
            Discover unique, handcrafted signs and designs that bring your vision to life. Quality craftsmanship for every occasion.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/shop">Shop Our Collection <Store className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/gallery">View Past Projects <Brush className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-headline font-semibold text-center mb-12 text-accent">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Brush className="h-10 w-10 text-accent mb-4" />
                <CardTitle className="font-headline">Custom Craftsmanship</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Each piece is meticulously handcrafted with attention to detail, ensuring a unique and high-quality product tailored to your specifications.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Store className="h-10 w-10 text-accent mb-4" />
                <CardTitle className="font-headline">Unique Designs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Explore a wide range of creative designs or work with us to bring your own custom ideas to life. Perfect for gifts, home decor, or business branding.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Lightbulb className="h-10 w-10 text-accent mb-4" />
                <CardTitle className="font-headline">Personalized Service</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We pride ourselves on providing excellent customer service, working closely with you from concept to completion.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Showcase Snippet Section */}
      <section className="w-full py-12 md:py-20 lg:py-28 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-headline font-semibold text-center mb-12 text-accent">
            A Glimpse of Our Work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: "https://placehold.co/600x400.png", alt: "Wooden Sign", dataAiHint: "wood sign" },
              { src: "https://placehold.co/600x400.png", alt: "Custom Design", dataAiHint: "art design" },
              { src: "https://placehold.co/600x400.png", alt: "Handcrafted Item", dataAiHint: "craft item" },
            ].map((item, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-md aspect-video">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  data-ai-hint={item.dataAiHint}
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/gallery">Explore Full Gallery <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action / Quick Links Section */}
      <section className="w-full py-12 md:py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-headline font-semibold text-center mb-12 text-accent">
            Get Started
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link href="/recommendations" className="block">
              <Card className="h-full hover:bg-primary/20 transition-colors duration-200 shadow-lg">
                <CardHeader className="flex-row items-center gap-4">
                  <Lightbulb className="h-8 w-8 text-accent" />
                  <CardTitle className="font-headline">Need Inspiration?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Use our AI-powered tool to get project ideas based on your needs.</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/contact" className="block">
               <Card className="h-full hover:bg-primary/20 transition-colors duration-200 shadow-lg">
                <CardHeader className="flex-row items-center gap-4">
                  <Mail className="h-8 w-8 text-accent" />
                  <CardTitle className="font-headline">Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Have a question or a custom project in mind? Get in touch!</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/calendar" className="block md:col-span-2">
               <Card className="h-full hover:bg-primary/20 transition-colors duration-200 shadow-lg">
                <CardHeader className="flex-row items-center gap-4">
                  <CalendarDays className="h-8 w-8 text-accent" />
                  <CardTitle className="font-headline">Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Find out where to see our products in person at local shows and fairs.</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
