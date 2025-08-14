import { useState, useEffect, useMemo } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Users,
  UserPlus2,
  Eye,
  Edit,
  Trash,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ModalUserDetail from "../components/user/ModalUserDetail";
import DeleteWithConfirm from "../components/user/DeleteWithConfirm";
import usePageTitle from "../hooks/usePageTitle";

const User = () => {
  usePageTitle('Latihan SIFina | Pengguna');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/users?limit=119");
      const data = await response.json();
      setUsers(data.users);
      setError(null);
    } catch (err) {
      setError("Gagal mengambil data pengguna");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/retribusi/pengguna/edit/${id}`);
  };

  const handleDelete = (deletedId) => {
    setUsers((prev) => prev.filter((user) => user.id !== deletedId));
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown className="w-4 h-4" />;
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="w-4 h-4" />
    ) : (
      <ArrowDown className="w-4 h-4" />
    );
  };

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm) ||
        user.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company.department
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        user.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.address.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue, bValue;

        if (sortConfig.key.includes(".")) {
          const keys = sortConfig.key.split(".");
          aValue = keys.reduce((obj, key) => obj?.[key], a);
          bValue = keys.reduce((obj, key) => obj?.[key], b);
        } else {
          aValue = a[sortConfig.key];
          bValue = b[sortConfig.key];
        }

        if (typeof aValue === "string") {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [users, searchTerm, sortConfig]);

  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredAndSortedUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  if (loading) {
    return (
      <div className="w-full">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-center text-red-600">
            <p className="text-lg font-semibold">Error</p>
            <p>{error}</p>
            <button
              onClick={fetchUsers}
              className="mt-4 px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex gap-2 text-2xl mb-4 md:mb-0">
        <Users className="w-8 h-8" />
        <p className="font-bold">Daftar Pengguna</p>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="pt-4">
          <Link
            to={"/retribusi/pengguna/tambah"}
            className="bg-sky-500 px-4 py-2 rounded-xl text-white flex items-center gap-2 cursor-pointer hover:bg-sky-600"
          >
            <UserPlus2 className="w-5 h-5" />
            <span>Tambah Pengguna</span>
          </Link>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Cari pengguna..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Card Container */}
      <div className="bg-white rounded-lg shadow-sm border">
        {/* Controls */}
        <div className="p-4 border-b bg-gray-50 rounded-t-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Tampilkan</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-sm text-gray-600">entri</span>
            </div>
          </div>
        </div>

        {/* Table Container with Horizontal Scroll */}
        <div className="w-full overflow-x-auto">
          <table className="min-w-[1500px] table-fixed">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("id")}
                >
                  <div className="flex items-center gap-1">
                    ID
                    {getSortIcon("id")}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("firstName")}
                >
                  <div className="flex items-center gap-1">
                    Nama Depan
                    {getSortIcon("firstName")}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("lastName")}
                >
                  <div className="flex items-center gap-1">
                    Nama Belakang
                    {getSortIcon("lastName")}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("email")}
                >
                  <div className="flex items-center gap-1">
                    Email
                    {getSortIcon("email")}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("phone")}
                >
                  <div className="flex items-center gap-1">
                    Telepon
                    {getSortIcon("phone")}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("age")}
                >
                  <div className="flex items-center gap-1">
                    Usia
                    {getSortIcon("age")}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("gender")}
                >
                  <div className="flex items-center gap-1">
                    Gender
                    {getSortIcon("gender")}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("birthDate")}
                >
                  <div className="flex items-center gap-1">
                    Tanggal Lahir
                    {getSortIcon("birthDate")}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("bloodGroup")}
                >
                  <div className="flex items-center gap-1">
                    Golongan Darah
                    {getSortIcon("bloodGroup")}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("height")}
                >
                  <div className="flex items-center gap-1">
                    Tinggi Badan
                    {getSortIcon("height")}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("weight")}
                >
                  <div className="flex items-center gap-1">
                    Berat Badan
                    {getSortIcon("weight")}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("eyeColor")}
                >
                  <div className="flex items-center gap-1">
                    Warna Mata
                    {getSortIcon("eyeColor")}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("hair.color")}
                >
                  <div className="flex items-center gap-1">
                    Warna Rambut
                    {getSortIcon("hair.color")}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("company.name")}
                >
                  <div className="flex items-center gap-1">
                    Perusahaan
                    {getSortIcon("company.name")}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("company.title")}
                >
                  <div className="flex items-center gap-1">
                    Jabatan
                    {getSortIcon("company.title")}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("company.department")}
                >
                  <div className="flex items-center gap-1">
                    Departemen
                    {getSortIcon("company.department")}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("address.address")}
                >
                  <div className="flex items-center gap-1">
                    Alamat
                    {getSortIcon("address.address")}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("address.city")}
                >
                  <div className="flex items-center gap-1">
                    Kota
                    {getSortIcon("address.city")}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("address.state")}
                >
                  <div className="flex items-center gap-1">
                    Negara Bagian
                    {getSortIcon("address.state")}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("address.postalCode")}
                >
                  <div className="flex items-center gap-1">
                    Kode Pos
                    {getSortIcon("address.postalCode")}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("university")}
                >
                  <div className="flex items-center gap-1">
                    Universitas
                    {getSortIcon("university")}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 sticky right-0 z-10 border-l border-gray-200">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.id}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <img
                        className="h-8 w-8 rounded-full mr-3"
                        src={user.image}
                        alt={`${user.firstName} ${user.lastName}`}
                      />
                      {user.firstName}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.lastName}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.phone}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.age}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.gender === "male"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-pink-100 text-pink-800"
                      }`}
                    >
                      {user.gender === "male" ? "Pria" : "Wanita"}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(user.birthDate).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                      {user.bloodGroup}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.height} cm
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.weight} kg
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border"
                        style={{
                          backgroundColor:
                            user.eyeColor === "Brown"
                              ? "#8B4513"
                              : user.eyeColor === "Blue"
                              ? "#0066CC"
                              : user.eyeColor === "Green"
                              ? "#228B22"
                              : user.eyeColor === "Gray"
                              ? "#808080"
                              : user.eyeColor === "Amber"
                              ? "#FFBF00"
                              : "#000",
                        }}
                      ></div>
                      {user.eyeColor}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border"
                        style={{
                          backgroundColor:
                            user.hair.color === "Brown"
                              ? "#8B4513"
                              : user.hair.color === "Black"
                              ? "#000000"
                              : user.hair.color === "Blonde"
                              ? "#FFF8DC"
                              : user.hair.color === "Red"
                              ? "#DC143C"
                              : user.hair.color === "Gray"
                              ? "#808080"
                              : user.hair.color === "Auburn"
                              ? "#A52A2A"
                              : "#654321",
                        }}
                      ></div>
                      {user.hair.color}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 max-w-40 truncate">
                    {user.company.name}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 max-w-32 truncate">
                    {user.company.title}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.company.department}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 max-w-48 truncate">
                    {user.address.address}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.address.city}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.address.state}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.address.postalCode}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 max-w-44 truncate">
                    {user.university}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 bg-white sticky right-0 z-10 border-l border-gray-200">
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleView(user)}
                        className="bg-blue-100 border-blue-500 p-2 rounded-full text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        <Eye className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleEdit(user.id)}
                        className="bg-yellow-100 border-yellow-600 p-2 rounded-full text-yellow-600 hover:text-yellow-800 cursor-pointer"
                      >
                        <Edit className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => setUserToDelete(user)}
                        className="bg-red-100 border p-2 rounded-full text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <Trash className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 bg-gray-50 border-t rounded-b-lg ">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              Menampilkan {startIndex + 1} -{" "}
              {Math.min(
                startIndex + itemsPerPage,
                filteredAndSortedUsers.length
              )}{" "}
              dari {filteredAndSortedUsers.length} entri
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
                className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex gap-1">
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => goToPage(pageNumber)}
                      className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                        currentPage === pageNumber
                          ? "bg-sky-500 text-white"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ModalUserDetail
        user={selectedUser}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
      {userToDelete && (
        <DeleteWithConfirm
          id={userToDelete.id}
          name={`${userToDelete.firstName} ${userToDelete.lastName}`}
          onDeleted={(id) => {
            handleDelete(id);
            setUserToDelete(null);
          }}
          onClose={() => setUserToDelete(null)}
        />
      )}
    </div>
  );
};

export default User;
