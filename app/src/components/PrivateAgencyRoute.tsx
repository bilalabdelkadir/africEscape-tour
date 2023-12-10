import { agency, user } from '@/global-state/user.globalstate';
import { Routes } from '@/constants/routes';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AccountType } from '@/types';
import { effect } from '@preact/signals-react';

const PrivateAgencyRoute = () => {
  const prevLocation = useLocation();

  effect(() => {
    console.log('agency main', agency.value);
  });

  effect(() => {
    if (!agency.value) return <Navigate to={Routes.TOURIST_LOGIN} />;
    if (agency.value?.accountType !== AccountType.AGENCY) {
      return (
        <Navigate
          to={
            prevLocation.pathname
              ? prevLocation.pathname
              : Routes.TOURIST_PROFILE
          }
        />
      );
    }
  });

  if (!agency.value) return <Navigate to={Routes.TOURIST_LOGIN} />;
  if (agency.value?.accountType !== AccountType.AGENCY) {
    return (
      <Navigate
        to={
          prevLocation.pathname ? prevLocation.pathname : Routes.AGENCY_PROFILE
        }
      />
    );
  }

  return <Outlet />;
};

export default PrivateAgencyRoute;
