export const customStyles = {
  input: (provided) => ({
    ...provided,
    outline: "none",
    height: "100%",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: "transparent",
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: "var(--label)",
    ":hover": {
      color: "var(--label)",
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    display: "none",
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: "4px",
    border: "1px solid var(--dark-blue-300)",
    boxShadow: "none",
    borderRadius: "8px",
    padding: "0px 8px",
    zIndex: 30,
    background: "white",
  }),
  control: (provided, state) => {
    return {
      ...provided,
      cursor: "pointer",
      paddingTop: state.selectProps.hasLabel ? "18px" : "0px",
      border: state.selectProps.hasError
        ? "1px solid var(--dangerous-700)"
        : state.isFocused
        ? "1px solid var(--blue-700)"
        : "1px solid var(--dark-blue-300)",
      boxShadow: "none",
      outline: "none",
      borderRadius: "0.5rem",
      // height: "52px",
      // paddingLeft: '8px',
      placeholder: state.selectProps.hasLabel
        ? " "
        : state.selectProps.placeholder,
      alignItems: state.selectProps.hasLabel ? "end" : "center",
      ":hover": {
        border: state.selectProps.hasError
          ? "1px solid var(--dangerous-700)"
          : state.isFocused
          ? "1px solid var(--blue-700)"
          : "1px solid var(--dark-blue-300)",
        // height: "52px",
      },
      ":focus-within": {
        // height: "52px",
      },
    };
  },
  multiValue: (provided) => ({
    ...provided,
    borderRadius: "20px",
    backgroundColor: "var(--light-100)",
    padding: "0px 6px",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "var(--paragraph)",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "var(--dark-blue-400)",
    ":hover": {
      color: "var(--dangerous-700)",
    },
  }),
  container: (provided) => ({
    ...provided,
    border: "none",
    outline: "none",
    boxShadow: "none",
    padding: "none",
    margin: "none",
  }),
};
