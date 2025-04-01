import React, { JSX } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: JSX.Element;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  loading?: boolean;
  loadingIcon?: JSX.Element;
};

const sizes = {
  xxs: {
    text: "h-[18px]",
  },
  xs: {
    text: "h-[36px]",
  },
  sm: {
    text: "h-[38px]",
  },
  md: {
    text: "h-[46px]",
  },
  table: {
    text: "h-8 min-w-8 max-w-12",
  },
  header: {
    text: "h-10 w-10",
  },
  square: {
    text: "flex flex-col items-center align-center gap-[3px] h-[88px] w-[112px] text-[13px]",
  },
};

const variants = {
  primary: {
    text: "shadow-button text-button-label bg-gradient-to-b from-rose-start to-rose-end active:bg-gradient-to-b active:from-rose-800 active:to-rose-800 disabled:bg-gradient-to-b disabled:from-rose-800 disabled:to-rose-800 disabled:opacity-50 hover:from-[#FD467F] hover:to-[#DF4573]",
  },
  secondary: {
    text: "shadow-button bg-white border-[0.5px] border-paragraph text-dark-blue-600 hover:bg-[#f5f5f5] active:bg-light-gray-100 disabled:text-dark-blue-400 disabled:bg-white disabled:border-[0.5px] disabled:border-dark-blue-400",
  },
  link: {
    text: "shadow-button text-left text-blue-700 hover:text-blue-800 hover:underline active:text-blue-900 disabled:text-blue-700 disabled:no-underline shadow-none font-normal",
  },
  icon: {
    text: "bg-white border-[0.5px] border-dark-blue-300 hover:bg-[#f5f5f5] active:bg-light-gray-100 disabled:text-dark-blue-400 disabled:border-[0.5px] disabled:border-disabled disabled:bg-white disabled:opacity-50",
  },
  outline: {
    text: "shadow-button bg-white border-[0.5px] border-rose-700 text-rose-700 hover:bg-[#f5f5f5] active:bg-light-gray-100 disabled:text-rose-700 disabled:bg-white disabled:border-[0.5px] disabled:border-rose-700 disabled:opacity-50",
  },
  dark: {
    text: "shadow-button text-white hover:bg-[#f5f5f526] active:bg-[#0a0a0a40] disabled:opacity-50 disabled:bg-transparent",
  },
  dangerLight: {
    text: "shadow-button text-dangerous-700 font-bold bg-white border-[0.5px] border-dangerous-700 hover:bg-dangerous-100 active:bg-dangerous-700 active:text-white disabled:opacity-50 disabled:bg-white disabled:text-dangerous-700",
  },
  danger: {
    text: "shadow-button text-white bg-gradient-to-b from-danger-start to-danger-end hover:from-[#FD6363] hover:to-[#E34E4E] active:from-dangerous-800 active:to-dangerous-800 disabled:opacity-50 disabled:from-dangerous-700 disabled:to-dangerous-700",
  },
  success: {
    text: "shadow-button text-white bg-gradient-to-b from-success-start to-success-end hover:from-[#3FF09B] hover:to-[#27C579] active:from-success-800 active:to-success-800 disabled:opacity-50 disabled:from-success-700 disabled:to-success-700",
  },
  warn: {
    text: "shadow-button text-white bg-gradient-to-b from-warning-start to-warning-end hover:from-[#FEBD5D] hover:to-[#F4A42D] active:from-warning-800 active:to-warning-800 disabled:opacity-50 disabled:from-warning-700 disabled:to-warning-700",
  },
  blue: {
    text: "shadow-button bg-blue-700 text-white text-bold",
  },
  iconSecondary: {
    text: "border-[1px] border-none text-white active:bg-[#0A0A0A40]/20 hover:bg-[#F5F5F526]/10 hover:text-white disabled:text-dark-blue-400 disabled:border-[0.5px] disabled:border-disabled disabled:bg-white disabled:opacity-50",
  },
};

export default function Button({
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const applyGap = props.icon && props.children;
  const appliedVariant = variants[variant].text;
  const appliedSize = sizes[size].text;
  const gapText = applyGap ? "gap-[6px]" : "gap-0";
  const padding = variant === "icon" || size === "table" ? "px-2" : "px-4";
  return (
    <button
      type={props.type}
      id="button-component"
      disabled={props.disabled || props.loading}
      {...props}
      className={`
          ${props.className}
          ${appliedVariant} 
          ${appliedSize} 
          ${gapText} 
          ${padding}
          whitespace-nowrap group rounded-lg font-bold shadow-button disabled:shadow-none active:shadow-none flex items-center
          
        `}
    >
      <>
        {props.icon && (
          <div
            className={`flex items-center justify-center ${
              props.loading ? "" : "-mt-1"
            }`}
            style={{
              fontSize:
                size === "table" || size === "xxs"
                  ? "16px"
                  : props.icon && props.children
                  ? "22px"
                  : "",
            }}
          >
            {props.icon && !props.loading ? (
              props.icon
            ) : props.loadingIcon && props.loading ? (
              props.loadingIcon
            ) : (
              <img
                className="animate-spin"
                src="/spinner-white.png"
                alt="circle"
                width={16}
                height={16}
              />
            )}
          </div>
        )}
        {props.children}
      </>
    </button>
  );
}
