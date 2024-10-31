import { ReactNode } from 'react';

import { cn } from '@/utils/cn';

export const GradientShadow = ({
  className,
  colors,
  size,
  children,
}: {
  className?: string;
  colors: string[];
  size?: number;
  children: ReactNode;
}) => {
  const _size = size ?? 8;

  return (
    <div className={cn('relative', className)}>
      <div className="absolute -inset-1 -z-10 overflow-hidden rounded-md blur-md">
        <div
          style={{
            background: `conic-gradient(from 0deg, ${colors.join(',')})`,
            inset: `${-_size}rem`,
          }}
          className={cn(
            'absolute animate-[spin_2000ms_ease-in_infinite] transition-all',
          )}
        />
      </div>
      {children}
    </div>
  );
};
