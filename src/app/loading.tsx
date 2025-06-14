import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Skeleton */}
      <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Skeleton className="h-8 w-48" />
          <div className="hidden md:flex items-center space-x-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          <div className="md:hidden">
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </div>
      
      {/* Page Content Skeleton */}
      <div className="container mx-auto px-4 py-8 flex-grow space-y-8">
        <Skeleton className="h-12 w-1/2" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-3/4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="border-t bg-background">
        <div className="container mx-auto px-4 py-6 text-center">
          <Skeleton className="h-4 w-1/2 mx-auto mb-2" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
        </div>
      </div>
    </div>
  );
}
