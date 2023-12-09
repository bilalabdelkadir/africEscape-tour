import { AccountType } from '.';

export enum StatusType {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface IAgencyAccount {
  id: string;
  email: string;
  accountType: AccountType;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  accessToken: string;
  Agency: IAgencyProfile;
}

export interface IAgencyProfile {
  id: string;
  agencyName: string;
  email: string;
  phoneNumber: string;
  agencyAvatar: string | null;
  country: string;
  city: string;
  address: string | null;
  status: StatusType;
  createdAt: Date;
  updatedAt: Date;
  accountId: string;
}
