import { Button } from './button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './dialog';

export const SuccessModal = ({
  open,
  setOpen,
  title,
  description,
  closeText = 'Cerrar',
  onClose,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  description: string;
  closeText?: string;
  onClose?: () => void;
}) => {
  const onOpenChangeWrapper = (value: boolean) => {
    setOpen(value);
    if (!value && onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeWrapper}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChangeWrapper(false)}>
            {closeText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
