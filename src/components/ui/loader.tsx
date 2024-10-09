import { Loader2 } from 'lucide-react';

export const Loader = ({ size = 8 }: { size?: number }) => (
  <Loader2 size={size} className="mx-auto animate-spin" />
);
