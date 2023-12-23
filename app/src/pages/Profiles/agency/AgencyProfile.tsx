import { NavLink, Outlet } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Routes } from '@/constants/routes';
import {
  Plus,
  List,
  MenuIcon,
  PanelRightOpen,
  BadgeDollarSign,
  UsersRound,
  BookText,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useMedia } from 'react-use';
import useTours from '@/hooks/useTours';
import useEmployee from '@/hooks/useEmployee';
import useTags from '@/hooks/useTags';

const sidebar = [
  {
    title: 'Dashboard',
    path: `${Routes.AGENCY_PROFILE}`,
    icon: <MenuIcon size={20} />,
  },
  {
    title: 'Create Tour',
    path: `${Routes.AGENCY_PROFILE}/create-tour`,
    icon: <Plus size={20} />,
  },
  {
    title: 'Tour List',
    path: `${Routes.AGENCY_PROFILE}/tour-list`,
    icon: <List size={20} />,
  },
  {
    title: 'Finance',
    path: `${Routes.AGENCY_PROFILE}/finance`,
    icon: <BadgeDollarSign size={20} />,
  },
  {
    title: 'Employee',
    path: `${Routes.AGENCY_PROFILE}/employee`,
    icon: <UsersRound size={20} />,
  },
  {
    title: 'Booking',
    path: `${Routes.AGENCY_PROFILE}/booking`,
    icon: <BookText size={20} />,
  },
];

const AgencyProfile = () => {
  const isMobile = useMedia('(max-width: 767px)');
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    console.log('the value:', showSidebar);
    setShowSidebar(!showSidebar);
  };

  useTours();
  useTags();
  useEmployee();

  return (
    <div className="flex">
      {isMobile ? (
        // Mobile: Use sheet
        <Sheet open={showSidebar} onOpenChange={toggleSidebar}>
          <SheetHeader>
            <SheetTrigger className="fixed bottom-4 right-4 rounded-full bg-green-600 font-Jost text-white shadow-2xl p-4">
              <PanelRightOpen size={24} className="cursor-pointer" />
            </SheetTrigger>
          </SheetHeader>
          <SheetContent side={'left'}>
            <ScrollArea className="h-full">
              {sidebar.map(({ title, path, icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-start w-full h-10 text-lg font-Jost px-4 rounded-md mb-2  hover:bg-green-700 hover:text-white',
                      isActive ? 'bg-green-600 text-white' : undefined
                    )
                  }
                  onClick={toggleSidebar}
                >
                  <div className="mr-4">{icon}</div>
                  <span>{title}</span>
                </NavLink>
              ))}
            </ScrollArea>
          </SheetContent>
        </Sheet>
      ) : (
        // Desktop: Use fixed sidebar
        <aside className="h-[90vh] md:w-56  shadow-xl bg-white fixed border rounded-e-2xl">
          <ScrollArea className="h-full mx-4 mt-4 ">
            {sidebar.map(({ title, path, icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center justify-start w-full h-10 text-sm font-medium text-gray-700 px-4 rounded-md mb-1  hover:bg-green-700 hover:text-white',
                    isActive ? 'bg-green-600 text-white' : undefined
                  )
                }
              >
                <div className="mr-4">{icon}</div>
                <span>{title}</span>
              </NavLink>
            ))}
          </ScrollArea>
        </aside>
      )}
      <main className={isMobile ? 'p-4 w-full' : 'ml-60 p-4 w-full'}>
        {/* Add padding to main content to prevent overlap with the fixed/sidebar */}
        <Outlet />
      </main>
    </div>
  );
};

export default AgencyProfile;
