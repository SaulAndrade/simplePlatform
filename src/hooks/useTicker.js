import { useState, useEffect, useCallback } from 'react';

const useTicker = (fps=24) => {
  const [ dt, setDt ] = useState(1/fps)
  const [tick, setTick] = useState(0)

  const createTicker = useCallback( () => {
    const tRef = setInterval(()=>{
      setTick(oldTick=>oldTick+1)
    }, dt*1000)

    return tRef
  }, [ dt ])

  useEffect(()=>{
    const tRef = createTicker()
    return  ()=>{clearInterval(tRef)}
  },[ createTicker ])

  return {
    dt,
    setDt,
    tick,
    time: tick*dt
  }
};

export default useTicker;