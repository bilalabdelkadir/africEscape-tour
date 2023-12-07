import React from 'react';
import { user } from '@/global-state/user.globalstate';
const TouristProfile = () => {
  return (
    <div>
      <h1>Profile</h1>
      <p>{user.value?.firstName}</p>
      <p>{user.value?.lastName}</p>
      <p>{user.value?.email}</p>
    </div>
  );
};

export default TouristProfile;
