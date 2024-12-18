import { useTheme } from '@/lib/theme';

export const Logo = ({ className }: { className?: string }) => {
  const { realTheme } = useTheme();
  const isDark = realTheme === 'dark';
  const image_url = isDark ? '/logo_dark.svg' : '/logo.svg';
  return <img src={image_url} alt="E-med Logo" className={className} />;
};
