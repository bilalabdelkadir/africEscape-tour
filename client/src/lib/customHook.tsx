import { useMutation } from '@tanstack/react-query';
import axios, { AxiosRequestConfig, Method } from 'axios';

export const useMutate = (
  url: string,
  method: Method = 'post',
  onError?: (error: any) => void,
  onSuccess?: (data: any) => void
) => {
  const mutationFn = async (data?: any) => {
    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000,
    };
    return await axios(config).then((res) => res.data);
  };

  return useMutation({ mutationFn, onSuccess, onError });
};
