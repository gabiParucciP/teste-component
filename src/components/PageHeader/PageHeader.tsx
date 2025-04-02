import React from "react";
import "./page-header.css";

type PageHeaderProps = {
  title: JSX.Element | string;
  breadcrumbs?: {
    name: string;
    link?: string;
  }[];
  children?: JSX.Element;
  description?: JSX.Element | string;
};

export const PageHeader = ({
  title,
  breadcrumbs,
  children,
  description,
}: PageHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row place-content-between font-sans pb-4 w-full">
      <div className="flex flex-col gap-1">
        <div className="flex flex-row items-center text-p-lg text-label">
          {breadcrumbs &&
            breadcrumbs.map((breadcrumb, index) => (
              <div key={index}>
                {breadcrumb.link ? (
                  <a
                    href={breadcrumb.link}
                    className="hover:no-underline hover:text-paragraph"
                  >
                    <span className="cursor-pointer flex items-center">
                      {index > 0 && <i className="uil uil-angle-right"></i>}
                      {breadcrumb.name}
                    </span>
                  </a>
                ) : (
                  <div className="flex items-center">
                    <i className="uil uil-angle-right"></i>
                    <span
                      className={
                        index === breadcrumbs.length - 1 ? "text-paragraph" : ""
                      }
                    >
                      {breadcrumb.name}
                    </span>
                  </div>
                )}
              </div>
            ))}
        </div>
        <div>
          <h2 className="text-t-md text-title font-bold mb-1">{title}</h2>
          {description && (
            <span className="text-p-lg text-label">{description}</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-6 md:justify-end flex-1 mt-2 md:mt-0">
        {children}
      </div>
    </div>
  );
};
