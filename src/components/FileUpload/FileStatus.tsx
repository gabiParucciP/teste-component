import React from "react";
import { Button } from "../Button";
import ImagePreview from "./ImagePreview";
import { useState } from "react";

type FileStatusProps = {
  name: string;
  isLoading: boolean;
  size: number;
  onRemove: any;
  isImage: boolean;
  image?: any;
};

export const FileStatus = ({
  name,
  isLoading,
  size,
  onRemove,
  isImage,
  image,
}: FileStatusProps) => {
  return (
    <>
      {isImage ? (
        <ImageFile
          isLoading={isLoading}
          name={name}
          size={size}
          onRemove={onRemove}
          image={image}
        />
      ) : (
        <File
          isLoading={isLoading}
          name={name}
          size={size}
          onRemove={onRemove}
          image={image}
        />
      )}
    </>
  );
};

const ImageFile = ({ isLoading, name, size, onRemove, image }) => {
  const [imagePreviewModal, setImagePreviewModal] = useState(false);
  const [previewImage, setPreviewImage] = useState<HTMLImageElement>();

  return (
    <div className="group h-[130px] w-[130px] flex justify-between border border-dark-blue-300 rounded-[8px]">
      {!isLoading && image ? (
        <div className="w-full h-full relative">
          <div className="hidden group-hover:block absolute top-3 left-3">
            <Button
              className="w-[32px] h-[32px]"
              variant="iconSecondary"
              onClick={(evt) => {
                setImagePreviewModal(true);
                let newPreviewImage = new window.Image();
                newPreviewImage.src = image;
                setPreviewImage(newPreviewImage);
              }}
              size="xs"
              icon={<i className="uil uil-search-plus text-[22px]"></i>}
            />
            <ImagePreview
              open={imagePreviewModal}
              setOpen={setImagePreviewModal}
              previewImage={previewImage}
            />
          </div>

          <div className="block absolute top-3 right-3">
            <Button
              className="w-[32px] h-[32px]"
              variant="iconSecondary"
              onClick={onRemove}
              size="xs"
              icon={<i className="uil uil-times text-xl"></i>}
            />
          </div>

          <div className="w-full h-full group-hover:bg-[#16203499]/60 z-10">
            <img className="relative  -z-10" src={image} alt="tumbnails" />
          </div>
        </div>
      ) : (
        <div className="flex flex-1 flex-col justify-between p-[10px]">
          <div className="flex flex-col ">
            <div className="flex self-end">
              <i
                onClick={onRemove}
                className="uil uil-times text-[28px] cursor-pointer"
              ></i>
            </div>
            <div className="flex self-center items-center justify-center w-12 h-12 bg-blue-700 rounded-full animate-spin">
              <img
                src={`/spinner-white.svg`}
                alt="circle"
                width={30}
                height={30}
              />
            </div>
          </div>
          <div className="text-center">
            <span className="text-p-sm">{name}</span>
            <div className="text-xxs text-label">{size.to} KB</div>
          </div>
        </div>
      )}
    </div>
  );
};

const File = ({ isLoading, name, size, onRemove, image }) => {
  return (
    <div className="w-full md:w-[410px] flex items-center justify-between px-3 py-2 border border-dark-blue-300 rounded-[4px]">
      <div className="flex gap-x-2 items-center">
        {isLoading ? (
          <img
            className="animate-spin "
            src="/spinner.svg"
            alt="circle"
            width={19}
            height={19}
          />
        ) : (
          <span className="text-success-700 flex">
            <i className="uil uil-check-circle text-[23px]"></i>
          </span>
        )}
        <div className="flex flex-col">
          <div className="flex items-start gap-x-1">
            <span className="text-label self-end flex">
              <i className="uil uil-file text-xs"></i>
            </span>
            <div className="text-p-sm">
              <a
                href={image}
                download={name}
                className="text-blue-700 hover:text-blue-800 hover:underline active:text-blue-900 active:underline active:underline-offset-4"
              >
                {name}
              </a>
            </div>
          </div>
          <div className="text-xxs text-label">
            {size
              ? size.toLocaleString("en-US", {
                  style: "decimal", // Other options: 'currency', 'percent', etc.
                })
              : null}{" "}
            KB
          </div>
        </div>
      </div>
      <i
        onClick={onRemove}
        className="uil uil-times text-[24px] text-dark-blue-600 cursor-pointer"
      ></i>
    </div>
  );
};
