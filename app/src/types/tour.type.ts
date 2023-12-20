import { IAgencyProfile, ITag } from '.';

export interface ITour {
  id: string;
  title: string;
  content: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  agencyId: string;
  slug: string;
  leadGuideId: string;
  startDate: Date;
  endDate: Date;
  duration: string;
  stateRegion?: string | null;
  country: string;
  audioGuide: boolean;
  foodAndDrinks: boolean;
  lunch: boolean;
  privateTour: boolean;
  specialActivities: boolean;
  entranceFees: boolean;
  gratuities: boolean;
  pickUpAndDropOff: boolean;
  professionalGuide: boolean;
  transportByAirConditioned: boolean;
  discount?: number | null;
  postStatus: 'DRAFT' | 'PUBLISHED' | 'PENDING' | 'REJECTED';
  status: 'UPCOMING' | 'CANCELLED' | 'FINISHED';
  TourImages: IImage[];
  Agency: IAgencyProfile;
  Tags: ITag[];
  guides?: IAgencyProfile[] | null;
  leadGuide: IAgencyProfile;
  tourists: [];
}

interface IImage {
  id: string;
  url: string;
  alt: string;
  createdAt: Date;
  updatedAt: Date;
  tourId: string;
}
