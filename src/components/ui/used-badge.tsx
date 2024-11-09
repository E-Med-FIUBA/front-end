import { Badge } from './badge';

export const UsedBadge = ({ used }: { used: boolean }) =>
  used ? (
    <Badge variant={'destructive'}>Usada</Badge>
  ) : (
    <Badge variant={'default'}>No usada</Badge>
  );
