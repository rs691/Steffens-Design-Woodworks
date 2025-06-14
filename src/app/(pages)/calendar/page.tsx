import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarCheck2, MapPin } from 'lucide-react';
import type { CalendarEvent } from '@/lib/types';

const upcomingEvents: CalendarEvent[] = [
  {
    id: 'event1',
    date: new Date(2024, 7, 15), // Month is 0-indexed, so 7 is August
    title: 'Summer Craft Fair',
    description: 'Join us at the annual Summer Craft Fair! We\'ll have our latest creations and exclusive deals.',
    location: 'Central Park Pavilion, Anytown',
  },
  {
    id: 'event2',
    date: new Date(2024, 8, 22),
    title: 'Artisan Market Downtown',
    description: 'Discover unique handcrafted goods from local artisans, including our newest sign designs.',
    location: 'Main Street Square, Anytown',
  },
  {
    id: 'event3',
    date: new Date(2024, 9, 12),
    title: 'Fall Festival Showcase',
    description: 'We\'re excited to be part of the Fall Festival! Perfect opportunity to find seasonal decor.',
    location: 'Community Center Grounds, Anytown',
  },
  {
    id: 'event4',
    date: new Date(2024, 11, 7),
    title: 'Holiday Handmade Market',
    description: 'Get your holiday shopping done early with unique, handmade gifts.',
    location: 'Exhibition Hall B, Anytown Convention Center',
  },
];

export default function CalendarPage() {
  return (
    <div>
      <header className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold text-accent">Upcoming Events</h1>
        <p className="mt-2 text-lg text-foreground">
          Find Steffen's Sign and Design at these upcoming shows and fairs. We'd love to meet you and showcase our work in person!
        </p>
      </header>

      {upcomingEvents.length > 0 ? (
        <div className="space-y-8">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-headline text-2xl text-primary-foreground group-hover:text-accent transition-colors">{event.title}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground bg-primary/50 px-3 py-1 rounded-full">
                    <CalendarCheck2 className="h-4 w-4 mr-2 text-accent" />
                    {event.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
                {event.location && (
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4 mr-2 text-accent" />
                    {event.location}
                  </div>
                )}
              </CardHeader>
              {event.description && (
                <CardContent>
                  <CardDescription className="text-base">{event.description}</CardDescription>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-muted-foreground py-12">
          No upcoming events scheduled at the moment. Please check back soon!
        </p>
      )}
    </div>
  );
}
