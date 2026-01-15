"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { SearchSelect } from "@/components/ui/SearchSelect";
import { Switch } from "@/components/ui/Switch";
import { Checkbox } from "@/components/ui/Checkbox";
import { Radio } from "@/components/ui/Radio";
import { DatePicker } from "@/components/ui/DatePicker";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { EmptyState } from "@/components/ui/EmptyState";
import { Loader } from "@/components/ui/Loader";
import { Skeleton, SkeletonCard, SkeletonText } from "@/components/ui/Skeleton";
import { Progress } from "@/components/ui/Progress";
import { Modal } from "@/components/ui/Modal";
import { Tooltip } from "@/components/ui/Tooltip";
import { Accordion } from "@/components/ui/Accordion";
import { Tabs } from "@/components/ui/Tabs";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/DropdownMenu";
import { Table, TableProps } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { SearchInput } from "@/components/ui/SearchInput";
import { Heading, Text, Container, Flex } from "@/components/typography";
import { toast } from "sonner";
import {
  Plus,
  Save,
  Edit,
  Trash,
  Mail,
  Lock,
  Settings,
  Inbox,
  Heart,
  MoreVertical,
  Sun,
  Moon,
} from "lucide-react";
import { Textarea } from "@/components/ui/Textarea";
import { useThemeStore } from "@/store/themeStore";
import { Anchor } from "@/components/ui/Anchor";
import CodeBlockDemo from "@/components/code/CodeBlock";
import {
  tableColumns,
  tableData,
  accordionItems,
  countries,
  radioOptions,
  selectOptions,
  tabs,
  buttonProps,
  buttonPropsData,
  anchorPropsData,
  inputPropsData,
  textareaPropsData,
  selectPropsData,
  searchSelectPropsData,
  switchPropsData,
  checkboxPropsData,
  radioPropsData,
  datePickerPropsData,
  badgePropsData,
  avatarPropsData,
  emptyStatePropsData,
  loaderPropsData,
  skeletonPropsData,
  skeletonHelpersData,
  skeletonHelpersprop,
  progressPropsData,
  modalPropsData,
  tooltipPropsData,
  accordionPropsData,
  tabsPropsData,
  breadcrumbsPropsData,
  dropdownMenuPropsData,
  searchInputPropsData,
  tablePropsData,
  paginationPropsData,
  headingPropsData,
  textPropsData,
  flexPropsData,
  containerPropsData,
} from "./data";
import { Column } from "@/types";
import Divider from "@/components/ui/Divider";
import PageSidebar from "./Sidebar";
import MainHeader from "@/components/layout/MainHeader";

