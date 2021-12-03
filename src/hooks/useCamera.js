import { useState } from 'react';

const LV_SIZE = 2300 //Level size (px)
const FR_SIZE = 800 //visible (px)
const FLIMIT_OFFSET = 100//offset from border to next in px
const BLIMIT_OFFSET = 100//back distance allowed in next frame in px
const PLAYER_WIDTH = 100//in px

const useCamera = (canvasEl) => {
  const [ limits, setLimits ] = useState({
    backLimit: 0,
    frontLimit: FR_SIZE - FLIMIT_OFFSET - PLAYER_WIDTH
  })
  
  const draw = (limits) => {
    canvasEl.current.scrollTo(limits.backLimit, 0)
  }

  const updateCam = (playerLeft) => {
    
    if (!canvasEl){
      return
    }

    if (playerLeft < limits.frontLimit || playerLeft == LV_SIZE - PLAYER_WIDTH){
      return
    }

    const newLimits = {
      frontLimit: playerLeft - BLIMIT_OFFSET + FR_SIZE - FLIMIT_OFFSET - PLAYER_WIDTH, 
      backLimit: playerLeft - BLIMIT_OFFSET
    }

    //case scrolling would exceed the level size 
    //front limit would be the level size itself
    //back limit would be the level size minus a whole frame size
    if (newLimits.frontLimit>LV_SIZE - PLAYER_WIDTH) {
      setLimits(()=>{
        draw( {frontLimit:LV_SIZE - PLAYER_WIDTH, backLimit:LV_SIZE - FR_SIZE} )
        return {frontLimit:LV_SIZE - PLAYER_WIDTH, backLimit:LV_SIZE - FR_SIZE }
      })
      return
    }

    //scrolling within the level size
    setLimits(()=>{
      draw(newLimits)
      return newLimits
    })
  }

  return {
    updateCam,
    limits,
  }
};

export default useCamera;