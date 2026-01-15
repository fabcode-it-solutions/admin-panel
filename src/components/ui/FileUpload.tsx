'use client';

import React, { useState, useCallback, useRef, memo } from 'react';
import { Upload, X, File, FileImage, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, formatNumber } from '@/lib/utils';
import { Button } from './Button';

export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  maxFiles?: number;
  onUpload: (files: File[]) => void | Promise<void>;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  label?: string;
  className?: string;
}

interface UploadedFilePreview extends File {
  preview?: string;
}

const FileUploadComponent: React.FC<FileUploadProps> = ({
  accept,
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 5,
  onUpload,
  disabled = false,
  error,
  helperText,
  label,
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFilePreview[]>([]);
  const [uploadError, setUploadError] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return `File ${file.name} is too large. Maximum size is ${formatBytes(maxSize)}.`;
    }
    if (accept) {
      const acceptedTypes = accept.split(',').map((type) => type.trim());
      const fileType = file.type;
      const fileExtension = '.' + file.name.split('.').pop();
      
      const isValid = acceptedTypes.some((type) => {
        if (type.startsWith('.')) {
          return fileExtension === type;
        }
        if (type.endsWith('/*')) {
          return fileType.startsWith(type.slice(0, -1));
        }
        return fileType === type;
      });

      if (!isValid) {
        return `File ${file.name} type is not accepted.`;
      }
    }
    return null;
  };

  const handleFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles || disabled) return;

      const fileArray = Array.from(newFiles);
      const validFiles: UploadedFilePreview[] = [];
      let errorMessage = '';

      for (const file of fileArray) {
        if (maxFiles && files.length + validFiles.length >= maxFiles) {
          errorMessage = `Maximum ${maxFiles} files allowed.`;
          break;
        }

        const validationError = validateFile(file);
        if (validationError) {
          errorMessage = validationError;
          break;
        }

        validFiles.push(file);
      }

      if (errorMessage) {
        setUploadError(errorMessage);
        return;
      }

      setUploadError('');
      setFiles((prev) => [...prev, ...validFiles]);
    },
    [disabled, files.length, maxFiles, accept, maxSize]
  );

  const handleDragEnter = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        setIsDragging(true);
      }
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (disabled) return;

      const droppedFiles = e.dataTransfer.files;
      handleFiles(droppedFiles);
    },
    [disabled, handleFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
    },
    [handleFiles]
  );

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setUploadError('');
  }, []);

  const handleUpload = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadError('');

    try {
      await onUpload(files);
      setFiles([]);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    } catch (err: any) {
      setUploadError(err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <FileImage className="h-5 w-5" />;
    }
    if (file.type.includes('pdf') || file.type.includes('document')) {
      return <FileText className="h-5 w-5" />;
    }
    return <File className="h-5 w-5" />;
  };

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
      )}

      {/* Drop Zone */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative border-2 border-dashed rounded-lg p-8 text-center transition-colors',
          isDragging && 'border-primary bg-primary/5',
          !isDragging && 'border-border',
          disabled && 'opacity-50 cursor-not-allowed',
          !disabled && 'cursor-pointer hover:border-primary/50',
          (error || uploadError) && 'border-destructive'
        )}
        onClick={() => !disabled && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          disabled={disabled}
          className="hidden"
        />

        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-sm text-foreground mb-1">
          <span className="font-medium text-primary">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-muted-foreground">
          {accept ? `Accepted: ${accept}` : 'Any file type'}
          {maxSize && ` • Max size: ${formatBytes(maxSize)}`}
        </p>
      </div>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-2"
          >
            {files.map((file, index) => (
              <motion.div
                key={`${file.name}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center justify-between p-3 rounded-lg border border-border bg-card"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {getFileIcon(file)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatBytes(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  disabled={isUploading}
                  className="ml-2 p-1 rounded-md hover:bg-accent transition-colors disabled:opacity-50"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            ))}

            <Button
              onClick={handleUpload}
              loading={isUploading}
              disabled={files.length === 0}
              className="w-full"
            >
              Upload {files.length} {files.length === 1 ? 'file' : 'files'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error / Helper Text */}
      {((error || uploadError) || helperText) && (
        <p
          className={cn(
            'mt-2 text-sm',
            (error || uploadError) ? 'text-destructive' : 'text-muted-foreground'
          )}
        >
          {error || uploadError || helperText}
        </p>
      )}
    </div>
  );
};

function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const FileUpload = memo(FileUploadComponent);
