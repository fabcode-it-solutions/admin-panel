import { Text } from "@/components/typography";
import { Badge } from "@/components/ui/Badge";
import { User, Home, Settings } from "lucide-react";

export const selectOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
];

export const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
];

export const radioOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

export const accordionItems = [
  {
    id: "1",
    title: "What is Next.js?",
    content:
      "Next.js is a React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations.",
  },
  {
    id: "2",
    title: "How does it work?",
    content:
      "Under the hood, Next.js also abstracts and automatically configures tooling needed for React, like bundling, compiling, and more. This allows you to focus on building your application instead of spending time with configuration.",
  },
  {
    id: "3",
    title: "Is it production ready?",
    content:
      "Yes! Next.js is used by some of the world's largest companies and is production-ready.",
  },
];

export const tabs = [
  {
    id: "overview",
    label: "Overview",
    icon: <Home className="h-4 w-4" />,
    content: (
      <div className="py-4">
        <Text>
          Overview content goes here. This is the first tab with information
          about the overview.
        </Text>
      </div>
    ),
  },
  {
    id: "details",
    label: "Details",
    icon: <Settings className="h-4 w-4" />,
    content: (
      <div className="py-4">
        <Text>Detailed information can be displayed in this tab.</Text>
      </div>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: <User className="h-4 w-4" />,
    content: (
      <div className="py-4">
        <Text>Settings and configuration options appear here.</Text>
      </div>
    ),
  },
];

export const tableColumns = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email", sortable: true },
  {
    key: "status",
    header: "Status",
    cell: (value: string) => (
      <Badge variant={value === "active" ? "success" : "secondary"}>
        {value}
      </Badge>
    ),
  },
  {
    key: "role",
    header: "Role",
    cell: (value: string) => <Badge variant="outline">{value}</Badge>,
  },
];

export const tableData = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    status: "active",
    role: "Admin",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    status: "active",
    role: "User",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "inactive",
    role: "User",
  },
];

export const buttonProps = [
  { key: "prop", header: "Prop", sortable: false },
  { key: "required", header: "Required", sortable: false },
  { key: "description", header: "Description", sortable: false },
  { key: "options", header: "Options", sortable: false },
];
export const buttonPropsData = [
  {
    id: "1",
    prop: "variant",
    required: "No",
    description: "Controls the visual style of the button.",
    options:
      "default – Primary button style (default)\n" +
      "destructive – Used for dangerous actions\n" +
      "outline – Transparent background with border\n" +
      "secondary – Secondary emphasis button\n" +
      "ghost – Minimal button without background\n" +
      "link – Button styled like a text link\n" +
      "success – Indicates a successful action\n" +
      "warning – Indicates a warning action",
  },
  {
    id: "2",
    prop: "size",
    required: "No",
    description: "Defines the size of the button.",
    options:
      "default – Standard size (default)\n" +
      "sm – Small button\n" +
      "md – Medium button\n" +
      "lg – Large button\n" +
      "xl – Extra large button\n" +
      "icon – Square icon-only button",
  },
  {
    id: "3",
    prop: "fullWidth",
    required: "No",
    description: "Makes the button span the full width of its container.",
    options:
      "true – Button takes full width\n" + "false – Button width fits content",
  },
  {
    id: "4",
    prop: "loading",
    required: "No",
    description: "Shows a loading spinner and disables the button.",
    options:
      "true – Spinner shown and button disabled\n" +
      "false – Normal button state",
  },
  {
    id: "5",
    prop: "leftIcon",
    required: "No",
    description: "Icon displayed before the button text.",
    options: "Any valid React node (icon, image, etc.)",
  },
  {
    id: "6",
    prop: "rightIcon",
    required: "No",
    description: "Icon displayed after the button text.",
    options: "Any valid React node (icon, image, etc.)",
  },
  {
    id: "7",
    prop: "animate",
    required: "No",
    description: "Enables or disables Framer Motion animations.",
    options:
      "true – Enables hover and tap animations (default)\n" +
      "false – Renders a standard button without animations",
  },
  {
    id: "8",
    prop: "disabled",
    required: "No",
    description: "Disables user interaction with the button.",
    options:
      "true – Button disabled\n" +
      "false – Button enabled\n" +
      "Automatically disabled when loading is true",
  },
  {
    id: "9",
    prop: "children",
    required: "Yes",
    description: "Content inside the button.",
    options: "Text, icons, or any valid React node",
  },
  {
    id: "10",
    prop: "className",
    required: "No",
    description: "Adds custom Tailwind or CSS classes to the button.",
    options: "Any valid CSS class string",
  },
  {
    id: "11",
    prop: "onClick",
    required: "No",
    description: "Callback fired when the button is clicked.",
    options: "Function: (event) => void",
  },
  {
    id: "12",
    prop: "type",
    required: "No",
    description: "Defines the button type attribute.",
    options:
      "button – Default button behavior\n" +
      "submit – Submits a form\n" +
      "reset – Resets a form",
  },
];

export const anchorPropsData = [
  {
    id: "1",
    prop: "href",
    required: "Yes",
    description: "Destination URL for the link.",
    options:
      "Any valid URL or path\n" +
      "Supports internal and external links\n" +
      "Required for navigation",
  },
  {
    id: "2",
    prop: "variant",
    required: "No",
    description: "Controls the visual style of the anchor.",
    options:
      "default – Primary link style (default)\n" +
      "destructive – Used for dangerous actions\n" +
      "outline – Border with hover background\n" +
      "secondary – Secondary emphasis style\n" +
      "ghost – Minimal appearance\n" +
      "link – Text-only link style\n" +
      "success – Indicates a successful action\n" +
      "warning – Indicates a warning action",
  },
  {
    id: "3",
    prop: "size",
    required: "No",
    description: "Defines the size of the anchor.",
    options:
      "default – Standard size (default)\n" +
      "sm – Small\n" +
      "md – Medium\n" +
      "lg – Large\n" +
      "xl – Extra large\n" +
      "icon – Icon-only anchor",
  },
  {
    id: "4",
    prop: "fullWidth",
    required: "No",
    description: "Makes the anchor take the full width of its container.",
    options: "true – Full width anchor\n" + "false – Width fits content",
  },
  {
    id: "5",
    prop: "loading",
    required: "No",
    description: "Shows a loading spinner before the anchor content.",
    options:
      "true – Displays spinner\n" +
      "false – Normal anchor state\n" +
      "Note: Link remains clickable",
  },
  {
    id: "6",
    prop: "leftIcon",
    required: "No",
    description: "Icon displayed before the anchor text.",
    options: "Any valid React node",
  },
  {
    id: "7",
    prop: "rightIcon",
    required: "No",
    description: "Icon displayed after the anchor text.",
    options: "Any valid React node",
  },
  {
    id: "8",
    prop: "animate",
    required: "No",
    description: "Enables entry animation using Framer Motion.",
    options:
      "true – Fade and slide animation (default)\n" + "false – No animation",
  },
  {
    id: "9",
    prop: "children",
    required: "Yes",
    description: "Content inside the anchor.",
    options: "Text, icons, or any valid React node",
  },
  {
    id: "10",
    prop: "className",
    required: "No",
    description: "Adds custom Tailwind or CSS classes.",
    options: "Any valid CSS class string",
  },
  {
    id: "11",
    prop: "target",
    required: "No",
    description: "Specifies where to open the linked document.",
    options:
      "_self – Opens in the same tab (default)\n" +
      "_blank – Opens in a new tab\n" +
      "_parent – Opens in the parent frame\n" +
      "_top – Opens in the full body of the window",
  },
  {
    id: "12",
    prop: "rel",
    required: "Conditional",
    description:
      "Specifies the relationship between current and linked document.",
    options:
      "noopener noreferrer – Recommended when target is _blank\n" +
      "Optional for same-tab navigation",
  },
];

