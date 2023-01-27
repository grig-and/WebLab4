import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPoints } from "../redux/slice/pointStateSlice"
import './TableWrapper.scss';

function TableWrapper({ children }) {
  const [isRed, setIsRed] = useState(false);
  const points = useSelector(getPoints)

  const handleClick = () => {
    setIsRed(false);
  }

  useEffect(() => {
    if (points?.[points?.length-1]?.hit === undefined) return;
    setIsRed(!points?.[points?.length-1]?.hit);
    // debugger
  }, [points]);

  return (
    <div onClick={handleClick} className={`${isRed ? 'red' : ''}`}>
        {children}
    </div>
  );
}

export default TableWrapper;
