import { useEffect, useState } from "react";

export default function useWindowSize() {
  const [windowWidth, setWindowWidth] = useState(undefined);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return windowWidth;
}