export const inputPropsData = [
  {
    id: "1",
    prop: "type",
    required: "No",
    description: "Defines the input field type.",
    options:
      "text – Default text input\n" +
      "password – Password input with show/hide toggle\n" +
      "email – Email input\n" +
      "number – Numeric input\n" +
      "search – Search input\n" +
      "tel – Telephone input\n" +
      "url – URL input",
  },
  {
    id: "2",
    prop: "label",
    required: "No",
    description: "Displays a label above the input field.",
    options: "Any string value",
  },
  {
    id: "3",
    prop: "error",
    required: "No",
    description: "Displays an error message and highlights the input.",
    options: "Any string value\n" + "Overrides helperText when present",
  },
  {
    id: "4",
    prop: "helperText",
    required: "No",
    description: "Displays helper text below the input.",
    options: "Any string value\nHidden when error is provided",
  },
  {
    id: "5",
    prop: "leftIcon",
    required: "No",
    description: "Icon displayed inside the input on the left side.",
    options: "Any valid React node",
  },
  {
    id: "6",
    prop: "rightIcon",
    required: "No",
    description: "Icon displayed inside the input on the right side.",
    options: "Any valid React node\n" + "Ignored when type is 'password'",
  },
  {
    id: "7",
    prop: "fullWidth",
    required: "No",
    description: "Makes the input take the full width of its container.",
    options: "true – Full width input\n" + "false – Auto width",
  },
  {
    id: "8",
    prop: "disabled",
    required: "No",
    description: "Disables user interaction with the input.",
    options: "true – Input disabled\n" + "false – Input enabled",
  },
  {
    id: "9",
    prop: "required",
    required: "No",
    description:
      "Marks the input as required and shows an asterisk in the label.",
    options: "true – Displays * next to label\n" + "false – No indicator",
  },
  {
    id: "10",
    prop: "id",
    required: "No",
    description: "Unique identifier for the input element.",
    options: "Optional\n" + "Auto-generated if not provided",
  },
  {
    id: "11",
    prop: "className",
    required: "No",
    description: "Adds custom styling classes to the input.",
    options: "Any valid CSS class string",
  },
  {
    id: "12",
    prop: "value",
    required: "Depends",
    description: "The input value (controlled input).",
    options:
      "Required when using controlled input pattern\n" +
      "Use defaultValue for uncontrolled input",
  },
  {
    id: "13",
    prop: "onChange",
    required: "Depends",
    description: "Callback fired when the input value changes.",
    options:
      "Required for controlled inputs\n" + "Optional for uncontrolled inputs",
  },
];
export const textareaPropsData = [
  {
    id: "1",
    prop: "label",
    required: "No",
    description: "Displays a label above the textarea.",
    options: "Any string value\n" + "Shown only when provided",
  },
  {
    id: "2",
    prop: "resize",
    required: "No",
    description: "Controls how the textarea can be resized.",
    options:
      "vertical – Resize vertically (default)\n" +
      "horizontal – Resize horizontally\n" +
      "both – Resize in both directions\n" +
      "none – Disable resizing",
  },
  {
    id: "3",
    prop: "fullWidth",
    required: "No",
    description: "Makes the textarea take the full width of its container.",
    options:
      "true – Full width textarea (default)\n" + "false – Width fits content",
  },
  {
    id: "4",
    prop: "required",
    required: "No",
    description:
      "Marks the textarea as required and shows an asterisk in the label.",
    options:
      "true – Displays * and enables HTML required validation\n" +
      "false – Optional field",
  },
  {
    id: "5",
    prop: "error",
    required: "No",
    description: "Displays an error message and highlights the textarea.",
    options: "Any string value\n" + "Overrides helperText when present",
  },
  {
    id: "6",
    prop: "helperText",
    required: "No",
    description: "Displays helper text below the textarea.",
    options: "Any string value\n" + "Hidden when error is provided",
  },
  {
    id: "7",
    prop: "charLimit",
    required: "No",
    description: "Limits the maximum number of characters allowed.",
    options:
      "Any positive number\n" +
      "Excess characters are automatically trimmed\n" +
      "Works independently of maxLength",
  },
  {
    id: "8",
    prop: "onValueChange",
    required: "No",
    description: "Callback fired with the textarea value on every change.",
    options:
      "Function: (value: string) => void\n" +
      "Receives the processed value after charLimit enforcement",
  },
  {
    id: "9",
    prop: "disabled",
    required: "No",
    description: "Disables user interaction with the textarea.",
    options: "true – Textarea disabled\n" + "false – Textarea enabled",
  },
  {
    id: "10",
    prop: "className",
    required: "No",
    description: "Adds custom Tailwind or CSS classes to the textarea.",
    options: "Any valid CSS class string",
  },
  {
    id: "11",
    prop: "value",
    required: "Conditional",
    description: "Textarea value when using controlled mode.",
    options:
      "Required for controlled textarea usage\n" +
      "Use defaultValue for uncontrolled usage",
  },
  {
    id: "12",
    prop: "onChange",
    required: "Conditional",
    description: "Native change handler for the textarea.",
    options:
      "Optional for uncontrolled textarea\n" +
      "Still called after internal processing",
  },
  {
    id: "13",
    prop: "rows",
    required: "No",
    description: "Specifies the visible number of text lines.",
    options: "Any number value\n" + "Defaults to browser behavior",
  },
];
export const selectPropsData = [
  {
    id: "1",
    prop: "options",
    required: "Yes",
    description: "List of selectable options.",
    options:
      "Array of objects:\n" +
      "{ value: string; label: string; disabled?: boolean }",
  },
  {
    id: "2",
    prop: "value",
    required: "Conditional",
    description: "Currently selected value.",
    options: "Required for controlled usage\n" + "Omit for uncontrolled usage",
  },
  {
    id: "3",
    prop: "onChange",
    required: "Conditional",
    description: "Callback fired when selection changes.",
    options:
      "Function: (value: string) => void\n" + "Required for controlled usage",
  },
  {
    id: "4",
    prop: "placeholder",
    required: "No",
    description: "Placeholder option shown when no value is selected.",
    options: "String value\n" + "Rendered as a disabled option",
  },
  {
    id: "5",
    prop: "label",
    required: "No",
    description: "Displays a label above the select.",
    options: "Any string value",
  },
  {
    id: "6",
    prop: "error",
    required: "No",
    description: "Displays an error message and highlights the select.",
    options: "Any string value\n" + "Overrides helperText",
  },
  {
    id: "7",
    prop: "helperText",
    required: "No",
    description: "Displays helper text below the select.",
    options: "Any string value\n" + "Hidden when error is present",
  },
  {
    id: "8",
    prop: "disabled",
    required: "No",
    description: "Disables the select input.",
    options: "true – Select disabled\n" + "false – Select enabled",
  },
  {
    id: "9",
    prop: "required",
    required: "No",
    description:
      "Marks the select as required and shows an asterisk in the label.",
    options:
      "true – Shows * and enables HTML validation\n" + "false – Optional field",
  },
  {
    id: "10",
    prop: "fullWidth",
    required: "No",
    description: "Makes the select span the full width of its container.",
    options: "true – Full width (default)\n" + "false – Auto width",
  },
  {
    id: "11",
    prop: "className",
    required: "No",
    description: "Adds custom Tailwind or CSS classes.",
    options: "Any valid CSS class string",
  },
];

export const searchSelectPropsData = [
  {
    id: "1",
    prop: "options",
    required: "Yes",
    description: "List of selectable options.",
    options:
      "Array of objects:\n" +
      "{ value: string; label: string; disabled?: boolean }",
  },
  {
    id: "2",
    prop: "value",
    required: "Conditional",
    description: "Currently selected option value.",
    options:
      "Required for controlled usage\n" + "Optional for uncontrolled usage",
  },
  {
    id: "3",
    prop: "onChange",
    required: "Conditional",
    description: "Callback fired when an option is selected.",
    options:
      "Function: (value: string) => void\n" + "Required for controlled usage",
  },
  {
    id: "4",
    prop: "placeholder",
    required: "No",
    description: "Text shown when no option is selected.",
    options: "String value\n" + "Displayed in trigger button",
  },
  {
    id: "5",
    prop: "searchPlaceholder",
    required: "No",
    description: "Placeholder text for the search input.",
    options: "String value\n" + 'Default: "Search..."',
  },
  {
    id: "6",
    prop: "label",
    required: "No",
    description: "Displays a label above the select.",
    options: "Any string value",
  },
  {
    id: "7",
    prop: "error",
    required: "No",
    description: "Displays an error message and highlights the trigger.",
    options: "Any string value\n" + "Overrides helperText",
  },
  {
    id: "8",
    prop: "helperText",
    required: "No",
    description: "Displays helper text below the select.",
    options: "Any string value\n" + "Hidden when error is present",
  },
  {
    id: "9",
    prop: "disabled",
    required: "No",
    description: "Disables the select interaction.",
    options: "true – Select disabled\n" + "false – Select enabled",
  },
  {
    id: "10",
    prop: "required",
    required: "No",
    description:
      "Marks the field as required and shows an asterisk in the label.",
    options: "true – Shows * indicator\n" + "false – Optional field",
  },
  {
    id: "11",
    prop: "className",
    required: "No",
    description: "Adds custom styles to the root container.",
    options: "Any valid CSS class string",
  },
];

