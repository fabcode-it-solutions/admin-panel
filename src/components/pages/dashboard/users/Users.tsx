"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  UserPlus,
  Download,
  Trash2,
  Edit,
  MoreVertical,
  Users,
  UserCheck,
  UserX,
  TrendingUp,
  Eye,
  Mail,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/SearchInput";
import { Select } from "@/components/ui/Select";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Modal } from "@/components/ui/Modal";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/DropdownMenu";
import { Checkbox } from "@/components/ui/Checkbox";
import { Heading, Text } from "@/components/typography";
import { toast } from "sonner";
import { useQuery, useMutation } from "@/hooks/useApi";
import { usersService } from "@/services/users.service";
import { Loader } from "@/components/ui/Loader";
import { EmptyState } from "@/components/ui/EmptyState";
import { UserFormModal } from "@/components/pages/dashboard/users/UserFormModal";

import { User } from "@/services/auth.service";

export default function UsersPage() {
  const router = useRouter();

  // State
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Fetch users
  const {
    data: usersData,
    isLoading,
    refetch,
  } = useQuery(
    ["users", String(page), String(pageSize), search, roleFilter, statusFilter],
    () =>
      usersService.getUsers({
        page,
        limit: pageSize,
        search,
        ...(roleFilter !== "all" && { role: roleFilter }),
        ...(statusFilter !== "all" && { status: statusFilter }),
      }),
    {
      staleTime: 30000, // 30 seconds
    },
  );

  // Delete mutation
  const deleteMutation = useMutation(
    (id: string) => usersService.deleteUser(id),
    {
      onSuccess: () => {
        toast.success("User deleted successfully");
        refetch();
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to delete user");
      },
    },
  );

  // Bulk delete mutation
  const bulkDeleteMutation = useMutation(
    async (ids: string[]) => {
      await Promise.all(ids.map((id) => usersService.deleteUser(id)));
      return { data: null, success: true, message: "Users deleted" };
    },
    {
      onSuccess: () => {
        toast.success(`${selectedUsers.length} users deleted successfully`);
        setSelectedUsers([]);
        refetch();
      },
      onError: () => {
        toast.error("Failed to delete users");
      },
    },
  );

  // Stats
  const stats = useMemo(() => {
    const users = usersData?.data?.data || [];
    return {
      total: usersData?.data?.pagination?.total || 0,
      active: users.filter((u: User) => u.isActive).length,
      inactive: users.filter((u: User) => !u.isActive).length,
      admins: users.filter((u: User) => u.role === "admin").length,
    };
  }, [usersData]);

  // Table columns
  // const columns = [
  //   {
  //     key: 'select',
  //     header: '',
  //     width: '50px',
  //     cell: (_: unknown, row: User) => (
  //       <Checkbox
  //       id=''
  //         checked={selectedUsers.includes(row.id)}
  //         onChange={(checked) => {
  //           if (checked) {
  //             setSelectedUsers([...selectedUsers, row.id]);
  //           } else {
  //             setSelectedUsers(selectedUsers.filter((id) => id !== row.id));
  //           }
  //         }}
  //       />
  //     ),
  //   },
  //   {
  //     key: 'user',
  //     header: 'User',
  //     sortable: true,
  //     cell: (_: unknown, row: User) => (
  //       <div className="flex items-center space-x-3">
  //         <Avatar name={row.name} src={row.avatar} size="md" />
  //         <div>
  //           <div className="font-medium text-slate-900 dark:text-white">{row.name}</div>
  //           <div className="text-sm text-slate-500 dark:text-slate-400">{row.email}</div>
  //         </div>
  //       </div>
  //     ),
  //   },
  //   {
  //     key: 'role',
  //     header: 'Role',
  //     sortable: true,
  //     cell: (value: string) => (
  //       <Badge
  //         variant={
  //           value === 'admin'
  //             ? 'default'
  //             : value === 'editor'
  //             ? 'secondary'
  //             : 'outline'
  //         }
  //       >
  //         <Shield className="h-3 w-3 mr-1" />
  //         {value}
  //       </Badge>
  //     ),
  //   },
  //   {
  //     key: 'status',
  //     header: 'Status',
  //     sortable: true,
  //     cell: (_: unknown, row: User) => (
  //       <Badge variant={row.isActive ? 'success' : 'destructive'}>
  //         {row.isActive ? 'Active' : 'Inactive'}
  //       </Badge>
  //     ),
  //   },
  //   {
  //     key: 'createdAt',
  //     header: 'Joined',
  //     sortable: true,
  //     cell: (value: string) => new Date(value).toLocaleDateString(),
  //   },
  // {
  //   key: 'actions',
  //   header: 'Actions',
  //   width: '100px',
  //   cell: (_: unknown, row: User) => (
  //     <DropdownMenu>
  //       <DropdownMenuTrigger asChild>
  //         <Button variant="ghost" size="icon">
  //           <MoreVertical className="h-4 w-4" />
  //         </Button>
  //       </DropdownMenuTrigger>
  //       <DropdownMenuContent align="end">
  //         <DropdownMenuItem
  //           onClick={() => {
  //             setSelectedUser(row);
  //             router.push(`/dashboard/users/${row.id}`);
  //           }}
  //         >
  //           <Eye className="h-4 w-4 mr-2" />
  //           View Details
  //         </DropdownMenuItem>
  //         <DropdownMenuItem
  //           onClick={() => {
  //             setSelectedUser(row);
  //             setIsEditModalOpen(true);
  //           }}
  //         >
  //           <Edit className="h-4 w-4 mr-2" />
  //           Edit
  //         </DropdownMenuItem>
  //         <DropdownMenuItem>
  //           <Mail className="h-4 w-4 mr-2" />
  //           Send Email
  //         </DropdownMenuItem>
  //         <DropdownMenuSeparator />
  //         <DropdownMenuItem
  //           className="text-red-600 dark:text-red-400"
  //           onClick={() => {
  //             setSelectedUser(row);
  //             setIsDeleteModalOpen(true);
  //           }}
  //         >
  //           <Trash2 className="h-4 w-4 mr-2" />
  //           Delete
  //         </DropdownMenuItem>
  //       </DropdownMenuContent>
  //     </DropdownMenu>
  //   ),
  // },
  // ];

  const users = [
    {
      id: "U001",
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      isActive: true,
      createdAt: "2026-01-10T10:30:00Z",
      updatedAt: "2026-01-10T10:30:00Z",
    },
    {
      id: "U002",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "user",
      isActive: false,
      createdAt: "2026-01-12T09:00:00Z",
      updatedAt: "2026-01-12T09:00:00Z",
    },
    {
      id: "U003",
      name: "Mr. David",
      email: "david@example.com",
      role: "admin",
      isActive: true,
      createdAt: "2026-01-13T09:00:00Z",
      updatedAt: "2026-01-13T09:00:00Z",
    },
    {
      id: "U004",
      name: "William Steeph",
      email: "william@example.com",
      role: "user",
      isActive: false,
      createdAt: "2026-01-15T09:00:00Z",
      updatedAt: "2026-01-15T09:00:00Z",
    },
  ];

  const totalItems = users.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const columns = [
    {
      key: "srNo",
      header: "Sr. No.",
      sortable: false,
      cell: (_: unknown, __: User, index: number) => index + 1,
    },
    {
      key: "id",
      header: "User ID",
      sortable: true,
      // cell: (value: string) => (
      //   <span className="font-mono text-sm">{value}</span>
      // ),
    },
    {
      key: "name",
      header: "Username",
      sortable: true,
      // cell: (value: string) => (
      //   <div className="font-medium text-slate-900 dark:text-white">
      //     {value}
      //   </div>
      // ),
    },
    {
      key: "email",
      header: "Email",
      sortable: true,
      // cell: (value: string) => (
      //   <span className="text-slate-600 dark:text-slate-400">{value}</span>
      // ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      cell: (_: unknown, row: User) => (
        <Badge variant={row.isActive ? "success" : "destructive"}>
          {row.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      header: "Created At",
      sortable: true,
      cell: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: "actions",
      header: "Actions",
      width: "100px",
      cell: (_: unknown, row: User) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                setSelectedUser(row);
                router.push(`/dashboard/users/${row.id}`);
              }}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSelectedUser(row);
                setIsEditModalOpen(true);
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 dark:text-red-400"
              onClick={() => {
                setSelectedUser(row);
                setIsDeleteModalOpen(true);
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedUsers.length === 0) {
      toast.error("Please select users to delete");
      return;
    }
    if (
      confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)
    ) {
      bulkDeleteMutation.mutate(selectedUsers);
    }
  };

  // Handle export
  const handleExport = () => {
    toast.success("Export started. You will receive an email when ready.");
    // Implement export logic here
  };

  if (isLoading && !usersData) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Heading as={"h3"} className="mb-2">
            Users Management
          </Heading>
          <Text className="text-slate-600 dark:text-slate-400">
            Manage your users, roles, and permissions
          </Text>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Text className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  Total Users
                </Text>
                <Heading as={"h2"} className="text-3xl">
                  {stats.total}
                </Heading>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm text-green-600 dark:text-green-400">
              <TrendingUp className="h-4 w-4 mr-1" />
              12% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Text className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  Active Users
                </Text>
                <Heading as={"h2"} className="text-3xl">
                  {stats.active}
                </Heading>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm text-slate-600 dark:text-slate-400">
              {((stats.active / stats.total) * 100).toFixed(0)}% of total
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Text className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  Inactive Users
                </Text>
                <Heading as={"h2"} className="text-3xl">
                  {stats.inactive}
                </Heading>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <UserX className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm text-slate-600 dark:text-slate-400">
              {((stats.inactive / stats.total) * 100).toFixed(0)}% of total
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Text className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  Administrators
                </Text>
                <Heading as={"h2"} className="text-3xl">
                  {stats.admins}
                </Heading>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm text-slate-600 dark:text-slate-400">
              {((stats.admins / stats.total) * 100).toFixed(0)}% of total
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1 max-w-md">
              <SearchInput
                placeholder="Search users..."
                onSearch={setSearch}
                className="w-full"
              />
            </div>

            <div className="flex items-center gap-2">
              <Select
                options={[
                  { value: "all", label: "All Roles" },
                  { value: "admin", label: "Admin" },
                  { value: "editor", label: "Editor" },
                  { value: "user", label: "User" },
                ]}
                value={roleFilter}
                onChange={setRoleFilter}
                className="w-32"
              />
              <Select
                options={[
                  { value: "all", label: "All Status" },
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                ]}
                value={statusFilter}
                onChange={setStatusFilter}
                className="w-32"
              />
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <div className="mt-4 flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Text className="text-sm font-medium">
                {selectedUsers.length} user(s) selected
              </Text>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedUsers([])}
                >
                  Clear Selection
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleBulkDelete}
                  loading={bulkDeleteMutation.isLoading}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected
                </Button>
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent>
          {usersData?.data?.data?.length === 0 ? (
            <EmptyState
              icon={<Users className="h-24 w-24" />}
              title="No users found"
              description="Try adjusting your filters or add a new user"
              action={
                <Button onClick={() => setIsAddModalOpen(true)}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              }
            />
          ) : (
            <>
              <Table
                columns={columns}
                // data={usersData?.data?.data || []}
                data={users}
                loading={isLoading}
                striped
                hoverable
              />

              <div className="mt-4">
                {/* <Pagination
                  currentPage={page}
                  totalPages={usersData?.data?.pagination?.totalPages || 1}
                  totalItems={usersData?.data?.pagination?.total}
                  pageSize={pageSize}
                  onPageChange={setPage}
                  onPageSizeChange={setPageSize}
                  showPageSize
                /> */}
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  pageSize={pageSize}
                  onPageChange={setPage}
                  onPageSizeChange={setPageSize}
                  showPageSize
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedUser(null);
        }}
        title="Delete User"
        size="md"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedUser(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                selectedUser?.id && deleteMutation.mutate(selectedUser.id)
              }
              loading={deleteMutation.isLoading}
            >
              Delete
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Text>
            Are you sure you want to delete{" "}
            <strong>{selectedUser?.name}</strong>? This action cannot be undone.
          </Text>
          {selectedUser && (
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <Avatar
                  name={selectedUser.name}
                  src={selectedUser.avatar}
                  size="lg"
                />
                <div>
                  <div className="font-medium">{selectedUser.name}</div>
                  <div className="text-sm text-slate-500">
                    {selectedUser.email}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Add User Modal */}
      <UserFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={refetch}
      />

      {/* Edit User Modal */}
      <UserFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={selectedUser}
        onSuccess={refetch}
      />
    </div>
  );
}
