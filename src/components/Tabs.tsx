import React from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import clsx from "clsx";
import { ReactNode, useState } from "react";
import { Button } from "./Button";

type tab = {
  key: string;
  label: string;
  icon: JSX.Element | string;
  children: JSX.Element;
  secondChildren?: JSX.Element;
  required?: boolean;
  disabled?: boolean;
  subPanel?: JSX.Element;
};

export type TabProps = {
  tabs: tab[];
  createButtonLabel: string;
  cancelButton: ReactNode;
  buttonDisabled?: boolean;
  buttonLoading?: boolean;
  saveButton?: JSX.Element;
  onClick?: (value: tab) => void;
  onSave?: () => void | number;
  showNextStep?: boolean;
};

export const Tabs = ({
  tabs,
  cancelButton,
  buttonDisabled,
  createButtonLabel,
  buttonLoading,
  saveButton,
  onClick,
  onSave,
  showNextStep = true,
}: TabProps) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const ShowSaveButton = saveButton ? (
    <>{saveButton}</>
  ) : (
    <Button
      icon={<i className="uil uil-check"></i>}
      variant="primary"
      loading={buttonLoading}
      onClick={async () => {
        if (onSave) {
          const resp = await onSave();
          if (typeof resp == "number") {
            setSelectedTab(resp);
          }
        }
      }}
    >
      {createButtonLabel}
    </Button>
  );

  return (
    <div className="flex flex-col w-full">
      <TabGroup
        selectedIndex={selectedTab}
        onChange={(index) => {
          setSelectedTab(index);
          if (onClick) onClick(tabs[index]);
        }}
      >
        <TabList className="flex gap-2">
          {tabs.map((tab, index) => {
            return (
              <Tab
                key={tab.key}
                disabled={tab?.disabled}
                className={({ selected }) =>
                  clsx(
                    "group inline-flex rounded-t-lg font-bold text-p-md border border-light-gray-200 px-6 py-3 z-20",
                    {
                      "text-rose-700 border-b-0 bg-white shadow-tabs": selected,
                      "bg-light-gray-100 text-rose-700 opacity-80 shadow-tabDisabled":
                        !selected && !tab.disabled,
                      "text-disabled bg-light-gray-100 shadow-tabDisabled":
                        tab.disabled && !selected,
                    }
                  )
                }
              >
                <div
                  className={clsx(
                    "-ml-0.5 md:mr-2 flex items-center justify-center font-bold rounded-full h-8 w-8 group-aria-selected:bg-rose-700 group-aria-selected:text-white",
                    {
                      "bg-light-gray-200 text-disabled": tab.disabled,
                      "text-white bg-rose-700": !tab.disabled,
                    }
                  )}
                  aria-hidden="true"
                >
                  <span className="mt-[1px]">{index + 1}</span>
                </div>

                <span className="self-center hidden md:block">{tab.label}</span>
              </Tab>
            );
          })}
        </TabList>

        <TabPanels>
          {tabs.map((tab) => {
            return (
              <div key={tab.key} className="flex flex-col gap-y-6">
                <TabPanel>
                  <div
                    className={clsx({
                      ["flex items-start justify-between gap-6 flex-col md:flex-row"]:
                        tab.secondChildren,
                    })}
                  >
                    <div className="w-full flex-1">
                      <div className="outline-none border border-light-gray-200 px-4 py-6 rounded-lg rounded-tl-none -mt-[1px]">
                        {tab.children}
                      </div>

                      {tab.subPanel && (
                        <div className="mt-4">{tab.subPanel}</div>
                      )}
                    </div>
                    {tab.secondChildren}
                  </div>
                </TabPanel>
              </div>
            );
          })}
        </TabPanels>
      </TabGroup>

      <div className="flex self-start gap-x-4 mt-6 mb-10">
        {selectedTab === 0 ? (
          cancelButton
        ) : (
          <Button
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              setSelectedTab(selectedTab - 1);
            }}
          >
            Voltar
          </Button>
        )}

        {selectedTab !== tabs.length - 1 && showNextStep ? (
          <Button
            variant="primary"
            disabled={buttonDisabled}
            onClick={(e) => {
              if (onClick) onClick(tabs[selectedTab + 1]);
              if (!tabs[selectedTab + 1].disabled) {
                e.preventDefault();
                setSelectedTab(selectedTab + 1);
              }
            }}
          >
            Próximo
          </Button>
        ) : (
          <>{ShowSaveButton}</>
        )}
      </div>
    </div>
  );
};
