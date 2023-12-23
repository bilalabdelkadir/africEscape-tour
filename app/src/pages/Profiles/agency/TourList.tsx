import ImageSlider from '@/components/ImageSlider';
import useTours from '@/hooks/useTours';
import { cn } from '@/lib/utils';
import { ITour } from '@/types';
import {
  Loader2Icon,
  MapPin,
  Calendar,
  UsersRound,
  CircleDollarSign,
} from 'lucide-react';
import moment from 'moment';
import { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { NavLink } from 'react-router-dom';
import { Routes } from '@/constants/routes';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ETB',
  }).format(price);
};

const TourList = () => {
  const { data: tours, isLoading } = useTours();

  useEffect(() => {
    console.log('tours', tours);
  }, [tours]);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2Icon className="animate-spin h-8 w-8 mx-auto" />
      </div>
    );

  return (
    <div className="flex justify-start items-stretch gap-3 flex-wrap">
      {tours?.map((tour) => {
        return (
          <div
            className="w-full
          
          md:w-72
          rounded-xl bg-white p-4 flex-shrink-0 shadow-md"
          >
            <ImageSlider urls={tour.TourImages.map((image) => image.url)} />
            <div className="w-full mx-auto my-3 h-24">
              <p className="text-xs text-gray-500 ">
                Posted At: {moment(tour.createdAt).format('MMMM Do YYYY')}
              </p>
              <NavLink
                to={`${Routes.AGENCY_PROFILE}/tour-list/${tour.slug}`}
                className="uppercase font-semibold font-Jost mt-2 mb-3 text-primary underline "
              >
                {tour.title}
              </NavLink>
              <p
                className={cn('text-xs font-semibold text-gray-600', {
                  'line-through': tour.discount,
                })}
              >
                <CircleDollarSign className="inline-block h-4 w-4 mr-1 items-start" />
                Price: {formatPrice(tour.price)}
              </p>
              {/* tour country or location */}
              <p className="text-xs font-semibold text-gray-600 mr-2">
                <MapPin className="inline-block h-4 w-4 mr-1 items-start" />
                {tour.country + ', ' + tour.stateRegion}
              </p>
              <p className="text-xs font-semibold text-gray-600 mr-2">
                <Calendar className="inline-block h-4 w-4 mr-1 items-start" />
                {moment(tour.startDate).format('MMMM Do YYYY')} -{' '}
                {moment(tour.endDate).format('MMMM Do YYYY')}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TourList;
