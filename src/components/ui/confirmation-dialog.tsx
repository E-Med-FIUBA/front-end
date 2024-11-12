import { VariantProps } from 'class-variance-authority';

import { Button, buttonVariants } from './button';
import {
  DialogHeader,
  DialogFooter,
  DialogDescription,
  Dialog,
  DialogContent,
  DialogTitle,
} from './dialog';

export const ConfirmationDialog = ({
  open,
  title,
  description,
  confirmText,
  confirmationLoading,
  confirmVariant,
  cancelDisabled,
  onConfirm,
  onCancel,
  setOpen,
}: {
  open: boolean;
  onConfirm: () => Promise<void> | void;
  onCancel?: () => Promise<void> | void;
  setOpen: (value: boolean) => void;
  title: string;
  description: string;
  confirmText: string;
  confirmVariant?: VariantProps<typeof buttonVariants>['variant'];
  confirmationLoading?: boolean;
  cancelDisabled?: boolean;
}) => {
  const onOpenChangeWrapper = (value: boolean) => {
    if (!value) {
      onCancel && onCancel();
    }
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeWrapper}>
      <DialogContent className="max-w-96">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2">
          <Button
            onClick={async () => {
              onCancel && (await onCancel());
              setOpen(false);
            }}
            disabled={cancelDisabled}
            variant={'outline'}
          >
            Cancelar
          </Button>
          <Button
            onClick={async () => {
              await onConfirm();
              setOpen(false);
            }}
            variant={confirmVariant}
            loading={confirmationLoading}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
