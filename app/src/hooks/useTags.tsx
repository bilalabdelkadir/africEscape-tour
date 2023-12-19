import { useFetchQuery } from './queryHooks';
import { endpoints } from '@/lib/endpoints';
import { ITag } from '@/types';

const useTags = () => {
  const { getTags } = endpoints;
  return useFetchQuery<ITag[]>(
    getTags,
    ['tags'],
    (error) => {
      console.log(error);
    },
    (data) => {
      console.log(data);
    }
  );
};

export default useTags;
