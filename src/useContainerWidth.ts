import { DependencyList, useEffect, useRef, useState } from "react";

/**
 * Определение ширины контейнера
 */
export function useContainerWidth(deps: DependencyList = []) {
  const ref = useRef<HTMLElement>(null);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, deps);

  return { ref, width };
}