import React from "react";
import { useEffect, useReducer, useState } from "react";
import clsx from "clsx";
import { FileStatus } from "./FileStatus";
import { initialState, reducer } from "./FileUploadReducer";
import { usePapaParse } from "react-papaparse";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

type FileUploadProps = {
  icon?: "file" | "image";
  multiple?: boolean;
  direction?: "vertical" | "horizontal";
  isImage?: boolean;
  setFiles?: any;
  supportedFormats?: string[];
  validationFunction?: any;
  files?: any;
  error?: Merge<FieldError, FieldErrorsImpl<any>>;
  name?: string;
  limitMessage?: string;
};

export const FileUpload = ({
  icon = "file",
  multiple = false,
  direction = "vertical",
  isImage = false,
  setFiles,
  supportedFormats,
  validationFunction,
  files,
  error,
  name,
  limitMessage,
}: FileUploadProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const { readString } = usePapaParse();

  const fieldValidationMessages = [error?.message];

  const hasError = {
    hasError: fieldValidationMessages.some((item) => item !== undefined),
  };

  useEffect(() => {
    if (state?.files?.some((file) => file.loading === true)) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [state?.files]);

  useEffect(() => {
    if (!files || files.length == 0) {
      state.files = [];
    }
  }, [files]);

  useEffect(() => {
    if ((!multiple && state?.files?.length === 0) || multiple) {
      window.addEventListener("dragover", handleDragOver);
      window.addEventListener("drop", handleDrop);
      window.addEventListener("dragleave", handleDragLeave);
    }

    return () => {
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleDrop);
      window.removeEventListener("dragleave", handleDragLeave);
    };
  }, [multiple, state.files]);

  const handleDragOver = (event: globalThis.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (!multiple && state.files?.length === 1) {
      setDragging(false);
    } else {
      setDragging(true);
    }
  };

  const handleDrop = (event: globalThis.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);

    let files = [...(event?.dataTransfer?.files as any)];

    if ((!multiple && files?.length === 1) || (multiple && files?.length > 0)) {
      const existingFiles = state?.files?.map((f) => f.name);
      files = files.filter((f) => !existingFiles?.includes(f.name));

      files.forEach((file) => {
        const reader = new FileReader();

        reader.addEventListener("loadstart", () => {
          dispatch({
            type: "UPLOAD_START",
            payload: { file },
          });
        });

        reader.addEventListener("load", () => {
          if (!validationFunction) {
            dispatch({
              type: "UPLOAD_END",
              payload: {
                name: file.name,
                result: reader.result,
              },
            });

            setFiles && setFiles(file);
          }
          if (validationFunction(file)) {
            setTimeout(() => {
              dispatch({
                type: "UPLOAD_END",
                payload: {
                  name: file.name,
                  result: reader.result,
                },
              });
            }, 1000);

            setFiles && setFiles(file);
          } else {
            dispatch({
              type: "REMOVE_FILE",
              payload: {
                name: file.name,
              },
            });
          }
        });

        reader.readAsDataURL(file);
      });
      event?.dataTransfer?.clearData();
    }
  };

  const handleDragLeave = (event: globalThis.DragEvent) => {
    if (event.screenX === 0 && event.screenY === 0) {
      setDragging(false);
    }
    event.stopPropagation();
    event.preventDefault();
  };

  const onChangeFile = (e) => {
    const files = Object.values(e.target.files) as File[];
    e.target.value = null;

    files.forEach((file) => {
      const reader = new FileReader();

      reader.addEventListener("loadstart", () => {
        dispatch({
          type: "UPLOAD_START",
          payload: { file },
        });
      });

      reader.addEventListener("load", () => {
        setTimeout(() => {
          readString(String(file), {
            delimiter: ",",
            worker: true,
            complete: (results) => {
              if (!validationFunction) {
                dispatch({
                  type: "UPLOAD_END",
                  payload: {
                    name: file.name,
                    result: reader.result,
                  },
                });

                setFiles && setFiles(file);
              } else if (validationFunction(file)) {
                dispatch({
                  type: "UPLOAD_END",
                  payload: {
                    name: file.name,
                    result: reader.result,
                  },
                });

                setFiles && setFiles(file);
              } else {
                dispatch({
                  type: "REMOVE_FILE",
                  payload: {
                    name: file.name,
                  },
                });
              }
            },
          });
        }, 1000);
      });

      reader.readAsDataURL(file);
    });
  };

  const renderContent = () => {
    if (loading) {
      return <LoadingContent />;
    } else if (dragging) {
      return <DraggingContent />;
    } else if (!multiple && (state?.files?.length as any) > 0) {
      return <BlockedContent />;
    }

    return (
      <DefaultContent
        icon={icon}
        formats={supportedFormats?.join(", ").replaceAll(".", "").toUpperCase()}
        limitMessage={limitMessage}
      />
    );
  };

  const removeFile = (name: string) => {
    dispatch({
      type: "REMOVE_FILE",
      payload: {
        name,
      },
    });
    setFiles && setFiles(null);
  };

  return (
    <div className="w-full">
      <div
        className={clsx(
          "flex gap-1 w-full rounded-lg items-center justify-center",
          {
            "flex-col gap-1": direction === "vertical",
          }
        )}
      >
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          accept={supportedFormats?.join(",")}
          multiple={multiple}
          className="sr-only"
          onChange={onChangeFile}
        />
        {renderContent()}
        <div
          className={clsx(
            {
              "flex flex-col w-full gap-y-[6px]":
                direction === "vertical" && !isImage,
            },
            {
              "flex flex-col gap-y-[6px] w-full":
                direction === "horizontal" && !isImage,
            },
            {
              "flex gap-[6px]": direction === "vertical" && isImage,
            },
            {
              "flex gap-[6px]": direction === "horizontal" && !isImage,
            }
          )}
        >
          {state?.files?.map((file) => (
            <FileStatus
              key={file.name}
              name={file?.name as any}
              onRemove={() => removeFile(file?.name as any)}
              isLoading={file.loading as any}
              size={file.size as any}
              isImage={file.image && isImage}
              image={file.image}
            />
          ))}
        </div>
        {hasError &&
          fieldValidationMessages.map((message: any, index) => (
            <div
              key={index}
              className="text-dangerous-700 text-xs -mt-[6px]"
              role="alert"
              aria-label={message}
            >
              {message as any}
            </div>
          ))}
      </div>
    </div>
  );
};