export const switchPropsData = [
  {
    id: "1",
    prop: "label",
    required: "No",
    description: "Label text displayed next to the switch.",
    options: "Any string value\n" + "Shown only when provided",
  },
  {
    id: "2",
    prop: "description",
    required: "No",
    description: "Additional helper text shown below the label.",
    options: "Any string value\n" + "Useful for explaining the switch behavior",
  },
  {
    id: "3",
    prop: "checked",
    required: "Conditional",
    description: "Controls the checked state of the switch.",
    options:
      "true – Switch is ON\n" +
      "false – Switch is OFF\n" +
      "Required when using controlled mode",
  },
  {
    id: "4",
    prop: "defaultChecked",
    required: "No",
    description: "Sets the initial checked state (uncontrolled mode).",
    options:
      "true – Initially ON\n" +
      "false – Initially OFF\n" +
      "Do not use together with checked",
  },
  {
    id: "5",
    prop: "onCheckedChange",
    required: "Conditional",
    description: "Callback fired when the switch value changes.",
    options:
      "Function: (checked: boolean) => void\n" +
      "Required for controlled usage",
  },
  {
    id: "6",
    prop: "disabled",
    required: "No",
    description: "Disables the switch interaction.",
    options: "true – Switch disabled\n" + "false – Switch enabled",
  },
  {
    id: "7",
    prop: "name",
    required: "No",
    description: "Form field name for form submission.",
    options: "Any string value\n" + "Useful when used inside forms",
  },
  {
    id: "8",
    prop: "value",
    required: "No",
    description: "Value submitted with the form when switch is checked.",
    options: "Any string value\n" + "Used in form submissions",
  },
  {
    id: "9",
    prop: "required",
    required: "No",
    description: "Marks the switch as required for form validation.",
    options: "true – Field is required\n" + "false – Optional field",
  },
  {
    id: "10",
    prop: "className",
    required: "No",
    description: "Adds custom Tailwind or CSS classes to the switch.",
    options: "Any valid CSS class string",
  },
];

export const checkboxPropsData = [
  {
    id: "1",
    prop: "id",
    required: "Yes",
    description: "Unique identifier for the checkbox input.",
    options:
      "Any unique string value\n" +
      "Used to associate the label with the checkbox",
  },
  {
    id: "2",
    prop: "checked",
    required: "Conditional",
    description: "Controls the checked state of the checkbox.",
    options:
      "true – Checkbox is checked\n" +
      "false – Checkbox is unchecked\n" +
      "Required for controlled usage",
  },
  {
    id: "3",
    prop: "onChange",
    required: "Conditional",
    description: "Callback fired when the checkbox state changes.",
    options:
      "Function: (event: ChangeEvent<HTMLInputElement>) => void\n" +
      "Required for controlled usage",
  },
  {
    id: "4",
    prop: "label",
    required: "No",
    description: "Label displayed next to the checkbox.",
    options:
      "String or ReactNode\n" + "Clicking the label toggles the checkbox",
  },
  {
    id: "5",
    prop: "error",
    required: "No",
    description: "Displays an error message and highlights the checkbox.",
    options: "Any string value\n" + "Overrides helperText",
  },
  {
    id: "6",
    prop: "helperText",
    required: "No",
    description: "Displays helper text below the checkbox.",
    options: "Any string value\n" + "Hidden when error is provided",
  },
  {
    id: "7",
    prop: "disabled",
    required: "No",
    description: "Disables the checkbox interaction.",
    options: "true – Checkbox disabled\n" + "false – Checkbox enabled",
  },
  {
    id: "8",
    prop: "required",
    required: "No",
    description:
      "Marks the checkbox as required and shows an asterisk in the label.",
    options:
      "true – Displays * and enables HTML validation\n" +
      "false – Optional field",
  },
  {
    id: "9",
    prop: "className",
    required: "No",
    description:
      "Adds custom Tailwind or CSS classes to the checkbox container.",
    options: "Any valid CSS class string",
  },
];

export const radioPropsData = [
  {
    id: "1",
    prop: "options",
    required: "Yes",
    description: "List of radio options to display.",
    options:
      "Array of objects:\n" +
      "{ value: string; label: string; disabled?: boolean }",
  },
  {
    id: "2",
    prop: "name",
    required: "Yes",
    description: "Name attribute for the radio group.",
    options: "Any string value\n" + "Used to group radio buttons together",
  },
  {
    id: "3",
    prop: "value",
    required: "Conditional",
    description: "Currently selected radio value.",
    options:
      "Required for controlled usage\n" + "Must match one of the option values",
  },
  {
    id: "4",
    prop: "onChange",
    required: "Conditional",
    description: "Callback fired when selected option changes.",
    options:
      "Function: (value: string) => void\n" + "Required for controlled usage",
  },
  {
    id: "5",
    prop: "label",
    required: "No",
    description: "Label displayed above the radio group.",
    options: "Any string value",
  },
  {
    id: "6",
    prop: "orientation",
    required: "No",
    description: "Layout direction of the radio options.",
    options:
      "vertical – Options stacked vertically (default)\n" +
      "horizontal – Options arranged in a row",
  },
  {
    id: "7",
    prop: "disabled",
    required: "No",
    description: "Disables all radio options.",
    options: "true – All options disabled\n" + "false – Options enabled",
  },
  {
    id: "8",
    prop: "error",
    required: "No",
    description: "Displays an error message and highlights radio inputs.",
    options: "Any string value\n" + "Overrides helperText",
  },
  {
    id: "9",
    prop: "helperText",
    required: "No",
    description: "Displays helper text below the radio group.",
    options: "Any string value\n" + "Hidden when error is present",
  },
  {
    id: "10",
    prop: "className",
    required: "No",
    description: "Adds custom Tailwind or CSS classes to the radio container.",
    options: "Any valid CSS class string",
  },
];

export const datePickerPropsData = [
  {
    id: "1",
    prop: "value",
    required: "Conditional",
    description: "Currently selected date.",
    options:
      "Date object\n" +
      "Required for controlled usage\n" +
      "Use undefined for no selection",
  },
  {
    id: "2",
    prop: "onChange",
    required: "Conditional",
    description: "Callback fired when a date is selected.",
    options:
      "Function: (date: Date | undefined) => void\n" +
      "Required for controlled usage",
  },
  {
    id: "3",
    prop: "placeholder",
    required: "No",
    description: "Placeholder text shown when no date is selected.",
    options: "String value\n" + 'Default: "Pick a date"',
  },
  {
    id: "4",
    prop: "label",
    required: "No",
    description: "Label displayed above the date picker.",
    options: "Any string value",
  },
  {
    id: "5",
    prop: "error",
    required: "No",
    description: "Displays an error message and highlights the date picker.",
    options: "Any string value\n" + "Shown below the field",
  },
  {
    id: "6",
    prop: "disabled",
    required: "No",
    description: "Disables the date picker interaction.",
    options: "true – Date picker disabled\n" + "false – Date picker enabled",
  },
  {
    id: "7",
    prop: "minDate",
    required: "No",
    description: "Minimum selectable date.",
    options: "Date object\n" + "All dates before this are disabled",
  },
  {
    id: "8",
    prop: "maxDate",
    required: "No",
    description: "Maximum selectable date.",
    options: "Date object\n" + "All dates after this are disabled",
  },
  {
    id: "9",
    prop: "className",
    required: "No",
    description: "Adds custom Tailwind or CSS classes to the container.",
    options: "Any valid CSS class string",
  },
];

export const badgePropsData = [
  {
    id: "1",
    prop: "children",
    required: "Yes",
    description: "Content displayed inside the badge.",
    options: "Text or any valid React node\n" + "Represents the badge label",
  },
  {
    id: "2",
    prop: "variant",
    required: "No",
    description: "Controls the visual style of the badge.",
    options:
      "default – Primary badge (default)\n" +
      "secondary – Secondary style\n" +
      "destructive – Error or destructive state\n" +
      "success – Success state\n" +
      "warning – Warning state\n" +
      "info – Informational state\n" +
      "outline – Outlined badge style",
  },
  {
    id: "3",
    prop: "dot",
    required: "No",
    description: "Displays a small dot indicator before the badge content.",
    options: "true – Shows a dot indicator\n" + "false – No dot (default)",
  },
  {
    id: "4",
    prop: "className",
    required: "No",
    description: "Adds custom Tailwind or CSS classes to the badge.",
    options: "Any valid CSS class string",
  },
];

