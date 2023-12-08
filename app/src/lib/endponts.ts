const BASE_URL = 'http://localhost:8000/v1';

export const endpoints = {
  signupTourist: `${BASE_URL}/auth/sign-up/tourist`,
  loginTourist: `${BASE_URL}/auth/sign-in/tourist`,
  logout: `${BASE_URL}/auth/sign-out`,
  me: `${BASE_URL}/auth/tourist/me`,
  refreshToken: `${BASE_URL}/auth/refresh-token`,
};
