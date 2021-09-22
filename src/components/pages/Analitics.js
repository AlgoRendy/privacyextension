import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectGraph } from "../../store/slices/graphSlice";
import { GraphModel } from "../../util/graphModel";
const columns = [
  { field: "nid", headerName: "ID" },
  { field: "name", headerName: "URL" },
  { field: "in", headerName: "In-Degree" },
  { field: "out", headerName: "Out-Degree" },
];

export default function Analitics() {
  const hasUpdated = useSelector(selectGraph);
  useEffect(() => {}, [hasUpdated]);

  return (
    <div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={GraphModel.getGraph()}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
}
