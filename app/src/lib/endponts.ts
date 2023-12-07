const BASE_URL = 'http://localhost:8000/v1';

export const endpoints = {
  signupTourist: `${BASE_URL}/auth/sign-up/tourist`,
  me: `${BASE_URL}/auth/tourist/me`,
};
