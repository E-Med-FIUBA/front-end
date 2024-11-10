import { Column } from '@tanstack/react-table';
import { ArrowDownAZ, ArrowUpAz, ArrowUpDown } from 'lucide-react';

import { cn } from '@/utils/cn';

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
    <div className={cn('flex', className)}>
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting()}
        className="p-0 hover:bg-transparent"
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
    </div>
  );
};
