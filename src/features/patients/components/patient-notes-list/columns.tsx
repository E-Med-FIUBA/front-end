import { ColumnDef } from '@tanstack/react-table';
import { format, parseISO } from 'date-fns';
import { Edit2, Eye, MoreHorizontal, Trash2 } from 'lucide-react';

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
import { PatientNote } from '@/types/api';

export const createColumns = (
  openEditModal: (note: PatientNote) => void,
  openDeleteModal: (note: PatientNote) => void,
  openViewModal: (note: PatientNote) => void,
): ColumnDef<PatientNote>[] => [
  {
    id: 'createdAt',
    accessorFn: (note) => note.createdAt,
    header: ({ column }) => (
      <SortableHeader column={column} label="Fecha de creacion" />
    ),
    cell: ({ row, column }) =>
      format(parseISO(row.getValue(column.id)), 'dd/MM/yyyy'),
  },
  {
    id: 'updatedAt',
    accessorFn: (note) => note.updatedAt,
    header: ({ column }) => (
      <SortableHeader column={column} label="Ultima modificacion" />
    ),
    cell: ({ row, column }) => {
      const value: string | undefined = row.getValue(column.id);
      return value ? format(parseISO(value), 'dd/MM/yyyy') : 'Nunca';
    },
  },
  {
    id: 'note',
    accessorFn: (note) => note.note,
    header: ({ column }) => (
      <SortableHeader column={column} label="Descripcion" />
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const note = row.original;

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
              onClick={() => openViewModal(note)}
            >
              <Eye className="size-4" />
              Ver
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex cursor-pointer items-center gap-2"
              onClick={() => openEditModal(note)}
            >
              <Edit2 className="size-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex cursor-pointer items-center gap-2 font-bold !text-destructive"
              onClick={() => openDeleteModal(note)}
            >
              <Trash2 className="size-4" />
              <span>Eliminar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
