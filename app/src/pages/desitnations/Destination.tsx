import { useFetchQuery } from '@/hooks/queryHooks';
import useTour from '@/hooks/useTour';
import { endpoints } from '@/lib/endpoints';
import { ITour } from '@/types';
import { Loader2Icon, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageGallary from '@/components/ImageGallary';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import {
  Share2,
  Heart,
  Flag,
  CalendarDays,
  Building2,
  Mail,
  Phone,
  Clock7,
  PersonStandingIcon,
  CheckCircle2,
  User2Icon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import moment from 'moment';
import { user } from '@/global-state/user.globalstate';

const Destination = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) return <div>404</div>;
  const { data: tour, isLoading } = useTour({ slug });
  const [heart, setHeart] = useState(false);
  const rate = 4.4;
  const reviews = 100;

  useEffect(() => {
    console.log('this is the data', tour);
  }, [tour]);

  if (isLoading || tour === null || tour === undefined)
    return (
      <div className="min-h-screen">
        <Loader2Icon className="animate-spin w-10 h-10 mx-auto" />
      </div>
    );

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Tour Details',
          text: 'Check out this amazing tour!',
          url: window.location.href,
        });
      } else {
        throw new Error('Web Share API not supported');
      }
    } catch (error) {
      toast.error('Unable to share. Please try again later.');
    }
  };

  const servicesMapper = {
    'Food And Drinks': tour?.foodAndDrinks,
    'Transportation By Air Conditioned': tour?.transportByAirConditioned,
    'Audio Guide': tour?.audioGuide,
    'Entrance Fees': tour?.entranceFees,
    Gratuities: tour?.gratuities,
    Lunch: tour?.lunch,
    'Special activities': tour?.specialActivities,
    'Professional guide': tour?.professionalGuide,
    'Private tour': tour?.privateTour,
    'Pick-up and drop off': tour?.pickUpAndDropOff,
  };

  return (
    <MaxWidthWrapper>
      {/* @ts-ignore */}
      <ImageGallary images={tour?.TourImages} />
      <MaxWidthWrapper className="max-w-4xl flex flex-col gap-3 mt-10">
        <div className="flex justify-between items-stretch mb-3">
          <h2 className="text-lg font-Jost capitalize font-bold underline">
            {tour?.title}
          </h2>
          <div className="flex items-center space-x-4">
            <Share2 className="w-4 h-4" onClick={handleShare} />
            {user?.value?.id && (
              <Heart
                className={cn(
                  'w-4 h-4 cursor-pointer',
                  heart ? 'fill-current text-red-500' : 'stroke-current'
                )}
                onClick={() => {
                  setHeart(!heart);
                  toast.success(`
                  ${!heart ? 'Added to wishlist' : 'Removed from wishlist'}
                  `);
                }}
              />
            )}
          </div>
        </div>
        <div className="flex justify-start  flex-col md:flex-row gap-3">
          <div className="flex justify-start text-sm items-center space-x-3">
            <Star
              className={cn(
                'w-4 h-4',
                rate > 1 ? 'fill-current text-yellow-500' : 'stroke-current'
              )}
            />
            <span className="capitalize font-semibold">{rate}</span>
            <span>({reviews} reviews)</span>
          </div>
          {/* divider */}
          <div className="w-px h-4 bg-gray-400 hidden md:block" />
          {/* divider */}
          {tour?.leadGuide && (
            <div className="flex justify-start text-sm items-center space-x-3">
              <Flag className="w-4 h-4" />
              <span>Tour Guide:</span>
              <span className="capitalize">
                {tour?.leadGuide?.firstName + ' ' + tour?.leadGuide?.lastName}
              </span>
            </div>
          )}
        </div>
        <div className="w-full h-0.5 rounded-md bg-gray-400" />
        <div className="flex gap-4 text-sm font-normal w-full flex-wrap mx-auto">
          <div className="flex flex-col justify-start min-w-[45%]">
            <div className="flex justify-start text-sm items-center space-x-3">
              <CalendarDays className="w-4 h-4 " />
              <span className="text-gray-600">Availability:</span>
            </div>
            <div className="flex justify-start text-sm items-center space-x-3">
              <span className="capitalize font-semibold">
                {moment(tour?.startDate).format('DD MMMM YYYY') +
                  ' - ' +
                  moment(tour?.endDate).format('DD MMMM YYYY')}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-start min-w-[45%]">
            <div className="flex justify-start text-sm items-center space-x-3">
              <Building2 className="w-4 h-4 " />
              <span className="text-gray-600">Agency:</span>
            </div>
            <div className="flex justify-start text-sm items-center space-x-3">
              <span className="capitalize font-semibold">
                {tour?.Agency?.agencyName}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-start min-w-[45%]">
            <div className="flex justify-start text-sm items-center space-x-3">
              <Mail className="w-4 h-4 " />
              <span className="text-gray-600">Email:</span>
            </div>
            <div className="flex justify-start text-sm items-center space-x-3">
              <span className="capitalize font-semibold">
                {tour?.Agency?.email}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-start min-w-[45%]">
            <div className="flex justify-start text-sm items-center space-x-3">
              <Phone className="w-4 h-4 " />
              <span className="text-gray-600">Phone:</span>
            </div>
            <div className="flex justify-start text-sm items-center space-x-3">
              <span className="capitalize font-semibold">
                {tour?.Agency?.phoneNumber}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-start min-w-[45%]">
            <div className="flex justify-start text-sm items-center space-x-3">
              <Clock7 className="w-4 h-4 " />
              <span className="text-gray-600">Duration:</span>
            </div>
            <div className="flex justify-start text-sm items-center space-x-3">
              <span className="capitalize font-semibold">
                {tour?.duration + ' days'}
              </span>
            </div>
          </div>
          {/* number of guides */}
          <div className="flex flex-col justify-start min-w-[45%]">
            <div className="flex justify-start text-sm items-center space-x-3">
              <PersonStandingIcon className="w-4 h-4 " />
              <span className="text-gray-600">Number of guides:</span>
            </div>
            <div className="flex justify-start text-sm items-center space-x-3 ">
              <span className="capitalize font-semibold">
                {tour?.guides ? tour?.guides.length : 0 + 1} <span>guides</span>
              </span>
            </div>
          </div>
        </div>
        <div className="w-full h-0.5 rounded-md bg-gray-400" />
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-Jost capitalize font-bold underline mb-2">
            Description
          </h2>
          <p className="text-sm font-normal leading-6">{tour?.content}</p>
        </div>
        <div className="w-full h-0.5 rounded-md bg-gray-400" />
        {/* guides and lead guide information */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-Jost capitalize font-bold underline mb-2">
            Guides
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            {
              // lead guide
              tour?.leadGuide && (
                <div
                  className="flex flex-col md:flex-row gap-4 items-center"
                  key={tour?.leadGuide.id}
                >
                  {tour?.leadGuide?.avatar ? (
                    <img
                      src={tour?.leadGuide?.avatar}
                      alt="guide"
                      className="w-20 h-20 rounded-full"
                    />
                  ) : (
                    <User2Icon className="w-20 h-20 rounded-full" />
                  )}

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <User2Icon className="w-4 h-4" />
                      <h3 className="text-sm font-normal leading-6">
                        {tour?.leadGuide.firstName +
                          ' ' +
                          tour?.leadGuide.lastName}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <h3 className="text-sm font-normal leading-6">
                        {tour?.leadGuide.phoneNumber}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <h3 className="text-sm font-normal leading-6">
                        {tour?.leadGuide.email}
                      </h3>
                    </div>
                    {/* role type */}
                    <div className="flex items-center gap-2">
                      <Flag className="w-4 h-4" />
                      <h3 className="text-sm font-normal leading-6">
                        {'Lead Guide'}
                      </h3>
                    </div>
                  </div>
                </div>
              )
            }
            {tour?.guides?.map((guide) => (
              <div
                key={guide.id}
                className="flex flex-col md:flex-row gap-4 items-center"
              >
                {guide?.avatar ? (
                  <img
                    src={guide?.avatar}
                    alt="guide"
                    className="w-20 h-20 rounded-full"
                  />
                ) : (
                  <User2Icon className="w-20 h-20 rounded-full" />
                )}

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <User2Icon className="w-4 h-4" />
                    <h3 className="text-sm font-normal leading-6">
                      {guide.firstName + ' ' + guide.lastName}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <h3 className="text-sm font-normal leading-6">
                      {guide.phoneNumber}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <h3 className="text-sm font-normal leading-6">
                      {guide.email}
                    </h3>
                  </div>
                  {/* role type */}
                  <div className="flex items-center gap-2">
                    <Flag className="w-4 h-4" />
                    <h3 className="text-sm font-normal leading-6">
                      {guide.role === 'DRIVER'
                        ? 'Driver'
                        : guide.role === 'GUIDE'
                        ? 'Guide'
                        : guide.role === 'INTERPRETER'
                        ? 'Interpreter'
                        : 'Lead Guide'}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-0.5 rounded-md bg-gray-400" />

        {/* services with bolean */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-Jost capitalize font-bold underline mb-2">
            Services
          </h2>
          <div
            className="
          grid grid-cols-2 gap-2
          "
          >
            {Object.entries(servicesMapper).map(
              ([serviceName, serviceAvailable]) => {
                return (
                  <div key={serviceName} className="flex items-center gap-2">
                    <CheckCircle2
                      className={cn(
                        'w-4 h-4',
                        serviceAvailable
                          ? ' text-green-500'
                          : 'stroke-current text-gray-500'
                      )}
                    />
                    <h3
                      className={cn(
                        'text-sm font-normal leading-6',
                        serviceAvailable ? 'text-gray-900' : 'text-gray-400'
                      )}
                    >
                      {serviceName}
                    </h3>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </MaxWidthWrapper>
  );
};

export default Destination;
