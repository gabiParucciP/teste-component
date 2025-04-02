import React from "react";
import clsx from "clsx";
import { useState } from "react";

export type TabsProps = {
  tabs: {
    key: string;
    label: string | JSX.Element;
    icon: any;
    children: JSX.Element;
    hidden?: boolean;
  }[];
  onClick?: (current) => void;
};

export default function SimpleTab({ tabs, onClick }: TabsProps) {
  const [currentTab, setCurrentTab] = useState(0);

  function isCurrentTab(index) {
    return index === currentTab;
  }
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex flex-col h-full flex-1">
        <div className="border-b border-light-200">
          <div className="-mb-px flex" aria-label="Tabs">
            {tabs
              .filter((item) => !item.hidden)
              .map((tab, index) => (
                <nav
                  key={tab.key}
                  className={clsx(
                    isCurrentTab(index)
                      ? "border-rose-700 text-rose-700 font-bold hover:border-rose-800 hover:text-rose-800 hover:font-bold"
                      : "border-transparent text-label hover:text-paragraph",
                    "group cursor-pointer flex items-center border-b-2 py-1 px-4 text-base"
                  )}
                  aria-current={isCurrentTab(index) ? "page" : undefined}
                  onClick={() => {
                    setCurrentTab(index);
                    if (onClick) {
                      onClick(tabs[index]);
                    }
                  }}
                >
                  <div
                    id="tab-icon"
                    className={clsx(
                      isCurrentTab(index)
                        ? "text-rose-700 group-hover:text-rose-800"
                        : "text-label group-hover:text-paragraph",
                      "-ml-0.5 mr-2"
                    )}
                    aria-hidden="true"
                  >
                    {tab.icon}
                  </div>
                  <span>{tab.label}</span>
                </nav>
              ))}
          </div>
        </div>
        <div className="h-full flex-1 flex flex-col">
          {tabs[currentTab].children}
        </div>
      </div>
    </div>
  );
}
