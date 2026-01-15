import { useEffect, useRef, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
}

/**
 * Hook for implementing infinite scroll
 * @param callback - Function to call when threshold is reached
 * @param hasMore - Whether there are more items to load
 * @param isLoading - Whether data is currently being loaded
 * @param options - IntersectionObserver options
 */
export function useInfiniteScroll(
  callback: () => void,
  hasMore: boolean,
  isLoading: boolean,
  options: UseInfiniteScrollOptions = {}
) {
  const { threshold = 1.0, root = null, rootMargin = '0px' } = options;
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !isLoading) {
        callback();
      }
    },
    [callback, hasMore, isLoading]
  );

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;

    const observerOptions = {
      root,
      rootMargin,
      threshold,
    };

    observerRef.current = new IntersectionObserver(handleObserver, observerOptions);
    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver, root, rootMargin, threshold]);

  return loadMoreRef;
}

/**
 * Alternative hook using scroll event (for more control)
 */
export function useScrollInfinite(
  callback: () => void,
  hasMore: boolean,
  isLoading: boolean,
  threshold: number = 200
) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleScroll = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (
          scrollHeight - scrollTop - clientHeight < threshold &&
          hasMore &&
          !isLoading
        ) {
          callback();
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [callback, hasMore, isLoading, threshold]);
}
