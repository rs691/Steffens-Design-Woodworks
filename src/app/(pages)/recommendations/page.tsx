'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Loader2 } from 'lucide-react';
import { recommendProjects, type RecommendProjectsInput, type RecommendProjectsOutput } from '@/ai/flows/recommend-projects';
import { useToast } from '@/hooks/use-toast';

export default function RecommendationsPage() {
  const [requirements, setRequirements] = useState('');
  const [recommendation, setRecommendation] = useState<RecommendProjectsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!requirements.trim()) {
      toast({
        variant: 'destructive',
        title: 'Input Required',
        description: 'Please describe your project requirements.',
      });
      return;
    }

    setIsLoading(true);
    setRecommendation(null);

    try {
      const input: RecommendProjectsInput = { projectRequirements: requirements };
      const result = await recommendProjects(input);
      setRecommendation(result);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get recommendations. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold text-accent">Project Idea Generator</h1>
        <p className="mt-2 text-lg text-foreground">
          Tell us about your project, and our AI assistant will suggest some relevant past project ideas for inspiration!
        </p>
      </header>

      <Card className="shadow-xl mb-8">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-6 w-6 text-accent" />
            <CardTitle className="font-headline text-2xl">Describe Your Needs</CardTitle>
          </div>
          <CardDescription>
            For example: "I need a rustic welcome sign for my farmhouse porch" or "A modern, minimalist name plaque for a child's room."
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Textarea
                id="requirements"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="Enter your project requirements here..."
                rows={5}
                className="bg-background"
                disabled={isLoading}
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting Ideas...
                </>
              ) : (
                'Get Project Ideas'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {recommendation && (
        <Card className="shadow-xl animate-in fade-in duration-500">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-accent">Our Suggestions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-primary-foreground">Recommended Projects:</h3>
              {recommendation.recommendedProjects.length > 0 ? (
                <ul className="list-disc list-inside space-y-1 pl-2">
                  {recommendation.recommendedProjects.map((project, index) => (
                    <li key={index} className="text-foreground">{project}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No specific past projects match perfectly, but here's our general advice.</p>
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-primary-foreground">Reasoning:</h3>
              <p className="text-foreground whitespace-pre-wrap">{recommendation.reasoning}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
