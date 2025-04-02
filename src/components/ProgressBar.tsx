import React from "react";
import clsx from "clsx";
import { useEffect, useState } from "react";

type ProgressBarProps = {
  percentage: number;
  variant: "primary" | "success" | "danger" | "info";
  status: string;
};

const variants = {
  primary: {
    bar: "bg-gradient-to-b from-blue-start to-blue-end",
    text: "text-blue-700",
  },
  success: {
    bar: "bg-gradient-to-b from-success-start to-success-end",
    text: "text-success-700",
  },
  danger: {
    bar: "bg-gradient-to-b from-danger-start to-danger-end",
    text: "text-dangerous-800",
  },
  info: {
    bar: "bg-gradient-to-b from-blue-start to-blue-end",
    text: "text-blue-700",
  },
};

export const ProgressBar = ({
  percentage,
  variant = "primary",
  status,
}: ProgressBarProps) => {
  const [barPercentage, setBarPercentage] = useState(() => fixPercentage());

  function fixPercentage() {
    if (percentage > 100) {
      return 100;
    } else {
      return percentage;
    }
  }
  useEffect(() => {
    setBarPercentage(fixPercentage());
  }, [percentage]);

  return (
    <div className="flex flex-col gap-y-[2px] min-w-[170px]">
      <div className="w-full p-[1px] border border-dark-blue-300 rounded-[15px]">
        <div
          className={clsx(variants[variant].bar, "h-[14px] rounded-[15px]")}
          style={{ width: `${barPercentage}%` }}
        ></div>
      </div>
      {status && (
        <span className={clsx(variants[variant].text, "text-blue-700 text-xs")}>
          {status}
          {percentage && (
            <span className="font-bold">&nbsp;- {percentage} %</span>
          )}
        </span>
      )}
    </div>
  );
};
