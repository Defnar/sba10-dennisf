import { useEffect, useRef, useState } from "react";

//creates event listener for clicking outside a dropdown menu
export function useOutsideClickClose(onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  const [closeable, setCloseable] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (closeable && ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
        setCloseable(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    setCloseable(true);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [closeable, onClose]);

  return { ref };
}
