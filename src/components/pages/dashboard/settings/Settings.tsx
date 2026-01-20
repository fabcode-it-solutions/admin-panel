"use client";

import { Button } from "@/components/ui/Button";
import { Flex, Heading, Text } from "@/components/typography";

interface SettingItem {
  label: string;
  description: string;
  value?: string;
  actionLabel?: string;
}

interface SettingSection {
  title: string;
  items: SettingItem[];
}

const SETTINGS_SECTIONS: SettingSection[] = [
  {
    title: "General Settings",
    items: [
      {
        label: "Application Name",
        description: "Display name used across the platform",
        value: "Admin Dashboard",
      },
      {
        label: "Default Language",
        description: "Language used for system messages",
        value: "English",
      },
    ],
  },
  {
    title: "Security",
    items: [
      {
        label: "Two-Factor Authentication",
        description: "Add an extra layer of security to admin accounts",
        actionLabel: "Enabled",
      },
      {
        label: "Session Timeout",
        description: "Auto logout after inactivity",
        value: "30 minutes",
      },
    ],
  },
  {
    title: "Notifications",
    items: [
      {
        label: "Email Notifications",
        description: "Receive important system updates via email",
        actionLabel: "Enabled",
      },
      {
        label: "System Alerts",
        description: "Notify when critical system events occur",
        actionLabel: "Enabled",
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        label: "Maintenance Mode",
        description: "Temporarily disable public access",
        actionLabel: "Disabled",
      },
      {
        label: "Data Backup",
        description: "Last backup status",
        value: "Completed",
      },
    ],
  },
];

// --------------------
// Settings Page
// --------------------
export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <Heading level="h3" className="mb-2">
          Settings
        </Heading>
        <Text className="text-slate-600 dark:text-slate-400">
          Manage application and system preferences
        </Text>
      </div>

      {/* Settings Sections */}
      {SETTINGS_SECTIONS.map((section) => (
        <div
          key={section.title}
          className="rounded-lg border p-5 space-y-4"
        >
          <Heading level="h5">{section.title}</Heading>

          {section.items.map((item) => (
            <Flex
              key={item.label}
              className="items-center justify-between"
            >
              <div>
                <Text className="font-medium">{item.label}</Text>
                <Text className="text-sm text-muted-foreground">
                  {item.description}
                </Text>
              </div>

              {item.value && <Text>{item.value}</Text>}

              {item.actionLabel && (
                <Button variant="secondary">
                  {item.actionLabel}
                </Button>
              )}
            </Flex>
          ))}
        </div>
      ))}
    </div>
  );
}
