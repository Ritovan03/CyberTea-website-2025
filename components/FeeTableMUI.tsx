import * as React from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "category", headerName: "Category", flex: 1 },
  { field: "fee", headerName: "Fee (INR)", flex: 1 },
];

const rows = [
  { id: 1, category: "IEEE Member", fee: "₹500" },
  { id: 2, category: "Non-Member", fee: "₹700" },
  { id: 3, category: "Student", fee: "₹300" },
];

export default function FeeTableMUI() {
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        hideFooter
        sx={{
          backgroundColor: "#111",
          color: "#fff",
          border: "1px solid #333",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#222",
            color: "#0af",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#1e1e1e",
          },
        }}
      />
    </div>
  );
}
