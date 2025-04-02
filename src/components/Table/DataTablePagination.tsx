import React from "react";
import type { Table } from "@tanstack/react-table";
import { TableFooter } from "./TableComponents";
import { Fragment, JSX, MutableRefObject } from "react";
import { PaginationSelect } from "./PaginationSelects";
import { Button } from "../Button";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  footer?: JSX.Element;
  totalData?: number;
  selectAllOption?: boolean;
  onSelectAll?: (value: any) => void;
  onRemoveAll?: (value: any) => void;
  rowsSelected?: number;
  tableRef?: MutableRefObject<HTMLDivElement>;
  paginationScroll?: number;
  pageSizeOptions?: number[];
}

export function DataTablePagination<TData>({
  table,
  footer = <div></div>,
  totalData,
  selectAllOption,
  onSelectAll,
  rowsSelected,
  onRemoveAll,
  tableRef,
  paginationScroll,
  pageSizeOptions = [],
}: DataTablePaginationProps<TData>) {
  const selectedPage = table?.getState()?.pagination.pageIndex;
  const results = totalData;
  const pageCount = table?.getPageCount();
  const limitPagePositive = table?.getState()?.pagination.pageIndex + 2;
  const limitPageNegative = table?.getState()?.pagination.pageIndex - 2;
  const pagesArray = pageCount ? [...Array(pageCount)] : [];
  const pageRowsCount = table?.getRowModel()?.rows?.length || 0;

  return (
    <div className="w-full flex flex-col sticky z-[90] bottom-0">
      <div
        className="bg-none overflow-x-hidden md:overflow-x-auto overflow-y-hidden table-scroll  rounded-lg relative top-[8px] -space-y-1 z-[302] h-[12px]"
        onScroll={(evt) => {
          tableRef?.current.scrollTo({
            left: evt.currentTarget.scrollLeft,
          });
        }}
      >
        <div
          style={{
            width: paginationScroll ? paginationScroll - 2 : 0,
          }}
        >
          &nbsp;
        </div>
      </div>

      <TableFooter>
        {pageSizeOptions?.length > 0 && (
          <PaginationSelect table={table} pageSizeOptions={pageSizeOptions} />
        )}
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-normal gap-2 md:gap-4">
          {footer}
          {selectAllOption && (
            <div>
              {rowsSelected !== totalData ? (
                <div className="md:border-l border-gray-300 pl-4">
                  <Button size="xxs" onClick={onSelectAll} variant="link">
                    Selecionar todos os {totalData}
                  </Button>
                </div>
              ) : (
                <div className="md:border-l border-gray-300 pl-4">
                  <Button size="xxs" onClick={onRemoveAll} variant="link">
                    Desmarcar todos
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row items-center md:justify-end justify-center gap-2 flex-1">
          <span className="text-p-md text-paragraph mr-1">
            Mostrando {pageRowsCount} de {results} resultados
          </span>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              variant="icon"
              icon={<i className="uil uil-angle-left text-base"></i>}
              size="table"
              className="justify-center"
            />

            {limitPageNegative >= 1 && (
              <div className="flex gap-2">
                <Button
                  onClick={() => table.setPageIndex(0)}
                  variant="icon"
                  icon={
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#393C4D",
                      }}
                    >
                      {1}
                    </div>
                  }
                  size="table"
                  className="justify-center"
                />
                {limitPageNegative !== 1 && (
                  <Button
                    disabled
                    variant="icon"
                    icon={<>...</>}
                    size="table"
                    className="justify-center"
                  />
                )}
              </div>
            )}

            {pagesArray.map((elem, index) => {
              const checkPageIndexLimit =
                index <= limitPagePositive && index >= limitPageNegative;
              const isSelectedPage = index === selectedPage;

              return (
                <Fragment key={index + "pagination"}>
                  {checkPageIndexLimit && (
                    <Button
                      onClick={() => table.setPageIndex(index)}
                      className="font-normal text-xs justify-center"
                      variant={isSelectedPage ? "blue" : "icon"}
                      size="table"
                      icon={
                        <div
                          style={{
                            fontSize: "12px",
                            color: isSelectedPage ? "#FFF" : "#393C4D",
                          }}
                        >
                          {(index + 1).toLocaleString("pt-BR")}
                        </div>
                      }
                    ></Button>
                  )}
                </Fragment>
              );
            })}

            {limitPagePositive + 1 < pageCount && (
              <div className="flex gap-2">
                {limitPagePositive !== pagesArray.length - 2 && (
                  <Button
                    disabled
                    variant="icon"
                    icon={<>...</>}
                    size="table"
                    className="justify-center"
                  />
                )}
                <Button
                  onClick={() => table.setPageIndex(pageCount)}
                  variant="icon"
                  icon={
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#393C4D",
                      }}
                    >
                      {pageCount.toLocaleString("pt-BR")}
                    </div>
                  }
                  size="table"
                  className="font-normal justify-center"
                />
              </div>
            )}
            <Button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              variant="icon"
              icon={<i className="uil uil-angle-right text-base"></i>}
              size="table"
              className="justify-center"
            />
          </div>
        </div>
      </TableFooter>
    </div>
  );
}
