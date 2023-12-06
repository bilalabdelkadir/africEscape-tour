'use client';
import React from 'react';
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
import { useMutate } from '@/lib/customHook';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { endpoints } from '@/lib/endpoints';
import { useRouter } from 'next/navigation';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';

const LoginSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({
    message: 'Must be a valid email',
  }),
  password: z
    .string()
    .min(6, { message: 'Password must be atleast 6 characters' }),
});

type ILoginSchema = z.infer<typeof LoginSchema>;

const Login = () => {
  const { toast } = useToast();
  const { signupTourist } = endpoints;
  const form = useForm<ILoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
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

  function onSubmit(values: ILoginSchema) {
    console.log(values);
  }

  return (
    <div className="flex justify-center h-[80vh] items-center font-jost">
      <Card className="w-[350px] md:w-[450px] shadow-lg mx-2 ">
        <CardHeader>
          <CardTitle>Start Booking By Login in</CardTitle>
          <CardDescription>
            Don`&apos;`t have an account?{' '}
            <Link href="/auth/signup" className="text-blue-500">
              Sign up here
            </Link>
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
                disabled={isPending}
              >
                {isPending && (
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

export default Login;
