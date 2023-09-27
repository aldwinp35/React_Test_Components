import React, { useState, useEffect } from "react";

import { CustomSelect } from "./select/CustomSelect";

const optionsData = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

const createOption = (label) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, "")
});

// const defaultOptions = [
//   createOption("One"),
//   createOption("Two"),
//   createOption("Three")
// ];

export function SelectExample() {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(null);
  const [value, setValue] = useState(null);

  useEffect(() => {
    setOptions(optionsData);
  }, []);

  const handleCreate = (inputValue) => {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setIsLoading(false);
      setOptions((prev) => [...prev, newOption]);
      setValue(newOption);
    }, 1000);
  };
  return (
    <div>
      <CustomSelect
        isClearable
        isDisabled={isLoading}
        isLoading={isLoading}
        onChange={(newValue) => setValue(newValue)}
        onCreateOption={handleCreate}
        options={options}
        invalid={false}
        value={value}
      />
    </div>
  );
}
