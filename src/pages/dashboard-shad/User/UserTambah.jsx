import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle, Save } from "lucide-react";
import { Link } from "react-router-dom";

const UserTambah = () => {
  return (
    <div className="max-w-full mx-auto">
      <div className="flex flex-col gap-2 text-sky-900 items-start mb-6">
        <h3 className="text-2xl font-bold">Tambah Pengguna</h3>
        <p className="text-sm font-normal text-gray-500">
          Silakan tambah data pengguna di bawah ini.
        </p>
      </div>

      <Card>
        <CardContent>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="my-2" htmlFor="nama">
                Nama Lengkap
              </Label>
              <Input id="nama" placeholder="Masukkan nama lengkap" />
            </div>

            <div>
              <Label className="my-2" htmlFor="email">
                Email
              </Label>
              <Input type="email" id="email" placeholder="Masukkan email" />
            </div>

            <div>
              <Label className="my-2" htmlFor="username">
                Username
              </Label>
              <Input id="username" placeholder="Masukkan username" />
            </div>

            <div>
              <Label className="my-2" htmlFor="phone">
                Telepon
              </Label>
              <Input id="phone" placeholder="Masukkan nomor telepon" />
            </div>

            <div>
              <Label className="my-2" htmlFor="role">
                Role
              </Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="guest">Guest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div>
              <Label className="my-2" htmlFor="status">
                Status
              </Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Tidak Aktif</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Alamat */}
            <div className="md:col-span-2">
              <Label className="my-2" htmlFor="alamat">
                Alamat
              </Label>
              <Input id="alamat" placeholder="Masukkan alamat lengkap" />
            </div>

            {/* Perusahaan */}
            <div>
              <Label className="my-2" htmlFor="company">
                Perusahaan
              </Label>
              <Input id="company" placeholder="Nama perusahaan" />
            </div>

            {/* Website */}
            <div>
              <Label className="my-2" htmlFor="website">
                Website
              </Label>
              <Input id="website" placeholder="contoh: example.com" />
            </div>

            {/* Tombol Submit */}
            <div className="md:col-span-2 mt-4 flex justify-end gap-3">
              <Button asChild variant="outline">
                <Link
                  to="/dashboard-shad/dashboard-shad-user/"
                >
                  <ArrowLeftCircle className="w-4 h-4" />
                  Kembali
                </Link>
              </Button>
              <Button type="submit" className="bg-sky-900 cursor-pointer">
                <span>
                  <Save />
                </span>
                Simpan
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserTambah;
