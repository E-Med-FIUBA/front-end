import { Column } from '@tanstack/react-table';
import { ArrowDownAZ, ArrowUpAz, ArrowUpDown } from 'lucide-react';

import { Button } from '../button';

export const SortableHeader = <T,>({
  column,
  label,
  className,
}: {
  column: Column<T, any>;
  label: string;
  className?: string;
}) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting()}
      className={className}
    >
      {label}
      {column.getIsSorted() === 'asc' ? (
        <ArrowDownAZ className="ml-2 size-4" />
      ) : column.getIsSorted() === 'desc' ? (
        <ArrowUpAz className="ml-2 size-4" />
      ) : (
        <ArrowUpDown className="ml-2 size-4" />
      )}
    </Button>
  );
};
