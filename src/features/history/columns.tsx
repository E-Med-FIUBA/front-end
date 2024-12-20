import { ColumnDef, Row } from '@tanstack/react-table';
import { format, parseISO } from 'date-fns';
import { MoreHorizontal, NotepadText, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
import { UsedBadge } from '@/components/ui/used-badge';
import { Prescription } from '@/types/api';

const Actions = ({
  row,
  openViewModal,
}: {
  row: Row<Prescription>;
  openViewModal: (prescription: Prescription) => void;
}) => {
  const navigate = useNavigate();
  const prescription = row.original;

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
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-2"
          onClick={() => openViewModal(prescription)}
        >
          <NotepadText className="size-4" />
          Ver prescripcion
        </DropdownMenuItem>
        {prescription.patient.doctorId && (
          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-2"
            onClick={() => navigate(`/patients/${prescription.patientId}`)}
          >
            <User className="size-4" />
            Ver paciente
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const startsWithFilterFn = (
  row: Row<Prescription>,
  columnId: string,
  filterValue: number | string, //resolveFilterValue will transform this to a string
) =>
  row
    .getValue<number | string>(columnId)
    .toString()
    .toLowerCase()
    .trim()
    .startsWith(filterValue.toString()); // toString, toLowerCase, and trim the filter value in `resolveFilterValue`

export const createColumns = (
  openViewModal: (prescription: Prescription) => void,
): ColumnDef<Prescription>[] => [
  {
    id: 'dni',
    accessorFn: (prescription) => prescription.patient.dni,
    header: ({ column }) => <SortableHeader column={column} label="DNI" />,
    cell: ({ row, column }) => (
      <div className="capitalize">{row.getValue(column.id)}</div>
    ),
    filterFn: startsWithFilterFn,
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
    id: 'date',
    accessorFn: (prescription) => prescription.emitedAt,
    header: ({ column }) => <SortableHeader column={column} label="Fecha" />,
    cell: ({ row, column }) =>
      format(parseISO(row.getValue(column.id)), 'dd/MM/yyyy'),
  },
  {
    id: 'used',
    accessorFn: (prescription) => prescription.used,
    header: ({ column }) => (
      <SortableHeader
        column={column}
        label="Estado"
        className="justify-center"
      />
    ),
    cell: ({ row, column }) => (
      <div className="flex justify-center">
        <UsedBadge used={row.getValue(column.id)} />
      </div>
    ),
  },
  {
    accessorKey: 'quantity',
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row, column }) => (
      <div className="text-right">{row.getValue(column.id)}</div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <Actions row={row} openViewModal={openViewModal} />,
  },
];
