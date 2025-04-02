import React from "react";
import { Combobox } from "@headlessui/react";
import { useEffect, useState } from "react";
import type { Table } from "@tanstack/react-table";
import clsx from "clsx";

interface Props<TData> {
  pageSizeOptions?: number[];
  table: Table<TData>;
}

export function PaginationSelect<TData>({
  pageSizeOptions,
  table,
}: Props<TData>) {
  const pageCount = table?.getPageCount();
  const pagesArray = pageCount ? [...Array(pageCount)] : [];
  const options = pagesArray?.map((item, index) => ({
    id: index,
    name: index,
  }));
  const [pageSizeSelected, setPageSizeSelected] = useState({
    id: JSON.parse(sessionStorage.getItem("pageSize") as string)?.id || 20,
    name: JSON.parse(sessionStorage.getItem("pageSize") as string)?.name || 20,
  });

  const [pageSelected, setPageSelected] = useState({
    id: table?.getState()?.pagination?.pageIndex || 0,
    name: table?.getState()?.pagination?.pageIndex || 0,
  });
  const [pagesOptions, setPagesOptions] = useState(() => options);

  const [pageSizesOptions, setPagesSizesOptions] = useState(
    pageSizeOptions?.map((item) => ({
      id: item,
      name: item,
    }))
  );
  const [query, setQuery] = useState("");

  const filter = () => {
    let copy = [...options];
    setPagesOptions(
      copy.filter((item) => {
        return (item.name + 1).toString().startsWith(query);
      })
    );
  };

  const saveSessionStorage = (key: any, values: any) => {
    sessionStorage.setItem(key, JSON.stringify(values));
  };

  useEffect(() => {
    filter();
  }, [query]);

  useEffect(() => {
    saveSessionStorage("pageSize", pageSizeSelected);
    table.setPageSize(pageSizeSelected?.id);
    table.setPageIndex(0);
    setPageSelected({
      id: 0,
      name: 0,
    });
  }, [pageSizeSelected]);

  useEffect(() => {
    setPagesOptions(
      pageCount
        ? [...Array(pageCount)].map((item, index) => ({
            id: index,
            name: index,
          }))
        : []
    );
  }, [table?.getPageCount()]);

  useEffect(() => {
    if (table?.getState()?.pagination?.pageIndex >= 0) {
      setPageSelected({
        id: table?.getState()?.pagination?.pageIndex,
        name: table?.getState()?.pagination?.pageIndex,
      });
    }
  }, [table?.getState().pagination]);

  return (
    <div className="hidden md:flex items-center gap-2">
      <div className="flex items-center gap-2 text-paragraph">
        <span>Exibir </span>
        <Combobox
          value={pageSizeSelected}
          onChange={(value: any) => {
            setPageSizeSelected(value);
          }}
        >
          {({ open }) => (
            <div className="relative">
              <Combobox.Button className="flex items-center justify-between w-[70px] h-[42px] text-paragraph outline-none text-p-sm cursor-pointer peer relative shadow-input rounded-lg border p-2 disabled:bg-light-gray-100 border-dark-blue-300">
                {pageSizeSelected?.name}
                {open ? (
                  <i className="uil uil-angle-up text-base top-[13px] pl-3 cursor-pointer text-label"></i>
                ) : (
                  <i className="uil uil-angle-down text-base top-[13px] pl-3 cursor-pointer text-label"></i>
                )}
              </Combobox.Button>
              <Combobox.Options className="w-full outline-none max-h-[200px]  overflow-auto border-[0.5px] mt-1 color-dark-blue-300 flex flex-col gap-y-2 p-1 absolute right-0 bottom-12 z-[999] rounded-lg bg-white">
                {pageSizesOptions?.map((opt) => {
                  const selected = opt?.id === pageSizeSelected?.id;
                  return (
                    <Combobox.Option
                      key={pageSizeSelected?.id + "size"}
                      value={opt}
                      className={clsx(
                        "p-2 rounded-lg items-center justify-center cursor-pointer flex whitespace-nowrap no-underline ",
                        {
                          "bg-blue-700 hover:bg-blue-700 hover:text-[#FFFFFF] text-[#FFFFFF]":
                            selected,
                        },
                        {
                          "hover:bg-light-gray-100 text-paragraph": !selected,
                        }
                      )}
                    >
                      {opt.name}
                    </Combobox.Option>
                  );
                })}
              </Combobox.Options>
            </div>
          )}
        </Combobox>
        <span> resultados</span>
      </div>
      <div className="bg-dark-blue-300 h-[20px] w-[1px]"></div>
      <div className="flex items-center gap-2 text-paragraph">
        <span>Ir para a página </span>
        <Combobox
          value={pageSelected}
          onChange={(value) => {
            if (value && value?.id) {
              setPageSelected({
                id: value?.id,
                name: value?.id,
              });
              saveSessionStorage("pageIndex", value?.id);
              table.setPageIndex(value?.id);
              setQuery("");
            }
          }}
        >
          {({ open }) => (
            <div className="relative">
              <Combobox.Button className="relative">
                <Combobox.Input
                  as="input"
                  onKeyDown={(e: any) => {
                    const val = Number(e.target?.value);

                    if (e.key == "Enter" && val && val <= pageCount) {
                      setPageSelected({
                        id: val - 1,
                        name: val - 1,
                      });
                      saveSessionStorage("pageIndex", val);
                      table.setPageIndex(val - 1);
                      setQuery("");
                    }
                  }}
                  displayValue={(item: any) => {
                    return pageSelected ? pageSelected?.id + 1 : item?.id + 1;
                  }}
                  onChange={(e) => {
                    if (e.target.value) {
                      setQuery(e.target.value);
                    }
                  }}
                  className="h-[42px] w-[70px] outline-none text-p-md text-paragraph cursor-pointer border-dark-blue-300 peer shadow-input rounded-lg border block disabled:bg-light-gray-100 p-2"
                />
                {open ? (
                  <i className="uil uil-angle-up text-base absolute top-[10px] right-2 cursor-pointer text-label"></i>
                ) : (
                  <i className="uil uil-angle-down text-base absolute top-[10px] right-2 cursor-pointer text-label"></i>
                )}
              </Combobox.Button>
              <Combobox.Options className="w-full outline-none max-h-[200px] overflow-auto border-[0.5px] mt-1 color-dark-blue-300 flex flex-col gap-y-2 p-1 absolute right-0 bottom-12 z-[999] rounded-lg bg-white">
                {pagesOptions.map((opt) => {
                  const selected = opt?.id === pageSelected?.id;

                  return (
                    <Combobox.Option
                      key={pageSelected?.id + "page"}
                      value={opt}
                      // onClick={() => {
                      //   setPageSelected({
                      //     id: opt.id - 1,
                      //     name: opt.id - 1,
                      //   });
                      //   saveSessionStorage(
                      //     'pageIndex',
                      //     opt?.id
                      //   );
                      //   table.setPageIndex(opt?.id);
                      // }}
                      className={clsx(
                        "p-2 rounded-lg items-center justify-center cursor-pointer flex whitespace-nowrap no-underline ",
                        {
                          "bg-blue-700 hover:bg-blue-700 hover:text-[#FFFFFF] text-[#FFFFFF]":
                            selected,
                        },
                        {
                          "hover:bg-light-gray-100 text-paragraph": !selected,
                        }
                      )}
                    >
                      {opt?.name + 1}
                    </Combobox.Option>
                  );
                })}
              </Combobox.Options>
            </div>
          )}
        </Combobox>
      </div>
    </div>
  );
}
