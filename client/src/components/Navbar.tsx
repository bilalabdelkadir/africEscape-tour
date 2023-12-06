'use client';
import { useState } from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from './ui/button';
import { MenuIcon, X as CloseIcon } from 'lucide-react';

interface IMenuItem {
  name: string;
  href: string;
}

const menuItems: IMenuItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Destinations', href: '/destinations' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const [activeMenuItem, setActiveMenuItem] = useState<string>('Home');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleMenuItemClick = (name: string) => {
    setActiveMenuItem(name);
  };

  return (
    <nav className="bg-white  mx-2 rounded-b-3xl backdrop-blur-sm shadow-xl sticky z-50 top-0 inset-x-0 h-16 mb-2">
      <MaxWidthWrapper>
        <header className="border-b border-gray-200">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="md:text-2xl text-xl font-bold  
              bg-gradient-to-r from-gray-900 to-green-400 bg-clip-text text-transparent
              "
            >
              AfricEscape
            </Link>
           
        </header>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
