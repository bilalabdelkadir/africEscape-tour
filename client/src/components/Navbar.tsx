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
    <nav className="bg-white bg-opacity-20 mx-2 rounded-b-3xl backdrop-blur-sm shadow-xl sticky z-50 top-0 inset-x-0 h-16 mb-4">
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
            <div className="md:flex items-center hidden">
              {menuItems.map((item) => (
                <Link
                  href={item.href}
                  key={item.name}
                  onClick={() => handleMenuItemClick(item.name)}
                >
                  <p
                    className={cn(
                      'text-[1rem] font-semibold hover:text-green-600 cursor-pointer mx-4',
                      activeMenuItem === item.name &&
                        'font-semibold border-b-2 border-green-600'
                    )}
                  >
                    {item.name}
                  </p>
                </Link>
              ))}
            </div>
            <div className="md:flex hidden items-center space-x-2 ">
              <Link
                href="/auth/login"
                className={buttonVariants({
                  variant: 'outline',
                  className: 'rounded-full py-1 px-5 font-semibold',
                })}
                onClick={() => handleMenuItemClick('login')}
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className={buttonVariants({
                  variant: 'default',
                  className:
                    'rounded-full py-0 px-5 text-gray-200 font-semibold  bg-gradient-to-r from-teal-800 to-green-600 hover:bg-gradient-to-r hover:from-teal-500 hover:to-green-800',
                })}
                onClick={() => handleMenuItemClick('signup')}
              >
                Register
              </Link>
            </div>
            <div className="md:hidden flex items-center space-x-2">
              <Link
                href="/auth/login"
                className={buttonVariants({
                  variant: 'outline',
                  className: 'rounded-full py-1 px-5 font-semibold',
                })}
              >
                Login
              </Link>
              <Button
                onClick={handleMenuToggle}
                variant={'ghost'}
                className="md:hidden"
              >
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </Button>
            </div>
          </div>
          {isMenuOpen && (
            <>
              <div className="bg-white h-[90vh] w-[50vh] rounded-md absolute top-16 right-0 md:hidden">
                <div className="flex flex-col items-center justify-start mt-1 pt-6 space-y-2">
                  {menuItems.map((item) => (
                    <Link
                      href={item.href}
                      key={item.name}
                      onClick={() => {
                        handleMenuItemClick(item.name);
                        handleMenuClose();
                      }}
                    >
                      <p
                        className={cn(
                          'text-[1rem] font-semibold hover:text-green-600 cursor-pointer mx-4',
                          activeMenuItem === item.name &&
                            ' font-semibold border-b-2 border-green-600'
                        )}
                      >
                        {item.name}
                      </p>
                    </Link>
                  ))}
                  <Link
                    href="/auth/signup"
                    className={buttonVariants({
                      variant: 'default',
                      className:
                        'rounded-full w-[80%] py-0 px-5 text-gray-200 font-semibold bg-gradient-to-r from-teal-800 to-green-600 hover:bg-gradient-to-r hover:from-teal-500 hover:to-green-800',
                    })}
                    onClick={handleMenuClose}
                  >
                    Register
                  </Link>
                </div>
              </div>
            </>
          )}
        </header>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
