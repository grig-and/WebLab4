import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

import "./Main.scss"
import GraphCont from "../../components/GraphCont"
import PointsTable from "../../components/PointsTable"
import { getPoints } from "../../service/request/point"
import { setPoints } from "../../redux/slice/pointStateSlice"
import PointForm from "../../components/PointForm"
import { Link } from "react-router-dom"
import TableWrapper from "../../components/TableWrapper"

export default function Main() {
  const dispatch = useDispatch()
  const history = useHistory()
  const points = useSelector(getPoints)

  useEffect(() => {

    getPoints().then(response => {
      if (response.ok) {
        response.json().then(points => {
          dispatch(setPoints(points))
        })
      } else {
        localStorage.clear();
        history.push("/home");
      }
    })
      .catch(() => {
        localStorage.clear();
        history.push("/home");
      }
      )

  }, [dispatch])

  return (
    <div className="Main">
      <div className="top">
        <Link to="/home" className="logout" onClick={() => {
          localStorage.clear();
        }}>Exit</Link>
        <div className="header_main">Григорьев Андрей Сергеевич P32111 18981</div>
      </div>

      <div className="img_and_controls">
        <GraphCont id="GraphCont" />

        <div className="controls">
          <PointForm id="PointForm" />
        </div>
      </div>

      <br />
      <TableWrapper id="TableWrapper">
        <PointsTable id="dataTable" />
      </TableWrapper>

    </div>
  )
}
