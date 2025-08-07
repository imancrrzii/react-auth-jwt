import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export function ViewDialog({ row }) {
  return (
    <Dialog>
      <DialogTrigger asChild>   
        <Button
          size="icon"
          variant="outline"
          className="rounded-xl p-1 bg-blue-600 text-white hover:bg-blue-700 hover:text-white cursor-pointer"
        >
          <Eye className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detail Pengguna</DialogTitle>
          <DialogDescription>Informasi detail pengguna.</DialogDescription>
        </DialogHeader>
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>ID:</strong> {row.id}</p>
          <p><strong>Nama:</strong> {row.title}</p>
          <p><strong>Deskripsi:</strong> {row.description}</p>
          <p><strong>Brand:</strong> {row.brand}</p>
          <p><strong>Kategori:</strong> {row.category}</p>
          <p><strong>Harga:</strong> ${row.price}</p>
          <p><strong>Rating:</strong> {row.rating}</p>
          <p><strong>Diskon:</strong> {row.discountPercentage}%</p>
          <p><strong>Stok:</strong> {row.stock}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
