import React from "react";

import { Alert } from "./components/alert/Alert";
import {
  // AlertExample,
  // DataTableExample,
  // DatepickerExample,
  // ModalExample,
  ModalExampleWithPicker
  // SortableExample,
  // SelectExample
} from "./components";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <div className="App">
      <div className="position-fixed w-100" style={{ zIndex: "2000" }}>
        <Alert />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 mt-2">
            {/* <AlertExample /> */}
            {/* <DataTableExample /> */}
            {/* <DatepickerExample /> */}
            {/* <ModalExample /> */}
            <ModalExampleWithPicker />
            {/* <SortableExample /> */}
            {/* <SelectExample /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
