import React from "react";
import CreatableSelect from "react-select/creatable";

const blueShadow = "0 0 0 0.25rem rgba(13, 110, 253, 0.25)";
const redShadow = "0 0 0 0.25rem rgba(220, 53, 69, 0.25)";
const defaultBorder = "#ced4da";
const blueBorder = "#86b7fe";
const redBorder = "#dc3545";

export function CustomSelect(props) {
  const { invalid } = props;

  const customStyles = React.useMemo(
    () => ({
      control: (baseStyles, state) => {
        return {
          ...baseStyles,
          // boxShadow: "none",
          boxShadow:
            state.isFocused && !invalid
              ? blueShadow
              : invalid && state.isFocused
              ? redShadow
              : "",
          borderColor:
            state.isFocused && !invalid
              ? blueBorder
              : invalid
              ? redBorder
              : defaultBorder,
          "&:hover": {
            borderColor:
              state.isFocused && !invalid
                ? blueBorder
                : invalid
                ? redBorder
                : defaultBorder
          }
        };
      }
    }),
    [invalid]
  );

  return <CreatableSelect styles={customStyles} {...props} />;
}
