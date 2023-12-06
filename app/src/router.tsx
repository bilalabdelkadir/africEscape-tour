import { createBrowserRouter } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import Home from './pages/home/Home';
import SignupTourist from './pages/Auth/signup-tourist/SignupTourist';
import LoginTourist from './pages/Auth/login-tourist/LoginTourist';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/tourist/signup', element: <SignupTourist /> },
      { path: '/tourist/login', element: <LoginTourist /> },
    ],
  },
]);

export default router;
