import { SnackbarProps } from "@/types/snackbar";
import { atom } from "recoil";

const initialValue: SnackbarProps = {
  action: false,
  open: false,
  message: "Note archived",
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "right",
  },
  variant: "default",
  alert: {
    color: "primary",
    variant: "filled",
  },
  transition: "Fade",
  close: true,
  actionButton: false,
};

export const snackbarAtom = atom<SnackbarProps>({
  key: "snackbarProps",
  default: initialValue,
});
