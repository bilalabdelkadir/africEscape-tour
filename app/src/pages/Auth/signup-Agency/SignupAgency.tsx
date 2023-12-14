import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Routes } from '@/constants/routes';
import { NavLink, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { countries } from '@/constants/countries';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Loader2Icon, RewindIcon } from 'lucide-react';
import { endpoints } from '@/lib/endponts';
import { useMutate } from '@/hooks/queryHooks';
import { isUserLoggedIn, agency } from '@/global-state/user.globalstate';
import { IAgencyAccount } from '@/types';

export const phoneRegExp = /^0[79]0?[1-9]\d{7}$/;

const SingupSchema = z
  .object({
    agencyName: z.string().min(1, { message: 'Agency Name is required' }),
    email: z.string().min(1, { message: 'Email is required' }).email({
      message: 'Must be a valid email',
    }),
    phoneNumber: z.string().refine((value) => phoneRegExp.test(value), {
      message: 'Invalid phone number format',
    }),
    country: z.string().min(1, { message: 'Country is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    address: z.string().min(1, { message: 'Address is required' }),
    password: z
      .string()
      .min(7, { message: 'Password must be at least 7 characters' })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
      })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/\d/, { message: 'Password must contain at least one digit' })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: 'Password must contain at least one special character',
      }),
    confirmPassword: z
      .string()
      .min(7, { message: 'Password must be at least 7 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password don't match",
  });

type ISignupSchema = z.infer<typeof SingupSchema>;

const SignupAgency = () => {
  const [step, setStep] = useState(1);
  const { signupAgency } = endpoints;
  const navigate = useNavigate();

  const form = useForm<ISignupSchema>({
    resolver: zodResolver(SingupSchema),
    defaultValues: {
      agencyName: '',
      email: '',
      phoneNumber: '',
      country: '',
      city: '',
      address: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate, isLoading } = useMutate(
    signupAgency,
    'POST',
    (error) => {
      console.log(error);
    },
    (data: IAgencyAccount) => {
      agency.value = data;
      isUserLoggedIn.value = data.accessToken ? true : false;
      localStorage.setItem('token', data.accessToken!);
      navigate(Routes.AGENCY_PROFILE);
      console.log(data);
    }
  );

  const onSubmit = (data: ISignupSchema) => {
    console.log(data);
    mutate(data);
  };

  return (
    <div className="flex justify-center items-center font-jost">
      <Card className="w-[350px] md:w-[450px] shadow-lg mx-2 ">
        <CardHeader>
          <CardTitle>Create your agency account.</CardTitle>
          <CardDescription>
            Already have an account?{' '}
            <NavLink to={Routes.TOURIST_LOGIN} className="text-blue-500">
              Login here
            </NavLink>
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4 w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              {step === 1 && (
                <>
                  <FormField
                    control={form.control}
                    name="agencyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agency Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Agency Name" {...field} />
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
                          <Input placeholder="company@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone Number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {countries.map((country, index) => (
                                <SelectItem value={country.value} key={index}>
                                  {country.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="rounded-3xl w-full mx-auto"
                    size={'lg'}
                    onClick={() => setStep(2)}
                  >
                    Next
                  </Button>
                </>
              )}
              {step === 2 && (
                <>
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Address" {...field} />
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
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                </>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupAgency;
