import { ColumnDef, Row } from '@tanstack/react-table';

import { SortableHeader } from '@/components/ui/data-table/sortable-header';
import { Presentation } from '@/types/api';

const startsWithFilterFn = (
  row: Row<Presentation>,
  columnId: string,
  filterValue: number | string, //resolveFilterValue will transform this to a string
) =>
  row
    .getValue<number | string>(columnId)
    .toString()
    .toLowerCase()
    .trim()
    .startsWith(filterValue.toString()); // toString, toLowerCase, and trim the filter value in `resolveFilterValue`

export const columns: ColumnDef<Presentation>[] = [
  {
    id: 'presentation',
    accessorFn: (presentation) => presentation.name,
    header: ({ column }) => (
      <SortableHeader column={column} label="Presentacion" />
    ),
    cell: ({ row, column }) => (
      <div className="capitalize">{row.getValue(column.id)}</div>
    ),
    filterFn: startsWithFilterFn,
  },
  {
    id: 'drugName',
    accessorFn: (presentation) => presentation.drug?.name || '',
    header: ({ column }) => <SortableHeader column={column} label="Nombre" />,
    cell: ({ row, column }) => (
      <div className="capitalize">{row.getValue(column.id)}</div>
    ),
    filterFn: startsWithFilterFn,
  },
  {
    id: 'drugForm',
    accessorFn: (presentation) => presentation.form,
    header: ({ column }) => (
      <SortableHeader column={column} label="Forma Farmaceutica" />
    ),
    cell: ({ row, column }) => (
      <div className="capitalize">{row.getValue(column.id)}</div>
    ),
    filterFn: startsWithFilterFn,
  },
  {
    id: 'atc',
    accessorFn: (presentation) => presentation.atc,
    header: ({ column }) => <SortableHeader column={column} label="ATC" />,
    cell: ({ row, column }) => (
      <div className="capitalize">{row.getValue(column.id)}</div>
    ),
    filterFn: startsWithFilterFn,
  },
  //   {
  //     id: 'administration',
  //     accessorFn: (presentation) => presentation.drug?.administration || '',
  //     header: ({ column }) => (
  //       <SortableHeader column={column} label="Administración" />
  //     ),
  //     cell: ({ row, column }) => (
  //       <div className="capitalize">{row.getValue(column.id)}</div>
  //     ),
  //     filterFn: startsWithFilterFn,
  //   },
];