export const avatarPropsData = [
  {
    id: "1",
    prop: "src",
    required: "No",
    description: "Image source URL for the avatar.",
    options:
      "Any valid image URL\n" +
      "If image fails to load, fallback content is shown",
  },
  {
    id: "2",
    prop: "name",
    required: "No",
    description: "Name used to generate avatar initials.",
    options:
      "String value\n" +
      "First two initials are derived from the name\n" +
      "Used as alt text for the image",
  },
  {
    id: "3",
    prop: "size",
    required: "No",
    description: "Controls the size of the avatar.",
    options:
      "xs – Extra small\n" +
      "sm – Small\n" +
      "md – Medium (default)\n" +
      "lg – Large\n" +
      "xl – Extra large",
  },
  {
    id: "4",
    prop: "fallback",
    required: "No",
    description:
      "Custom fallback content when image or initials are unavailable.",
    options: "Any valid React node\n" + "Overrides default user icon",
  },
  {
    id: "5",
    prop: "className",
    required: "No",
    description: "Adds custom Tailwind or CSS classes to the avatar container.",
    options: "Any valid CSS class string",
  },
];

export const emptyStatePropsData = [
  {
    id: "1",
    prop: "title",
    required: "Yes",
    description: "Main title displayed in the empty state.",
    options: "Any string value\n" + "Acts as the primary message",
  },
  {
    id: "2",
    prop: "icon",
    required: "No",
    description: "Icon or visual element displayed above the title.",
    options: "Any valid React node\n" + "Usually an icon or illustration",
  },
  {
    id: "3",
    prop: "description",
    required: "No",
    description: "Supporting text displayed below the title.",
    options: "Any string value\n" + "Used to explain the empty state",
  },
  {
    id: "4",
    prop: "action",
    required: "No",
    description: "Action element displayed below the description.",
    options: "Any valid React node\n" + "Typically a button or link",
  },
  {
    id: "5",
    prop: "className",
    required: "No",
    description: "Adds custom Tailwind or CSS classes to the container.",
    options: "Any valid CSS class string",
  },
];

export const loaderPropsData = [
  {
    id: "1",
    prop: "variant",
    required: "No",
    description: "Defines the visual style of the loader.",
    options:
      "spinner – Rotating spinner (default)\n" +
      "dots – Animated bouncing dots\n" +
      "pulse – Pulsing circle",
  },
  {
    id: "2",
    prop: "size",
    required: "No",
    description: "Controls the size of the loader.",
    options:
      "sm – Small\n" +
      "md – Medium (default)\n" +
      "lg – Large\n" +
      "xl – Extra large",
  },
  {
    id: "3",
    prop: "text",
    required: "No",
    description: "Optional text displayed next to the loader.",
    options: "Any string value\n" + "Useful for loading messages",
  },
  {
    id: "4",
    prop: "className",
    required: "No",
    description: "Adds custom Tailwind or CSS classes to the loader container.",
    options: "Any valid CSS class string",
  },
];

export const skeletonPropsData = [
  {
    id: "1",
    prop: "variant",
    required: "No",
    description: "Controls the shape of the skeleton.",
    options:
      "text – Text line skeleton (default)\n" +
      "circular – Circular skeleton (avatars)\n" +
      "rectangular – Sharp rectangular block\n" +
      "rounded – Rounded rectangle",
  },
  {
    id: "2",
    prop: "width",
    required: "No",
    description: "Sets the width of the skeleton.",
    options:
      "Number (px) or string (%, rem, etc.)\n" + "Example: 100, '60%', '10rem'",
  },
  {
    id: "3",
    prop: "height",
    required: "No",
    description: "Sets the height of the skeleton.",
    options:
      "Number (px) or string\n" + "Defaults to '1em' when variant is text",
  },
  {
    id: "4",
    prop: "animation",
    required: "No",
    description: "Controls the loading animation.",
    options:
      "pulse – Pulse animation (default)\n" +
      "wave – Shimmer animation\n" +
      "none – No animation",
  },
  {
    id: "5",
    prop: "className",
    required: "No",
    description: "Adds custom Tailwind or CSS classes.",
    options: "Any valid CSS class string",
  },
  {
    id: "6",
    prop: "style",
    required: "No",
    description: "Inline styles applied to the skeleton.",
    options: "React.CSSProperties\n" + "Merged with width and height styles",
  },
];
export const skeletonHelpersprop = [
  { key: "name", header: "Name", sortable: false },
  { key: "description", header: "Description", sortable: false },
  { key: "options", header: "Options", sortable: false },
];
export const skeletonHelpersData = [
  {
    id: "1",
    name: "SkeletonCard",
    description: "Pre-built card skeleton layout.",
    options:
      "Includes image, title, and text placeholders\n" +
      "Accepts className only",
  },
  {
    id: "2",
    name: "SkeletonTable",
    description: "Skeleton layout for table loading states.",
    options:
      "rows – Number of table rows (default: 5)\n" +
      "className – Optional container styles",
  },
  {
    id: "3",
    name: "SkeletonAvatar",
    description: "Circular skeleton for avatars.",
    options:
      "size – Diameter in pixels (default: 40)\n" +
      "className – Optional styles",
  },
  {
    id: "4",
    name: "SkeletonText",
    description: "Multiple text-line skeleton.",
    options:
      "lines – Number of lines (default: 3)\n" +
      "Last line is shortened for realism",
  },
];

export const progressPropsData = [
  {
    id: "1",
    prop: "value",
    required: "Yes",
    description: "Current progress value.",
    options: "Number value\n" + "Clamped between 0 and max",
  },
  {
    id: "2",
    prop: "max",
    required: "No",
    description: "Maximum progress value.",
    options: "Number value\n" + "Default: 100",
  },
  {
    id: "3",
    prop: "size",
    required: "No",
    description: "Controls the height of the progress bar.",
    options: "sm – Small\n" + "md – Medium (default)\n" + "lg – Large",
  },
  {
    id: "4",
    prop: "variant",
    required: "No",
    description: "Controls the color of the progress bar.",
    options:
      "default – Primary color (default)\n" +
      "success – Success state\n" +
      "warning – Warning state\n" +
      "danger – Error or danger state",
  },
  {
    id: "5",
    prop: "showLabel",
    required: "No",
    description: "Shows the percentage value next to the label.",
    options: "true – Displays percentage\n" + "false – Hidden (default)",
  },
  {
    id: "6",
    prop: "label",
    required: "No",
    description: "Custom label displayed above the progress bar.",
    options:
      "Any string value\n" + 'Defaults to "Progress" when showLabel is enabled',
  },
  {
    id: "7",
    prop: "animated",
    required: "No",
    description: "Enables or disables progress bar animation.",
    options:
      "true – Smooth animated transition (default)\n" +
      "false – Instantly updates width",
  },
  {
    id: "8",
    prop: "className",
    required: "No",
    description: "Adds custom Tailwind or CSS classes to the container.",
    options: "Any valid CSS class string",
  },
];

export const modalPropsData = [
  {
    id: "1",
    prop: "isOpen",
    required: "Yes",
    description: "Controls whether the modal is visible.",
    options: "true – Modal is open\n" + "false – Modal is closed",
  },
  {
    id: "2",
    prop: "onClose",
    required: "Yes",
    description: "Callback fired when the modal should close.",
    options:
      "Function: () => void\n" +
      "Called on overlay click, Escape key, or close button",
  },
  {
    id: "3",
    prop: "title",
    required: "No",
    description: "Title displayed at the top of the modal.",
    options: "Any string value\n" + "Used as aria-labelledby",
  },
  {
    id: "4",
    prop: "description",
    required: "No",
    description: "Supporting text displayed below the title.",
    options: "Any string value\n" + "Used as aria-describedby",
  },
  {
    id: "5",
    prop: "children",
    required: "Yes",
    description: "Main content of the modal.",
    options: "Any valid React node\n" + "Rendered inside the modal body",
  },
  {
    id: "6",
    prop: "size",
    required: "No",
    description: "Controls the width and layout of the modal.",
    options:
      "sm – Small modal\n" +
      "md – Medium modal (default)\n" +
      "lg – Large modal\n" +
      "xl – Extra large modal\n" +
      "full – Fullscreen-like modal",
  },
  {
    id: "7",
    prop: "showCloseButton",
    required: "No",
    description: "Shows or hides the close (X) button.",
    options:
      "true – Show close button (default)\n" + "false – Hide close button",
  },
  {
    id: "8",
    prop: "closeOnOverlayClick",
    required: "No",
    description: "Allows closing the modal by clicking the overlay.",
    options:
      "true – Click on overlay closes modal (default)\n" +
      "false – Overlay click is disabled",
  },
  {
    id: "9",
    prop: "closeOnEscape",
    required: "No",
    description: "Allows closing the modal using the Escape key.",
    options:
      "true – Escape key closes modal (default)\n" +
      "false – Escape key disabled",
  },
  {
    id: "10",
    prop: "footer",
    required: "No",
    description: "Footer content displayed at the bottom of the modal.",
    options: "Any valid React node\n" + "Typically action buttons",
  },
  {
    id: "11",
    prop: "className",
    required: "No",
    description: "Adds custom Tailwind or CSS classes to the modal container.",
    options: "Any valid CSS class string",
  },
];

