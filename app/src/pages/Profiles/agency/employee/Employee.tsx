import { IEmployeeData } from '@/types';
import { useFetchQuery, useMutate } from '@/hooks/queryHooks';
import { endpoints } from '@/lib/endponts';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from './DataTable';
import { Loader2Icon, PlusIcon } from 'lucide-react';
import { agency } from '@/global-state/user.globalstate';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const Employee = () => {
  const { getAllEmployees, sendInvitation } = endpoints;
  // create email validation function here

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const [email, setEmail] = useState('');

  // @ts-ignore
  const { data, isLoading, isRefetching } = useFetchQuery(
    getAllEmployees(agency.value?.Agency.id as string),
    ['getAllEmployees'],
    (error) => {
      console.log(error);
    },
    (data) => {
      console.log(data);
    }
  );

  const { mutate, isLoading: isCreating } = useMutate(
    sendInvitation,
    'POST',
    (error) => {
      console.log(error);
    },
    (data) => {
      console.log(data);
      setEmail('');
    }
  );

  const handleSendInvitation = () => {
    mutate({
      email,
    });
  };

  const columns: ColumnDef<IEmployeeData>[] = [
    {
      accessorKey: 'firstName',
      header: 'Name',
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <div>
              <p className="font-semibold">{row.getValue('firstName')}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'phoneNumber',
      header: 'Phone',
    },
    {
      accessorKey: 'country',
      header: 'Country',
    },
    {
      accessorKey: 'role',
      header: 'Role',
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2Icon />
      </div>
    );
  }

  return (
    <div className="md:px-6 py-6 bg-white rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Employee</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-full">
              <PlusIcon className="w-5 h-5 mr-2 " />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="rounded-full">
                Send Invitation
              </DialogTitle>
              <DialogDescription>
                Add the email address of the person you want to invite to your
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <DialogFooter className="justify-end">
              <Button
                type="button"
                variant="default"
                disabled={!validateEmail(email) || isLoading}
                onClick={handleSendInvitation}
              >
                {isCreating ? <Loader2Icon /> : null}
                Send Invitation
              </Button>

              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Tabs defaultValue="employeeList" className="rounded-md ">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="employeeList">Employee List</TabsTrigger>
          <TabsTrigger value="invitationList">Invitation List</TabsTrigger>
        </TabsList>
        <TabsContent value="employeeList">
          <DataTable columns={columns} data={data as IEmployeeData[]} />
        </TabsContent>
        <TabsContent value="invitationList">list</TabsContent>
      </Tabs>
    </div>
  );
};

export default Employee;
