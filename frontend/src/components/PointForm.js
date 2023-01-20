import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Checkbox } from "react-toolbox/lib/checkbox"
import { Input } from "react-toolbox/lib/input"

import "./PointForm.scss"
import { getX, getY, getR } from "../redux/slice/formStateSlice"
import { setX, setY, setR } from "../redux/slice/formStateSlice"
import { isRValid, isXValid, isYValid, toFloat } from "../service/validator/point"
import { sendPoint } from "../service/request/point"
import { addPoint } from "../redux/slice/pointStateSlice"
import { setPoints } from "../redux/slice/pointStateSlice"
import { clearPoints } from "../service/request/point"

export default function PointForm() {
  const dispatch = useDispatch()

  const x = useSelector(getX)
  const y = useSelector(getY)
  const r = useSelector(getR)

  const [isX, setIsX] = useState(null)
  const [isY, setIsY] = useState(null)
  const [isR, setIsR] = useState(null)


  const validate = () => {
    setIsX(isXValid(x))
    setIsY(isYValid(y))
    setIsR(isRValid(r))
    return isXValid(x) && isYValid(y) && isRValid(r)
  }

  const onSubmitClick = (e) => {
    e.preventDefault()

    if (validate()) {
      sendPoint(x, toFloat(y), r).then(response => {
        if (response.ok) {
          response.json().then(point => {
            dispatch(addPoint(point))
          })
        }
      })
    }
  }

  const onClearClick = (e) => {
    e.preventDefault();

    clearPoints().then(response => {
      if (response.ok) {
        dispatch(setPoints([]))
      }
    })
  }

  return (
    <div className="PointForm">
      <div id="form">
        <div>
          <div className="inner">
            {isX == false ?
              <label htmlFor="CB_X" className="error">X doesn't selected</label> :
              <label htmlFor="CB_X">Choose value of X</label>
            }
            <div id="CB_X" className="Checkbox_group">
              <Checkbox checked={x === -3} className="checkbox" label="-3" onChange={() => dispatch(setX(-3))} />
              <Checkbox checked={x === -2} className="checkbox" label="-2" onChange={() => dispatch(setX(-2))} />
              <Checkbox checked={x === -1} className="checkbox" label="-1" onChange={() => dispatch(setX(-1))} />
              <Checkbox checked={x === -0} className="checkbox" label="0" onChange={() => dispatch(setX(0))} />
              <Checkbox checked={x === 1} className="checkbox" label="1" onChange={() => dispatch(setX(1))} />
              <Checkbox checked={x === 2} className="checkbox" label="2" onChange={() => dispatch(setX(2))} />
              <Checkbox checked={x === 3} className="checkbox" label="3" onChange={() => dispatch(setX(3))} />
              <Checkbox checked={x === 4} className="checkbox" label="4" onChange={() => dispatch(setX(4))} />
              <Checkbox checked={x === 5} className="checkbox" label="5" onChange={() => dispatch(setX(5))} />
            </div>
          </div>

        </div>
        <div>
          <div className="inner">
            {isY == false  ?
              <label htmlFor="input" className="error">Y must be in range -3 to 5</label> :
              <label htmlFor="input">Enter value of Y [-3...5]</label>
            }
            <div id="input" className="Input">
              <Input type="text" maxLength={16} onChange={(a) => dispatch(setY(a))} />
            </div>
          </div>

        </div>
        <div>
          <div className="inner">
            {isR == false ?
              <label htmlFor="CB_Y" className="error">R must be positive integer</label> :
              <label htmlFor="CB_Y">Choose value of R</label>
            }
            <div id="CB_Y" className="Checkbox_group">
              <Checkbox checked={r === -3} className="checkbox" label="-3" onChange={() => dispatch(setR(-3))} />
              <Checkbox checked={r === -2} className="checkbox" label="-2" onChange={() => dispatch(setR(-2))} />
              <Checkbox checked={r === -1} className="checkbox" label="-1" onChange={() => dispatch(setR(-1))} />
              <Checkbox checked={r === 0} className="checkbox" label="0" onChange={() => dispatch(setR(0))} />
              <Checkbox checked={r === 1} className="checkbox" label="1" onChange={() => dispatch(setR(1))} />
              <Checkbox checked={r === 2} className="checkbox" label="2" onChange={() => dispatch(setR(2))} />
              <Checkbox checked={r === 3} className="checkbox" label="3" onChange={() => dispatch(setR(3))} />
              <Checkbox checked={r === 4} className="checkbox" label="4" onChange={() => dispatch(setR(4))} />
              <Checkbox checked={r === 5} className="checkbox" label="5" onChange={() => dispatch(setR(5))} />
            </div>
          </div>
        </div>
        <div className="buttons">
          <input type="button" className="btn_submit" value="Submit" onClick={onSubmitClick} />
          <input type="button" className="btn_clear" value="Clear" onClick={onClearClick} />
        </div>
      </div>
    </div>
  )
}
