import React from "react";
import { useState } from "react";
import { Popover } from "./Popover/Popover";

export default function CopyPopover({ children, valueToCopy }) {
  const [copied, setCopied] = useState(false);
  return (
    <>
      <div
        className="flex items-center gap-1"
        onClick={async () => {
          setCopied(true);
          navigator.clipboard.writeText(valueToCopy);
        }}
        onMouseLeave={() => setTimeout(() => setCopied(false), 500)}
      >
        <div
          className="flex items-center gap-1"
          data-tooltip-id="copy-id"
          data-tooltip-content={copied ? "Copiado" : "Copiar"}
          data-tooltip-place="top"
        >
          <Popover id="copy-id" />
          <div className="text-dark-blue-400 text-xs">{children}</div>
        </div>
        <div
          data-tooltip-id="icon-id"
          data-tooltip-content={copied ? "Copiado" : "Copiar"}
          data-tooltip-place="top"
        >
          <Popover id="icon-id" />

          <i className="uil uil-copy text-base text-blue-700 cursor-pointer -mt-[1px]"></i>
        </div>
      </div>
    </>
  );
}
