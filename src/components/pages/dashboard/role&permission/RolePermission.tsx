"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Badge } from "@/components/ui/Badge";
import { Plus, Edit, Shield, MoreVertical, Trash2, Search } from "lucide-react";
import { Flex, Heading, Text } from "@/components/typography";
import { Drawer } from "@/components/ui/Drawer";
import { Table } from "@/components/ui/Table";
import { Input } from "@/components/ui/Input";
import { Column } from "@/types";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/DropdownMenu";
import { MediaPicker } from "@/components/ui/MediaPicker";
import { Slider } from "@/components/ui/Slider";

// ---- Static Data (Reusable for almost any project) ----
const PERMISSIONS = [
  {
    group: "Users Management",
    items: ["View Users", "Create Users", "Edit Users", "Delete Users"],
  },
  {
    group: "Roles & Permissions",
    items: ["View Roles", "Create Roles", "Edit Roles", "Delete Roles"],
  },
  {
    group: "Orders",
    items: ["View Orders", "Update Orders", "Cancel Orders"],
  },
  {
    group: "Reports",
    items: ["View Reports", "Export Reports"],
  },
];




interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string[] | "ALL";
  userCount: number;
}

const INITIAL_ROLES: Role[] = [
  {
    id: 1,
    name: "Super Admin",
    description: "Full access to all features",
    permissions: "ALL",
    userCount: 2,
  },
  {
    id: 2,
    name: "Admin",
    description: "Manage users, roles, and orders",
    permissions: ["View Users", "Create Users", "Edit Users", "View Orders"],
    userCount: 5,
  },
  {
    id: 3,
    name: "User",
    description: "Can see content only",
    permissions: ["View Users"],
    userCount: 12,
  },
];

export default function RolesAndPermissionsPage() {
  const [roles, setRoles] = useState<Role[]>(INITIAL_ROLES);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [editedPermissions, setEditedPermissions] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sliderValue, setSliderValue] = useState<number[]>([0]);
  const [rangeValue, setRangeValue] = useState<number[]>([10, 90]);


  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setEditedPermissions(
      role.permissions === "ALL" ? [] : [...role.permissions]
    );
    setIsEditing(true);
    setIsDrawerOpen(true);
  };

  const handleCreateRole = () => {
    setSelectedRole({
      id: Date.now(),
      name: "",
      description: "",
      permissions: [],
      userCount: 0,
    });
    setEditedPermissions([]);
    setIsEditing(false);
    setIsDrawerOpen(true);
  };

  const handlePermissionToggle = (permission: string) => {
    setEditedPermissions((prev) => {
      if (prev.includes(permission)) {
        return prev.filter((p) => p !== permission);
      }
      return [...prev, permission];
    });
  };

  const handleGroupToggle = (groupItems: string[]) => {
    const allSelected = groupItems.every((item) =>
      editedPermissions.includes(item)
    );

    if (allSelected) {
      setEditedPermissions((prev) =>
        prev.filter((p) => !groupItems.includes(p))
      );
    } else {
      setEditedPermissions((prev) => {
        const newPermissions = new Set([...prev, ...groupItems]);
        return Array.from(newPermissions);
      });
    }
  };

  const filteredPermissions = PERMISSIONS.map((group) => ({
    ...group,
    items: group.items.filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((group) => group.items.length > 0);

  const handleSave = () => {
    if (!selectedRole) return;

    setRoles((prev) => {
      const roleIndex = prev.findIndex((r) => r.id === selectedRole.id);
      if (roleIndex >= 0) {
        // Update existing role
        const updatedRoles = [...prev];
        updatedRoles[roleIndex] = {
          ...selectedRole,
          permissions: editedPermissions,
        };
        return updatedRoles;
      } else {
        // Add new role
        return [
          ...prev,
          {
            ...selectedRole,
            permissions: editedPermissions,
          },
        ];
      }
    });
    setIsDrawerOpen(false);
    toast.success("Role saved successfully");
  };

  const columns: Column<Role>[] = [
    {
      key: "name",
      header: "Role Name",
      cell: (_, row) => (
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Shield className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-xs text-muted-foreground">
              {row.description}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "userCount",
      header: "Users",
      cell: (value) => (
        <Badge variant="secondary" className="rounded-md">
          {value} Users
        </Badge>
      ),
    },
    {
      key: "permissions",
      header: "Permissions",
      cell: (value) =>
        value === "ALL" ? (
          <Badge variant="default">All Access</Badge>
        ) : (
          <div className="flex gap-1 flex-wrap">
            {value.slice(0, 2).map((p: string) => (
              <Badge key={p} variant="outline" className="text-xs">
                {p}
              </Badge>
            ))}
            {value.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{value.length - 2} more
              </Badge>
            )}
          </div>
        ),
    },
    {
      key: "actions",
      header: "Actions",
      cell: (_, row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEditRole(row)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Permissions
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Role
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Heading level="h3" className="mb-2">
            Role & Permission
          </Heading>
          <Text className="text-slate-600 dark:text-slate-400">
            Manage roles and their permissions
          </Text>
        </div>
        <Button onClick={handleCreateRole} className="gap-2">
          <Plus size={16} /> Create Role
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table columns={columns} data={roles} striped hoverable />
        </CardContent>
      </Card>

      {/* <MediaPicker
  onSelect={(media) => console.log(media)}
  multiple
  title="Select Media"
/> */}

{/* <Slider value={rangeValue} onValueChange={setRangeValue} showInputs showTooltip  />
<Slider value={sliderValue} onValueChange={setSliderValue} showInputs showTooltip/>     */}

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={isEditing ? `Edit Role: ${selectedRole?.name}` : "Create New Role"}
        description={
          isEditing
            ? "Modify the permissions for this role."
            : "Define a new role and its permissions."
        }
        size="lg"
        footer={
          <div className="flex justify-end gap-2 w-full">
            <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        }
      >
        <div className="space-y-6">
          {selectedRole?.permissions === "ALL" ? (
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 text-primary font-medium mb-1">
                <Shield className="h-5 w-5" />
                Super Admin Access
              </div>
              <p className="text-sm text-muted-foreground">
                This role has full system access. Permissions cannot be modified individually.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search permissions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              {filteredPermissions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No permissions found matching {searchQuery}
                </div>
              ) : (
                filteredPermissions.map((group) => {
                  const allGroupSelected = group.items.every((item) =>
                    editedPermissions.includes(item)
                  );
                  const someGroupSelected = group.items.some((item) =>
                    editedPermissions.includes(item)
                  );

                  return (
                    <div key={group.group} className="space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b">
                        <h3 className="text-sm font-medium text-foreground">
                          {group.group}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={`group-${group.group}`}
                            checked={allGroupSelected}
                            onChange={() => handleGroupToggle(group.items)}
                            // indeterminate={someGroupSelected && !allGroupSelected} // Checkbox component might not support indeterminate prop directly or needs specific handling
                          />
                          <label
                            htmlFor={`group-${group.group}`}
                            className="text-xs text-muted-foreground cursor-pointer select-none"
                          >
                            Select All
                          </label>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {group.items.map((permission) => (
                          <div
                            key={permission}
                            className={`
                          flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer
                          ${
                            editedPermissions.includes(permission)
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }
                        `}
                            onClick={() => handlePermissionToggle(permission)}
                          >
                            <Checkbox
                              id={permission}
                              checked={editedPermissions.includes(permission)}
                              onChange={() =>
                                handlePermissionToggle(permission)
                              }
                            />
                            <label
                              htmlFor={permission}
                              className="text-sm cursor-pointer select-none flex-1"
                            >
                              {permission}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
}