export const tooltipPropsData = [
  {
    id: "1",
    prop: "children",
    required: "Yes",
    description: "Element that triggers the tooltip.",
    options: "Any valid React node\n" + "Wrapped using Radix Tooltip Trigger",
  },
  {
    id: "2",
    prop: "content",
    required: "Yes",
    description: "Content displayed inside the tooltip.",
    options: "Any valid React node\n" + "Text, icons, or custom JSX",
  },
  {
    id: "3",
    prop: "side",
    required: "No",
    description: "Side of the trigger where the tooltip appears.",
    options:
      "top – Above the trigger (default)\n" +
      "right – To the right of the trigger\n" +
      "bottom – Below the trigger\n" +
      "left – To the left of the trigger",
  },
  {
    id: "4",
    prop: "align",
    required: "No",
    description: "Alignment of the tooltip relative to the trigger.",
    options:
      "start – Align to start\n" +
      "center – Center align (default)\n" +
      "end – Align to end",
  },
  {
    id: "5",
    prop: "delayDuration",
    required: "No",
    description: "Delay before the tooltip appears on hover.",
    options: "Number value in milliseconds\n" + "Default: 200ms",
  },
  {
    id: "6",
    prop: "className",
    required: "No",
    description: "Adds custom Tailwind or CSS classes to the tooltip content.",
    options: "Any valid CSS class string",
  },
];

export const accordionPropsData = [
  {
    id: "1",
    prop: "items",
    required: "Yes",
    description: "List of accordion items to render.",
    options:
      "Array of objects:\n" +
      "{ id: string; title: string; content: ReactNode; icon?: ReactNode; disabled?: boolean }",
  },
  {
    id: "2",
    prop: "type",
    required: "No",
    description: "Controls whether one or multiple items can be open at once.",
    options:
      "single – Only one item can be open (default)\n" +
      "multiple – Multiple items can be open simultaneously",
  },
  {
    id: "3",
    prop: "defaultValue",
    required: "No",
    description: "Initial open item(s) for uncontrolled usage.",
    options:
      "string – Item id (single mode)\n" +
      "string[] – List of item ids (multiple mode)",
  },
  {
    id: "4",
    prop: "value",
    required: "Conditional",
    description: "Controlled open item(s).",
    options:
      "string – Item id (single mode)\n" +
      "string[] – List of item ids (multiple mode)\n" +
      "Required for controlled usage",
  },
  {
    id: "5",
    prop: "onValueChange",
    required: "Conditional",
    description: "Callback fired when open item(s) change.",
    options:
      "Function: (value: string | string[]) => void\n" +
      "Required for controlled usage",
  },
  {
    id: "6",
    prop: "collapsible",
    required: "No",
    description: "Allows collapsing the currently open item in single mode.",
    options:
      "true – Open item can be collapsed (default)\n" +
      "false – One item must remain open",
  },
  {
    id: "7",
    prop: "className",
    required: "No",
    description:
      "Adds custom Tailwind or CSS classes to the accordion container.",
    options: "Any valid CSS class string",
  },
  {
    id: "8",
    prop: "itemClassName",
    required: "No",
    description: "Adds custom Tailwind or CSS classes to each accordion item.",
    options: "Any valid CSS class string",
  },
];
export const tabsPropsData = [
  {
    id: "1",
    prop: "tabs",
    required: "Yes",
    description: "List of tabs to render.",
    options:
      "Array of objects:\n" +
      "{ id: string; label: string; content: ReactNode; icon?: ReactNode; disabled?: boolean }",
  },
  {
    id: "2",
    prop: "defaultValue",
    required: "No",
    description: "Initial active tab (uncontrolled usage).",
    options: "Tab id string\n" + "Defaults to first tab id if not provided",
  },
  {
    id: "3",
    prop: "value",
    required: "Conditional",
    description: "Currently active tab (controlled usage).",
    options: "Tab id string\n" + "Required for controlled usage",
  },
  {
    id: "4",
    prop: "onValueChange",
    required: "Conditional",
    description: "Callback fired when the active tab changes.",
    options:
      "Function: (value: string) => void\n" + "Required for controlled usage",
  },
  {
    id: "5",
    prop: "variant",
    required: "No",
    description: "Visual style of the tabs.",
    options: "line – Underlined tabs (default)\n" + "pills – Pill-style tabs",
  },
  {
    id: "6",
    prop: "className",
    required: "No",
    description: "Adds custom Tailwind or CSS classes to the tabs container.",
    options: "Any valid CSS class string",
  },
];

export const breadcrumbsPropsData = [
  {
    id: "1",
    prop: "items",
    required: "Yes",
    description: "List of breadcrumb items to display.",
    options:
      "Array of objects:\n" +
      "{ label: string; href?: string; icon?: ReactNode }",
  },
  {
    id: "2",
    prop: "showHome",
    required: "No",
    description: "Controls whether the Home breadcrumb is shown.",
    options:
      "true – Show Home breadcrumb (default)\n" +
      "false – Do not show Home breadcrumb",
  },
  {
    id: "3",
    prop: "homeHref",
    required: "No",
    description: "URL used for the Home breadcrumb.",
    options: "Any valid path or URL\n" + 'Default: "/"',
  },
  {
    id: "4",
    prop: "separator",
    required: "No",
    description: "Custom separator displayed between breadcrumb items.",
    options: "Any valid React node\n" + "Default: ChevronRight icon",
  },
  {
    id: "5",
    prop: "className",
    required: "No",
    description:
      "Adds custom Tailwind or CSS classes to the breadcrumbs container.",
    options: "Any valid CSS class string",
  },
];

export const dropdownMenuPropsData = [
  {
    id: "1",
    prop: "DropdownMenu",
    required: "Yes",
    description: "Root wrapper for the dropdown menu.",
    options:
      "Wraps all dropdown menu components\n" +
      "Controls open/close state internally or via Radix props",
  },
  {
    id: "2",
    prop: "DropdownMenuTrigger",
    required: "Yes",
    description: "Element that triggers the dropdown menu.",
    options:
      "Any valid React node\n" +
      "Usually a button or icon\n" +
      "Uses asChild internally",
  },
  {
    id: "3",
    prop: "DropdownMenuContent",
    required: "Yes",
    description: "Container that renders the dropdown menu content.",
    options:
      "Rendered inside a portal\n" +
      "Supports sideOffset and alignment via Radix props",
  },
  {
    id: "4",
    prop: "DropdownMenuItem",
    required: "No",
    description: "Clickable menu item.",
    options:
      "Standard menu item\n" +
      "Supports disabled state\n" +
      "Triggers onSelect event",
  },
  {
    id: "5",
    prop: "DropdownMenuCheckboxItem",
    required: "No",
    description: "Menu item with checkbox selection.",
    options:
      "checked – boolean\n" +
      "Shows check icon when selected\n" +
      "Useful for toggle options",
  },
  {
    id: "6",
    prop: "DropdownMenuRadioItem",
    required: "No",
    description: "Menu item for radio-style selection.",
    options:
      "Used inside DropdownMenuRadioGroup\n" + "Only one item can be selected",
  },
  {
    id: "7",
    prop: "DropdownMenuRadioGroup",
    required: "No",
    description: "Groups radio menu items together.",
    options: "value – selected value\n" + "onValueChange – callback",
  },
  {
    id: "8",
    prop: "DropdownMenuSub",
    required: "No",
    description: "Wrapper for nested submenus.",
    options: "Allows multi-level dropdown menus",
  },
  {
    id: "9",
    prop: "DropdownMenuSubTrigger",
    required: "No",
    description: "Trigger for submenu items.",
    options: "Displays chevron icon automatically\n" + "Supports inset styling",
  },
  {
    id: "10",
    prop: "DropdownMenuSubContent",
    required: "No",
    description: "Content container for submenu.",
    options:
      "Rendered beside parent menu\n" + "Animated via Radix data attributes",
  },
  {
    id: "11",
    prop: "DropdownMenuLabel",
    required: "No",
    description: "Label text inside the dropdown menu.",
    options: "Non-interactive text\n" + "Supports inset styling",
  },
  {
    id: "12",
    prop: "DropdownMenuSeparator",
    required: "No",
    description: "Visual divider between menu sections.",
    options: "Horizontal separator line",
  },
  {
    id: "13",
    prop: "DropdownMenuShortcut",
    required: "No",
    description: "Displays keyboard shortcut text aligned to the right.",
    options: "Any string or React node\n" + "Purely visual helper",
  },
];

