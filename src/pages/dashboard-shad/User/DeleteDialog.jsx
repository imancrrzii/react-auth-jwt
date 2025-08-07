import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, // ✅ tambahkan ini
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export function DeleteDialog({ row }) {
  const fullName = `${row.firstName} ${row.maidenName} ${row.lastName}`;

  const handleDelete = () => {
    toast.success(`Data "${fullName}" berhasil dihapus`);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="rounded-xl">
        <Button variant="destructive" size="sm" className="cursor-pointer hover:bg-red-700">
          <Trash2 className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Apakah kamu yakin ingin menghapus <strong>{fullName}</strong>?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini tidak dapat dibatalkan. Data yang dihapus tidak bisa dikembalikan.
          </AlertDialogDescription> 
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="cursor-pointer">Ya</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
