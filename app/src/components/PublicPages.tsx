import { agency, user } from '@/global-state/user.globalstate';
import { AccountType } from '@/types';
import { Navigate, Outlet } from 'react-router-dom';
import { Routes } from '@/constants/routes';

const PublicPages = () => {
  if (user.value && user.value.accountType === AccountType.TOURIST)
    return <Navigate to={Routes.TOURIST_PROFILE} />;
  if (agency.value && agency.value.accountType === AccountType.AGENCY)
    return <Navigate to={Routes.AGENCY_PROFILE} />;

  return <Outlet />;
};

export default PublicPages;
