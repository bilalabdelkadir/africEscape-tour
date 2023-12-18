import { endpoints } from '@/lib/endponts';
import { ILoginResponse } from '@/types/tourist.type';
import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';
import { useQuery, useMutation } from 'react-query';

export const useFetchQuery = <ITYPE,>(
  url: string,
  queryKey: string[],
  onError?: (error: any) => void,
  onSuccess?: (data: any) => void,
  queryParams?: Record<string, any>
) => {
  const token = localStorage.getItem('token');

  const queryFn = async () => {
    return await axios
      .get(url, {
        params: queryParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data as ITYPE);
  };

  return useQuery<ITYPE, AxiosError>({ queryKey, queryFn, onError, onSuccess });
};

export const fetchUserProfile = () => {
  const { me } = endpoints;
  const token = localStorage.getItem('token');

  const queryFn = async () => {
    if (token) {
      try {
        const response = await axios.get(me, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data as ILoginResponse;
      } catch (error) {
        throw new Error('Error fetching user profile');
      }
    }

    return null;
  };

  return useQuery({
    queryFn,
    enabled: !!token,
    retry: false,
  });
};

export const useLazyFetchQuery = <ITYPE,>(
  url: string,
  queryKey: string[],
  queryParams?: Record<string, unknown>
) => {
  const queryFn = async () => {
    return await axios
      .get(url, {
        params: queryParams,
      })
      .then((res) => res.data as ITYPE);
  };
  return useQuery(queryKey, {
    queryFn,
    enabled: false,
  });
};

export const useMutate = (
  url: string,
  method: Method = 'post',
  onError?: (error: any) => void,
  onSuccess?: (data: any) => void
) => {
  const token = localStorage.getItem('token');

  const mutationFn = async (data?: any) => {
    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      timeout: 15000,
    };

    return await axios(config).then((res) => res.data);
  };

  return useMutation({ mutationFn, onSuccess, onError });
};

export const useMutateFormData = (
  url: string,
  method: Method = 'post',
  onError?: (error: any) => void,
  onSuccess?: (data: any) => void
) => {
  const token = localStorage.getItem('token');

  // upload formData to server
  const mutationFn = async (data?: any) => {
    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      timeout: 50000,
    };

    return await axios(config).then((res) => res.data);
  };

  return useMutation({ mutationFn, onSuccess, onError });
};
