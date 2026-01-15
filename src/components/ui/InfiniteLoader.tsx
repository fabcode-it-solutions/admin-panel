'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { Loader } from './Loader';
import { cn } from '@/lib/utils';

export interface InfiniteLoaderProps<T> {
  items: T[];
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  loader?: React.ReactNode;
  endMessage?: React.ReactNode;
  className?: string;
  itemClassName?: string;
  threshold?: number;
}

function InfiniteLoaderComponent<T>({
  items,
  hasMore,
  isLoading,
  onLoadMore,
  renderItem,
  loader,
  endMessage,
  className,
  itemClassName,
  threshold = 1.0,
}: InfiniteLoaderProps<T>) {
  const loadMoreRef = useInfiniteScroll(onLoadMore, hasMore, isLoading, {
    threshold,
  });

  return (
    <div className={cn('space-y-4', className)}>
      {/* Items */}
      <div className="space-y-2">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={itemClassName}
          >
            {renderItem(item, index)}
          </motion.div>
        ))}
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex justify-center py-4">
          {loader || <Loader size="md" text="Loading more..." />}
        </div>
      )}

      {/* Sentinel Element for Intersection Observer */}
      {hasMore && !isLoading && (
        <div ref={loadMoreRef} className="h-10" />
      )}

      {/* End Message */}
      {!hasMore && items.length > 0 && (
        <div className="flex justify-center py-4 text-sm text-muted-foreground">
          {endMessage || 'No more items to load'}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && items.length === 0 && (
        <div className="flex justify-center py-12 text-sm text-muted-foreground">
          No items found
        </div>
      )}
    </div>
  );
}

export const InfiniteLoader = memo(InfiniteLoaderComponent) as typeof InfiniteLoaderComponent;
