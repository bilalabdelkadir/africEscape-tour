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
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Loader2Icon, RewindIcon } from 'lucide-react';
import { endpoints } from '@/lib/endponts';
import { useMutate } from '@/hooks/queryHooks';
import { ITouristResponse } from '@/types/tourist.type';
import { isUserLoggedIn, user } from '@/global-state/user.globalstate';

const SingupSchema = z
  .object({
    firstName: z.string().min(1, { message: 'Firstname is required' }),
    lastName: z.string().min(1, { message: 'Lastname is required' }),
    email: z.string().min(1, { message: 'Email is required' }).email({
      message: 'Must be a valid email',
    }),
    password: z
      .string()
      .min(7, { message: 'Password must be atleast 6 characters' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Password must be atleast 6 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password don't match",
  });

type ISignupSchema = z.infer<typeof SingupSchema>;

const SignupTourist = () => {
  const { signupTourist } = endpoints;
  const navigate = useNavigate();

  const form = useForm<ISignupSchema>({
    resolver: zodResolver(SingupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate, isLoading } = useMutate(
    signupTourist,
    'POST',
    (error) => {
      console.log(error);
    },
    (data: ITouristResponse) => {
      user.value = data.user;
      isUserLoggedIn.value = data.accessToken ? true : false;
      localStorage.setItem('token', data.accessToken!);
      navigate(Routes.TOURIST_PROFILE);
      console.log(data.message);
      console.log(data);
    }
  );

  function onSubmit(values: ISignupSchema) {
    console.log(values);
    mutate(values);
  }

  const [step, setStep] = useState<number>(1);

  return (
    <div className="flex justify-center items-center font-jost h-[80vh]">
      <Card className="w-[350px] md:w-[450px] shadow-lg mx-2 ">
        <CardHeader>
          <CardTitle>Create An Account</CardTitle>
          <CardDescription>
            Already have an account?{' '}
            <NavLink to={Routes.TOURIST_LOGIN} className="text-blue-500">
              Login here
            </NavLink>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              {step === 1 && (
                <>
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Joe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                </>
              )}

              {step === 2 && (
                <>
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
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage>
                          {form.formState.errors.confirmPassword &&
                            form.formState.errors.confirmPassword.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                </>
              )}

              {step === 1 && (
                <div className="flex  justify-between">
                  <Button
                    type="submit"
                    className="rounded-3xl w-full mx-auto"
                    size={'lg'}
                    onClick={() => setStep(2)}
                    disabled={isLoading}
                  >
                    Next
                  </Button>
                </div>
              )}
              {step === 2 && (
                <div className="flex  justify-between">
                  <Button
                    size={'icon'}
                    onClick={() => setStep(1)}
                    variant={'ghost'}
                    className=" w-10 h-10"
                    disabled={isLoading}
                  >
                    <RewindIcon className="w-6 h-6 text-primary " />
                  </Button>
                  <Button
                    type="submit"
                    className="rounded-3xl w-[75%] mx-auto"
                    size={'lg'}
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Sign up
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupTourist;
