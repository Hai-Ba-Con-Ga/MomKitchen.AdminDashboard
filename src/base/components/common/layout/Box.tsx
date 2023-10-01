import { VariantProps, cva } from "class-variance-authority";
import { AllHTMLAttributes, ReactNode } from "react";

const BoxStyle = cva("relative", {
  variants: {
    flex: {
      true: "flex gap-5",
      false: "",
    },
  },
});
interface BoxProps
  extends AllHTMLAttributes<HTMLElement>,
    VariantProps<typeof BoxStyle> {
  component?: "div" | "ul" | "li" | "span" | "p";
  children?: ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: any;
}
const Box = ({
  component: Component = "div",
  children,
  className,
  ref,
  flex,
  ...props
}: BoxProps) => {
  return (
    <Component
      ref={ref}
      className={BoxStyle({
        flex: flex,
        className,
      })}
      {...props}>
      {children}
    </Component>
  );
};

export default Box;
