import { useEffect } from "react";

export const usePerformance = (pageName: string) => {
  useEffect(() => {
    if (typeof window === "undefined" || !window.performance) return;

    const onPageLoad = () => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const connectTime = perfData.responseEnd - perfData.requestStart;
      const renderTime = perfData.domComplete - perfData.domLoading;

      if (pageLoadTime > 0) {
        console.debug(`[Performance] ${pageName}:`, {
          pageLoad: `${pageLoadTime}ms`,
          connect: `${connectTime}ms`,
          render: `${renderTime}ms`,
        });
      }
    };

    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad);
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, [pageName]);
};
