"use client";

import React, { useState, useRef } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { Input } from "@/components/ui/Input";
import {
  Image as ImageIcon,
  FileText,
  Video,
  Upload,
  Check,
  Search,
  File,
  X,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---
export type MediaType = "image" | "video" | "pdf" | "other";

export interface MediaItem {
  id: string;
  url: string;
  type: MediaType;
  name: string;
  size?: string;
  createdAt?: string;
  thumbnail?: string; // For videos or PDFs if applicable
}

export interface MediaPickerProps {
  onSelect?: (media: MediaItem[]) => void;
  multiple?: boolean;
  allowedTypes?: MediaType[];
  trigger?: React.ReactNode;
  initialSelected?: MediaItem[];
  title?: string;
  className?: string;
}

// --- Mock Data ---
const MOCK_MEDIA: MediaItem[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
    type: "image",
    name: "Mountain Landscape.jpg",
    size: "2.4 MB",
    createdAt: "2024-01-15",
  },
];

export function MediaPicker({
  onSelect,
  multiple = false,
  allowedTypes = ["image", "video", "pdf", "other"],
  trigger,
  initialSelected = [],
  title = "Media Library",
  className,
}: MediaPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<MediaItem[]>(initialSelected);
  const [savedMedia, setSavedMedia] = useState<MediaItem[]>(MOCK_MEDIA);
  const [activeTab, setActiveTab] = useState<MediaType | "all">("all");
  
  // Upload State
  const [uploadQueue, setUploadQueue] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Handlers ---

  const handleOpen = () => {
    setIsOpen(true);
    // Sync initial selected if needed, or keep persistent state? 
    // Usually we want to reflect current selection when opening
    if (initialSelected.length > 0 && selectedItems.length === 0) {
       setSelectedItems(initialSelected);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setUploadQueue([]); // Clear upload queue on close
  };

  const toggleSelection = (item: MediaItem) => {
    if (multiple) {
      setSelectedItems((prev) => {
        const exists = prev.find((i) => i.id === item.id);
        if (exists) {
          return prev.filter((i) => i.id !== item.id);
        } else {
          return [...prev, item];
        }
      });
    } else {
      setSelectedItems([item]);
    }
  };

  const handleConfirmSelection = () => {
    if (onSelect) {
      onSelect(selectedItems);
    }
    handleClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadQueue(Array.from(e.target.files));
    }
  };

  const handleSaveUploaded = () => {
    // Simulate upload processing
    const newMediaItems: MediaItem[] = uploadQueue.map((file, index) => {
        let type: MediaType = 'other';
        if (file.type.startsWith('image/')) type = 'image';
        else if (file.type.startsWith('video/')) type = 'video';
        else if (file.type === 'application/pdf') type = 'pdf';

        return {
            id: `new-${Date.now()}-${index}`,
            url: URL.createObjectURL(file), // Create local preview URL
            type,
            name: file.name,
            size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
            createdAt: new Date().toISOString().split('T')[0]
        };
    });

    setSavedMedia(prev => [...newMediaItems, ...prev]);
    setUploadQueue([]);
    setIsUploadOpen(false); // Close upload modal
  };

  const handleRemoveFromQueue = (index: number) => {
      setUploadQueue(prev => prev.filter((_, i) => i !== index));
  }

  const handleDeleteMedia = (e: React.MouseEvent, mediaId: string) => {
    e.stopPropagation(); // Prevent triggering selection
    setSavedMedia(prev => prev.filter(item => item.id !== mediaId));
    setSelectedItems(prev => prev.filter(item => item.id !== mediaId));
  };

  // Filter logic
  const filteredMedia = savedMedia.filter((item) => {
    const matchesType = activeTab === "all" || item.type === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAllowed = allowedTypes.includes(item.type);
    return matchesType && matchesSearch && matchesAllowed;
  });

  // --- Render Helpers ---

  const getIconForType = (type: MediaType) => {
    switch (type) {
      case "image": return <ImageIcon className="h-5 w-5" />;
      case "video": return <Video className="h-5 w-5" />;
      case "pdf": return <FileText className="h-5 w-5" />;
      default: return <File className="h-5 w-5" />;
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <div onClick={handleOpen} className="inline-block">
        {trigger || (
          <Button variant="outline" className="gap-2">
            <ImageIcon className="h-4 w-4" /> Select Media
          </Button>
        )}
      </div>

      {/* Main Media Library Modal */}
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title={title}
        description="Select media from your library or upload new files."
        size="xl"
        className={cn("flex flex-col h-[80vh]", className)}
        footer={
           <div className="flex justify-between w-full items-center">
             <div className="text-sm text-muted-foreground">
                {selectedItems.length} selected
             </div>
             <div className="flex gap-2">
                <Button variant="outline" onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirmSelection} disabled={selectedItems.length === 0}>
                    Insert Selected
                </Button>
             </div>
           </div>
        }
      >
        <div className="flex flex-col h-full gap-4 p-1">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center pb-4 border-b">
            <div className="flex gap-2 bg-muted p-1 rounded-lg">
                {(['all', ...allowedTypes] as const).map(type => (
                    <button
                        key={type}
                        onClick={() => setActiveTab(type as MediaType | "all")}
                        className={cn(
                            "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
                            activeTab === type 
                                ? "bg-background shadow-sm text-foreground" 
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                ))}
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Search media..." 
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Button onClick={() => setIsUploadOpen(true)} className="gap-2">
                    <Upload className="h-4 w-4" /> Upload
                </Button>
            </div>
          </div>

          {/* Grid Content */}
          <div className="flex-1 overflow-y-auto min-h-0">
             {filteredMedia.length === 0 ? (
                 <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                     <div className="bg-muted/50 p-4 rounded-full mb-4">
                        <ImageIcon className="h-10 w-10 opacity-50" />
                     </div>
                     <p>No media found</p>
                     <Button variant="link" onClick={() => setIsUploadOpen(true)}>Upload something?</Button>
                 </div>
             ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredMedia.map((item) => {
                        const isSelected = selectedItems.some(i => i.id === item.id);
                        return (
                            <div 
                                key={item.id}
                                onClick={() => toggleSelection(item)}
                                className={cn(
                                    "group relative aspect-square rounded-xl border-2 overflow-hidden cursor-pointer transition-all hover:border-primary/50",
                                    isSelected ? "border-primary ring-2 ring-primary/20" : "border-transparent bg-muted/30"
                                )}
                            >
                                {/* Selection Check */}
                                <AnimatePresence>
                                    {isSelected && (
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.5 }}
                                            className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground rounded-full p-1 shadow-md"
                                        >
                                            <Check className="h-3 w-3" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Delete Button */}
                                <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="h-6 w-6 rounded-full shadow-sm"
                                        onClick={(e) => handleDeleteMedia(e, item.id)}
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </Button>
                                </div>

                                {/* Preview Content */}
                                <div className="w-full h-full flex items-center justify-center bg-muted/20">
                                    {item.type === 'image' ? (
                                        <img 
                                            src={item.url} 
                                            alt={item.name} 
                                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                        />
                                    ) : item.type === 'video' ? (
                                        <div className="relative w-full h-full flex items-center justify-center bg-black/5">
                                             <video src={item.url} className="w-full h-full object-cover opacity-80" />
                                             <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="bg-black/30 p-3 rounded-full backdrop-blur-sm">
                                                    <Video className="h-6 w-6 text-white" />
                                                </div>
                                             </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 text-muted-foreground p-4 text-center">
                                            {getIconForType(item.type)}
                                            <span className="text-xs line-clamp-2 break-all">{item.name}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Hover Info Overlay */}
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end">
                                    <p className="text-white text-xs font-medium truncate">{item.name}</p>
                                    <div className="flex justify-between items-center text-[10px] text-white/70 mt-1">
                                        <span>{item.size}</span>
                                        <span className="uppercase">{item.type}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
             )}
          </div>
        </div>
      </Modal>

      {/* Upload Modal (Secondary) */}
      <Modal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        title="Upload Media"
        description="Choose files to add to your library."
        size="md"
      >
        <div className="space-y-6">
            <div 
                className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
            >
                <input 
                    type="file" 
                    multiple 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*,video/*,application/pdf"
                />
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <Upload className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-1">Click to upload files</h3>
                <p className="text-sm text-muted-foreground mb-4">or drag and drop here</p>
                <div className="flex gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary">Images</Badge>
                    <Badge variant="secondary">Videos</Badge>
                    <Badge variant="secondary">PDFs</Badge>
                </div>
            </div>

            {/* Upload Queue */}
            {uploadQueue.length > 0 && (
                <div className="space-y-3">
                    <h4 className="text-sm font-medium">Ready to upload ({uploadQueue.length})</h4>
                    <div className="max-h-[200px] overflow-y-auto space-y-2 pr-2">
                        {uploadQueue.map((file, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="h-8 w-8 rounded bg-background flex items-center justify-center border shrink-0">
                                        {file.type.startsWith('image/') ? <ImageIcon className="h-4 w-4" /> : 
                                         file.type.startsWith('video/') ? <Video className="h-4 w-4" /> :
                                         <FileText className="h-4 w-4" />}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium truncate">{file.name}</p>
                                        <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                                    </div>
                                </div>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                    onClick={() => handleRemoveFromQueue(i)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsUploadOpen(false)}>Cancel</Button>
                <Button onClick={handleSaveUploaded} disabled={uploadQueue.length === 0}>
                    Save Media
                </Button>
            </div>
        </div>
      </Modal>
    </>
  );
}
