import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const DeleteConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  taskTitle,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskTitle: string;
}) => (
  <AlertDialog open={isOpen} onOpenChange={onClose}>
    <AlertDialogContent className="p-6 bg-white rounded-lg shadow-lg">
      <AlertDialogHeader>
        <AlertDialogTitle className="text-lg font-semibold text-gray-900">
          Are you sure?
        </AlertDialogTitle>
        <AlertDialogDescription className="text-sm text-gray-600">
          This will permanently delete the task{" "}
          <span className="font-medium text-gray-800">"{taskTitle}"</span>. This
          action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="flex justify-end space-x-2">
        <AlertDialogCancel
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={onConfirm}
          className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default DeleteConfirmationDialog;
