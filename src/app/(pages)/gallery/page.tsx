import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

const galleryItems = [
  { id: '1', src: 'https://placehold.co/600x450.png', alt: 'Elegant wooden name sign', title: 'Personalized Name Sign', description: 'Crafted from premium oak, perfect for nurseries or home decor.', dataAiHint: 'wood sign' },
  { id: '2', src: 'https://placehold.co/600x450.png', alt: 'Rustic welcome board', title: 'Farmhouse Welcome Board', description: 'A charming addition to your entryway with a rustic finish.', dataAiHint: 'rustic board' },
  { id: '3', src: 'https://placehold.co/600x450.png', alt: 'Custom business logo plaque', title: 'Business Logo Plaque', description: 'Professional laser-engraved logo plaque for your office.', dataAiHint: 'logo plaque' },
  { id: '4', src: 'https://placehold.co/600x450.png', alt: 'Hand-painted floral design', title: 'Floral Art Piece', description: 'Intricate hand-painted floral motifs on reclaimed wood.', dataAiHint: 'floral art' },
  { id: '5', src: 'https://placehold.co/600x450.png', alt: 'Modern geometric wall art', title: 'Geometric Wall Decor', description: 'Sleek and modern geometric patterns for contemporary spaces.', dataAiHint: 'geometric art' },
  { id: '6', src: 'https://placehold.co/600x450.png', alt: 'Outdoor garden sign', title: 'Garden Marker Sign', description: 'Durable and weather-resistant sign for your beautiful garden.', dataAiHint: 'garden sign' },
];

export default function GalleryPage() {
  return (
    <div>
      <h1 className="text-4xl font-headline font-bold mb-8 text-center text-accent">Our Past Projects</h1>
      <p className="text-lg text-center mb-12 text-foreground max-w-2xl mx-auto">
        Browse through a selection of our favorite handcrafted signs and designs. Each piece tells a story of creativity and meticulous care.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item) => (
          <Card key={item.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
            <CardContent className="p-0">
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={600}
                  height={450}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={item.dataAiHint}
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-headline font-semibold mb-1 text-primary-foreground group-hover:text-accent transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
