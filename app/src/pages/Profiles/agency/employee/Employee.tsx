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

const EmployeSchema = z.object({
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
});

type IEmployee = z.infer<typeof EmployeSchema>;

const Employee = () => {
  const form = useForm<IEmployee>({
    resolver: zodResolver(EmployeSchema),
  });
  const onSubmit = (data: IEmployee) => {
    console.log(data);
  };

  return (
    <div className="flex gap-3 w-full bg-none">
      <Card className="w-full md:w-[70%]">
        <CardHeader>
          <CardTitle>Create Employee</CardTitle>
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@email.com" {...field} />
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
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="AddisAbaba/oromia" {...field} />
                    </FormControl>
                    <FormMessage />
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
              <Button
                type="submit"
                variant={'default'}
                className="w-full md:w-[50%]"
              >
                Send Invitation
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Employee;
