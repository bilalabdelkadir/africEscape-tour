import { createBrowserRouter } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import Home from './pages/home/Home';
import SignupTourist from './pages/Auth/signup-tourist/SignupTourist';
import LoginTourist from './pages/Auth/login-tourist/LoginTourist';
import Destinations from './pages/desitnations/Destinations';
import Destination from './pages/desitnations/Destination';
import AgencyProfile from './pages/Profiles/agency/AgencyProfile';
import TouristProfile from './pages/Profiles/tourist/TouristProfile';
import Blogs from './pages/blogs/Blogs';
import Contact from './pages/contact/Contact';
import { Routes } from './constants/routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: Routes.TOURIST_SIGN_UP, element: <SignupTourist /> },
      { path: Routes.TOURIST_LOGIN, element: <LoginTourist /> },
      { path: Routes.DESTINATIONS, element: <Destinations /> },
      { path: Routes.DESTINATIONPAGE, element: <Destination /> },
      { path: Routes.AGENCY_PROFILE, element: <AgencyProfile /> },
      { path: Routes.TOURIST_PROFILE, element: <TouristProfile /> },
      { path: Routes.CONTACT, element: <Contact /> },
      { path: Routes.BLOGS, element: <Blogs /> },
    ],
  },
]);

export default router;
