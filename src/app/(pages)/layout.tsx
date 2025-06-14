export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container mx-auto px-4 py-8 flex-grow">
      {children}
    </main>
  );
}
