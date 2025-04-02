import type {
  ColumnFiltersState,
  ExpandedState,
  FilterFn,
  PaginationState,
  Row,
  SortingState,
  Table as TableType,
  VisibilityState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, {
  JSX,
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./TableComponents";
import { DataTablePagination } from "./DataTablePagination";
import clsx from "clsx";
// import EmptyState from '../Table/Components/Empty/EmptyState';
import { rankItem } from "@tanstack/match-sorter-utils";
import { StickyTableHeader } from "vh-sticky-table-header";
import Input from "../Input";

type CustomTData = {
  _destroy?: string;
};

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);
  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export interface DataTableProps<TData extends CustomTData, TValue> {
  tableContainerRef: MutableRefObject<any>;
  columns: any[];
  data?: any[];
  searchKey?: string;
  tableCTA?: React.ReactNode;
  isLoading?: boolean;
  onScroll?: any;
  CTA?: React.ReactNode;
  hidePagination?: boolean;
  emptyButtonAction?: JSX.Element;
  hideBlankState?: boolean;
  getRowCanExpand?: () => boolean;
  enableRowSelection?: () => boolean;
  renderSubComponent?: (row: any) => any;
  footer?: JSX.Element;
  borderFull?: boolean;
  withShadow?: boolean;
  actionsSelection?: JSX.Element;
  rowSelection?: any;
  setRowSelection?: any;
  hideHeader?: boolean;
  backgroundColor?: string;
  emptyState?: JSX.Element;
  totalData?: number;
  showFilter?: boolean;
  placeholder?: string;
  fetchData?: (options: {
    pageIndex: number;
    pageSize: number;
    order?: string;
    orderDir?: "ASC" | "DESC";
  }) => Promise<{
    rows: TData[];
    pageCount: number;
  }>;
  openedSubComponent?: boolean;
  setRows?: (e: any) => void;
  selectAllOption?: boolean;
  autoPagination?: boolean;
  tableClass?: string;
  rowClassName?: (row: any) => any;
  listUpdate?: JSX.Element;
  perPage?: number;
  pageSizeOptions?: number[];
  onFinishFetch?: () => void;
  /* filterableItems?: FilterableItems;
    selectionOptions?: ActionItem<TData>[]; */
}

type CustomTable<TData> = TableType<TData> & {
  options?: {
    meta?: {
      getRowStyles?: (row: Row<TData>) => React.CSSProperties;
    };
  };
};

export default function DataTable<TData extends CustomTData, TValue>({
  columns,
  tableClass = "",
  data = [],
  hidePagination,
  emptyButtonAction,
  hideBlankState,
  renderSubComponent = () => {},
  footer,
  borderFull = false,
  withShadow = true,
  actionsSelection,
  backgroundColor,
  emptyState,
  totalData = 0,
  showFilter,
  placeholder,
  fetchData,
  openedSubComponent = false,
  getRowCanExpand,
  enableRowSelection,
  onScroll,
  tableContainerRef,
  setRows,
  selectAllOption,
  autoPagination,
  rowClassName,
  listUpdate,
  setRowSelection,
  rowSelection,
  perPage,
  pageSizeOptions,
  onFinishFetch,
}: /* filterableItems,
    selectionOptions, */
DataTableProps<TData, TValue>) {
  const tableRef = useRef<HTMLTableElement>(null);
  const tableCloneRef = useRef<HTMLTableElement>(null);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [arrRowSelected, setArrRowSelected] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [dataTable, setDataTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [total, setTotal] = useState(() => totalData);
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: hidePagination ? 999999 : perPage ? perPage : 20,
  });
  const [paginationScroll, setPaginationScroll] = useState<number>();

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  useLayoutEffect(() => {
    if (tableRef.current && tableCloneRef.current) {
      const sticky = new StickyTableHeader(
        tableRef.current,
        tableCloneRef.current
      );

      return () => sticky.destroy();
    }
  }, []);

  const fetch = () => {
    if (fetchData && !autoPagination) {
      fetchData({
        pageSize,
        pageIndex,
        order: sorting[0]?.id,
        orderDir: sorting[0]?.desc ? "DESC" : "ASC",
      }).then((response: any) => {
        setDataTable(response.rows);
        if (!response?.rows && totalData > 0) {
          setPagination({
            pageIndex: pageIndex - 1,
            pageSize,
          });
        }
      });
    } else {
      manualPagination(pageIndex, pageSize).then((response) => {
        setDataTable(response.rows);
        if (!response?.rows && totalData > 0) {
          setPagination({
            pageIndex: pageIndex - 1,
            pageSize,
          });
        }
      });
    }
    setTimeout(() => {
      if (onFinishFetch) {
        onFinishFetch();
      }
    }, 1000);
  };

  const manualPagination = async (pageIndex: number, pageSize: number) => {
    const promise = new Promise((resolve, reject) => {
      let shortArrays: any = [],
        i,
        len;
      for (i = 0, len = totalData; i < len; i += pageSize) {
        shortArrays.push(data?.slice(i, i + pageSize));
      }
      resolve(shortArrays);
    });

    let dataPromise = (await promise) as any;
    return {
      rows: dataPromise[pageIndex],
      pageCount: Number(pageSize),
    };
  };

  useEffect(() => {
    if (!tableContainerRef?.current) return;

    const resizeObserver = new ResizeObserver(() => {
      setPaginationScroll(tableContainerRef?.current?.scrollWidth);
    });
    resizeObserver.observe(tableContainerRef?.current);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (fetchData || autoPagination) {
      fetch();
    }
  }, [pageIndex, pageSize, sorting]);

  useEffect(() => {
    if (totalData !== total) {
      setPagination({
        pageIndex: 0,
        pageSize: pagination.pageSize,
      });
      setTotal(totalData);
    }
  }, [totalData]);

  useEffect(() => {
    if (data) {
      setDataTable(
        () => (autoPagination ? data.slice(0, pageSize) : data) as any
      );
      setLoading(false);
    }
  }, [data]);

  const pages =
    totalData < pagination.pageSize
      ? 1
      : Math.ceil(totalData / pagination.pageSize);

  let table: TableType<any> = useReactTable({
    data: dataTable?.length > 0 ? dataTable : [],
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      globalFilter,
      columnFilters,
      pagination,
      expanded,
    },
    pageCount: pages,
    manualPagination: true,
    enableRowSelection: enableRowSelection,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onPaginationChange: setPagination,
    getRowCanExpand,
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    enableExpanding: true,
    getRowId: (row) => {
      return row.id;
    },
    meta: {
      getRowStyles: rowClassName,
    },
  }) as CustomTable<any>;

  useEffect(() => {
    if (enableRowSelection && rowSelection) {
      setArrRowSelected(Object.keys(rowSelection) as any);
    }
  }, [rowSelection, enableRowSelection]);

  const onSelectAll = () => {
    table.toggleAllRowsSelected(true);
    const araysIds = data?.map((item) => item?.id);
    let selected = {};
    araysIds?.forEach((id) => {
      selected = {
        ...selected,
        [id]: true,
      };
    });
    setRowSelection(selected);
    return;
  };

  const onRemoveAll = () => {
    table.toggleAllRowsSelected();
    setRowSelection({});
    return;
  };

  const hideTableData =
    (dataTable && dataTable?.length == 0 && !loading && !hideBlankState) ||
    !dataTable ||
    table?.getRowModel()?.rows?.length == 0;
  const canShowTableData = !hidePagination && totalData > 0 && table;

  function renderBottomTable() {
    if (hideTableData && totalData !== null) {
      if (emptyState) {
        return emptyState;
      } else {
        return <div></div>;
        // <EmptyState emptyButtonAction={emptyButtonAction} />;
      }
    } else if (canShowTableData && totalData !== null) {
      return (
        <DataTablePagination
          table={table}
          footer={footer}
          totalData={totalData}
          tableRef={tableContainerRef}
          selectAllOption={selectAllOption}
          onSelectAll={onSelectAll}
          rowsSelected={Object.keys(rowSelection || {})?.length}
          onRemoveAll={onRemoveAll}
          paginationScroll={paginationScroll}
          pageSizeOptions={pageSizeOptions}
        />
      );
    } else if (totalData == null) {
      return <></>;
    }
  }

  useEffect(() => {
    if (rowSelection && Object.keys(rowSelection).length == 0) {
      const elements = document.getElementsByClassName("th-shadow") as any;
      Object.keys(elements).forEach((index) => {
        elements[index]?.classList?.add("with-shadow");
      });
    } else if (rowSelection && Object.keys(rowSelection).length == 1) {
      const elements = document.getElementsByClassName("th-shadow");
      Object.keys(elements).forEach((index: any) => {
        elements[index]?.classList?.remove("with-shadow");
      });
    }
  }, [rowSelection]);

  const stylesRow = (row: any) => {
    const tb = table as any;
    return rowClassName ? tb?.options?.meta?.getRowStyles(row) : {};
  };

  return (
    <div className="w-full h-full flex flex-col">
      {showFilter && (
        <div className="w-full flex justify-between md:items-center flex-col md:flex-row gap-y-2 md:gap-y-0">
          <div className="w-full md:max-w-[350px]" id="filter-table">
            <Input
              onChange={(e: any) => setGlobalFilter(e.target.value)}
              name="filter"
              value={globalFilter}
              icon={<i className="uil uil-search"></i>}
              placeholder="Buscar pedido por ID, Código ou Cliente"
              clearField
              onClear={() => setGlobalFilter("")}
            />
          </div>

          {listUpdate}
        </div>
      )}
      <div
        className={clsx("w-full flex mt-4 flex-col justify-between", {
          "flex-1": !hideTableData,
          [tableClass]: tableClass,
        })}
      >
        <Table
          className={clsx(
            "w-full table_container z-20 overflow-x-scroll md:overflow-x-hidden"
          )}
          onScroll={onScroll}
          ref={tableContainerRef}
        >
          {rowSelection &&
            Object.keys(rowSelection)?.length > 0 &&
            actionsSelection &&
            dataTable?.length > 0 && (
              <div className="h-[76px] flex items-center justify-between px-4 bg-gradient-to-b from-blue-start to-blue-end rounded-lg -mb-[1px]">
                <div className="flex gap-6">
                  <span className="text-white text-p-lg">
                    {Object.keys(rowSelection).length} selecionado(s)
                  </span>
                  {actionsSelection}
                </div>
                <button title="set-row" onClick={() => setRowSelection({})}>
                  <i className="uil uil-times text-white"></i>
                </button>
              </div>
            )}
          <div className="table w-full mr-[2px]" ref={tableRef}>
            <TableHeader>
              {table?.getHeaderGroups()?.map((headerGroup, headerIndex) => (
                <TableRow key={headerGroup.id + headerIndex + "header"}>
                  {headerGroup.headers.map((header, index) => {
                    const classes = header.column.columnDef.meta as any;
                    return (
                      <TableHead
                        key={headerIndex + index + "th"}
                        style={{
                          width: header.getSize(),
                        }}
                        scope="col"
                        className={clsx(
                          {
                            "hover:bg-light-gray-100 th-shadow cursor-pointer":
                              header.column.getCanSort(),
                            ["with-shadow"]:
                              arrRowSelected?.length == 0 && withShadow,
                          },
                          classes?.header,
                          classes?.className
                        )}
                      >
                        <div onClick={header.column.getToggleSortingHandler()}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          {sorting[0]?.id == header.column.id ? (
                            <i
                              className={clsx(
                                {
                                  ["rotate-0"]: !sorting[0]?.desc,
                                  ["rotate-180"]: sorting[0]?.desc,
                                },
                                "uil uil-arrow-down text-blue-700 transform ml-1 text-[18px] duration-75"
                              )}
                            ></i>
                          ) : (
                            <></>
                          )}
                        </div>
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table?.getRowModel()?.rows?.map((row, rowIndex) => {
                return (
                  <React.Fragment key={rowIndex + "row"}>
                    {!row.original._destroy && (
                      <React.Fragment>
                        <TableRow
                          key={row.id}
                          id={row.id}
                          className={`text-p-md font-normal h-[80px] text-paragraph w-fit`}
                          style={stylesRow(row)}
                        >
                          {row.getVisibleCells().map((cell, index) => {
                            const classes = cell.column.columnDef.meta as any;
                            return (
                              <TableCell
                                key={cell.id}
                                id={cell.id}
                                style={{
                                  width: cell.column.getSize(),
                                  backgroundColor: backgroundColor
                                    ? backgroundColor
                                    : "",
                                  ...stylesRow(row),
                                }}
                                className={clsx(
                                  {
                                    ["hidden"]: cell.row.original._destroy,
                                    ["first:border-l last:border-r"]:
                                      borderFull,
                                    ["first:rounded-bl-lg last:rounded-br-lg"]:
                                      borderFull &&
                                      row.index === data?.length - 1,
                                  },
                                  classes?.cell,
                                  classes?.className
                                )}
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                        {(row.getIsExpanded() || openedSubComponent) && (
                          <tr>
                            <td colSpan={row.getVisibleCells().length}>
                              {renderSubComponent({
                                row,
                              })}
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    )}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </div>
        </Table>
        <Table
          className={clsx("w-full table_container z-30 overflow-x-hidden")}
        >
          <div className="table w-full mr-[2px] mb-[3px]" ref={tableCloneRef} />
        </Table>
        {renderBottomTable()}
      </div>
    </div>
  );
}
