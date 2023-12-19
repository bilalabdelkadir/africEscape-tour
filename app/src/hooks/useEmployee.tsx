import { useFetchQuery } from './queryHooks';
import { endpoints } from '@/lib/endpoints';
import { agency } from '@/global-state/user.globalstate';
import { IEmployeeData } from '@/types';

const useEmployee = () => {
  const { getAllEmployees } = endpoints;
  return useFetchQuery<IEmployeeData[]>(
    getAllEmployees(agency.value?.Agency.id as string),
    ['employees'],
    (error) => {
      console.log(error);
    },
    (data) => {
      console.log(data);
    }
  );
};

export default useEmployee;
