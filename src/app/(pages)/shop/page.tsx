'use client';

import ProductCard from '@/components/shop/product-card';
import ProductFilters from '@/components/shop/product-filters';
import type { Product } from '@/lib/types';
import { useState, useMemo } from 'react';

const allProducts: Product[] = [
  { id: 'p1', name: 'Custom Family Name Sign', description: 'Beautifully carved wooden sign with your family name and established date. A perfect centerpiece for your home.', price: 79.99, imageUrl: 'https://placehold.co/400x300.png', category: 'Home Decor', dataAiHint: 'family sign' },
  { id: 'p2', name: 'Welcome Porch Leaner', description: 'Tall, rustic porch leaner sign to welcome guests. Customizable text and colors.', price: 129.99, imageUrl: 'https://placehold.co/400x300.png', category: 'Outdoor', dataAiHint: 'porch sign' },
  { id: 'p3', name: 'Nursery Name Plaque', description: 'Adorable personalized name plaque for a child\'s nursery. Various themes available.', price: 49.99, imageUrl: 'https://placehold.co/400x300.png', category: 'Kids & Nursery', dataAiHint: 'nursery plaque' },
  { id: 'p4', name: 'Business Hours Sign', description: 'Professional and clear business hours sign for your storefront. Durable materials.', price: 65.00, imageUrl: 'https://placehold.co/400x300.png', category: 'Business', dataAiHint: 'business sign' },
  { id: 'p5', name: 'Wedding Welcome Sign', description: 'Elegant welcome sign for your special day. Personalized with names and wedding date.', price: 99.00, imageUrl: 'https://placehold.co/400x300.png', category: 'Events', dataAiHint: 'wedding sign' },
  { id: 'p6', name: 'Kitchen Rules Art', description: 'Fun and quirky "Kitchen Rules" sign. Adds character to any kitchen.', price: 39.99, imageUrl: 'https://placehold.co/400x300.png', category: 'Home Decor', dataAiHint: 'kitchen art' },
  { id: 'p7', name: 'Man Cave Sign', description: 'The perfect addition to any man cave or game room. Customizable designs.', price: 55.50, imageUrl: 'https://placehold.co/400x300.png', category: 'Home Decor', dataAiHint: 'man cave' },
  { id: 'p8', name: 'Garden Herb Markers', description: 'Set of beautifully crafted wooden markers for your herb garden.', price: 29.99, imageUrl: 'https://placehold.co/400x300.png', category: 'Outdoor', dataAiHint: 'garden markers' },
];

const categories = Array.from(new Set(allProducts.map(p => p.category)));

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return allProducts;
    }
    return allProducts.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div>
      <h1 className="text-4xl font-headline font-bold mb-8 text-center text-accent">Our Shop</h1>
      <p className="text-lg text-center mb-8 text-foreground max-w-2xl mx-auto">
        Find the perfect handcrafted piece for yourself or as a gift. Each item is made with passion and precision.
      </p>
      
      <ProductFilters 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-muted-foreground py-12">
          No products found in this category. Please try another selection.
        </p>
      )}
    </div>
  );
}
