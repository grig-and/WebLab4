import {useRef} from "react"
import {useDispatch, useSelector} from "react-redux"

import "./GraphCont.scss"
import {getR} from "../redux/slice/formStateSlice"
import {fixedX, fixedY, pixelX, pixelY} from "../service/validator/graph"
import {sendPoint} from "../service/request/point"
import {getPoints, addPoint} from "../redux/slice/pointStateSlice";

export default function GraphCont() {
  const dispatch = useDispatch()

  const radius = useSelector(getR)

  const graph = useRef()

  const handleGraphClick = (e) => {
    e.preventDefault();

    let r = radius === 0 ? 2 : radius

    let pixelX = (e.clientX - graph.current.getBoundingClientRect().left) * 400 / graph.current.getBoundingClientRect().width
    let pixelY = (e.clientY - graph.current.getBoundingClientRect().top) * 400 / graph.current.getBoundingClientRect().height

    
    let fX = fixedX((pixelX - 200) * r / 160, -4, 4)
    let fY = fixedY((200 - pixelY) * r / 160, -5, 3)

    if (radius > 0) {
      sendPoint(fX, fY, radius).then(response => {
        if (response.ok) {
          response.json().then(point => {
            dispatch(addPoint(point))
          })
        }
      })
    }
  }

  const points = useSelector(getPoints)

  const frame = useRef();

  const getFilteredRadius = () => {
    if (radius < 1)
      return 0
    else
      return radius
  }

  return (
    <div className="GraphCont">
        <div className="Graph">
          <svg ref={graph} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" onClick={handleGraphClick}>
            <path id="area" d="M 200 199 l 0 -160 C 200 40 38 33 41 198 l 79 1 l 80 160 h 81 l -1 -160 z"/>
            <path d="M0,200 h40 v3,-6,3 h80 v3,-6,3 h80 v-80 h3,-6,3 v-80 h3,-6,3 v-40 m0,0 l3,6,-3,-6,-3,6,3,-6 v200 h80 v3,-6,3 h80 v3,-6,3 h40 m0,0 l-6,3,6,-3,-6,-3,6,3 h-200 v80 h3,-6,3 v80 h3,-6,3 v40 v-200 h-200 z"/>
            <g opacity="1" stroke="none" ref={frame}>{
              points.map((item, idx) => {
                return <circle r={5} cx={pixelX(item.x, item.r)} cy={pixelY(item.y, item.r)} fill={item.hit?"#00ff00":"#ff0000"} key={idx}/>
              })
            }</g>
            <text x={355} y="220" strokeWidth="0" fill="#ffffff">{getFilteredRadius() === 0 ? "?" : getFilteredRadius()}</text>
            <text x={275 - 5*(getFilteredRadius()%2)} y="220" strokeWidth="0" fill="#ffffff">{getFilteredRadius() === 0 ? "?" : getFilteredRadius()/2}</text>
            <text x={185} y="220" strokeWidth="0" fill="#ffffff">{getFilteredRadius() === 0 ? "?" : 0}</text>
            <text x={getFilteredRadius() === 0 ? 115 : 113 - 5*(getFilteredRadius()%2)} y="220" strokeWidth="0" fill="#ffffff">{getFilteredRadius() === 0 ? "?" : -getFilteredRadius()/2}</text>
            <text x={getFilteredRadius() === 0 ? 35 : 33} y="220" strokeWidth="0" fill="#ffffff">{getFilteredRadius() === 0 ? "?" : -getFilteredRadius()}</text>
            <text x={getFilteredRadius() === 0 ? 185 : 180 - 13*(getFilteredRadius()%2)} y="285" strokeWidth="0" fill="#ffffff">{getFilteredRadius() === 0 ? "?" : -getFilteredRadius()/2}</text>
            <text x={getFilteredRadius() === 0 ? 185 : 180} y="365" strokeWidth="0" fill="#ffffff">{getFilteredRadius() === 0 ? "?" : -getFilteredRadius()}</text>
            <text x={185 - 13*(getFilteredRadius()%2)} y="125" strokeWidth="0" fill="#ffffff">{getFilteredRadius() === 0 ? "?" : getFilteredRadius()/2}</text>
            <text x={185} y="45" strokeWidth="0" fill="#ffffff">{getFilteredRadius() === 0 ? "?" : getFilteredRadius()}</text>
          </svg>
        </div>
    </div>
  )
}
