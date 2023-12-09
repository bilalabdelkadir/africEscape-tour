import { user } from '@/global-state/user.globalstate';
const TouristProfile = () => {
  return (
    <div>
      <h1>Profile</h1>
      <p>{user.value?.Tourist.firstName}</p>
      <p>{user.value?.Tourist.lastName}</p>
      <p>{user.value?.Tourist.email}</p>
    </div>
  );
};

export default TouristProfile;
