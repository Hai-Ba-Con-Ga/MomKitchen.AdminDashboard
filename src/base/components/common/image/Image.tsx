import { VariantProps, cva } from "class-variance-authority";
import React, { Attributes, ImgHTMLAttributes } from "react";
import { HTMLAttributes } from "react";
import { UISize } from "@/types/common/component";

const ImageStyle = cva("overflow-hidden", {
  variants: {
    ratio: {
      video: "aspect-video",
      square: "aspect-square",
    },
    radius: {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
  },
});
export interface ImageProps
  extends VariantProps<NonNullable<typeof ImageStyle>>,
    HTMLAttributes<HTMLDivElement> {
  url: string;
  imgProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, "src">;
}

const Image = ({
  url,
  ratio,
  radius = "xl",
  imgProps,
  ...props
}: ImageProps) => {
  return (
    <div
      {...props}
      className={ImageStyle({
        ratio,
        radius,
        className: props.className,
      })}>
      <img
        src={url}
        {...imgProps}
        className={"object-cover w-full h-full " + imgProps?.className}
      />
    </div>
  );
};

export default Image;
