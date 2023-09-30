import React, { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { snackbarAtom } from "../store/atoms/snackbar";
import { SnackbarProps } from "@/types/snackbar";

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
    [snackbar]
  );
  const openSnackbar = useCallback(
    (props: Omit<SnackbarProps, "open">) => {
      setSnakebar({
        open: true,
        ...props,
      });
    },
    [snackbar]
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
