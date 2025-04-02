export const customStyles = {
  indicatorSeparator: (provided: any, props: any) => {
    return {
      ...provided,
      backgroundColor:
        props.hasValue && provided?.selectProps?.isSearchable
          ? "var(--input)"
          : "transparent",
    };
  },
  clearIndicator: (provided: any) => ({
    ...provided,
    color: "var(--label)",
    ":hover": {
      color: "var(--label)",
    },
  }),
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    color: "var(--paragraph)",
    transform: state?.selectProps?.menuIsOpen ? "rotate(180deg)" : "rotate(0)",
    ":hover": {
      color: "var(--paragraph)",
    },
  }),
  input: (provided: any, state: any) => ({
    ...provided,
    paddingTop: "10px",
  }),
  menu: (provided: any) => ({
    ...provided,
    marginTop: "4px",
    border: "1px solid var(--dark-blue-300)",
    boxShadow: "none",
    borderRadius: "8px",

    background: "white",
    zIndex: 20,
  }),
  menuList: (provided: any) => ({
    ...provided,
    padding: "0px 8px",
  }),
  singleValue: (base: any, state: any) => ({
    ...base,
    paddingTop: state.selectProps.hasLabel ? "10px" : "0",
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
    placeholder: " ",
    height: "46px",
    backgroundColor: state.isDisabled ? "var(--light-100)" : "white",
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
    padding: "0px 8px",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "var(--paragraph)",
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: "var(--dark-blue-400)",
    ":hover": {
      color: "var(--dangerous-700)",
    },
  }),
  option: (provided: any, state: any) => {
    let color = state.isSelected
      ? "white"
      : state?.isDisabled
      ? "var(--label)"
      : "var(--paragraph)";

    /* if(state.isSelected) {
        color = 'rgba(0,0,0,0.03)';
      } */

    return {
      ...provided,
      cursor: state.isDisabled ? "auto" : "pointer",
      pointerEvents: state.isDisabled ? "none" : "",
      borderRadius: "8px",
      margin: "4px 0px",
      padding: "10px 12px",
      backgroundColor: state.isSelected ? "var(--blue-700)" : "white",
      color,
      fontWeight: state.isSelected ? 700 : 400,
      "&:hover": {
        backgroundColor: state.isSelected
          ? "var(--blue-700)"
          : "var(--light-200)",
      },
      "&:active": {
        backgroundColor: "var(--blue-500)",
        color: "white",
        fontWeight: 700,
      },
      "&:active i": {
        color: "white",
        fontWeight: 700,
      },
      " i": {
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
