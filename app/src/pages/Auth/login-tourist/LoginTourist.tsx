import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Routes } from '@/constants/routes';
import { useMutate } from '@/hooks/queryHooks';
import { endpoints } from '@/lib/endponts';
import { AccountType, ILoginResponse } from '@/types/tourist.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { user, isUserLoggedIn, agency } from '@/global-state/user.globalstate';
import { Loader2Icon } from 'lucide-react';

const LoginSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({
    message: 'Must be a valid email',
  }),
  password: z
    .string()
    .min(7, { message: 'Password must be atleast 6 characters' }),
});

type ILoginSchema = z.infer<typeof LoginSchema>;

const LoginTourist = () => {
  const { loginTourist } = endpoints;
  const navigate = useNavigate();
  const form = useForm<ILoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate, isLoading } = useMutate(
    loginTourist,
    'POST',
    (error) => {
      console.log(error);
    },
    (data: ILoginResponse) => {
      console.log('test', data);
      data.accountType === AccountType.TOURIST
        ? (user.value = data)
        : (agency.value = data);
      isUserLoggedIn.value = data.accessToken ? true : false;
      localStorage.setItem('token', data.accessToken!);
      navigate(
        data.accountType === AccountType.TOURIST
          ? Routes.TOURIST_PROFILE
          : Routes.AGENCY_PROFILE
      );
    }
  );

  const onSubmit = (values: ILoginSchema) => {
    console.log(values);
    mutate(values);
  };

  return (
    <div className="flex justify-center h-[80vh] items-center font-jost">
      <Card className="w-[350px] md:w-[450px] shadow-lg mx-2 ">
        <CardHeader>
          <CardTitle>Start Booking By Login in</CardTitle>
          <CardDescription>
            Don`&apos;`t have an account?{' '}
            <NavLink to={Routes.TOURIST_SIGN_UP} className="text-blue-500">
              Sign up here
            </NavLink>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="emaple@mail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="rounded-3xl w-full mx-auto"
                size={'lg'}
                disabled={isLoading}
              >
                {isLoading && (
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Log In
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginTourist;
