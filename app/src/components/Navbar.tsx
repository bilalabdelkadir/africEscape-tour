import { useState } from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Routes } from '@/constants/routes';
import ProfileNav from './ProfileNav';

export interface IMenuItem {
  name: string;
  href: string;
}

const menuItems: IMenuItem[] = [
  { name: 'Home', href: Routes.HOME },
  { name: 'Destinations', href: Routes.DESTINATIONS },
  { name: 'Blogs', href: Routes.BLOGS },
  { name: 'Contact', href: Routes.CONTACT },
];

const Navbar = () => {
  const [activeMenuItem, setActiveMenuItem] = useState<string>('Home');

  const handleMenuItemClick = (name: string) => {
    setActiveMenuItem(name);
  };

  return (
    <nav className="bg-white  mx-2 rounded-b-3xl backdrop-blur-sm shadow-xl sticky z-50 top-0 inset-x-0 h-16 mb-2">
      <MaxWidthWrapper>
        <header className="border-b border-gray-200">
          <div className="flex items-center justify-between h-16">
            <NavLink
              to={Routes.HOME}
              className="md:text-2xl text-xl font-bold  font-Jost
              bg-gradient-to-r from-gray-900 to-green-400 bg-clip-text text-transparent
              "
            >
              AfricEscape
            </NavLink>
            <div className="md:flex items-center hidden">
              {menuItems.map((item) => (
                <NavLink
                  to={item.href}
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
                </NavLink>
              ))}
            </div>
            <ProfileNav />
          </div>
        </header>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
