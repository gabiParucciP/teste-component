import React from "react";
import clsx from "clsx";
import Skeleton from "react-loading-skeleton";

export const SkeletonList = ({ loading, ...props }) => {
  const tableLine = (
    <div className="border-b gap-x-2 border-light-gray-200 py-6 px-2 flex items-center justify-between">
      <div className="w-[200px] h-6">
        <Skeleton className="h-6" />
      </div>
      <div className="w-[200px]">
        <Skeleton className="h-6" />
      </div>
      <div className="w-[200px]">
        <Skeleton className="h-6" />
      </div>
      <div className="w-[200px]">
        <Skeleton className="h-6" />
      </div>
      <div className="w-[200px]">
        <Skeleton className="h-6" />
      </div>
    </div>
  );

  const headerItem = (
    <div className="border border-light-gray-200 rounded-lg py-3 px-2 flex items-center justify-between gap-5">
      <div className="w-[200px] h-6">
        <Skeleton className="h-6" />
      </div>
      <div className="w-[200px]">
        <Skeleton className="h-6" />
      </div>
      <div className="w-[200px]">
        <Skeleton className="h-6" />
      </div>
      <div className="w-[200px]">
        <Skeleton className="h-6" />
      </div>
      <div className="w-[200px]">
        <Skeleton className="h-6" />
      </div>
    </div>
  );

  const buttonPagination = (
    <div className="w-8 h-8 rounded-md">
      <Skeleton className="h-full" />
    </div>
  );

  return (
    <div className="flex flex-1 flex-col gap-y-4">
      <div
        className={clsx(
          { ["hidden"]: !loading },
          "flex-1 flex flex-col h-full justify-between relative"
        )}
      >
        <div className="flex-1">
          <div className="mt-3">
            {new Array(1).fill(null).map((_, index) => (
              <div key={index + "second"}>{headerItem}</div>
            ))}
            {new Array(4).fill(null).map((_, index) => (
              <div key={index + "third"}>{tableLine}</div>
            ))}
          </div>
        </div>
        <div className="py-4 px-6 sticky bottom-0 bg-white w-full border border-light-gray-200 rounded-t-lg flex items-center gap-3 justify-end">
          <div className="w-[190px] h-6 rounded-md">
            <Skeleton className="h-full" />
          </div>
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <div key={index + "buttons"}>{buttonPagination}</div>
            ))}
        </div>
      </div>
      <div className={clsx({ ["hidden"]: loading }, "flex flex-1 h-full")}>
        {props.children}
      </div>
    </div>
  );
};
