'use client';

import { useEffect, useState, useCallback } from 'react';
import { InfiniteLoader } from './ui/InfiniteLoader';


interface Product {
  id: number;
  name: string;
  price: number;
}

const PAGE_SIZE = 10;
const TOTAL_ITEMS = 35;

export default function InfiniteLoaderDemo() {
  const [items, setItems] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  /**
   * Fake API call
   */
  const fetchProducts = async (page: number) => {
    await new Promise((res) => setTimeout(res, 1000));

    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    if (start >= TOTAL_ITEMS) {
      return [];
    }

    return Array.from({ length: Math.min(PAGE_SIZE, TOTAL_ITEMS - start) })
      .map((_, index) => ({
        id: start + index + 1,
        name: `Product ${start + index + 1}`,
        price: Math.floor(Math.random() * 1000),
      }));
  };

  /**
   * Load more handler
   */
  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    const newItems = await fetchProducts(page);

    setItems((prev) => [...prev, ...newItems]);
    setPage((prev) => prev + 1);
    setHasMore(newItems.length === PAGE_SIZE);
    setIsLoading(false);
  }, [page, isLoading, hasMore]);

  /**
   * Initial load
   */
  useEffect(() => {
    if(loadMore){
    loadMore();
    }
  }, [loadMore]);

  return (
    <div className="mx-auto max-w-lg p-6">
      <h1 className="mb-6 text-xl font-semibold">
        Infinite Loader Demo
      </h1>

      <InfiniteLoader<Product>
        items={items}
        hasMore={hasMore}
        isLoading={isLoading}
        onLoadMore={loadMore}
        threshold={0.5}
        itemClassName="rounded-lg border p-4 bg-white dark:bg-slate-800/50"
        renderItem={(item) => (
          <div className="flex justify-between">
            <span>{item.name}</span>
            <span className="font-medium">₹{item.price}</span>
          </div>
        )}
        endMessage="🎉 You’ve reached the end"
      />
    </div>
  );
}
