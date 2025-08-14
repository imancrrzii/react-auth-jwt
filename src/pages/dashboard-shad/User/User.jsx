import { useEffect, useMemo, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaFileExcel, FaFilePdf, FaUsers } from "react-icons/fa";
import { ChevronLeft, ChevronRight, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { ViewDialog } from "./ViewDialog";
import { DeleteDialog } from "./DeleteDialog";

export default function Users() {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          globalFilter
            ? `https://dummyjson.com/users/search?q=${encodeURIComponent(
                globalFilter
              )}&limit=${pageSize}&skip=${pageIndex * pageSize}`
            : `https://dummyjson.com/users?limit=${pageSize}&skip=${
                pageIndex * pageSize
              }`
        );

        const json = await res.json();
        setData(json.users);
        setTotalCount(json.total);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchUsers();
  }, [pageIndex, pageSize, globalFilter]);

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "No", size: 60 },
      {
        accessorKey: "image",
        header: "Foto",
        size: 100,
        cell: ({ getValue, row }) => {
          const image = getValue();
          const name = `${row.original.firstName} ${row.original.lastName}`;
          return (
            <Avatar className="h-10 w-10">
              <AvatarImage src={image} alt={name} />
              <AvatarFallback>
                {row.original.firstName[0]}
                {row.original.lastName[0]}
              </AvatarFallback>
            </Avatar>
          );
        },
      },
      {
        id: "fullName",
        header: "Nama Lengkap",
        size: 300,
        cell: ({ row }) => {
          const { firstName, maidenName, lastName } = row.original;
          return `${firstName} ${maidenName} ${lastName}`;
        },
        filterFn: (row, columnId, value) => {
          const fullName =
            `${row.original.firstName} ${row.original.maidenName} ${row.original.lastName}`.toLowerCase();
          return fullName.includes(value.toLowerCase());
        },
        sortingFn: (rowA, rowB) => {
          const nameA = `${rowA.original.firstName} ${rowA.original.maidenName} ${rowA.original.lastName}`;
          const nameB = `${rowB.original.firstName} ${rowB.original.maidenName} ${rowB.original.lastName}`;
          return nameA.localeCompare(nameB);
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 250,
      },
      {
        accessorKey: "phone",
        header: "Telepon",
        size: 150,
      },
      {
        accessorKey: "gender",
        header: "Gender",
        size: 100,
      },
      {
        accessorKey: "age",
        header: "Umur",
        size: 100,
      },
      {
        accessorKey: "university",
        header: "Universitas",
        size: 100,
      },
      {
        accessorKey: "username",
        header: "Username",
        size: 100,
      },
      {
        accessorKey: "password",
        header: "Kata sandi",
        size: 100,
      },
      {
        accessorKey: "birthDate",
        header: "Tanggal Lahir",
        size: 100,
      },
      {
        id: "companyName",
        header: "Nama Perusahaan",
        size: 200,
        cell: ({ row }) => row.original.company?.name || "-",
      },
      {
        id: "companyDepartment",
        header: "Departemen",
        size: 150,
        cell: ({ row }) => row.original.company?.department || "-",
      },
      {
        id: "companyTitle",
        header: "Jabatan",
        size: 150,
        cell: ({ row }) => row.original.company?.title || "-",
      },
      {
        id: "companyAddress",
        header: "Alamat Perusahaan",
        size: 300,
        cell: ({ row }) => {
          const address = row.original.company?.address;
          if (!address) return "-";
          return `${address.address}, ${address.city}, ${address.state} ${address.postalCode}`;
        },
      },

      {
        id: "actions",
        header: "Aksi",
        size: 100,
        cell: ({ row }) => (
          <div className="flex gap-2 justify-center">
            <ViewDialog row={row.original} />
            <DeleteDialog row={row.original} />
          </div>
        ),
        meta: {
          className: "text-center",
        },
      },
    ],
    [selectedRow]
  );

  const exportToExcel = () => {
    const worksheetData = data.map((user) => ({
      ID: user.id,
      Nama: `${user.firstName} ${user.maidenName} ${user.lastName}`,
      Email: user.email,
      Telepon: user.phone,
      Gender: user.gender,
      Umur: user.age,
      Universitas: user.university,
      Username: user.username,
      Password: user.password,
      "Tanggal Lahir": user.birthDate,
      Perusahaan: user.company?.name || "-",
      Departemen: user.company?.department || "-",
      Jabatan: user.company?.title || "-",
      "Alamat Perusahaan": user.company?.address
        ? `${user.company.address.address}, ${user.company.address.city}, ${user.company.address.state} ${user.company.address.postalCode}`
        : "-",
    }));
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    const tableColumn = [
      "ID",
      "Nama",
      "Email",
      "Telepon",
      "Gender",
      "Umur",
      "Universitas",
      "Username",
    ];

    const tableRows = data.map((user) => [
      user.id,
      `${user.firstName} ${user.maidenName} ${user.lastName}`,
      user.email,
      user.phone,
      user.gender,
      user.age,
      user.university,
      user.username,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("data_pengguna.pdf");
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(totalCount / pageSize),
  });

  const handlePageSizeChange = (value) => {
    setPageSize(Number(value));
    setPageIndex(0);
  };

  const generatePageNumbers = () => {
    const totalPages = Math.ceil(totalCount / pageSize);
    const currentPage = pageIndex + 1;
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  return (
    <div className="w-full max-w-full">
      <div className="flex gap-2 text-sky-900 items-center mb-6">
        <FaUsers className="w-8 h-8" />
        <div className="text-2xl font-bold">Data Pengguna</div>
      </div>

      <Card className="w-full max-w-full overflow-hidden">
        <CardContent className="space-y-4 px-2 lg:px-6">
          <div className="flex justify-between items-center">
            <Button asChild>
              <Link
                to="tambah"
                className="flex items-center gap-2 bg-sky-900 text-white px-4 py-2 rounded hover:bg-sky-800"
              >
                <PlusCircle className="w-4 h-4" />
                Tambah Pengguna
              </Link>
            </Button>
          </div>

          <div className="flex flex-col md:flex-row justify-between text-sm gap-2">
            <div className="flex items-center gap-2">
              <span>Tampilkan</span>
              <Select
                value={pageSize.toString()}
                onValueChange={handlePageSizeChange}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span>entri</span>
            </div>
            <Input
              placeholder="Cari pengguna..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="max-w-xs w-full sm:w-64 flex-grow"
            />
          </div>

          <div className="w-full border rounded-md overflow-hidden">
            <div className="overflow-x-auto">
              <Table style={{ minWidth: "1000px" }}>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead
                          key={header.id}
                          style={{
                            width: header.column.columnDef.size
                              ? `${header.column.columnDef.size}px`
                              : "auto",
                          }}
                          className={`whitespace-nowrap px-2 text-xs font-semibold border-r-1 bg-gray-50 ${
                            header.column.columnDef.meta?.className ?? ""
                          }`}
                        >
                          {header.isPlaceholder ? null : (
                            <div
                              className={`cursor-pointer select-none ${
                                header.column.columnDef.meta?.className ===
                                "text-center"
                                  ? "flex justify-center"
                                  : "flex items-center space-x-1"
                              }`}
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              <span>
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                              </span>
                              {header.column.getIsSorted() === "asc"
                                ? "↑"
                                : header.column.getIsSorted() === "desc"
                                ? "↓"
                                : ""}
                            </div>
                          )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        className={`border-b ${
                          row.id % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            style={{
                              width: cell.column.columnDef.size
                                ? `${cell.column.columnDef.size}px`
                                : "auto",
                            }}
                            className="whitespace-nowrap px-2 text-xs border-r-1"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="text-center"
                      >
                        Tidak ada data ditemukan.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 gap-4">
            <div className="text-sm text-muted-foreground">
              Menampilkan {pageIndex * pageSize + 1} -{" "}
              {Math.min((pageIndex + 1) * pageSize, totalCount)} dari{" "}
              {totalCount} entri
            </div>

            <div className="flex items-center gap-2 flex-nowrap w-max">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
                disabled={pageIndex === 0}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Sebelumnya</span>
              </Button>

              {generatePageNumbers().map((page, index) => (
                <span key={index}>
                  {page === "..." ? (
                    <span className="px-2 py-1 text-sm text-muted-foreground">
                      ...
                    </span>
                  ) : (
                    <Button
                      variant={pageIndex + 1 === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPageIndex(page - 1)}
                      className="w-8 h-8 p-0"
                    >
                      {page}
                    </Button>
                  )}
                </span>
              ))}

              <Button
                variant="outline"
                size="sm"
                onClick={() => setPageIndex((prev) => prev + 1)}
                disabled={(pageIndex + 1) * pageSize >= totalCount}
              >
                <span className="hidden sm:inline">Selanjutnya</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
