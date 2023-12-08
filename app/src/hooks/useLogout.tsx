import { endpoints } from '@/lib/endponts';
import { isUserLoggedIn, user } from '@/global-state/user.globalstate';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from '@/constants/routes';
import { useMutate } from './queryHooks';

const useLogout = () => {
  const { logout } = endpoints;
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutate(
    logout,
    'POST',
    (error) => {
      console.log(error);
    },
    () => {
      user.value = null;
      isUserLoggedIn.value = false;
      localStorage.removeItem('token');
      navigate(Routes.HOME);
    }
  );

  const onLogout = () => {
    mutate({});
  };

  return { onLogout, isLoading };
};

export default useLogout;
