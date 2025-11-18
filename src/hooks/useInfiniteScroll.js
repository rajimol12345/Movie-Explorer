// Example fix for your custom useInfiniteScroll.js
import { useEffect } from "react";

export default function useInfiniteScroll(callback, hasMore, loading) {
  useEffect(() => {
    if (loading || !hasMore) return;

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
        callback();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [callback, hasMore, loading]);
}
