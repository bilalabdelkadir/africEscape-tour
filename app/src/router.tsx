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
import PrivateTouristRoute from './components/PrivateTouristRoute';
import PrivateAgencyRoute from './components/PrivateAgencyRoute';
import SignupAgency from './pages/Auth/signup-Agency/SignupAgency';
import PublicPages from './components/PublicPages';
import CreateTour from './pages/Profiles/agency/CreateTour';
import TourList from './pages/Profiles/agency/TourList';
import Employee from './pages/Profiles/agency/employee/Employee';
import SignupEmployee from './pages/Auth/signup-employee/Signup-Employee';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: Routes.DESTINATIONS, element: <Destinations /> },
      { path: Routes.DESTINATIONPAGE, element: <Destination /> },
      { path: Routes.CONTACT, element: <Contact /> },
      { path: Routes.BLOGS, element: <Blogs /> },
      {
        element: <PublicPages />,
        children: [
          { path: Routes.TOURIST_SIGN_UP, element: <SignupTourist /> },
          { path: Routes.AGENCY_SIGN_UP, element: <SignupAgency /> },
          { path: Routes.TOURIST_LOGIN, element: <LoginTourist /> },
          {
            path: Routes.SIGNUP_EMPLOYEE,
            element: <SignupEmployee />,
          },
        ],
      },
      {
        element: <PrivateAgencyRoute />,
        children: [
          {
            path: Routes.AGENCY_PROFILE,
            element: <AgencyProfile />,
            children: [
              {
                path: `create-tour`,
                element: <CreateTour />,
              },
              {
                path: `tour-list`,
                element: <TourList />,
              },
              {
                path: 'employee',
                element: <Employee />,
              },
              {
                path: `tour-list/:slug`,
                element: <Destination />,
              },
            ],
          },
        ],
      },
      {
        element: <PrivateTouristRoute />,
        children: [
          {
            path: Routes.TOURIST_PROFILE,
            element: <TouristProfile />,
          },
        ],
      },
    ],
  },
]);

export default router;
