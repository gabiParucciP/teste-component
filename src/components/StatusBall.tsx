import React from "react";
import clsx from "clsx";

export type StatusBallProps = {
  label?: string;
  variant?: keyof typeof variants;
};

const variants = {
  success: {
    small: "bg-success-800",
    big: "bg-success-100",
  },
  dangerous: {
    small: "bg-dangerous-800",
    big: "bg-dangerous-100",
  },
  warning: {
    small: "bg-warning-800",
    big: "bg-warning-100",
  },
  info: {
    small: "bg-blue-800",
    big: "bg-blue-100",
  },
  purple: {
    small: "bg-purple-800",
    big: "bg-purple-100",
  },
  yellow: {
    small: "bg-yellow-800",
    big: "bg-yellow-100",
  },
  gray: {
    small: "bg-dark-blue-300",
    big: "bg-light-gray-100",
  },
};

export const StatusBall = ({ label, variant = "info" }: StatusBallProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div
          className={clsx(
            {
              [variants[variant].big]: true,
            },
            "h-3 w-3 rounded-full"
          )}
        ></div>
        <div
          className={clsx(
            {
              [variants[variant].small]: true,
            },
            "h-2 w-2 rounded-full absolute z-30 top-[2px] left-[2px]"
          )}
        ></div>
      </div>
      <span className="text-p-md text-paragraph font-normal">{label}</span>
    </div>
  );
};
