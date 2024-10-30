import { Dialog, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle } from '@/components/ui/dialog';
import React, { useState } from 'react';

interface PasswordDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (password: string) => void;
}

export const PasswordDialog: React.FC<PasswordDialogProps> = ({ open, onClose, onSubmit }) => {
    const [password, setPassword] = useState('');

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = () => {
        onSubmit(password);
        setPassword('');  // Clear password input on submit
        onClose();  // Close dialog after submission
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <DialogPortal>
                <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50" />
                <DialogContent className="fixed top-1/2 left-1/2 w-80 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
                    <DialogTitle className="text-lg font-medium">Enter Password</DialogTitle>
                    <DialogDescription className="mt-2 mb-4 text-sm text-gray-500">
                        Please enter your password to continue.
                    </DialogDescription>
                    <input
                        type="password"
                        className="w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <div className="flex justify-end gap-2">
                        <button onClick={onClose} className="px-4 py-2 text-gray-700 rounded hover:bg-gray-200">
                            Cancel
                        </button>
                        <button onClick={handleSubmit} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                            Submit
                        </button>
                    </div>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};