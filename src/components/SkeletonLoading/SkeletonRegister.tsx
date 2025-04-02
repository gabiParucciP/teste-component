import React from "react";
import clsx from "clsx";
import Skeleton from "react-loading-skeleton";

export const SkeletonRegister = ({ loading, ...props }) => {
  const label = (
    <div className="w-[120px] h-5">
      <Skeleton className="h-full" />
    </div>
  );

  const subtitle = (
    <div className="w-[204px] h-7">
      <Skeleton className="h-full" />
    </div>
  );

  const input = (
    <div className="w-[316px] h-12">
      <Skeleton className="h-full" />
    </div>
  );

  const inputSm = (
    <div className="w-[126px] h-12">
      <Skeleton className="h-full" />
    </div>
  );

  return (
    <>
      <div className={clsx({ ["hidden"]: !loading })}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-[4px]">
              {label}
              <div className="w-3 h-5">
                <Skeleton className="h-full" />
              </div>
              {label}
            </div>
            <div className="w-[250px] h-7">
              <Skeleton className="h-full" />
            </div>
          </div>
          <div className="w-full border border-light-gray-200 rounded-lg px-4 py-6">
            <div>
              {subtitle}
              <div className="mt-4 flex items-center gap-4">
                {Array(4)
                  .fill(null)
                  .map((_, index) => (
                    <div key={index + "first"}>{input}</div>
                  ))}
              </div>
              <div className="mt-6 flex items-center gap-4">
                {Array(3)
                  .fill(null)
                  .map((_, index) => (
                    <div key={index + "second"}>{input}</div>
                  ))}
              </div>
            </div>
            <div className="mt-8">
              {subtitle}
              <div className="mt-4 flex items-center gap-4">
                {Array(2)
                  .fill(null)
                  .map((_, index) => (
                    <div key={index + "third"}>{input}</div>
                  ))}
              </div>
            </div>
            <div className="mt-8">
              {subtitle}
              <div className="mt-4 flex items-center gap-4">
                <div className="w-[216px] h-12">
                  <Skeleton className="h-full" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4">
                {input}
                {inputSm}
                {input}
              </div>
              <div className="mt-4 flex items-center gap-4">
                {input}
                {input}
                {inputSm}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 mt-6">
          {Array(2)
            .fill(null)
            .map((_, index) => (
              <div key={index + "buttons"}>{inputSm}</div>
            ))}
        </div>
      </div>
      <div className={clsx({ ["hidden"]: loading })}>{props.children}</div>
    </>
  );
};
