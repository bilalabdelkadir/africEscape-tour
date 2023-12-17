import { IEmployeeData } from '@/types';
import { useFetchQuery } from '@/hooks/queryHooks';
import { endpoints } from '@/lib/endponts';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from './DataTable';
import { Loader2Icon } from 'lucide-react';
import { useEffect } from 'react';
import { agency } from '@/global-state/user.globalstate';

const Employee = () => {
  const { getAllEmployees } = endpoints;

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
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data as IEmployeeData[]} />
    </div>
  );
};

export default Employee;
