import { endpoints } from '@/lib/endpoints';
import { useFetchQuery } from './queryHooks';
import { ITour } from '@/types';

const useTour = ({ slug }: { slug: string }) => {
  return useFetchQuery<ITour>(endpoints.getTourBySlug(slug), ['tour', slug]);
};

export default useTour;