export const searchInputPropsData = [
  {
    id: "1",
    prop: "onSearch",
    required: "Yes",
    description: "Callback fired when the search value changes (debounced).",
    options:
      "Function: (value: string) => void\n" + "Called after debounce delay",
  },
  {
    id: "2",
    prop: "debounceMs",
    required: "No",
    description: "Delay in milliseconds before triggering the search callback.",
    options: "Number value\n" + "Default: 500ms",
  },
  {
    id: "3",
    prop: "loading",
    required: "No",
    description: "Shows a loading spinner inside the input.",
    options: "true – Shows loading spinner\n" + "false – Hidden (default)",
  },
  {
    id: "4",
    prop: "onClear",
    required: "No",
    description: "Callback fired when the clear button is clicked.",
    options: "Function: () => void\n" + "Triggered after input is cleared",
  },
  {
    id: "5",
    prop: "showClearButton",
    required: "No",
    description: "Controls visibility of the clear (X) button.",
    options:
      "true – Show clear button (default)\n" + "false – Hide clear button",
  },
  {
    id: "6",
    prop: "placeholder",
    required: "No",
    description: "Placeholder text displayed inside the input.",
    options: "Any string value",
  },
  {
    id: "7",
    prop: "disabled",
    required: "No",
    description: "Disables the search input.",
    options: "true – Input disabled\n" + "false – Input enabled",
  },
  {
    id: "8",
    prop: "className",
    required: "No",
    description: "Adds custom Tailwind or CSS classes to the container.",
    options: "Any valid CSS class string",
  },
];

export const tablePropsData = [
  {
    id: "1",
    prop: "columns",
    required: "Yes",
    description: "Column configuration for the table.",
    options:
      "Array of Column objects\n" +
      "Each column defines header, key, accessor, cell renderer, sortable, width",
  },
  {
    id: "2",
    prop: "data",
    required: "Yes",
    description: "Data rows rendered in the table.",
    options: "Array of objects\n" + "Each object represents a table row",
  },
  {
    id: "3",
    prop: "loading",
    required: "No",
    description: "Shows loading state instead of table.",
    options: "true – Shows loader\n" + "false – Renders table (default)",
  },
  {
    id: "4",
    prop: "emptyMessage",
    required: "No",
    description: "Message shown when data is empty.",
    options: "Any string value\n" + 'Default: "No data available"',
  },
  {
    id: "5",
    prop: "onRowClick",
    required: "No",
    description: "Callback fired when a row is clicked.",
    options: "Function: (row: T) => void\n" + "Makes rows clickable",
  },
  {
    id: "6",
    prop: "selectedRows",
    required: "Conditional",
    description: "List of selected row IDs.",
    options: "Array of strings\n" + "Required for controlled row selection",
  },
  {
    id: "7",
    prop: "onSelectRows",
    required: "Conditional",
    description: "Callback fired when row selection changes.",
    options:
      "Function: (ids: string[]) => void\n" +
      "Enables row selection checkboxes",
  },
  {
    id: "8",
    prop: "rowKey",
    required: "No",
    description: "Key used to uniquely identify each row.",
    options:
      'String key of row object (default: "id")\n' +
      "Or function: (row) => string",
  },
  {
    id: "9",
    prop: "striped",
    required: "No",
    description: "Adds alternating background colors to rows.",
    options: "true – Zebra striping enabled\n" + "false – Disabled (default)",
  },
  {
    id: "10",
    prop: "hoverable",
    required: "No",
    description: "Adds hover styles to table rows.",
    options: "true – Hover enabled (default)\n" + "false – Hover disabled",
  },
  {
    id: "11",
    prop: "stickyHeader",
    required: "No",
    description: "Makes the table header sticky on scroll.",
    options: "true – Sticky header enabled\n" + "false – Disabled (default)",
  },
  {
    id: "12",
    prop: "className",
    required: "No",
    description: "Adds custom Tailwind or CSS classes to the table wrapper.",
    options: "Any valid CSS class string",
  },
];

export const paginationPropsData = [
  {
    id: "1",
    prop: "currentPage",
    required: "Yes",
    description: "Currently active page number.",
    options:
      "Number value (1-based index)\n" + "Must be between 1 and totalPages",
  },
  {
    id: "2",
    prop: "totalPages",
    required: "Yes",
    description: "Total number of available pages.",
    options: "Number value\n" + "Used to calculate page ranges and limits",
  },
  {
    id: "3",
    prop: "onPageChange",
    required: "Yes",
    description: "Callback fired when the page changes.",
    options:
      "Function: (page: number) => void\n" + "Called when user navigates pages",
  },
  {
    id: "4",
    prop: "pageSize",
    required: "No",
    description: "Number of items displayed per page.",
    options: "Number value\n" + "Default: 10",
  },
  {
    id: "5",
    prop: "totalItems",
    required: "No",
    description: "Total number of items across all pages.",
    options: "Number value\n" + 'Used to display "Showing X to Y of Z results"',
  },
  {
    id: "6",
    prop: "showPageSize",
    required: "No",
    description: "Controls visibility of page size selector.",
    options:
      "true – Show page size selector (default)\n" +
      "false – Hide page size selector",
  },
  {
    id: "7",
    prop: "onPageSizeChange",
    required: "Conditional",
    description: "Callback fired when page size changes.",
    options:
      "Function: (size: number) => void\n" +
      "Required when showPageSize is true",
  },
  {
    id: "8",
    prop: "pageSizeOptions",
    required: "No",
    description: "Available options for page size selection.",
    options: "Array of numbers\n" + "Default: [10, 25, 50, 100]",
  },
  {
    id: "9",
    prop: "className",
    required: "No",
    description:
      "Adds custom Tailwind or CSS classes to the pagination container.",
    options: "Any valid CSS class string",
  },
];

export const headingPropsData = [
  {
    id: "1",
    prop: "as",
    required: "No",
    description: "HTML heading element to render.",
    options: "h1 | h2 | h3 | h4 | h5 | h6",
  },
  {
    id: "2",
    prop: "level",
    required: "No",
    description: "Controls heading size using variants.",
    options:
      "h1 – Largest heading\n" +
      "h2 – Section heading (default)\n" +
      "h3 – Sub-section\n" +
      "h4 – Minor heading\n" +
      "h5 – Small heading\n" +
      "h6 – Smallest heading",
  },
  {
    id: "3",
    prop: "weight",
    required: "No",
    description: "Font weight of the heading text.",
    options:
      "light\n" + "normal\n" + "medium\n" + "semibold (default)\n" + "bold",
  },
  {
    id: "4",
    prop: "className",
    required: "No",
    description: "Additional Tailwind or custom CSS classes.",
    options: "Any valid CSS class string",
  },
  {
    id: "5",
    prop: "children",
    required: "Yes",
    description: "Heading content.",
    options: "Text or ReactNode",
  },
];

export const textPropsData = [
  {
    id: "1",
    prop: "as",
    required: "No",
    description: "HTML element used to render text.",
    options: "p (default) | span | div | label",
  },
  {
    id: "2",
    prop: "size",
    required: "No",
    description: "Font size of the text.",
    options: "xs\n" + "sm\n" + "base (default)\n" + "lg\n" + "xl\n" + "2xl",
  },
  {
    id: "3",
    prop: "weight",
    required: "No",
    description: "Font weight of the text.",
    options:
      "light\n" + "normal (default)\n" + "medium\n" + "semibold\n" + "bold",
  },
  {
    id: "4",
    prop: "variant",
    required: "No",
    description: "Text color variant.",
    options:
      "default\n" +
      "muted\n" +
      "primary\n" +
      "secondary\n" +
      "destructive\n" +
      "success",
  },
  {
    id: "5",
    prop: "align",
    required: "No",
    description: "Text alignment.",
    options: "left | center | right | justify",
  },
  {
    id: "6",
    prop: "truncate",
    required: "No",
    description: "Truncates text with ellipsis.",
    options: "true | false",
  },
  {
    id: "7",
    prop: "className",
    required: "No",
    description: "Additional Tailwind or custom CSS classes.",
    options: "Any valid CSS class string",
  },
  {
    id: "8",
    prop: "children",
    required: "Yes",
    description: "Text content.",
    options: "Text or ReactNode",
  },
];

