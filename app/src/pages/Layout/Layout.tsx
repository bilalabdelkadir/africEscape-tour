import Navbar from '@/components/Navbar';
import { Outlet } from 'react-router-dom';
const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="relative flex flex-col min-h-screen" id="main">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
