import { IAgencyProfile } from '.';
import { IWishlist } from './wishlist.type';
export interface ITouristProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  avatar: string | null;
  accountType: 'TOURIST' | 'AGENCY' | 'AGENCY_EMPLOYEE';
  isEmailVerified: boolean;
  Wishlist: IWishlist[];
}

export interface ITouristAccount {
  accessToken: string;
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  accountType: AccountType;
  isEmailVerified: boolean;
  Tourist: ITouristProfile;
}
export enum AccountType {
  TOURIST = 'TOURIST',
  AGENCY = 'AGENCY',
  AGENCY_EMPLOYEE = 'AGENCY_EMPLOYEE',
}

export interface ILoginResponse {
  accessToken: string;
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  accountType: AccountType;
  isEmailVerified: boolean;
  Tourist: ITouristProfile;
  Agency: IAgencyProfile;
}
