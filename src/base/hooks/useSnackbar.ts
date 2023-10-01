import { SnackbarProps } from "@/types/snackbar";
import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { snackbarAtom } from "../store/atoms/snackbar";

const useSnackbar = () => {
  const [snackbar, setSnakebar] = useRecoilState(snackbarAtom);
  const openSimpleErrorSnackbar = useCallback(
    (message: string) => {
      setSnakebar({
        open: true,
        action: false,
        variant: "alert",
        alert: {
          color: "success",
        },
        close: false,
        message: message,
        actionButton: null,
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
        transition: null,
      });
    },
    [setSnakebar]
  );
  const openSnackbar = useCallback(
    (props: Omit<SnackbarProps, "open">) => {
      setSnakebar({
        open: true,
        ...props,
      });
    },
    [setSnakebar]
  );
  const closeSnakebar = useCallback(() => {
    setSnakebar({
      ...snackbar,
      open: false,
    });
  }, [snackbar, setSnakebar]);
  return {
    snackbar,
    openSimpleErrorSnackbar,
    openSnackbar,
    closeSnakebar,
  };
};

export default useSnackbar;
