import React from "react";
import { Tooltip } from "react-tooltip";
import "./index.css";
interface Props {
  id: string;
  displayArrow?: boolean;
  openOnClick?: boolean;
}

export const Popover = ({
  id,
  displayArrow = true,
  openOnClick = false,
}: Props) => {
  const style = {
    noArrow: "hidden",
  };

  return (
    <>
      <Tooltip
        id={id}
        className="absolute bg-dark-blue-700 text-sm text-light-gray-100 py-2 px-4 max-w-[430px] break-words whitespace-normal"
        classNameArrow={!displayArrow ? style.noArrow : ""}
        openOnClick={openOnClick}
        delayHide={0}
        delayShow={0}
      />
    </>
  );
};
