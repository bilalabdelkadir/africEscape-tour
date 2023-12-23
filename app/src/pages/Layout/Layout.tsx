import Navbar from '@/components/Navbar';
import { isUserLoggedIn, user, agency } from '@/global-state/user.globalstate';
import { fetchUserProfile } from '@/hooks/queryHooks';
import { useEffect } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Toaster } from 'sonner';
import { LoaderIcon } from 'lucide-react';
import { AccountType } from '@/types';
const Layout = () => {
  const { data, isLoading } = fetchUserProfile();

  useEffect(() => {
    if (data) {
      data.accountType === AccountType.TOURIST
        ? (user.value = data)
        : (agency.value = data);
      isUserLoggedIn.value = true;
    }
  }, [data]);

  return (
    <>
      <Navbar />
      <ScrollRestoration />
      <Toaster className="font-Jost text-lg" richColors duration={3000} />
      <main className="relative flex flex-col min-h-screen" id="main">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <LoaderIcon className="animate-spin text-5xl" />
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </>
  );
};

export default Layout;