export const flexPropsData = [
  {
    id: "1",
    prop: "direction",
    required: "No",
    description: "Flex direction.",
    options: "row (default)\n" + "row-reverse\n" + "col\n" + "col-reverse",
  },
  {
    id: "2",
    prop: "align",
    required: "No",
    description: "Align items along cross axis.",
    options:
      "start (default)\n" + "center\n" + "end\n" + "stretch\n" + "baseline",
  },
  {
    id: "3",
    prop: "justify",
    required: "No",
    description: "Justify content along main axis.",
    options:
      "start (default)\n" +
      "center\n" +
      "end\n" +
      "between\n" +
      "around\n" +
      "evenly",
  },
  {
    id: "4",
    prop: "wrap",
    required: "No",
    description: "Controls wrapping of flex items.",
    options: "nowrap (default)\n" + "wrap\n" + "wrap-reverse",
  },
  {
    id: "5",
    prop: "gap",
    required: "No",
    description: "Spacing between flex items.",
    options: "none (default)\n" + "xs\n" + "sm\n" + "md\n" + "lg\n" + "xl",
  },
  {
    id: "6",
    prop: "className",
    required: "No",
    description: "Additional Tailwind or custom CSS classes.",
    options: "Any valid CSS class string",
  },
  {
    id: "7",
    prop: "children",
    required: "Yes",
    description: "Flex container content.",
    options: "ReactNode",
  },
];

export const containerPropsData = [
  {
    id: "1",
    prop: "size",
    required: "No",
    description: "Maximum width of the container.",
    options: "sm\n" + "md\n" + "lg\n" + "xl (default)\n" + "2xl\n" + "full",
  },
  {
    id: "2",
    prop: "padding",
    required: "No",
    description: "Horizontal padding inside the container.",
    options: "none\n" + "sm\n" + "md (default)\n" + "lg\n" + "xl",
  },
  {
    id: "3",
    prop: "className",
    required: "No",
    description: "Additional Tailwind or custom CSS classes.",
    options: "Any valid CSS class string",
  },
  {
    id: "4",
    prop: "children",
    required: "Yes",
    description: "Content inside the container.",
    options: "ReactNode",
  },
];

export const drawerPropsData = [
  {
    id: "1",
    prop: "isOpen",
    required: "Yes",
    description: "Whether the drawer is open.",
    options: "boolean",
  },
  {
    id: "2",
    prop: "onClose",
    required: "Yes",
    description: "Callback when the drawer is closed.",
    options: "() => void",
  },
  {
    id: "3",
    prop: "direction",
    required: "No",
    description: "Direction from which the drawer slides in.",
    options: "'left' | 'right'",
  },
  {
    id: "4",
    prop: "title",
    required: "No",
    description: "Title of the drawer.",
    options: "string",
  },
  {
    id: "5",
    prop: "size",
    required: "No",
    description: "Size of the drawer.",
    options: "'sm' | 'md' | 'lg' | 'xl' | 'full'",
  },
];

export const mediaPickerPropsData = [
  {
    id: "1",
    prop: "onSelect",
    required: "No",
    description: "Callback fired when media is selected.",
    options: "(media: MediaItem[]) => void",
  },
  {
    id: "2",
    prop: "multiple",
    required: "No",
    description: "Allows selecting multiple items.",
    options: "true | false (default: false)",
  },
  {
    id: "3",
    prop: "allowedTypes",
    required: "No",
    description: "Array of allowed media types.",
    options: "['image', 'video', 'pdf', 'other']",
  },
  {
    id: "4",
    prop: "trigger",
    required: "No",
    description: "Custom trigger element.",
    options: "ReactNode",
  },
  {
    id: "5",
    prop: "initialSelected",
    required: "No",
    description: "Initially selected media items.",
    options: "MediaItem[]",
  },
];

export const sliderPropsData = [
  {
    id: "1",
    prop: "value",
    required: "Yes",
    description: "Current value(s) of the slider.",
    options: "number[]",
  },
  {
    id: "2",
    prop: "onValueChange",
    required: "No",
    description: "Callback when value changes.",
    options: "(value: number[]) => void",
  },
  {
    id: "3",
    prop: "min",
    required: "No",
    description: "Minimum value.",
    options: "number (default: 0)",
  },
  {
    id: "4",
    prop: "max",
    required: "No",
    description: "Maximum value.",
    options: "number (default: 100)",
  },
  {
    id: "5",
    prop: "step",
    required: "No",
    description: "Step increment.",
    options: "number (default: 1)",
  },
  {
    id: "6",
    prop: "minStepsBetweenThumbs",
    required: "No",
    description: "Minimum steps between thumbs in range mode.",
    options: "number (default: 0)",
  },
  {
    id: "7",
    prop: "formatLabel",
    required: "No",
    description: "Function to format the tooltip label.",
    options: "(value: number) => string",
  },
  {
    id: "8",
    prop: "showTooltip",
    required: "No",
    description: "Whether to show tooltip on drag.",
    options: "boolean (default: false)",
  },
  {
    id: "9",
    prop: "showInputs",
    required: "No",
    description: "Whether to show input fields for values.",
    options: "boolean (default: false)",
  },
];

export const infiniteLoaderPropsData = [
  {
    id: "1",
    prop: "items",
    required: "Yes",
    description: "Array of items to be rendered in the list.",
    options: "T[]",
  },
  {
    id: "2",
    prop: "hasMore",
    required: "Yes",
    description: "Indicates whether more items are available to load.",
    options: "true | false",
  },
  {
    id: "3",
    prop: "isLoading",
    required: "Yes",
    description: "Controls loading state while fetching more items.",
    options: "true | false",
  },
  {
    id: "4",
    prop: "onLoadMore",
    required: "Yes",
    description: "Callback triggered when the user reaches the scroll threshold.",
    options: "() => void",
  },
  {
    id: "5",
    prop: "renderItem",
    required: "Yes",
    description: "Function used to render each item.",
    options: "(item: T, index: number) => ReactNode",
  },
  {
    id: "6",
    prop: "loader",
    required: "No",
    description: "Custom loader component shown while loading more items.",
    options: "ReactNode",
  },
  {
    id: "7",
    prop: "endMessage",
    required: "No",
    description: "Message displayed when no more items are available.",
    options: "ReactNode",
  },
  {
    id: "8",
    prop: "className",
    required: "No",
    description: "Custom classes for the outer container.",
    options: "Any valid CSS class string",
  },
  {
    id: "9",
    prop: "itemClassName",
    required: "No",
    description: "Custom classes applied to each rendered item wrapper.",
    options: "Any valid CSS class string",
  },
  {
    id: "10",
    prop: "threshold",
    required: "No",
    description: "Intersection Observer threshold that triggers loading more items.",
    options: "Number between 0 and 1\n" + "Default: 1.0",
  },
];

