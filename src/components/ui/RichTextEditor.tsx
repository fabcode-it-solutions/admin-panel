"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  RotateCcw,
  RotateCw,
  RemoveFormatting,
  type LucideIcon,
} from "lucide-react";

interface ToolbarButtonProps {
  command: string;
  icon: LucideIcon;
  title: string;
  activeCommand?: string;
  activeFormats: string[];
  execCommand: (command: string) => void;
  disabled?: boolean;
}

const ToolbarButton = ({
  command,
  icon: Icon,
  title,
  activeCommand,
  activeFormats,
  execCommand,
  disabled,
}: ToolbarButtonProps) => (
  <Button
    type="button"
    variant={activeFormats.includes(activeCommand || command) ? "default" : "ghost"}
    size="icon"
    className="h-8 w-8"
    onClick={() => execCommand(command)}
    title={title}
    disabled={disabled}
  >
    <Icon className="h-4 w-4" />
  </Button>
);

export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder,
  className,
  label,
  error,
  disabled,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = useState<string[]>([]);

  // Update editor content when value prop changes externally
  useEffect(() => {
    if (editorRef.current) {
      // Prevent cursor jumping by only updating if significantly different
      // This is a simple check; for a real production app, use a proper editor library
      if (editorRef.current.innerHTML !== value) {
         // Check if the difference is just due to browser normalization (e.g. &amp; vs &)
         // For now, we simply update. 
         // Note: This might reset cursor position if typing fast and parent updates 'value' asynchronously.
         // In a real scenario, we'd check document.activeElement.
         if (document.activeElement !== editorRef.current) {
            editorRef.current.innerHTML = value;
         } else if (!value) {
            // Allow clearing externally while focused
            editorRef.current.innerHTML = "";
         }
      }
    }
  }, [value]);

  const updateActiveFormats = () => {
    const formats: string[] = [];
    if (document.queryCommandState("bold")) formats.push("bold");
    if (document.queryCommandState("italic")) formats.push("italic");
    if (document.queryCommandState("underline")) formats.push("underline");
    if (document.queryCommandState("strikeThrough")) formats.push("strikeThrough");
    if (document.queryCommandState("insertUnorderedList")) formats.push("insertUnorderedList");
    if (document.queryCommandState("insertOrderedList")) formats.push("insertOrderedList");
    if (document.queryCommandState("justifyLeft")) formats.push("justifyLeft");
    if (document.queryCommandState("justifyCenter")) formats.push("justifyCenter");
    if (document.queryCommandState("justifyRight")) formats.push("justifyRight");
    setActiveFormats(formats);
  };

  const execCommand = (command: string, value?: string) => {
    if (disabled) return;
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
    editorRef.current?.focus();
    updateActiveFormats();
  };

  const handleLink = () => {
    if (disabled) return;
    const url = prompt("Enter URL:");
    if (url) {
      execCommand("createLink", url);
    }
  };



  return (
    <div className={cn("w-full space-y-1.5", className)}>
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex mb-7">
          {label}
        </label>
      )}
      <div
        className={cn(
          "border rounded-md shadow-sm bg-background overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-0",
          error && "border-destructive",
          disabled && "opacity-50 pointer-events-none"
        )}
      >
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-1 border-b bg-muted/30">
          <ToolbarButton command="bold" icon={Bold} title="Bold" activeFormats={activeFormats} execCommand={execCommand} disabled={disabled} />
          <ToolbarButton command="italic" icon={Italic} title="Italic" activeFormats={activeFormats} execCommand={execCommand} disabled={disabled} />
          <ToolbarButton command="underline" icon={Underline} title="Underline" activeFormats={activeFormats} execCommand={execCommand} disabled={disabled} />
          <ToolbarButton command="strikeThrough" icon={Strikethrough} title="Strikethrough" activeFormats={activeFormats} execCommand={execCommand} disabled={disabled} />
          
          <div className="w-px h-6 bg-border mx-1" />
          
          <ToolbarButton command="justifyLeft" icon={AlignLeft} title="Align Left" activeFormats={activeFormats} execCommand={execCommand} disabled={disabled} />
          <ToolbarButton command="justifyCenter" icon={AlignCenter} title="Align Center" activeFormats={activeFormats} execCommand={execCommand} disabled={disabled} />
          <ToolbarButton command="justifyRight" icon={AlignRight} title="Align Right" activeFormats={activeFormats} execCommand={execCommand} disabled={disabled} />

          <div className="w-px h-6 bg-border mx-1" />

          <ToolbarButton command="insertUnorderedList" icon={List} title="Bullet List" activeFormats={activeFormats} execCommand={execCommand} disabled={disabled} />
          <ToolbarButton command="insertOrderedList" icon={ListOrdered} title="Numbered List" activeFormats={activeFormats} execCommand={execCommand} disabled={disabled} />
          
          <div className="w-px h-6 bg-border mx-1" />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleLink}
            title="Insert Link"
            disabled={disabled}
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
          
          {/* <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => execCommand("removeFormat")}
            title="Clear Format"
            disabled={disabled}
          >
            <RemoveFormatting className="h-4 w-4" />
          </Button> */}

           <div className="w-px h-6 bg-border mx-1" />
           
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => execCommand("undo")}
            title="Undo"
            disabled={disabled}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => execCommand("redo")}
            title="Redo"
            disabled={disabled}
          >
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>

        {/* Editor Area */}
        <div
          ref={editorRef}
          contentEditable={!disabled}
          className={cn(
            "min-h-[150px] max-h-[500px] overflow-y-auto p-4 outline-none prose prose-sm max-w-none dark:prose-invert",
            "empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground empty:before:pointer-events-none"
          )}
          data-placeholder={placeholder}
          onInput={() => {
            if (editorRef.current) {
                // Handle empty state clean up (browsers sometimes leave <br>)
                const html = editorRef.current.innerHTML;
                if (html === "<br>" || html === "") {
                    onChange("");
                } else {
                    onChange(html);
                }
            }
          }}
          onKeyUp={updateActiveFormats}
          onMouseUp={updateActiveFormats}
          onBlur={updateActiveFormats}
        />
      </div>
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
}
