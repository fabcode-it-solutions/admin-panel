'use client';

import React, { useState, useCallback, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Column } from '@/types';
import { Checkbox } from './Checkbox';
import { Loader } from './Loader';
import { EmptyState } from './EmptyState';

export interface TableProps<T = any> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  selectedRows?: string[];
  onSelectRows?: (ids: string[]) => void;
  className?: string;
  striped?: boolean;
  hoverable?: boolean;
  stickyHeader?: boolean;
  rowKey?: keyof T | ((row: T) => string);
  snippet?:string
}

type SortDirection = 'asc' | 'desc' | null;

interface SortState {
  column: string | null;
  direction: SortDirection;
}

function TableComponent<T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  emptyMessage = 'No data available',
  onRowClick,
  selectedRows = [],
  onSelectRows,
  className,
  striped = false,
  hoverable = true,
  stickyHeader = false,
  rowKey = 'id',
}: TableProps<T>) {
  const [sortState, setSortState] = useState<SortState>({
    column: null,
    direction: null,
  });

  const getRowId = useCallback(
    (row: T): string => {
      if (typeof rowKey === 'function') {
        return rowKey(row);
      }
      return String(row[rowKey]);
    },
    [rowKey]
  );

  const sortedData = useMemo(() => {
    if (!sortState.column || !sortState.direction) {
      return data;
    }

    const column = columns.find((col) => col.key === sortState.column);
    if (!column) return data;

    return [...data].sort((a, b) => {
      const aValue = column.accessor ? column.accessor(a) : a[column.key];
      const bValue = column.accessor ? column.accessor(b) : b[column.key];

      if (aValue === bValue) return 0;

      const comparison = aValue < bValue ? -1 : 1;
      return sortState.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, sortState, columns]);

  const handleSort = useCallback((columnKey: string) => {
    setSortState((prev) => {
      if (prev.column !== columnKey) {
        return { column: columnKey, direction: 'asc' };
      }
      if (prev.direction === 'asc') {
        return { column: columnKey, direction: 'desc' };
      }
      return { column: null, direction: null };
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    if (!onSelectRows) return;

    if (selectedRows.length === data.length) {
      onSelectRows([]);
    } else {
      onSelectRows(data.map(getRowId));
    }
  }, [data, selectedRows, onSelectRows, getRowId]);

  const handleSelectRow = useCallback(
    (rowId: string) => {
      if (!onSelectRows) return;

      if (selectedRows.includes(rowId)) {
        onSelectRows(selectedRows.filter((id) => id !== rowId));
      } else {
        onSelectRows([...selectedRows, rowId]);
      }
    },
    [selectedRows, onSelectRows]
  );

  const renderSortIcon = (columnKey: string) => {
    if (sortState.column !== columnKey) {
      return <ChevronsUpDown className="h-4 w-4" />;
    }
    return sortState.direction === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader size="lg" text="Loading data..." />
      </div>
    );
  }

  if (data.length === 0) {
    return <EmptyState title="No data" description={emptyMessage} />;
  }

  return (
    <div className={cn('w-full overflow-auto', className)}>
      <table className="w-full border-collapse">
        <thead
          className={cn(
            'bg-muted/50',
            stickyHeader && 'sticky top-0 z-10 shadow-sm'
          )}
        >
          <tr>
            {onSelectRows && (
              <th className="w-12 px-4 py-3 text-left">
                <Checkbox
                  id='multirow-selected'
                  checked={
                    selectedRows.length === data.length && data.length > 0
                  }
                  onChange={handleSelectAll}
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  'px-4 py-3 text-left text-sm font-medium text-muted-foreground',
                  column.sortable && 'cursor-pointer select-none hover:text-foreground transition-colors',
                  column.width && `w-${column.width}`
                )}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center gap-2">
                  {column.header}
                  {column.sortable && renderSortIcon(column.key)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => {
            const rowId = getRowId(row);
            const isSelected = selectedRows.includes(rowId);

            return (
              <motion.tr
                key={rowId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.03 }}
                className={cn(
                  'border-b border-border transition-colors',
                  hoverable && 'hover:bg-muted/50',
                  striped && index % 2 === 1 && 'bg-muted/30',
                  isSelected && 'bg-primary/10',
                  onRowClick && 'cursor-pointer'
                )}
                onClick={() => onRowClick?.(row)}
              >
                {onSelectRows && (
                  <td className="px-4 py-3">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => handleSelectRow(rowId)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                )}
                {columns.map((column) => {
                  const value = column.accessor
                    ? column.accessor(row)
                    : row[column.key];

                  return (
                    <td
                      key={column.key}
                      className="px-4 py-3 text-sm text-foreground whitespace-pre-line"
                    >
                      {column.cell ? column.cell(value, row) : value}
                    </td>
                  );
                })}
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export const Table = memo(TableComponent) as typeof TableComponent;