export const tagSelectPropsData = [
  {
    id: "1",
    prop: "name",
    required: "No",
    description: "Name attribute for the input (useful for forms & accessibility).",
    options: "Any string",
  },
  {
    id: "2",
    prop: "label",
    required: "No",
    description: "Label displayed above the tag select input.",
    options: "String",
  },
  {
    id: "3",
    prop: "placeholder",
    required: "No",
    description: "Placeholder text shown inside the input.",
    options: "String",
  },
  {
    id: "4",
    prop: "error",
    required: "No",
    description: "Error message displayed below the component.",
    options: "String",
  },
  {
    id: "5",
    prop: "helperText",
    required: "No",
    description: "Helper text shown when no error is present.",
    options: "String",
  },
  {
    id: "6",
    prop: "required",
    required: "No",
    description: "Marks the field as required.",
    options: "true | false",
  },
  {
    id: "7",
    prop: "disabled",
    required: "No",
    description: "Disables the input and all interactions.",
    options: "true | false",
  },
  {
    id: "8",
    prop: "className",
    required: "No",
    description: "Additional Tailwind or custom CSS classes.",
    options: "Any valid CSS class string",
  },
  // Options & Values
  {
    id: "9",
    prop: "options",
    required: "No",
    description: "Available options that can be selected.",
    options:
      "Array of TagOption\n" +
      "{ value: string; label: string; disabled?: boolean }",
  },
  {
    id: "10",
    prop: "selectedValues",
    required: "No",
    description: "Currently selected tag values (controlled mode).",
    options: "TagOption[]",
  },
  {
    id: "11",
    prop: "inputValue",
    required: "No",
    description: "Input value (controlled mode).",
    options: "String",
  },
  // Mode & Limits
  {
    id: "12",
    prop: "selectMode",
    required: "No",
    description: "Selection mode for tags.",
    options: "single (default)\n" + "multiple",
  },
  {
    id: "13",
    prop: "limit",
    required: "No",
    description: "Maximum number of tags allowed.",
    options: "Number",
  },
  // Behavior Flags
  {
    id: "14",
    prop: "enableEnter",
    required: "No",
    description: "Allows creating/selecting a tag using Enter or Tab.",
    options: "true | false",
  },
  {
    id: "15",
    prop: "openOptions",
    required: "No",
    description: "Automatically opens dropdown on focus.",
    options: "true | false",
  },
  {
    id: "16",
    prop: "enablePaste",
    required: "No",
    description: "Allows pasting multiple values to create tags.",
    options: "true | false",
  },
  {
    id: "17",
    prop: "pasteSeparator",
    required: "No",
    description: "Separator used when pasting multiple values.",
    options: '"," (default) or any string',
  },
  // Callbacks
  {
    id: "18",
    prop: "onInputChange",
    required: "No",
    description: "Triggered when input value changes.",
    options: "(value: string) => void",
  },
  {
    id: "19",
    prop: "onSelectionChange",
    required: "No",
    description: "Triggered when selected tags change.",
    options: "(values: TagOption[]) => void",
  },
  {
    id: "20",
    prop: "validatePastedValue",
    required: "No",
    description: "Validates each pasted value before adding.",
    options: "(value: string) => boolean",
  },
  // Add New Link
  {
    id: "21",
    prop: "href",
    required: "No",
    description: "Optional link shown when no results are found.",
    options: "URL string",
  },
];

export const timePickerPropsData = [
  {
    id: "1",
    prop: "value",
    required: "No",
    description: "Selected time.",
    options: "Date",
  },
  {
    id: "2",
    prop: "onChange",
    required: "No",
    description: "Callback when time changes.",
    options: "(date: Date) => void",
  },
  {
    id: "3",
    prop: "use12Hours",
    required: "No",
    description: "Use 12-hour format with AM/PM.",
    options: "boolean (default: true)",
  },
  {
    id: "4",
    prop: "disabled",
    required: "No",
    description: "Disables the time picker.",
    options: "boolean",
  },
];
export const ratingsPropsData = [
  {
    id: "1",
    prop: "value",
    required: "No",
    description:
      "The current rating value (controlled component).",
    options: "number",
  },
  {
    id: "2",
    prop: "defaultValue",
    required: "No",
    description:
      "Initial rating value for uncontrolled usage.",
    options: "number",
  },
  {
    id: "3",
    prop: "max",
    required: "No",
    description:
      "Maximum number of stars to display.",
    options: "number (default: 5)",
  },
  {
    id: "4",
    prop: "onChange",
    required: "No",
    description:
      "Callback fired when the rating value changes.",
    options: "(value: number) => void",
  },
  {
    id: "5",
    prop: "readOnly",
    required: "No",
    description:
      "Disables user interaction while still displaying the rating.",
    options: "boolean (default: false)",
  },
  {
    id: "6",
    prop: "disabled",
    required: "No",
    description:
      "Disables the rating component visually and functionally.",
    options: "boolean (default: false)",
  },
  {
    id: "7",
    prop: "allowClear",
    required: "No",
    description:
      "Allows clearing the rating by clicking the same value again.",
    options: "boolean (default: true)",
  },
  {
    id: "8",
    prop: "size",
    required: "No",
    description:
      "Controls the size of the star icons.",
    options: `"sm" | "md" | "lg" (default: "md")`,
  },
  {
    id: "9",
    prop: "labels",
    required: "No",
    description:
      "Custom tooltip labels for each star.",
    options: "string[]",
  },
  {
    id: "10",
    prop: "emptyLabel",
    required: "No",
    description:
      "Text displayed when no rating is selected.",
    options: "string (default: \"No rating\")",
  },
  {
    id: "11",
    prop: "className",
    required: "No",
    description:
      "Additional CSS classes for custom styling.",
    options: "string",
  },
];



export const richTextEditorPropsData = [
  {
    id: "1",
    prop: "value",
    required: "Yes",
    description: "HTML content string.",
    options: "string",
  },
  {
    id: "2",
    prop: "onChange",
    required: "Yes",
    description: "Callback when content changes.",
    options: "(value: string) => void",
  },
  {
    id: "3",
    prop: "placeholder",
    required: "No",
    description: "Placeholder text when empty.",
    options: "string",
  },
  {
    id: "4",
    prop: "label",
    required: "No",
    description: "Label displayed above the editor.",
    options: "string",
  },
  {
    id: "5",
    prop: "error",
    required: "No",
    description: "Error message displayed below.",
    options: "string",
  },
  {
    id: "6",
    prop: "disabled",
    required: "No",
    description: "Disables editing.",
    options: "boolean",
  },
  {
    id: "7",
    prop: "className",
    required: "No",
    description: "Additional CSS classes for custom styling.",
    options: "string",
  },
];

export const stepperPropsData = [
  {
    id: "1",
    prop: "steps",
    required: "Yes",
    description: "Array of steps to display.",
    options: "{ title: string; description?: string }[]",
  },
  {
    id: "2",
    prop: "currentStep",
    required: "Yes",
    description: "The index of the current active step (0-based). Set to steps.length to show all as completed.",
    options: "number",
  },
  {
    id: "3",
    prop: "onStepChange",
    required: "No",
    description: "Callback when a step is clicked.",
    options: "(step: number) => void",
  },
  {
    id: "4",
    prop: "orientation",
    required: "No",
    description: "Layout orientation of the stepper.",
    options: "horizontal (default) | vertical",
  },
  {
    id: "5",
    prop: "className",
    required: "No",
    description: "Additional CSS classes for custom styling.",
    options: "string",
  },
  // {
  //   id: "5",
  //   prop: "renderStepContent",
  //   required: "No",
  //   description: "Whether to automatically switch to vertical on mobile.",
  //   options: "true (default) | false",
  // },
];

export const COMPONENT_SECTIONS = [
  { id: "buttons", label: "Buttons" },
  { id: "anchors", label: "Anchors" },
  {
    id: "inputs",
    label: "Input Components",
    children: [
      { id: "input", label: "Input" },
      { id: "textarea", label: "Textarea" },
    ],
  },
  {
    id: "selection",
    label: "Selection Components",
    children: [
      { id: "select", label: "Select" },
      { id: "select-search", label: "Select with search" },
      { id: "switch", label: "Switch" },
      { id: "checkbox", label: "Checkbox" },
      { id: "radio", label: "Radio Buttons" },
      { id: "date", label: "Date picker" },
      { id: "time", label: "Time picker" },
      { id: "slider", label: "Slider/Range" },
      { id: "media-picker", label: "Media Picker" },
      { id: "tag-select", label: "Tag Select" },
    ],
  },
  {
    id: "display",
    label: "Display Components",
    children: [
      { id: "badges", label: "Badges" },
      { id: "avatars", label: "Avatars" },
      { id: "empty-state", label: "Empty State" },
    ],
  },
  {
    id: "feedback",
    label: "Feedback Components",
    children: [
      { id: "loaders", label: "Loaders" },
      { id: "skeletons", label: "Skeletons" },
      { id: "progress-bars", label: "Progress bars" },
      { id: "toasts", label: "Toasts" },
      { id: "modal", label: "Modal" },
      { id: "tooltips", label: "Tooltips" },
      { id: "drawer", label: "Drawer" },
      { id: "stepper", label: "Stepper" },
      { id: "rich-text-editor", label: "Rich Text Editor" },
      { id: "ratings", label: "Ratings" },
    ],
  },
  { id: "accordion", label: "Accordion" },
  { id: "navigation", label: "Navigation Components",
        children: [
      { id: "tabs", label: "Tabs" },
      { id: "breadcrumbs", label: "Breadcrumbs" },
      { id: "dropdown", label: "Dropdown Menu" },
    ],
   },
  { id: "data", label: "Data Components",
      children: [
      { id: "searchInput", label: "Search Input" },
      { id: "table", label: "Table" },
      { id: "pagination", label: "Pagination" },
      { id: "infinite-loader", label: "Infinite Loader" },
    ],

   },
  { id: "typography", label: "Typography / Layout",
         children: [
      { id: "heading", label: "Heading" },
      { id: "textVariants", label: "Text Variants" },
      { id: "flex", label: "Flex Layout" },
      { id: "container", label: "Container" },
    ],
   },
];
