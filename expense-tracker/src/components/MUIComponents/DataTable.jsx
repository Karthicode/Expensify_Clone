import React, { useState } from "react";
import MaterialTable from "material-table";

const DataTable = () => {
  const [rows, setRows] = useState([
    { id: 1, name: "rajat", email: "rajat@gmail.com" },
    { id: 2, name: "harsha", email: "harsha@gmail.com" },
    { id: 3, name: "karthik", email: "karthik@gmail.com" },
  ]);

  const colummns = [
    { title: "Id", field: "id" },
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
  ];

  return (
    <div className="table_design">
      <MaterialTable columns={colummns} data={rows} />
    </div>
  );
};

export default DataTable;
