import { endpoints } from '@/lib/endpoints';
import { useFetchQuery } from './queryHooks';
import { ITour } from '@/types';

const useTours = () => {
  const { getTours } = endpoints;
  return useFetchQuery<ITour[]>(getTours, ['tours']);
};

export default useTours;
