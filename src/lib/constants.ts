export type NavLink = {
  href: string;
  label: string;
  icon?: React.ElementType;
};

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/shop', label: 'Shop' },
  { href: '/calendar', label: 'Calendar' },
  { href: '/recommendations', label: 'Get Ideas' },
  { href: '/contact', label: 'Contact' },
];

export const AUTH_LINKS: NavLink[] = [
  { href: '/login', label: 'Login' },
  { href: '/register', label: 'Register' },
];

export const ADMIN_LINK: NavLink = { href: '/admin', label: 'Admin' };

export const SITE_NAME = "Steffen's Showcase";
