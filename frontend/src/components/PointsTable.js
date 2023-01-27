import { Table, TableHead, TableRow, TableCell } from "react-toolbox/lib/table"
import { useSelector } from "react-redux"

import "./PointsTable.scss"
import { getPoints } from "../redux/slice/pointStateSlice"

export default function PointsTable() {
  const points = useSelector(getPoints)

  return (
    <div className="PointsTable">
        <Table className="Table" selectable={false}>
          <TableHead className="TableHead">
            <TableCell className="TableCell" numeric>X</TableCell>
            <TableCell className="TableCell" numeric>Y</TableCell>
            <TableCell className="TableCell" numeric>R</TableCell>
            <TableCell className="TableCell" numeric>Current time</TableCell>
            <TableCell className="TableCell" numeric>Execution time</TableCell>
            <TableCell className="TableCell">Hit</TableCell>
          </TableHead>
          {points.map((item, idx) => (
            <TableRow className={"TableRow row_" + item.hit} key={idx}>
              <TableCell className="TableCell" numeric>{item.x}</TableCell>
              <TableCell className="TableCell" numeric>{item.y.toFixed(2)}</TableCell>
              <TableCell className="TableCell" numeric>{item.r}</TableCell>
              <TableCell className="TableCell" numeric>{new Date(item.currentTime).toLocaleString()}</TableCell>
              <TableCell className="TableCell" numeric>{item.executionTime}</TableCell>
              <TableCell className="TableCell" numeric>{item.hit ? "true" : "false"}</TableCell>
            </TableRow>
          )).reverse()}
        </Table>
    </div>
  )
}
