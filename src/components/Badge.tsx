import React from "react";
import clsx from "clsx";
import { ReactNode } from "react";

type BadgeProps = {
  variant?: keyof typeof variants;
  children?: ReactNode | JSX.Element;
  className?: string;
  style?: any;
};

const variants = {
  success: "bg-success-100 text-success-800",
  warning: "bg-warning-100 text-warning-800",
  blue: "bg-blue-100 text-blue-800",
  yellow: "bg-yellow-100 text-yellow-800",
  gray: "bg-light-gray-100 text-dark-blue-400",
  dangerous: "bg-dangerous-100 text-dangerous-800",
  purple: "bg-purple-100 text-purple-800",
  light: "bg-light-gray-100 text-dark-blue-400",
  white:
    "bg-[#FFF] text-dark-blue-400 px-4 py-[6px] border border-light shadow-button text-paragraph",
  primary: "bg-rose-100 text-rose-800",
  dark: "bg-dark-blue-700 text-white",
  outline: "bg-white text-rose-700 border border-light-gray-200",
  "dark-gray": "bg-light-gray-100 text-dark-blue-600",
};

export const Badge = ({
  variant = "blue",
  children,
  className,
  style,
}: BadgeProps) => {
  return (
    <span
      className={clsx(
        { [variants[variant]]: variant?.length > 0 },
        "py-1 px-2 text-p-md font-normal inline-flex items-center justify-center gap-1 rounded-full text-center",
        className
      )}
      style={style}
    >
      {children}
    </span>
  );
};
