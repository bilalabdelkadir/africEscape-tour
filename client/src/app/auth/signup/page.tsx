'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Loader2Icon } from 'lucide-react';
import { endpoints } from '@/lib/endpoints';
import { useMutate } from '@/lib/customHook';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const SingupSchema = z
  .object({
    firstName: z.string().min(1, { message: 'Firstname is required' }),
    lastName: z.string().min(1, { message: 'Lastname is required' }),
    email: z.string().min(1, { message: 'Email is required' }).email({
      message: 'Must be a valid email',
    }),
    password: z
      .string()
      .min(6, { message: 'Password must be atleast 6 characters' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Password must be atleast 6 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password don't match",
  });

type ISignupSchema = z.infer<typeof SingupSchema>;

const page = () => {
  const { toast } = useToast();
  const { signupTourist } = endpoints;
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

  const router = useRouter();

  const { mutate, isPending } = useMutate(
    signupTourist,
    'post',
    (error) => {
      console.log('error', error);
      toast({
        variant: 'destructive',
        description: error.response?.data?.message | error.response?.data,
      });
    },
    (data) => {
      form.reset(),
        console.log(data),
        toast({
          variant: 'default',
          title: 'Account Created',
        }),
        router.push('/auth/login');
    }
  );

  function onSubmit(values: ISignupSchema) {
    mutate(values);
  }

  return (
    <div className="flex justify-center items-center font-jost">
      <Card className="w-[350px] md:w-[450px] shadow-lg mx-2 ">
        <CardHeader>
          <CardTitle>Create An Account</CardTitle>
          <CardDescription>
            Enter your Info below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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

              <Button
                type="submit"
                className="rounded-3xl w-full mx-auto"
                size={'lg'}
                disabled={isPending}
              >
                {isPending && (
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign up
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
