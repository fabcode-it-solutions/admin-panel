"use client";

import { useState } from "react";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Flex, Heading, Text } from "@/components/typography";

// --------------------
// Types
// --------------------
type NotificationType = "success" | "error" | "warning" | "info";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

// --------------------
// Static Notification Data (Common Across Most Admin Panels)
// --------------------
const NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "error",
    title: "Payment failed",
    description: "Order #2341 payment could not be processed",
    time: "2 minutes ago",
    read: false,
  },
  {
    id: "2",
    type: "success",
    title: "User registered",
    description: "John Doe has created a new account",
    time: "10 minutes ago",
    read: false,
  },
  {
    id: "3",
    type: "warning",
    title: "Low storage warning",
    description: "Server storage is running low",
    time: "1 hour ago",
    read: true,
  },
  {
    id: "4",
    type: "info",
    title: "Role updated",
    description: "Permissions updated for Editor role",
    time: "Yesterday",
    read: true,
  },
];

// --------------------
// Helpers
// --------------------
const iconMap: Record<
  NotificationType,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const colorMap: Record<NotificationType, string> = {
  success: "text-green-600",
  error: "text-red-600",
  warning: "text-yellow-600",
  info: "text-blue-600",
};

// --------------------
// Notifications Page
// --------------------
export default function NotificationsPage() {
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const notifications = NOTIFICATIONS.filter((n) =>
    filter === "all" ? true : !n.read,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Heading level="h3" className="mb-2">
            Notifications
          </Heading>
          <Text className="text-slate-600 dark:text-slate-400">
            Manage Notifications
          </Text>
        </div>
        <Flex className="gap-1">
          <Button
            variant={"secondary"}
            onClick={() => setFilter("all")}
            className="gap-2"
          >
            All
          </Button>
          <Button
            variant={"secondary"}
            onClick={() => setFilter("unread")}
            className="gap-2"
          >
            Unread
          </Button>
        </Flex>
      </div>

      {/* Notifications List */}
      <div className="rounded-lg border divide-y">
        {notifications.length === 0 && (
          <div className="p-6 text-center text-muted-foreground">
            No notifications
          </div>
        )}

        {notifications.map((notification) => {
          const Icon = iconMap[notification.type];

          return (
            <div
              key={notification.id}
              className={cn(
                "flex gap-4 p-4 transition hover:bg-muted/50",
                !notification.read && "bg-muted/40",
              )}
            >
              {/* Icon */}
              <Icon
                className={cn(
                  "h-5 w-5 mt-1 flex-shrink-0",
                  colorMap[notification.type],
                )}
              />

              {/* Content */}
              <div className="flex-1">
                <div className="flex justify-between">
                  <p
                    className={cn(
                      "font-medium",
                      !notification.read && "font-semibold",
                    )}
                  >
                    {notification.title}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {notification.time}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