const DefaultContent = ({ formats, icon, limitMessage }) => (
  <div className="w-full md:w-[410px] h-full flex flex-col p-4 custom-border">
    <div className="flex flex-1 flex-col text-center items-center">
      <div
        className={
          "flex items-center justify-center w-14 h-14 mb-2 bg-blue-100 rounded-full"
        }
      >
        {icon === "file" ? (
          <img src={`/file.svg`} alt="file" width={24} height={30} />
        ) : (
          <i className="uil uil-image-plus text-[28px] text-blue-700" />
        )}
      </div>

      <h1 className="font-bold text-base">
        {icon === "file"
          ? "Arraste o arquivo e solte aqui"
          : "Arraste as imagens e solte aqui"}
      </h1>

      <label
        htmlFor="file-upload"
        className="relative leading-none cursor-pointer text-sm bg-white focus-within:outline-none"
      >
        <p>
          ou&nbsp;
          <span className="text-blue-700">selecione do seu computador</span>
        </p>
      </label>

      <small className="text-label text-xxs leading-5">
        Formatos: {formats} | {limitMessage ? limitMessage : "Até 25 MB"}
      </small>
    </div>
  </div>
);
const BlockedContent = () => (
  <div className="w-full md:w-[410px] h-full flex flex-col p-4 custom-border">
    <div className="flex flex-1 flex-col text-center items-center justify-center">
      <div
        className={
          "flex items-center justify-center w-14 h-14 mb-1 bg-blue-100 rounded-full"
        }
      >
        <img src={`/check.svg`} alt="check" width={24} height={30} />
      </div>

      <h1 className="font-bold text-base mt-1">Arquivo carregado!</h1>
    </div>
  </div>
);

const DraggingContent = () => (
  <div className="w-full md:w-[410px] h-[152px] bg-blue-100 rounded-lg">
    <div className="flex flex-col p-4 custom-border justify-center">
      <div className="flex flex-1 flex-col h-full text-center items-center justify-center">
        <div
          className={
            "flex items-center justify-center w-14 h-14 mb-2 bg-blue-700 rounded-full"
          }
        >
          <img
            src={`/file-upload.svg`}
            alt="file-upload"
            width={30}
            height={30}
          />
        </div>

        <h1 className="font-bold text-base text-blue-700">
          Solte aqui para carregar o arquivo
        </h1>
      </div>
    </div>
  </div>
);

const LoadingContent = () => (
  <div className="w-full h-full bg-blue-100 flex flex-col p-4 custom-border">
    <div className="flex flex-1 flex-col text-center items-center justify-center">
      <div
        className={
          "flex items-center justify-center w-14 h-14 mb-2 bg-blue-700 rounded-full"
        }
      >
        <img
          className="animate-spin"
          src={`/spinner-white.svg`}
          alt="circle"
          width={36}
          height={36}
        />
      </div>

      <h1 className="font-bold text-base text-blue-700">
        Carregando arquivo...
      </h1>
    </div>
  </div>
);
