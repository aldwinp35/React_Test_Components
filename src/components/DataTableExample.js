/*
DataTable example with "react-data-table-component" library 
*/

import React, { useState, useEffect, useMemo } from "react";
import { DataTableBase as DataTable } from "./datatable/DataTableBase";
import dataService from "../api/dataService";

export function DataTableExample() {
  const [data, setData] = useState([]);

  // Set datatable data
  useEffect(() => {
    dataService.getAll().then((res) => {
      setData(res.data.results);
    });
  }, []);

  // Datatable data columns
  const columns = useMemo(
    () => [
      { name: "Name", selector: (row) => row.name, sortable: true },
      { name: "Phone", selector: (row) => row.phone, sortable: true },
      { name: "Email", selector: (row) => row.email, sortable: true },
      { name: "Currency", selector: (row) => row.currency, sortable: true }
    ],
    []
  );

  return (
    <div className="my-1 border p-2">
      <DataTable title="DataTable Example" data={data} columns={columns} />
    </div>
  );
}
