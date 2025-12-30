import { useEffect, useRef, useCallback } from "react";

/**
 * Hook to handle infinite scrolling using Intersection Observer.
 * 
 * @param loadMore - Callback to load more data.
 * @param hasMore - Boolean indicating if there are more pages to load.
 * @param isLoading - Boolean indicating if data is currently loading.
 * @param threshold - Distance from bottom (0.0 to 1.0) to trigger load.
 * @returns Ref callback to attach to the sentinel element at the bottom of the list.
 */
export function useInfiniteScroll(
  loadMore: () => void,
  hasMore: boolean,
  isLoading: boolean,
  threshold: number = 0.5
) {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return;
      
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      }, {
        rootMargin: "100px", // Trigger before reaching the absolute bottom
        threshold: threshold
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, loadMore, threshold]
  );

  return lastElementRef;
}
