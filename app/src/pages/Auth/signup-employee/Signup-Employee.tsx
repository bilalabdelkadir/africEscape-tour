import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { phoneRegExp } from '@/pages/Auth/signup-Agency/SignupAgency';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { endpoints } from '@/lib/endpoints';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMutate } from '@/hooks/queryHooks';
import { Loader2Icon } from 'lucide-react';
enum EmployeeRole {
  GUIDE = 'GUIDE',
  LEAD_GUIDE = 'LEAD_GUIDE',
  DRIVER = 'DRIVER',
  INTERPRETER = 'INTERPRETER',
}

const roles = [
  {
    value: 'GUIDE',
    label: 'Guide',
  },
  {
    value: 'LEAD_GUIDE',
    label: 'Lead Guide',
  },
  {
    value: 'DRIVER',
    label: 'Driver',
  },
  {
    value: 'INTERPRETER',
    label: 'Interpreter',
  },
];

interface ICheckInvitationResponse {
  true: boolean;
  email: string;
  agencyId: string;
}

const EmployeSchema = z
  .object({
    firstName: z.string().min(1, { message: 'Firstname is required' }),
    lastName: z.string().min(1, { message: 'Lastname is required' }).optional(),
    email: z.string().min(1, { message: 'Email is required' }).email({
      message: 'Must be a valid email',
    }),
    phoneNumber: z.string().refine((value) => phoneRegExp.test(value), {
      message: 'Invalid phone number format',
    }),
    stateRegion: z
      .string()
      .min(1, { message: 'State/Region is required' })
      .optional(),
    country: z.string().min(1, { message: 'country is required' }),
    city: z.string().min(1, { message: 'City is required' }).optional(),
    address: z.string().min(1, { message: 'adress is required' }).optional(),
    role: z.nativeEnum(EmployeeRole),
    agencyId: z.string().optional(),
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

type IEmployee = z.infer<typeof EmployeSchema>;

const SignupEmployee = () => {
  const { token } = useParams();
  const [customError, setCustomError] = useState<boolean>(false);

  const { checkInvitation, signupEmployee } = endpoints;

  const { mutate, isLoading, isError } = useMutate(
    checkInvitation(token as string),
    'POST',
    (error) => {
      console.log(error);
    },
    (data: ICheckInvitationResponse) => {
      console.log(data);
      setCustomError(data.true);
      form.setValue('email', data.email);
      form.setValue('agencyId', data.agencyId);
    }
  );

  const { mutate: signupMutate, isLoading: isCreating } = useMutate(
    signupEmployee,
    'POST',
    (error) => {
      console.log(error);
    },
    (data) => {
      console.log(data);
    }
  );

  useEffect(() => {
    mutate({});
  }, []);

  const form = useForm<IEmployee>({
    resolver: zodResolver(EmployeSchema),
  });
  const onSubmit = (data: IEmployee) => {
    console.log(data);
    signupMutate(data);
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2Icon className="animate-spin w-10 h-10" />
      </div>
    );

  if (isError || !customError)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-red-500">
          Something went wrong ask for re invitation
        </h1>
      </div>
    );

  return (
    <div className="flex gap-3 w-[90%] md:w-[70%] lg:w-[55%] mx-4 md:mx-auto">
      <Card className="w-full md:w-[100%]">
        <CardHeader>
          <CardTitle>Create your account here</CardTitle>
        </CardHeader>
        <CardContent className=" w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" grid gap-4 md:grid-cols-2"
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fist Name</FormLabel>
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
                      <Input placeholder="Ethiopia" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="AddisAbaba" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stateRegion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State/Region</FormLabel>
                    <FormControl>
                      <Input placeholder="AddisAbaba/oromia" {...field} />
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
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.confirmPassword &&
                        form.formState.errors.confirmPassword.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roles.map((role, index) => (
                            <SelectItem value={role.value} key={index}>
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div></div>

              <Button
                type="submit"
                className="rounded-3xl w-[75%] "
                size={'lg'}
                disabled={isCreating}
              >
                {isCreating && (
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupEmployee;
