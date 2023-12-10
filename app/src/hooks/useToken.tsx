import { useState } from 'react';

const useToken = () => {
  const [token, setToken] = useState<string | null>(null);

  const saveToken = (userToken: string) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  const getToken = () => {
    const userToken = localStorage.getItem('token');
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    getToken,
    token,
  };
};

export default useToken;
