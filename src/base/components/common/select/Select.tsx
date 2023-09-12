import { VariantProps, cva } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";
import React, {
  HTMLAttributes,
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { deepEqual } from "@/utils/dataHelper";
import { useDetectOutside } from "@/base/hooks";

const selectStyle = cva("relative", {
  variants: {
    variant: {},
    outline: {
      primary: "",
      secondary: "",
      accent: "",
    },
    background: {
      primary: "",
      secondary: "",
      accent: "",
    },
  },
});
type SelectStyleProps = VariantProps<typeof selectStyle>;
interface SelectTypeProps
  extends Omit<SelectStyleProps, "outline" | "background"> {
  theme?: `${NonNullable<SelectStyleProps["outline"]>}/${NonNullable<
    SelectStyleProps["background"]
  >}`;
}
interface SelectProps<T>
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange">,
    SelectTypeProps {
  className?: string;
  // children?: ReactNode[];
  label?: ReactNode;
  children: ReactNode;
  multiple?: boolean;
  onChange: (value: T) => void;
}

const Select = <T,>({
  className,
  theme = "primary/secondary",
  children,
  label,
  multiple = false,
  onChange,
  ...props
}: SelectProps<string>) => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  /**
   * T , T[]
   */
  const [valueDisplay, setValueDisplay] = useState<JSX.Element | JSX.Element[]>(
    () => {
      if (multiple) return [] as any;
    }
  );
  const ref = useRef();
  useDetectOutside({
    ref,
    onOutsideClick: () => {
      setDropdown(false);
    },
  });
  const handleChange = (value: string, display: JSX.Element) => {
    if (multiple && Array.isArray(valueDisplay)) {
      console.log(valueDisplay.includes(display));

      setValueDisplay(
        !valueDisplay.includes(display)
          ? [...valueDisplay, display]
          : valueDisplay.filter((v) => v.key === display.key)
      );
    } else {
      setValueDisplay(display);
    }
    setDropdown(false);
    onChange(value);
  };
  const renderValue = useMemo(() => {
    if (Array.isArray(valueDisplay)) {
      return valueDisplay.map((value) => value);
    } else {
      return valueDisplay;
    }
  }, [valueDisplay]);
  return (
    <div
      ref={ref as any}
      className={`cursor-pointer relative px-4 p-2 border-slate-800 border w-fit focus-within:border-blue-500 rounded-sm ${className}`}
      {...props}>
      <label
        htmlFor="hidden"
        className="cursor-pointer absolute z-[2] w-full h-full block top-0 left-0"></label>
      <input
        aria-hidden="true"
        id="hidden"
        className="absolute opacity-0"
        type="checkbox"
        checked={dropdown}
        onChange={() => {
          setDropdown(!dropdown);
        }}
      />
      {renderValue || label}
      <AnimatePresence>
        {dropdown && (
          <motion.ul
            initial={{ opacity: 0, y: "20%" }}
            animate={{ opacity: 1, y: "103%" }}
            exit={{ opacity: 0, y: "20%" }}
            transition={{ duration: 0.2 }}
            className="py-2 px-0 absolute shadow-md bottom-0 left-0 w-fit bg-white rounded-sm list-style-none">
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement<any>(child, {
                  onClick: (value: any) =>
                    handleChange(value, child.props.children),
                  value: child.props.value,
                });
              }
              return child;
            })}
          </motion.ul>
        )}
      </AnimatePresence>
      {/* {children?.map((child) => child)} */}
      <fieldset className="w-full h-full absolute top-0 left-0">
        <legend className="ml-2 px-2 relative -top-1/2"></legend>
      </fieldset>
    </div>
  );
};

export default Select;
