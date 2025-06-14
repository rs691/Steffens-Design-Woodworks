import { SITE_NAME } from '@/lib/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        <p>
          &copy; {currentYear} {SITE_NAME}. All rights reserved.
        </p>
        <p className="mt-1">
          Designed with craftsmanship by Steffen's Sign and Design.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
