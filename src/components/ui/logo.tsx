import { cn } from '@/utils/cn';

export const Logo = ({ className }: { className?: string }) => {
  return (
    <img src="./logo.svg" alt="logo" className={cn('dark:invert', className)} />
  );
};
