export const customStyles = {
  indicatorSeparator: (provided: any, { hasValue }: any) => {
    return {
      ...provided,
      marginTop: "-6px",
      backgroundColor: hasValue ? "var(--input)" : "transparent",
    };
  },
  input: (provided: any, state: any) => ({
    ...provided,
    outline: "none",
    paddingLeft: state.selectProps.hasIcon ? "2.5rem" : "0px",
  }),
  clearIndicator: (provided: any) => ({
    ...provided,
    color: "var(--label)",
    marginTop: "-6px",
    ":hover": {
      color: "var(--label)",
    },
  }),
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    color: "var(--paragraph)",
    display: state.selectProps.isTargeted ? "none" : "flex",
    paddingRight: "12px",
    marginTop: "-6px",
    ":hover": {
      color: "var(--paragraph)",
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    marginTop: "4px",
    border: "1px solid var(--dark-blue-300)",
    boxShadow: "none",
    borderRadius: "8px",
    padding: "0px 8px",
    zIndex: 70,
    background: "white",
  }),
  singleValue: (base: any, state: any) => ({
    ...base,
    color: state.data.value === "active" ? "#0EAF86" : "black",
    display: "flex",
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    cursor: "pointer",
    border: state.selectProps.hasError
      ? "1px solid var(--dangerous-700)"
      : state.menuIsOpen
      ? "1px solid var(--blue-700)"
      : "1px solid var(--dark-blue-300)",
    boxShadow: "none",
    outline: "none",
    borderRadius: "0.5rem",
    paddingLeft: "0px",
    placeholder: " ",
    minHeight: "46px",
    alignItems: "end",
    paddingTop: "8px",
    ":hover": {
      border: state.selectProps.hasError
        ? "1px solid var(--dangerous-700)"
        : state.menuIsOpen
        ? "1px solid var(--blue-700)"
        : "1px solid var(--dark-blue-300)",
    },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    borderRadius: "20px",
    backgroundColor: "var(--light-100)",
    padding: "0px",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "var(--paragraph)",
    paddingTop: "2px",
    lineHeight: "16px",
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: "var(--dark-blue-400)",
    paddingRight: "6px",
    paddingLeft: "0px",
    ":hover": {
      color: "var(--dangerous-700)",
    },
  }),
  option: (provided: any, state: any) => {
    let color =
      state.isSelected && !state.selectProps.isTargeted
        ? "white"
        : "var(--paragraph)";

    if (state.isDisabled) {
      color = "rgba(0,0,0,0.30)";
    }

    return {
      ...provided,
      height: "44px",
      cursor: "pointer",
      borderRadius: "8px",
      margin: "4px 0px",
      backgroundColor:
        state.isSelected && !state.selectProps.isTargeted
          ? "var(--blue-700)"
          : state.isFocused
          ? "var(--light-200)"
          : "white",
      color,
      fontWeight: state.isSelected && !state.selectProps.isTargeted ? 700 : 400,
      "&:hover": {
        backgroundColor:
          state.isSelected && !state.selectProps.isTargeted
            ? "var(--blue-700)"
            : "var(--light-200)",
      },
      "&:active": {
        backgroundColor: "var(--blue-700)",
        color: "white",
        fontWeight: 700,
      },
      "&:active svg": {
        color: "white",
        fontWeight: 700,
      },
      " svg": {
        color: "white",
      },
    };
  },
  container: (provided: any) => ({
    ...provided,
    border: "none",
    outline: "none",
    boxShadow: "none",
    padding: "none",
    margin: "none",
  }),
};
