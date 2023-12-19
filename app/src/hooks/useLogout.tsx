import { endpoints } from '@/lib/endpoints';
import { isUserLoggedIn, user, agency } from '@/global-state/user.globalstate';
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
      agency.value = null;
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
