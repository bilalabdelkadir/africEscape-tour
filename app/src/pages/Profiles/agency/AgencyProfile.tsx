import { NavLink, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Routes } from '@/constants/routes';

const AgencyProfile = () => {
  return (
    <div className="flex">
      <aside className="h-[90vh] w-60 shadow-xl bg-white rounded-md fixed border">
        <ScrollArea className="h-full">
          <Button className="w-full">
            <NavLink
              to={`${Routes.AGENCY_PROFILE}/create-tour`}
              className="block p-2 text-center "
            >
              go to nav link
            </NavLink>
          </Button>
          <Button className="w-full">
            <NavLink
              to={`${Routes.AGENCY_PROFILE}/tour-list`}
              className="block p-2 text-center "
            >
              go to nav link
            </NavLink>
          </Button>
        </ScrollArea>
      </aside>
      <main className="ml-60 p-4 w-full ">
        {/* Add padding to main content to prevent overlap with the fixed sidebar */}
        <Outlet />
      </main>
    </div>
  );
};

export default AgencyProfile;
