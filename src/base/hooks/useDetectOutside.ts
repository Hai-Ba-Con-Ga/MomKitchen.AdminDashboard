import { useEffect } from "react";

type Props = {
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: any;
  onOutsideClick: () => void;
};

const useDetectOutside = ({ onOutsideClick, ref }: Props) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick();
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, onOutsideClick]);

  return ref;
};

export default useDetectOutside;
