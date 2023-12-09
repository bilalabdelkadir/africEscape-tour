import Navbar from '@/components/Navbar';
import { isUserLoggedIn, user } from '@/global-state/user.globalstate';
import { fetchUserProfile } from '@/hooks/queryHooks';
import { useEffect } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
const Layout = () => {
  const { data } = fetchUserProfile();

  useEffect(() => {
    if (data) {
      user.value = data;
      isUserLoggedIn.value = true;
    }
  }, [data]);

  return (
    <>
      <Navbar />
      <ScrollRestoration />
      <main className="relative flex flex-col min-h-screen" id="main">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
