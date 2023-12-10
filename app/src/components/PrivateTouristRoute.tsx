import { Routes } from '@/constants/routes';
import { user } from '@/global-state/user.globalstate';
import { AccountType } from '@/types';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { effect } from '@preact/signals-react';
const PrivateTouristRoute = () => {
  const prevLocation = useLocation();

  effect(() => {
    if (!user.value) return <Navigate to={Routes.TOURIST_LOGIN} />;
    if (user.value?.accountType !== AccountType.TOURIST) {
      return (
        <Navigate
          to={
            prevLocation.pathname
              ? prevLocation.pathname
              : Routes.AGENCY_PROFILE
          }
        />
      );
    }
  });

  if (!user.value) return <Navigate to={Routes.TOURIST_LOGIN} />;
  if (user.value?.accountType !== AccountType.TOURIST) {
    return (
      <Navigate
        to={
          prevLocation.pathname ? prevLocation.pathname : Routes.TOURIST_PROFILE
        }
      />
    );
  }

  return <Outlet />;
};

export default PrivateTouristRoute;
