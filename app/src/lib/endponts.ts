const BASE_URL = 'http://localhost:8000/v1';

export const endpoints = {
  signupTourist: `${BASE_URL}/auth/sign-up/tourist`,
  signupAgency: `${BASE_URL}/auth/sign-up/agency`,
  signupEmployee: `${BASE_URL}/auth/sign-up/employee`,
  loginTourist: `${BASE_URL}/auth/sign-in/tourist`,
  logout: `${BASE_URL}/auth/sign-out`,
  me: `${BASE_URL}/auth/tourist/me`,
  refreshToken: `${BASE_URL}/auth/refresh-token`,
  createTour: `${BASE_URL}/tours`,
  getTours: `${BASE_URL}/tours`,
  getTour: (id: string) => `${BASE_URL}/tours/${id}`,
  updateTour: (id: string) => `${BASE_URL}/tours/${id}`,
  deleteTour: (id: string) => `${BASE_URL}/tours/${id}`,
  checkInvitation: (token: string) =>
    `${BASE_URL}/employee-invitation/check-invitation/${token}`,
};
