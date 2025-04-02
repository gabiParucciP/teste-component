import React from "react";
import clsx from "clsx";

export type TimelineProps = {
  data: {
    date?: string;
    label: string;
    description?: string;
    variant: string;
    info?: string;
    action?: JSX.Element;
    color?: string;
  }[];
};

export const translateVariant = (variant) => {
  switch (variant) {
    case "green":
      return "success";
    case "red":
      return "dangerous";
    case "orange":
      return "warning";
    case "blue":
      return "info";
    case "gray":
      return "gray";
    default:
      return "purple";
  }
};

const variants = {
  success: {
    small: "bg-success-700",
    big: "bg-success-100",
  },
  dangerous: {
    small: "bg-dangerous-700",
    big: "bg-dangerous-100",
  },
  warning: {
    small: "bg-warning-700",
    big: "bg-warning-100",
  },
  info: {
    small: "bg-blue-700",
    big: "bg-blue-100",
  },
  gray: {
    small: "bg-dark-blue-300",
    big: "bg-light-gray-100",
  },
  purple: {
    small: "bg-purple-700",
    big: "bg-purple-100",
  },
};

export const Timeline = ({ data }: TimelineProps) => {
  return (
    <div className="flex flex-col">
      {data?.length > 0 &&
        data?.map((item, index) => (
          <div className="flex" key={index}>
            <div className="mr-3 relative">
              {index !== data.length - 1 && (
                <div className="w-[2px] bg-light-gray-200 ml-[5px] h-full absolute mt-8"></div>
              )}
              <div className="relative mt-8">
                <div
                  className={clsx(
                    {
                      [variants[item?.variant]?.big]: !item?.color,
                    },
                    "h-3 w-3 rounded-full"
                  )}
                  style={{
                    backgroundColor:
                      item?.color ?? variants[item?.variant]?.big,
                  }}
                ></div>
                <div
                  className={clsx(
                    {
                      [variants[item?.variant]?.small]: !item?.color,
                    },
                    "h-2 w-2 rounded-full absolute z-30 top-[2px] left-[2px]"
                  )}
                  style={{
                    backgroundColor:
                      item?.color ?? variants[item?.variant]?.small,
                  }}
                ></div>
              </div>
            </div>
            <div className="flex flex-col mt-3 relative">
              <span className="text-p-sm text-label">{item?.date}</span>
              <div className="flex items-center gap-[3px]">
                <span className="text-p-md text-paragraph font-bold">
                  {item?.label}
                </span>
                {item?.action}
              </div>
              <span className="text-p-sm text-paragraph">
                {item?.description}
              </span>
              <span className="text-p-xs text-paragraph">{item?.info}</span>
            </div>
          </div>
        ))}
    </div>
  );
};
