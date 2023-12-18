export interface IEmployeeData {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  phoneNumber: string;
  avatar?: string;
  role: 'GUIDE' | 'LEAD_GUIDE' | 'DRIVER' | 'INTERPRETER';
  stateRegion?: string;
  country?: string;
  city?: string;
  address: null;
  createdAt: Date;
  updatedAt: Date;
  agencyId: string;
  accountId: string;
  Agency: {
    id: string;
    agencyName: string;
    agencyAvatar?: string;
    country: string;
    city: string;
  };
  Account: {
    id: string;
    accountType: 'AGENCY_EMPLOYEE' | 'TOURIST' | 'AGENCY';
    isEmailVerified: boolean;
  };
}

// enum EmployeeRole {
//     GUIDE = 'GUIDE',
//     LEAD_GUIDE = 'LEAD_GUIDE',
//     DRIVER = 'DRIVER',
//     INTERPRETER = 'INTERPRETER',
//   }

//   const roles = [
//     {
//       value: 'GUIDE',
//       label: 'Guide',
//     },
//     {
//       value: 'LEAD_GUIDE',
//       label: 'Lead Guide',
//     },
//     {
//       value: 'DRIVER',
//       label: 'Driver',
//     },
//     {
//       value: 'INTERPRETER',
//       label: 'Interpreter',
//     },
//   ];
