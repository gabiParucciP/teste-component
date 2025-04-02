import React from "react";
import clsx from "clsx";
import Skeleton from "react-loading-skeleton";

export const SkeletonDetails = ({ loading, ...props }) => {
  const label = (
    <div className="w-[120px] h-5">
      <Skeleton className="h-full" />
    </div>
  );

  const description = (
    <div className="w-[105px] h-5">
      <Skeleton className="h-full" />
    </div>
  );

  const details = (
    <div className="flex flex-col gap-2 w-[25%]">
      {label}
      {description}
    </div>
  );

  const lineDetails = (
    <div className="flex items-start justify-between">
      {Array(5)
        .fill(null)
        .map((_, index) => (
          <div key={index + "line"}>{details}</div>
        ))}
    </div>
  );

  const timeline = (
    <div className="flex flex-col">
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <div className="flex" key={index}>
            <div className="mr-3 relative">
              {index !== 2 && (
                <div className="w-[2px] bg-light-gray-200 ml-[5px] h-full absolute mt-10"></div>
              )}
              <div className="relative mt-10">
                <div className="h-3 w-3 rounded-full bg-light-gray-100"></div>
                <div className="h-2 w-2 rounded-full absolute z-30 top-[2px] left-[2px] bg-dark-blue-300"></div>
              </div>
            </div>
            <div className="flex flex-col h-[60px] mt-3 relative gap-[4px]">
              <div className="w-[105px] h-4">
                <Skeleton className="h-full" />
              </div>
              {label}
              <div className="w-[105px] h-4">
                <Skeleton className="h-full" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );

  return (
    <div className="flex-1 w-full h-full">
      <div className={clsx({ ["hidden"]: !loading }, "flex flex-col gap-4")}>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-[4px]">
              {label}
              <div className="w-3 h-5">
                <Skeleton className="h-full" />
              </div>
              {label}
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[200px] h-7">
                <Skeleton className="h-full" />
              </div>
              <div className="w-[95px] h-5">
                <Skeleton className="h-full rounded-l" />
              </div>
            </div>
            <div className="w-[480px] h-5">
              <Skeleton className="h-full" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-[150px] h-[46px]">
              <Skeleton className="h-full" />
            </div>
            <div className="w-[150px] h-[46px]">
              <Skeleton className="h-full" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <div key={index + "tabs"} className="w-[220px] h-5">
                  <Skeleton className="h-full" />
                </div>
              ))}
          </div>
          <div className="h-[1px] w-full bg-light-gray-200"></div>
        </div>
        <div className="flex items-start gap-8">
          <div className="w-[75%] border border-light-gray-200 rounded-lg p-4 flex flex-col gap-6">
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <div key={index + "lineDetails"}>{lineDetails}</div>
              ))}
          </div>
          <div className="flex-1 flex-col">
            <div className="p-3 border border-light-gray-200 rounded-lg">
              {label}
            </div>
            <div className="border-x border-light-gray-200 -mt-1 p-4 pt-[20px] flex items-center gap-2">
              <div className="w-6 h-6">
                <Skeleton className="h-full rounded-f" />
              </div>
              {label}
            </div>
            <div className="border border-light-gray-200 rounded-b-lg p-4 pt-0">
              {timeline}
            </div>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          { ["hidden"]: loading },
          "flex flex-1 w-full h-full flex-col"
        )}
      >
        {props.children}
      </div>
    </div>
  );
};
