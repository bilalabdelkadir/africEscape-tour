export interface ITourist {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  accountType: 'TOURIST' | 'AGENCY' | 'AGENCY_EMPLOYEE';
  isEmailVerified: boolean;
  accessToken: string;
}

export interface ITouristResponse {
  accessToken: string;
  user: ITourist;
  message: string;
}
