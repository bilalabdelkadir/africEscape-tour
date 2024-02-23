import { useFetchQuery } from '@/hooks/queryHooks';
import { endpoints } from '@/lib/endpoints';
import { Loader2Icon } from 'lucide-react';
import React from 'react';

const WishList = () => {
  const { getWishList } = endpoints;

  const { data, isLoading, isError, error } = useFetchQuery(
    getWishList,
    ['getWishList'],
    (error) => {
      console.log(error);
    }
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2Icon className="animate-spin text-3xl" />
      </div>
    );
  }
};

export default WishList;
