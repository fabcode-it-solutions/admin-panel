"use client";
import React, { useState } from "react";
import { Heading, Text } from "@/components/typography";
import { Badge } from "@/components/ui/Badge";
import { Table } from "@/components/ui/Table";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Column } from "@/types";
import { SearchInput } from "@/components/ui/SearchInput";
import { Pagination } from "@/components/ui/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import {
    BarChart3,
    Calendar,
    Clock,
  Edit,
  Eye,
  FileText,
  Mail,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { Report } from "@/services/auth.service";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui/Button";

// static data
const mockReports: Report[] = [
  {
    id: "1",
    reportId: "RPT-001",
    reportedBy: "Alice Johnson",
    reportedUser: "Bob Smith",
    type: "Spam",
    description: "Sending multiple unsolicited messages.",
    status: "Pending",
    createdAt: "2024-05-01",
  },
  {
    id: "2",
    reportId: "RPT-002",
    reportedBy: "Charlie Brown",
    reportedUser: "David Wilson",
    type: "Abuse",
    description: "Using offensive language in comments.",
    status: "In Review",
    createdAt: "2024-05-02",
  },
  {
    id: "3",
    reportId: "RPT-003",
    reportedBy: "Eve Davis",
    reportedUser: "Frank Miller",
    type: "Fake",
    description: "Profile picture seems to be impersonating someone else.",
    status: "Resolved",
    createdAt: "2024-05-03",
  },
  {
    id: "4",
    reportId: "RPT-004",
    reportedBy: "Grace Lee",
    reportedUser: "Henry Taylor",
    type: "Harassment",
    description: "Persistent unwanted contact.",
    status: "Rejected",
    createdAt: "2024-05-04",
  },
  {
    id: "5",
    reportId: "RPT-005",
    reportedBy: "Ivy Martin",
    reportedUser: "Jack White",
    type: "Spam",
    description: "Posting promotional links everywhere.",
    status: "Pending",
    createdAt: "2024-05-05",
  },
];

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredReports = mockReports.filter((report) =>
    Object.values(report).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  const totalItems = filteredReports.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const paginatedReports = filteredReports.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const columns: Column<Report>[] = [
    {
          key: "srNo",
          header: "Sr. No.",
          sortable: false,
          cell: (_: unknown, __: Report, index: number) => index + 1,
        },
    {
      key: "reportId",
      header: "Report ID",
      sortable: true,
    },
    {
      key: "reportedBy",
      header: "Reported By",
      sortable: true,
    },
    {
      key: "reportedUser",
      header: "Reported User",
      sortable: true,
    },
    {
      key: "type",
      header: "Report Type",
      sortable: true,
      cell: (value) => {
        let variant: "default" | "secondary" | "destructive" | "outline" =
          "default";
        switch (value) {
          case "Spam":
            variant = "secondary";
            break;
          case "Abuse":
            variant = "destructive";
            break;
          case "Fake":
            variant = "outline";
            break;
          case "Harassment":
            variant = "destructive";
            break;
          default:
            variant = "default";
        }
        return (
          <div className="flex items-center">
            <Badge variant={variant}>{value}</Badge>
          </div>
        );
      },
    },
    // {
    //   key: "description",
    //   header: "Description",
    //   cell: (value) => (
    //     <span className="truncate max-w-50 block" title={value}>
    //       {value}
    //     </span>
    //   ),
    // },
    {
      key: "status",
      header: "Status",
      sortable: true,
      cell: (value) => {
        let variant:
          | "default"
          | "success"
          | "warning"
          | "secondary"
          | "danger"
          | "destructive" = "default";
        switch (value) {
          case "Pending":
            variant = "warning";
            break;
          case "In Review":
            variant = "secondary";
            break;
          case "Resolved":
            variant = "success";
            break;
          case "Rejected":
            variant = "destructive";
            break;
          default:
            variant = "default";
        }
        return (
          <div className="flex items-center">
            <Badge variant={variant}>{value}</Badge>
          </div>
        );
      },
    },
    {
      key: "createdAt",
      header: "Created At",
      sortable: true,
    },
    {
      key: "actions",
      header: "Actions",
      width: "100px",
      cell: (_: unknown, row: Report) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                // setSelectedUser(row);
                // router.push(`/dashboard/users/${row.id}`);
              }}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            {/* <DropdownMenuItem
              onClick={() => {
                setSelectedUser(row);
                setIsEditModalOpen(true);
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem> */}
            {/* <DropdownMenuItem>
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </DropdownMenuItem> */}
            {/* <DropdownMenuItem
              className="text-red-600 dark:text-red-400"
              onClick={() => {
                setSelectedUser(row);
                setIsDeleteModalOpen(true);
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Heading level="h3" className="mb-2">
            Users Reports
          </Heading>
          <Text className="text-slate-600 dark:text-slate-400">
            Manage your users-Reports
          </Text>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Text className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  Total Reports
                </Text>
                <Heading as={"h4"} className="text-3xl">
                  0
                </Heading>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            {/* <div className="flex items-center mt-2 text-sm text-green-600 dark:text-green-400">
              <TrendingUp className="h-4 w-4 mr-1" />
              12% from last month
            </div> */}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Text className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  Pending Reports
                </Text>
                <Heading as={"h4"} className="text-3xl">
                  0
                </Heading>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm text-slate-600 dark:text-slate-400"></div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Text className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  Most Common
                </Text>
                <Heading as={"h4"} className="text-3xl">
                  Spam
                </Heading>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm text-slate-600 dark:text-slate-400"></div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Text className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  Reports Today
                </Text>
                <Heading as={"h4"} className="text-3xl">
                  2
                </Heading>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm text-slate-600 dark:text-slate-400"></div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1 max-w-md">
              <SearchInput
                placeholder="Search reports..."
                onSearch={(value) => {
                  setSearchTerm(value);
                  setPage(1); // Reset to first page on search
                }}
                className="w-full"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {paginatedReports.length === 0 ? (
            <EmptyState
              icon={<FileText className="h-24 w-24" />}
              title="No reports found"
              description={
                searchTerm
                  ? "Try adjusting your search terms"
                  : "No reports have been submitted yet"
              }
            />
          ) : (
            <>
              <Table
                columns={columns}
                data={paginatedReports}
                striped
                hoverable
              />

              <div className="mt-4">
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
    </div>
  );
};

export default Reports;
