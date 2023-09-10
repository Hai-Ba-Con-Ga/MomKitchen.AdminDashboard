import React, { HTMLAttributes, ReactNode } from "react";

export interface SelectItemProps<T>
  extends Omit<HTMLAttributes<HTMLLIElement>, "onClick"> {
  value: T;
  children: ReactNode;
  selected?: boolean
  onClick?: (value: T) => void;
}

const SelectItem = <T,>({
  onClick,
  value,
  children,
  className,
  selected =false,
  ...props
}: SelectItemProps<T>) => {
  return (
    <li className={`${selected ? "bg-slate-100":""} hover:bg-slate-100 py-2 px-4 ${className}`} {...props} onClick={() => onClick?.(value)}>
      {children}
    </li>
  );
};

export default SelectItem;
