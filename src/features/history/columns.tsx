import { ColumnDef } from '@tanstack/react-table';
import { format, parseISO } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SortableHeader } from '@/components/ui/data-table/sortable-header';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Prescription } from '@/types/api';

export const columns: ColumnDef<Prescription>[] = [
  {
    id: 'date',
    accessorFn: (prescription) => prescription.emitedAt,
    header: ({ column }) => <SortableHeader column={column} label="Fecha" />,
    cell: ({ row, column }) =>
      format(parseISO(row.getValue(column.id)), 'dd/MM/yyyy'),
  },
  {
    id: 'name',
    accessorFn: (prescription) => prescription.patient.name,
    header: ({ column }) => <SortableHeader column={column} label="Nombre" />,
    cell: ({ row, column }) => {
      console.log(column.id, row.getValue(column.id));
      return <div className="capitalize">{row.getValue(column.id)}</div>;
    },
  },
  {
    id: 'lastName',
    accessorFn: (prescription) => prescription.patient.lastName,
    header: ({ column }) => <SortableHeader column={column} label="Apellido" />,
    cell: ({ row, column }) => (
      <div className="capitalize">{row.getValue(column.id)}</div>
    ),
  },
  {
    id: 'dni',
    accessorFn: (prescription) => prescription.patient.dni,
    header: ({ column }) => <SortableHeader column={column} label="DNI" />,
    cell: ({ row, column }) => (
      <div className="capitalize">{row.getValue(column.id)}</div>
    ),
  },
  {
    id: 'email',
    accessorFn: (prescription) => prescription.patient.email,
    header: ({ column }) => {
      return <SortableHeader column={column} label="Email" />;
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  },
  {
    id: 'drug',
    accessorFn: (prescription) => prescription.presentation.drug?.name,
    header: ({ column }) => (
      <SortableHeader column={column} label="Medicamento" />
    ),
    cell: ({ row, column }) => (
      <div className="capitalize">{row.getValue(column.id)}</div>
    ),
  },
  {
    accessorKey: 'quantity',
    header: () => <div className="text-right">Amount</div>,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <div className="text-right">
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="mx-auto size-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
