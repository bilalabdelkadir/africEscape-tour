import { user } from '@/global-state/user.globalstate';
import { redirect } from 'react-router-dom';

const demouser = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'dsifn@m',
  company: {
    id: 1,
    name: 'Company1',
    address: 'address1',
    phone: '123456789',
  },
};

const TouristProfile = () => {
  return (
    <div>
      {demouser.company ? (
        <button onClick={() => redirect('/company')}>Company</button>
      ) : null}
    </div>
  );
};

export default TouristProfile;
