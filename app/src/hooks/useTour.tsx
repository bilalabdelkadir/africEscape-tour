import { endpoints } from '@/lib/endpoints';
import { useFetchQuery } from './queryHooks';

const useTour = ({ slug }: { slug: string }) => {
  return useFetchQuery(endpoints.getTourBySlug(slug), ['tour', slug]);
};

export default useTour;
