'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-body antialiased flex flex-col min-h-screen items-center justify-center bg-background text-foreground p-4">
        <div className="text-center">
          <h1 className="text-4xl font-headline font-bold text-destructive mb-4">Oops!</h1>
          <h2 className="text-2xl font-semibold mb-4">Something went wrong on our end.</h2>
          <p className="mb-2 text-muted-foreground">{error.message || "An unexpected error occurred."}</p>
          {error.digest && <p className="text-xs text-muted-foreground mb-6">Error Digest: {error.digest}</p>}
          <Button
            onClick={() => reset()}
            variant="destructive"
            size="lg"
          >
            Try again
          </Button>
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            size="lg"
            className="ml-4"
          >
            Go to Homepage
          </Button>
        </div>
      </body>
    </html>
  );
}
