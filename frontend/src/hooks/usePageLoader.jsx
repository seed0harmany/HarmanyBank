// hooks/usePageLoader.jsx
import { useState, useEffect } from "react";

export default function usePageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500); // smooth load
    return () => clearTimeout(t);
  }, []);

  return loading;
}
