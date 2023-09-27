/*
Datepicker example with "vanillajs-datepicker" library 
  and default browser
*/
import React from "react";
import DatepickerComponent from "./datepicker/DatepickerComponent";

export function DatepickerExample() {
  return (
    <div className="my-1 border p-2">
      <div className="mb-2">
        <h2>Month picker (default)</h2>
        <input
          type="month"
          onChange={(e) => console.log("Default: ", e.target.value)}
        />
      </div>
      <div className="mb-2">
        <h2>Month picker (custom)</h2>
        <DatepickerComponent
          autohide={true}
          pickLevel="1"
          format="MM yyyy"
          placeholder="Select month"
          onChangeDate={(e) =>
            console.log("Custom: ", e.detail.date.toISOString().substring(0, 7))
          }
        />
      </div>
    </div>
  );
}
