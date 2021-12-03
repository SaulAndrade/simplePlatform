import { useState } from 'react';

const WALK_RATE = 10 //in px
const RUN_RATE = 15 //in px
const PLAYER_WIDTH = 100//in px
const PLAYER_HEIGHT = 100//in px
const LV_SIZE = 2300 //in px

const usePlayer = (playerEl, iLeft, iTop, limits) => {
  const [ playerLeft, setPlayerLeft ] = useState(iLeft)
  const [ playerTop, setPlayerTop ] = useState(iTop)
  
  const moveHorizontal = (delta) => {
    if ((playerLeft+delta+PLAYER_WIDTH)>LV_SIZE || (playerLeft+delta)<limits.backLimit){
      return
    }
    setPlayerLeft(oldLeft => oldLeft + delta)
  }

  const draw = (left, top) => {
    if(!playerEl){
      return
    }

    playerEl.current.style.left = `${playerLeft}px`
    playerEl.current.style.top = `${playerTop}px`
  }

  const updatePlayer = (keysDown) => {    
    if (!keysDown){
      return
    }

    const actions = {
      'ArrowUp':()=>{console.log('Jump')},
      'ArrowRight':()=>{moveHorizontal(WALK_RATE)},
      'ArrowLeft':()=>{moveHorizontal(-WALK_RATE)}
    }

    keysDown.forEach(key=>{
      actions[key]()
    })

    draw(playerLeft, playerTop)
  }

  return {
    updatePlayer,
    playerLeft,
    playerTop
  }
};

export default usePlayer;