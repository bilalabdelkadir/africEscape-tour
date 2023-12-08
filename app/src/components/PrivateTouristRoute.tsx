import { Routes } from '@/constants/routes';
import { user } from '@/global-state/user.globalstate';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateTouristRoute = () => {
  const prevLocation = useLocation();
  if (!user.value) return <Navigate to={Routes.TOURIST_LOGIN} />;
  if (user.value.accountType !== 'TOURIST')
    return <Navigate to={`${prevLocation}`} />;

  return <Outlet />;
};

export default PrivateTouristRoute;
