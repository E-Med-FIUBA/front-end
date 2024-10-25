import { ReactNode } from 'react';

import { cn } from '@/utils/cn';

export const GradientShadow = ({
  className,
  gradientClassName,
  children,
}: {
  className?: string;
  gradientClassName: string;
  children: ReactNode;
}) => {
  return (
    <div className={cn('relative', className)}>
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-md blur-md">
        <div
          className={cn(
            'absolute -inset-32 animate-[spin_2000ms_ease-in_infinite] bg-gradient-to-r transition-all',
            gradientClassName,
          )}
        />
      </div>
      {children}
    </div>
  );
};
