"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Shield,
  Calendar,
  UserCheck,
  UserX,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Heading, Text } from "@/components/typography";

export default function UserDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  //  STATIC USER DATA (replace with API later)
  const user = {
    id: Array.isArray(id) ? id[0] : id || "",
    name: "John Doe",
    email: "john@gmail.com",
    role: "admin",
    isActive: true,
    createdAt: "2026-01-10T10:30:00Z",
    lastLogin: "2026-01-18T14:20:00Z",
    avatar: "",
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Heading as="h3">User Details</Heading>
      </div>

      <Card>
        <CardContent className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <Avatar name={user.name} src={user.avatar} size="xl" className="w-25 h-25 text-2xl"/>

          <div className="flex-1">
            <Heading as="h4">{user.name}</Heading>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge variant="outline">
                <Shield className="h-3 w-3 mr-1" />
                {user.role}
              </Badge>

              <Badge
                variant={user.isActive ? "success" : "destructive"}
              >
                {user.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>

            <div className="mt-3 text-sm text-muted-foreground flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {user.email}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button variant="outline">Edit</Button>
            <Button variant="destructive">
              {user.isActive ? "Suspend" : "Activate"}
            </Button>
          </div>
        </CardContent>
      </Card>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <Card>
          <CardHeader>
            <Heading as="h5">Account Information</Heading>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <DetailRow label="User ID" value={user.id} />
            <DetailRow
              label="Joined On"
              value={new Date(user.createdAt).toLocaleDateString()}
              icon={<Calendar className="h-4 w-4" />}
            />
            <DetailRow
              label="Last Login"
              value={new Date(user.lastLogin).toLocaleString()}
            />
          </CardContent>
        </Card>


        <Card>
          <CardHeader>
            <Heading as="h5">Status</Heading>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              {user.isActive ? (
                <UserCheck className="h-5 w-5 text-green-500" />
              ) : (
                <UserX className="h-5 w-5 text-red-500" />
              )}
              <Text>
                This user is currently{" "}
                <strong>
                  {user.isActive ? "Active" : "Inactive"}
                </strong>
              </Text>
            </div>
          </CardContent>
        </Card>
      </div>

      
      <Card>
        <CardHeader>
          <Heading as="h5">Admin Notes</Heading>
        </CardHeader>
        <CardContent>
          <Text className="text-muted-foreground">
            No notes added yet.
          </Text>
        </CardContent>
      </Card>
    </div>
  );
}


/* Reusable Detail Row */
function DetailRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="flex items-center gap-1 font-medium">
        {icon}
        {value}
      </span>
    </div>
  );
}
