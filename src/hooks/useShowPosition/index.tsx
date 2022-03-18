import React, { useState, useEffect } from 'react';
interface IProps {

}

const useShowPosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      setPosition({
        x: e.clientX,
        y: e.clientY
      })
    }
    console.log('addEventListener');
    document.addEventListener('mousemove', handleClick);
    return () => {
      console.log('removeAddEventListener');
      document.removeEventListener('mousemove', handleClick);
    }
  }, []);
  return position;
  
}
export default useShowPosition;