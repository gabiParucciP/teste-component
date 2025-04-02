import React from "react";

export default function PageBox(props: {
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="py-5 px-4 border border-light-gray-200 rounded-lg">
      {props?.title && (
        <h1 className="text-t-xs font-bold text-title mb-4">{props.title}</h1>
      )}
      {props?.children}
    </div>
  );
}
