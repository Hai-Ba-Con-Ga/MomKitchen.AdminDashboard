import { useEffect } from "react";

type Props = {
  ref: any;
  onOutsideClick: () => void;
};

const useDetectOutside = ({ onOutsideClick, ref }: Props) => {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onOutsideClick();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref]);

  return ref;
};

export default useDetectOutside;
