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
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
      <h2 className="text-2xl font-headline font-semibold mb-4 text-destructive">Something went wrong!</h2>
      <p className="mb-2 text-muted-foreground">{error.message || "An unexpected error occurred."}</p>
      {error.digest && <p className="text-xs text-muted-foreground mb-6">Error Digest: {error.digest}</p>}
      <Button
        onClick={() => reset()}
        variant="destructive"
      >
        Try again
      </Button>
    </div>
  );
}
