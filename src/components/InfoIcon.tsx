import React from "react";
import { Popover } from "./Popover/Popover";

export default function InfoIcon({
  content,
  id = "info-id",
}: {
  content?: string;
  id?: string;
}) {
  return (
    <div
      data-tooltip-id={id}
      data-tooltip-html={content}
      data-tooltip-place="top"
    >
      <Popover id={id} />
      <i className="uil uil-info-circle text-p-lg text-dark-blue-400"></i>
    </div>
  );
}
