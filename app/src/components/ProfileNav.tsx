import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  CircleUserRound,
  Menu,
  LogOut,
  Loader2Icon,
  LogIn,
  UserRoundPlus,
} from 'lucide-react';
import { agency, user } from '@/global-state/user.globalstate';
import { useNavigate } from 'react-router-dom';
import { Routes } from '@/constants/routes';
import useLogout from '@/hooks/useLogout';
import { IMenuItem } from './Navbar';
import { AccountType } from '@/types';
import { useEffect } from 'react';

const menuItems: IMenuItem[] = [
  { name: 'Home', href: Routes.HOME },
  { name: 'Destinations', href: Routes.DESTINATIONS },
  { name: 'Blogs', href: Routes.BLOGS },
  { name: 'Contact', href: Routes.CONTACT },
];

const ProfileNav = () => {
  const { isLoading, onLogout } = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('profile nav', agency.value);
  }, [agency.value]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div
          className="flex justify-center items-center cursor-pointer
        rounded-full border border-primary shadow-xl px-3 py-2 gap-2"
        >
          <Menu size={24} />
          <CircleUserRound size={24} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-48
        bg-opacity-10  backdrop-filter backdrop-blur-sm 
      "
        align="end"
        forceMount
      >
        {user.value && user.value.accountType === 'TOURIST' && (
          <>
            <DropdownMenuLabel className="font-Jost">
              <p className="text-sm font-bold leading-none capitalize">
                {user.value.Tourist.firstName +
                  ' - ' +
                  user.value.Tourist.lastName}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.value.email}
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        {agency.value && agency.value.accountType === AccountType.AGENCY && (
          <>
            <DropdownMenuLabel className="font-Jost">
              <p className="text-sm font-bold leading-none capitalize">
                {agency.value.Agency.agencyName}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {agency.value.Agency.email}
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuGroup className="md:hidden font-Jost font-semibold">
          {menuItems.map((item, index) => (
            <DropdownMenuItem
              key={index}
              className="cursor-pointer"
              onClick={() => navigate(item.href)}
            >
              {item.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        {(user.value || agency.value) && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() =>
                  navigate(
                    user.value ? Routes.TOURIST_PROFILE : Routes.AGENCY_PROFILE
                  )
                }
              >
                {user.value ? 'Profile' : 'Dashboard'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate(Routes.TOURIST_PROFILE)}
              >
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => onLogout()}
              >
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <Loader2Icon size={16} />
                  </div>
                ) : (
                  <div className="flex justify-center items-center bg-red-500 rounded-md w-full  py-2 text-white ">
                    <LogOut size={16} />
                    <p className="ml-2">Logout</p>
                  </div>
                )}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}

        {!user.value && !agency.value && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate(Routes.TOURIST_LOGIN)}
              >
                <div className="flex justify-center items-center">
                  <LogIn size={16} />
                  <p className="ml-2">Login</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate(Routes.TOURIST_SIGN_UP)}
              >
                <div className="flex justify-center items-center">
                  <UserRoundPlus size={16} />
                  <p className="ml-2">Register</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuGroup>

            <DropdownMenuItem
              className="cursor-pointer "
              onClick={() => navigate(Routes.AGENCY_SIGN_UP)}
            >
              <div className="text-center font-semibold w-full bg-primary text-white py-2 rounded-md">
                Register as agency
              </div>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileNav;
