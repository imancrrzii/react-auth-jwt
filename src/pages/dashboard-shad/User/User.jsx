import { useEffect, useMemo, useState } from "react";
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
import { FaUsers } from "react-icons/fa";
import { Eye, ChevronLeft, ChevronRight, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { ViewDialog } from "./ViewDialog";

export default function User() {
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
    const fetchProducts = async () => {
      try {
        const query = globalFilter
          ? `search?q=${encodeURIComponent(globalFilter)}`
          : "";
        const res = await fetch(
          `https://dummyjson.com/products/${
            query ? query + "&" : "?"
          }limit=${pageSize}&skip=${pageIndex * pageSize}`
        );
        const json = await res.json();
        setData(json.products);
        setTotalCount(json.total);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchProducts();
  }, [pageIndex, pageSize, globalFilter]);

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID", size: 60 },
      { accessorKey: "title", header: "Nama Produk", size: 200 },
      {
        accessorKey: "description",
        header: "Deskripsi",
        size: 300,
        cell: ({ getValue }) => {
          const value = getValue();
          const shortened =
            value.length > 50 ? value.substring(0, 50) + "..." : value;
          return <span title={value}>{shortened}</span>;
        },
      },
      { accessorKey: "brand", header: "Brand", size: 150 },
      { accessorKey: "category", header: "Kategori", size: 150 },
      { accessorKey: "price", header: "Harga", size: 100 },
      { accessorKey: "rating", header: "Rating", size: 100 },
      { accessorKey: "discountPercentage", header: "Diskon", size: 60 },
      { accessorKey: "stock", header: "Stok", size: 100 },
      {
        id: "actions",
        header: "Aksi",
        size: 100,
        cell: ({ row }) => <ViewDialog row={row.original} />,
      },
    ],
    [selectedRow]
  );

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
        <CardContent className="space-y-4 px-8">
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

            <Input
              placeholder="Cari pengguna..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="max-w-xs"
            />
          </div>

          <div className="flex items-center gap-2 text-sm">
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
                          className="whitespace-nowrap px-2"
                        >
                          {header.isPlaceholder ? null : (
                            <div
                              className="cursor-pointer select-none flex items-center space-x-1"
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
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            style={{
                              width: cell.column.columnDef.size
                                ? `${cell.column.columnDef.size}px`
                                : "auto",
                            }}
                            className="whitespace-nowrap px-2 text-sm"
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

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
                disabled={pageIndex === 0}
              >
                <ChevronLeft className="w-4 h-4" />
                Sebelumnya
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
                Selanjutnya
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
