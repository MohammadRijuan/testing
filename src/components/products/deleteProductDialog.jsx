"use client";

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

export default function DeleteProductDialog({
  open,
  onOpenChange,
  onConfirm,
  loading = false,
}) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>

        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Product
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone.
            <br />
            The product will be permanently deleted from both
            MongoDB and Cloudinary.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel disabled={loading}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
          >
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  );
}