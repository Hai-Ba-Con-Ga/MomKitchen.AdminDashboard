import {
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  Ref,
  forwardRef,
} from "react";
import { v4 as uuidv4 } from "uuid";
export type DropdownListOptions = {
  label: ReactNode;
  action: (event: MouseEvent & any) => void;
};

export interface DropdownListProps extends HTMLAttributes<HTMLUListElement> {
  options: DropdownListOptions[];
  optionProps?: Omit<HTMLAttributes<HTMLLIElement>, "onClick">;
  children?: ReactNode;
  ref?: Ref<HTMLUListElement>;
}

const DropdownList = forwardRef<any, DropdownListProps>(
  ({ className, options, optionProps, ...props }, ref) => {
    return (
      <ul
        ref={ref}
        className={`bg-white w-full py-3 px-2 rounded-sm  ${className} `}
        {...props}>
        {options.map(({ action, label }, index) => (
          <li
            key={uuidv4()}
            className={`mb-2 last:mb-1 cursor-pointer hover:bg-hightlight px-2 py-1 hover:text-white ${optionProps?.className}`}
            onClick={action}
            {...optionProps}>
            {label}
          </li>
        ))}
      </ul>
    );
  }
);

export default DropdownList;