export default function ComponentsShowcase() {
  const { toggleTheme, resolvedTheme } = useThemeStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("option1");
  const [selectValue, setSelectValue] = useState("");
  const [searchSelectValue, setSearchSelectValue] = useState("");
  const [date, setDate] = useState<Date>();
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>
      <MainHeader />

      <Container size="full" padding="lg">
        <div className="absolute top-6 right-6">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>

        <div className="space-y-8 py-12">
          {/* Header */}
          <div className="space-y-2 ">
            <Heading level="h1">Components Showcase</Heading>
            <Text variant="muted" size="lg">
              A comprehensive overview of all available UI components with live
              examples.
            </Text>
          </div>
          <div className="flex">
            <PageSidebar />

            <div className="space-y-5 w-full pl-4">
              {/* Buttons Section */}
              <Card id="buttons">
                <CardHeader>
                  <CardTitle>Form Buttons</CardTitle>
                  <CardDescription>
                    Various button styles and states
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Text size="sm" weight="medium" className="mb-3">
                        Variants
                      </Text>
                      <Flex gap="sm" wrap="wrap">
                        <Button variant="default">Default</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="link">Link</Button>
                        <Button variant="destructive">Destructive</Button>
                        <Button variant="success">Success</Button>
                        <Button variant="warning">Warning</Button>
                      </Flex>
                    </div>

                    <div>
                      <Text size="sm" weight="medium" className="mb-3">
                        Sizes
                      </Text>
                      <Flex gap="sm" wrap="wrap" align="center">
                        <Button size="sm">Small</Button>
                        <Button size="md">Medium</Button>
                        <Button size="lg">Large</Button>
                        <Button size="xl">Extra Large</Button>
                      </Flex>
                    </div>

                    <div>
                      <Text size="sm" weight="medium" className="mb-3">
                        With Icons
                      </Text>
                      <Flex gap="sm" wrap="wrap">
                        <Button leftIcon={<Plus />}>Add Item</Button>
                        <Button rightIcon={<Save />} variant="success">
                          Save
                        </Button>
                        <Button size="icon" variant="outline">
                          <Settings />
                        </Button>
                      </Flex>
                    </div>

                    <div>
                      <Text size="sm" weight="medium" className="mb-3">
                        States
                      </Text>
                      <Flex gap="sm" wrap="wrap">
                        <Button loading>Loading</Button>
                        <Button disabled>Disabled</Button>
                      </Flex>
                    </div>
                    <div>
                      <Text size="sm" weight="medium" className="mb-3">
                        Full Width
                      </Text>
                      <Flex gap="sm" wrap="wrap">
                        <Button fullWidth>Full Width</Button>
                      </Flex>
                    </div>
                    <PropsBlock
                      snippet={`import { Button } from "@/components/ui/Button";
<Button variant="default">Default</Button>`}
                      columns={buttonProps}
                      data={buttonPropsData}
                    />
                  </div>
                </CardContent>
              </Card>
              {/* Anchors Section */}
              <Card id="anchors">
                <CardHeader>
                  <CardTitle>Anchors (Link) (a tag)</CardTitle>
                  <CardDescription>
                    Various Anchor styles and states
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Text size="sm" weight="medium" className="mb-3">
                        Variants
                      </Text>
                      <Flex gap="sm" wrap="wrap">
                        <Anchor href="#" variant="default">
                          Default
                        </Anchor>
                        <Anchor href="#" variant="secondary">
                          Secondary
                        </Anchor>
                        <Anchor href="#" variant="outline">
                          Outline
                        </Anchor>
                        <Anchor href="#" variant="ghost">
                          Ghost
                        </Anchor>
                        <Anchor href="#" variant="link">
                          Link
                        </Anchor>
                        <Anchor href="#" variant="destructive">
                          Destructive
                        </Anchor>
                        <Anchor href="#" variant="success">
                          Success
                        </Anchor>
                        <Anchor href="#" variant="warning">
                          Warning
                        </Anchor>
                      </Flex>
                    </div>

                    <div>
                      <Text size="sm" weight="medium" className="mb-3">
                        Sizes
                      </Text>
                      <Flex gap="sm" wrap="wrap" align="center">
                        <Anchor href="#" size="sm">
                          Small
                        </Anchor>
                        <Anchor href="#" size="md">
                          Medium
                        </Anchor>
                        <Anchor href="#" size="lg">
                          Large
                        </Anchor>
                        <Anchor href="#" size="xl">
                          Extra Large
                        </Anchor>
                      </Flex>
                    </div>

                    <div>
                      <Text size="sm" weight="medium" className="mb-3">
                        With Icons
                      </Text>
                      <Flex gap="sm" wrap="wrap">
                        <Anchor href="#" leftIcon={<Plus />}>
                          Add Item
                        </Anchor>
                        <Anchor href="#" rightIcon={<Save />} variant="success">
                          Save
                        </Anchor>
                        <Anchor href="#" size="icon" variant="outline">
                          <Settings />
                        </Anchor>
                      </Flex>
                    </div>

                    <div>
                      <Text size="sm" weight="medium" className="mb-3">
                        States
                      </Text>
                      <Flex gap="sm" wrap="wrap">
                        <Anchor href="#" loading>
                          Loading
                        </Anchor>
                      </Flex>
                    </div>

                    <div>
                      <Text size="sm" weight="medium" className="mb-3">
                        Full Width
                      </Text>
                      <Flex gap="sm" wrap="wrap" className="w-full">
                        <Anchor href="#" fullWidth>
                          Full Width
                        </Anchor>
                      </Flex>
                    </div>
                    <PropsBlock
                      snippet={`import { Anchor } from "@/components/ui/Anchor";
<Anchor variant="default">Default</Anchor>`}
                      columns={buttonProps}
                      data={anchorPropsData}
                    />
                  </div>
                </CardContent>
              </Card>
              {/* Input Components */}
              <Card id="inputs">
                <CardHeader id="input">
                  <CardTitle>Input Components</CardTitle>
                  <CardDescription>
                    Text inputs, textareas, and password fields
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Email"
                      type="email"
                      placeholder="Enter email"
                      leftIcon={<Mail className="h-4 w-4" />}
                    />
                    <Input
                      label="Password"
                      type="password"
                      placeholder="Enter password"
                      leftIcon={<Lock className="h-4 w-4" />}
                    />
                    <Input
                      label="With Error"
                      placeholder="Enter something"
                      error="This field is required"
                    />
                    <Input
                      label="With Helper Text"
                      placeholder="Enter username"
                      helperText="Choose a unique username"
                    />
                    <PropsBlock
                      snippet={`import { Input } from "@/components/ui/Input";
<Input type="email"/>">Default</Anchor>`}
                      columns={buttonProps}
                      data={inputPropsData}
                    />

                    <div className="md:col-span-2 space-y-3" id="textarea">
                      <Text size={"lg"} weight={"semibold"} className="mb-3">
                        Textarea
                      </Text>
                      <Textarea
                        label="Description"
                        placeholder="Enter description"
                        rows={4}
                        helperText="Maximum 200 characters"
                        charLimit={200}
                      />
                    </div>
                    <PropsBlock
                      snippet={`import { Textarea } from "@/components/ui/Textarea";
<Textarea
  label="Textarea"
  placeholder="Enter description"
  rows={4}
  helperText="Maximum 500 characters"
/>`}
                      columns={buttonProps}
                      data={textareaPropsData}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Selection Components */}
              <Card id="selection">
                <CardHeader>
                  <CardTitle>Selection Components</CardTitle>
                  <CardDescription>
                    Dropdowns, switches, checkboxes, and radios
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4" id="select">
                    <Text size={"lg"} weight={"semibold"} className="mb-3">
                      Select
                    </Text>
                    <Select
                      label="Select Fruit"
                      options={selectOptions}
                      value={selectValue}
                      onChange={setSelectValue}
                      placeholder="Select a fruit"
                    />
                    <PropsBlock
                      snippet={`import { Select } from "@/components/ui/Select";
<Select
  label="Select Fruit"
  options={selectOptions}
  value={selectValue}
  onChange={setSelectValue}
  placeholder="Select a fruit"
/>`}
                      columns={buttonProps}
                      data={selectPropsData}
                    />
                  </div>
                  <Divider />
                  <div className="space-y-4" id="select-search">
                    <Text size={"lg"} weight={"semibold"} className="mb-3">
                      Select with search
                    </Text>
                    <SearchSelect
                      label="Select Country"
                      options={countries}
                      value={searchSelectValue}
                      onChange={setSearchSelectValue}
                      placeholder="Select country"
                      searchPlaceholder="Search countries..."
                    />
                    <PropsBlock
                      snippet={`import { SearchSelect } from "@/components/ui/SearchSelect";
<SearchSelect
  label="Select Country"
  options={countries}
  value={searchSelectValue}
  onChange={setSearchSelectValue}
  placeholder="Select country"
  searchPlaceholder="Search countries..."
/>`}
                      columns={buttonProps}
                      data={searchSelectPropsData}
                    />
                    <Divider />
                    <div id="switch" />
                    <Text size={"lg"} weight={"semibold"} className="mb-3">
                      Switch / Toggle
                    </Text>
                    <Switch
                      label="Enable Notifications"
                      description="Receive email notifications"
                      checked={switchChecked}
                      onCheckedChange={setSwitchChecked}
                    />
                    <PropsBlock
                      snippet={`import { Switch } from "@/components/ui/Switch";
<Switch
  label="Enable Notifications"
  description="Receive email notifications"
  checked={switchChecked}
  onCheckedChange={setSwitchChecked}
/>`}
                      columns={buttonProps}
                      data={switchPropsData}
                    />
                    <div id="checkbox" />
                    <Text size={"lg"} weight={"semibold"} className="mb-3">
                      Checkbox
                    </Text>
                    <Checkbox
                      id="accept-terms"
                      label="Accept terms and conditions"
                      checked={checkboxChecked}
                      onChange={(e) => setCheckboxChecked(e.target.checked)}
                    />
                    <PropsBlock
                      snippet={`import { Checkbox } from "@/components/ui/Checkbox";
<Checkbox
  id="accept-terms"
  label="Accept terms and conditions"
  checked={checkboxChecked}
  onChange={(e) => setCheckboxChecked(e.target.checked)}
/>`}
                      columns={buttonProps}
                      data={checkboxPropsData}
                    />
                    <div id="radio" />
                    <Text size={"lg"} weight={"semibold"} className="mb-3">
                      Radio
                    </Text>
                    <Radio
                      label="Choose an option"
                      name="options"
                      options={radioOptions}
                      value={radioValue}
                      onChange={setRadioValue}
                      orientation="horizontal"
                    />
                    <PropsBlock
                      snippet={`import { Radio } from "@/components/ui/Radio";
<Radio
  label="Choose an option"
  name="options"
  options={radioOptions}
  value={radioValue}
  onChange={setRadioValue}
  orientation="horizontal"
/>`}
                      columns={buttonProps}
                      data={radioPropsData}
                    />
                    <div id="date" />
                    <Text size={"lg"} weight={"semibold"} className="mb-3">
                      Date Picker
                    </Text>
                    <DatePicker
                      label="Select Date"
                      value={date}
                      onChange={setDate}
                      placeholder="Pick a date"
                    />
                    <PropsBlock
                      snippet={`import { Radio } from "@/components/ui/Radio";
<DatePicker
  label="Select Date"
  value={date}
  onChange={setDate}
  placeholder="Pick a date"
/>`}
                      columns={buttonProps}
                      data={datePickerPropsData}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Display Components */}
              <Card id="display">
                <CardHeader>
                  <CardTitle>Display Components</CardTitle>
                  <CardDescription>
                    Badges, avatars, and empty states
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div id="badges" />
                      <Text size={"lg"} weight={"semibold"} className="mb-3">
                        Badges
                      </Text>
                      <Flex gap="sm" wrap="wrap">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="destructive">Error</Badge>
                        <Badge variant="success">Success</Badge>
                        <Badge variant="warning">Warning</Badge>
                        <Badge variant="info">Info</Badge>
                        <Badge variant="outline">Outline</Badge>
                        <Badge variant="success" dot>
                          Online
                        </Badge>
                      </Flex>
                    </div>
                    <PropsBlock
                      snippet={`import { Badge } from "@/components/ui/Badge";
<Badge>Default</Badge>`}
                      columns={buttonProps}
                      data={badgePropsData}
                    />
                    <div>
                      <div id="avatars" />
                      <Text size={"lg"} weight={"semibold"} className="mb-3">
                        Avatars
                      </Text>
                      <Flex gap="sm" wrap="wrap" align="center">
                        <Avatar name="John Doe" size="xs" />
                        <Avatar name="Jane Smith" size="sm" />
                        <Avatar name="Bob Johnson" size="md" />
                        <Avatar name="Alice Brown" size="lg" />
                        <Avatar name="Charlie Wilson" size="xl" />
                      </Flex>
                    </div>
                    <PropsBlock
                      snippet={`import { Avatar } from "@/components/ui/Avatar";
<Avatar name="John Doe" size="xs" />`}
                      columns={buttonProps}
                      data={avatarPropsData}
                    />
                    <div>
                      <div id="empty-state" />
                      <Text size={"lg"} weight={"semibold"} className="mb-3">
                        Empty State
                      </Text>

                      <EmptyState
                        icon={<Inbox className="h-12 w-12" />}
                        title="No items found"
                        description="Get started by creating your first item"
                        action={
                          <Button leftIcon={<Plus />}>Create Item</Button>
                        }
                      />
                    </div>
                    <PropsBlock
                      snippet={`import { EmptyState } from "@/components/ui/EmptyState";
<EmptyState
  icon={<Inbox className="h-12 w-12" />}
  title="No items found"
  description="Get started by creating your first item"
  action={<Button leftIcon={<Plus />}>Create Item</Button>}
/>`}
                      columns={buttonProps}
                      data={emptyStatePropsData}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Feedback Components */}
              <Card id="feedback">
                <CardHeader>
                  <CardTitle>Feedback Components</CardTitle>
                  <CardDescription>
                    Loaders, skeletons, progress bars, and toasts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div id="loaders" />
                      <Text size={"lg"} weight={"semibold"} className="mb-3">
                        Loaders
                      </Text>

                      <Flex gap="md" wrap="wrap" align="center">
                        <Loader variant="spinner" size="sm" />
                        <Loader variant="spinner" size="md" />
                        <Loader variant="spinner" size="lg" />
                        <Loader variant="dots" size="md" />
                        <Loader variant="pulse" size="md" />
                        <Loader text="Loading..." />
                      </Flex>
                    </div>
                    <PropsBlock
                      snippet={`import { Loader } from "@/components/ui/Loader";
<Loader variant="spinner" size="sm" />`}
                      columns={buttonProps}
                      data={loaderPropsData}
                    />
                    <div>
                      <div id="skeletons" />
                      <Text size={"lg"} weight={"semibold"} className="mb-3">
                        Skeletons
                      </Text>
                      <div className="space-y-3">
                        <Skeleton width="60%" height={20} />
                        <Skeleton width="80%" height={20} />
                        <Skeleton width="40%" height={20} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <SkeletonCard />
                          <SkeletonText lines={4} />
                        </div>
                      </div>
                    </div>
                    <PropsBlock
                      snippet={`import { Skeleton } from "@/components/ui/Skeleton";
<Skeleton width="60%" height={20} />`}
                      columns={buttonProps}
                      data={skeletonPropsData}
                    />
                    <PropsBlock
                      snippet={`import {  SkeletonCard, SkeletonText } from "@/components/ui/Skeleton";
<SkeletonCard />
<SkeletonText lines={4} />`}
                      columns={skeletonHelpersprop}
                      data={skeletonHelpersData}
                    />
                    <div>
                      <div id="progress-bars" />
                      <Text size={"lg"} weight={"semibold"} className="mb-3">
                        Progress Bars
                      </Text>
                      <div className="space-y-3">
                        <Progress value={75} showLabel />
                        <Progress value={90} variant="success" showLabel />
                        <Progress value={50} variant="warning" showLabel />
                        <Progress value={25} variant="danger" showLabel />
                      </div>
                    </div>
                    <PropsBlock
                      snippet={`import {  Progress } from "@/components/ui/Progress";
<Progress value={90} variant="success" showLabel />`}
                      columns={buttonProps}
                      data={progressPropsData}
                    />
                    <div>
                      <div id="toasts" />
                      <Text size={"lg"} weight={"semibold"} className="mb-3">
                        Toasts
                      </Text>
                      <Flex gap="sm" wrap="wrap">
                        <Button
                          onClick={() => toast.success("Success message!")}
                        >
                          Success Toast
                        </Button>
                        <Button
                          onClick={() => toast.error("Error message!")}
                          variant="destructive"
                        >
                          Error Toast
                        </Button>
                        <Button
                          onClick={() => toast.warning("Warning message!")}
                          variant="warning"
                        >
                          Warning Toast
                        </Button>
                        <Button
                          onClick={() => toast.info("Info message!")}
                          variant="outline"
                        >
                          Info Toast
                        </Button>
                      </Flex>
                    </div>
                    <PropsBlock
                      snippet={`import { toast } from "sonner";
toast.success("Success message!")
toast.error("Error message!")
toast.warning("Warning message!")
toast.info("Info message!")`}
                      columns={[]}
                      data={[]}
                    />
                    <div>
                      <div id="modal" />
                      <Text size={"lg"} weight={"semibold"} className="mb-3">
                        Modal
                      </Text>
                      <Button onClick={() => setIsModalOpen(true)}>
                        Open Modal
                      </Button>
                      <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        title="Modal Title"
                        description="This is a modal description"
                        footer={
                          <>
                            <Button
                              variant="outline"
                              onClick={() => setIsModalOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button onClick={() => setIsModalOpen(false)}>
                              Confirm
                            </Button>
                          </>
                        }
                      >
                        <Text>
                          This is the modal content. You can put any content
                          here.
                        </Text>
                      </Modal>
                    </div>
                    <PropsBlock
                      snippet={`import {  Modal } from "@/components/ui/Modal";
<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Modal Title"
  description="This is a modal description"
  footer={
    <>
      <Button
        variant="outline"
        onClick={() => setIsModalOpen(false)}
      >
        Cancel
      </Button>
      <Button onClick={() => setIsModalOpen(false)}>
        Confirm
      </Button>
    </>
  }
>
  <Text>
    This is the modal content. You can put any content here.
  </Text>
</Modal>`}
                      columns={buttonProps}
                      data={modalPropsData}
                    />
                    <div>
                      <div id="tooltips" />
                      <Text size={"lg"} weight={"semibold"} className="mb-3">
                        Tooltips
                      </Text>
                      <Flex gap="sm" wrap="wrap">
                        <Tooltip content="This is a tooltip" side="top">
                          <Button variant="outline">Hover (Top)</Button>
                        </Tooltip>
                        <Tooltip content="Right tooltip" side="right">
                          <Button variant="outline">Hover (Right)</Button>
                        </Tooltip>
                        <Tooltip content="Bottom tooltip" side="bottom">
                          <Button variant="outline">Hover (Bottom)</Button>
                        </Tooltip>
                        <Tooltip content="Left tooltip" side="left">
                          <Button variant="outline">Hover (Left)</Button>
                        </Tooltip>
                      </Flex>
                    </div>
                    <PropsBlock
                      snippet={`import {  Tooltip } from "@/components/ui/Tooltip";
 <Tooltip content="This is a tooltip" side="top">
                   Add element here
                  </Tooltip>`}
                      columns={buttonProps}
                      data={tooltipPropsData}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Accordion */}
              <Card id="accordion">
                <CardHeader>
                  <CardTitle>Accordion</CardTitle>
                  <CardDescription>Expandable content sections</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Accordion type="single" items={accordionItems} collapsible />
                  <PropsBlock
                    snippet={`import {  Accordion } from "@/components/ui/Accordion";
<Accordion type="single" items={accordionItems} collapsible />`}
                    columns={buttonProps}
                    data={accordionPropsData}
                  />
                </CardContent>
              </Card>

              {/* Navigation Components */}
              <Card id="navigation">
                <CardHeader>
                  <CardTitle>Navigation Components</CardTitle>
                  <CardDescription>
                    Tabs, breadcrumbs, and dropdown menus
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div id="tabs" />
                      <Text size={"lg"} weight={"semibold"} className="mb-3">
                        Tabs
                      </Text>
                      <Tabs tabs={tabs} />
                    </div>
                    <PropsBlock
                      snippet={`import {  Tabs } from "@/components/ui/Tabs";
<Tabs tabs={tabs} />`}
                      columns={buttonProps}
                      data={tabsPropsData}
                    />

                    <div>
                      <div id="breadcrumbs" />
                      <Text size={"lg"} weight={"semibold"} className="mb-3">
                        Breadcrumbs
                      </Text>
                      <Breadcrumbs
                        items={[
                          { label: "Home", href: "/" },
                          { label: "Components", href: "/components" },
                          { label: "Showcase" },
                        ]}
                      />
                    </div>
                    <PropsBlock
                      snippet={`import {  Breadcrumbs } from "@/components/ui/Breadcrumbs";
<Breadcrumbs
  items={[
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Showcase" },
  ]}
/>`}
                      columns={buttonProps}
                      data={breadcrumbsPropsData}
                    />
                    <div>
                      <div id="dropdown" />
                      <Text size={"lg"} weight={"semibold"} className="mb-3">
                        Dropdown Menu
                      </Text>
                      <Text size="sm" weight="medium" className="mb-3">
                        Dropdown Menu
                      </Text>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">
                            Options
                            <MoreVertical className="ml-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Heart className="mr-2 h-4 w-4" />
                            Favorite
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <PropsBlock
                      snippet={`import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/DropdownMenu";
<DropdownMenu>
<DropdownMenuTrigger asChild>
  <Button variant="outline">
    Options
    <MoreVertical className="ml-2 h-4 w-4" />
  </Button>
</DropdownMenuTrigger>
<DropdownMenuContent>
  <DropdownMenuLabel>Actions</DropdownMenuLabel>
  <DropdownMenuSeparator />
  <DropdownMenuItem>
    <Edit className="mr-2 h-4 w-4" />
    Edit
  </DropdownMenuItem>
  <DropdownMenuItem>
    <Heart className="mr-2 h-4 w-4" />
    Favorite
  </DropdownMenuItem>
  <DropdownMenuSeparator />
  <DropdownMenuItem className="text-destructive">
    <Trash className="mr-2 h-4 w-4" />
    Delete
  </DropdownMenuItem>
</DropdownMenuContent>
</DropdownMenu>`}
                      columns={buttonProps}
                      data={dropdownMenuPropsData}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Data Components */}
              <Card id="data">
                <CardHeader>
                  <CardTitle>Data Components</CardTitle>
                  <CardDescription>
                    Tables, pagination, and search
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div id="searchInput" />
                      <Text size={"lg"} weight={"semibold"} className="mb-3">
                        Search Input
                      </Text>

                      <SearchInput
                        onSearch={(value) => console.log("Search:", value)}
                        placeholder="Search users..."
                      />
                    </div>
                    <PropsBlock
                      snippet={`import {  SearchInput } from "@/components/ui/SearchInput";
<SearchInput
  onSearch={(value) => console.log("Search:", value)}
  placeholder="Search users..."
/>`}
                      columns={buttonProps}
                      data={searchInputPropsData}
                    />
                    <div>
                      <div id="table" />
                      <Text size={"lg"} weight={"semibold"} className="mb-3">
                        Table
                      </Text>

                      <Table
                        columns={tableColumns}
                        data={tableData}
                        striped
                        hoverable
                      />
                    </div>
                    <PropsBlock
                      snippet={`import {  Table } from "@/components/ui/Table";
<Table
  columns={tableColumns}
  data={tableData}
  striped
  hoverable
/>`}
                      columns={buttonProps}
                      data={tablePropsData}
                    />
                    <div>
                      <div id="pagination" />
                      <Text size={"lg"} weight={"semibold"} className="mb-3">
                        Pagination
                      </Text>
                      <Pagination
                        currentPage={currentPage}
                        totalPages={10}
                        onPageChange={setCurrentPage}
                        totalItems={100}
                        pageSize={10}
                      />
                    </div>
                    <PropsBlock
                      snippet={`import {  Pagination } from "@/components/ui/Pagination";
<Pagination
  currentPage={currentPage}
  totalPages={10}
  onPageChange={setCurrentPage}
  totalItems={100}
  pageSize={10}
/>`}
                      columns={buttonProps}
                      data={paginationPropsData}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Typography */}
              <Card id="typography">
                <CardHeader>
                  <CardTitle>Typography</CardTitle>
                  <CardDescription>
                    Headings, text, and layout components
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div id="headings" />
                      <Text size={"lg"} weight={"semibold"} className="mb-3">
                        Headings
                      </Text>

                      <div className="space-y-2">
                        <Heading level="h1">Heading 1</Heading>
                        <Heading level="h2">Heading 2</Heading>
                        <Heading level="h3">Heading 3</Heading>
                        <Heading level="h4">Heading 4</Heading>
                        <Heading level="h5">Heading 5</Heading>
                        <Heading level="h6">Heading 6</Heading>
                      </div>
                    </div>
                    <PropsBlock
                      snippet={`import {  Heading } from "@/components/typography";
<Heading level="h1">Heading 1</Heading>`}
                      columns={buttonProps}
                      data={headingPropsData}
                    />
                    <div>
                      <div id="textVariants" />
                      <Text size={"lg"} weight={"semibold"} className="mb-3">
                        Text Variants
                      </Text>

                      <div className="space-y-2">
                        <Text>Default text</Text>
                        <Text variant="muted">Muted text</Text>
                        <Text variant="primary">Primary text</Text>
                        <Text variant="success">Success text</Text>
                        <Text variant="destructive">Destructive text</Text>
                      </div>
                    </div>

                    <div>
                      <Text size={"lg"} weight={"semibold"} className="mb-3">
                        Text Sizes
                      </Text>
                      <div className="space-y-2">
                        <Text size="xs">Extra small text</Text>
                        <Text size="sm">Small text</Text>
                        <Text size="base">Base text</Text>
                        <Text size="lg">Large text</Text>
                        <Text size="xl">Extra large text</Text>
                        <Text size="2xl">2XL text</Text>
                      </div>
                    </div>
                    <PropsBlock
                      snippet={`import {  Text } from "@/components/typography";
<Text variant="muted">Muted text</Text>`}
                      columns={buttonProps}
                      data={textPropsData}
                    />
                    <div>
                      <div id="flex" />
                      <Text size={"lg"} weight={"semibold"} className="mb-3">
                        Flex Layout
                      </Text>

                      <Flex
                        justify="between"
                        align="center"
                        className="p-4 border rounded-lg"
                      >
                        <Text>Item 1</Text>
                        <Text>Item 2</Text>
                        <Text>Item 3</Text>
                      </Flex>
                    </div>
                    <PropsBlock
                      snippet={`import {  Flex } from "@/components/typography";
  <Flex
                  justify="between"
                  align="center"
                  className="p-4 border rounded-lg"
                >
          
                </Flex>`}
                      columns={buttonProps}
                      data={flexPropsData}
                    />
                    <div>
                      <div id="container" />
                      <Text size={"lg"} weight={"semibold"} className="mb-3">
                        Container
                      </Text>
                      <Container
                        size="full"
                        padding="lg"
                        className="border border-accent"
                      >
                        <Text>Item 1</Text>
                        <Text>Item 2</Text>
                        <Text>Item 3</Text>
                      </Container>
                    </div>
                    <PropsBlock
                      snippet={`import { Container } from "@/components/typography";
<Container size="full" padding="lg"></Container>`}
                      columns={buttonProps}
                      data={containerPropsData}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

const PropsBlock = ({ columns, data, snippet }: TableProps) => {
  return (
    <div className="space-y-4 md:col-span-2">
      <div>
        <Text size="sm" weight="medium" className="mb-3">
          Code
        </Text>
        {snippet && (
          <CodeBlockDemo code={snippet} language="React"></CodeBlockDemo>
        )}
      </div>
      <div>
        <Text size="sm" weight="medium" className="mb-3">
          Props
        </Text>
        <Table columns={columns} data={data} striped hoverable />
      </div>
    </div>
  );
};
