import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';

import Player from '../../actors/Player/Player';
import Level1 from '../../scenarios/Level 1/Level1';

import useTicker from '../../hooks/useTicker';
import useCamera from '../../hooks/useCamera';
import useController from '../../hooks/useController';
import usePlayer from '../../hooks/usePlayer';

import classes from './Canvas.module.css'

const Canvas = () => {

  const { tick, time } = useTicker(24)
  const canvasEl = useRef(null)
  const playerEl = useRef(null)
  const { updateCam, limits } = useCamera(canvasEl)
  const { updatePlayer, playerLeft } = usePlayer(playerEl, 0, 300, limits)
  const { keysDown } = useController()

  //main game loop
  useLayoutEffect(()=>{
    //check winning condition
    //check loosing condition
    //check collision
    //check collision effects
    //update player
    // setPlayerX(oldVal=>oldVal+10)
    // playerEl.current.style.left = `${playerX}px`
    updatePlayer(keysDown)
    updateCam(playerLeft)
    //update scneario
  }, [ tick ])

  // const aux1 = {top: 0, left: `${limits.backLimit}px`} //debug
  // const aux2 = {top: 0, left: `${limits.frontLimit}px`} //debug
  return (
    <div className={classes.Canvas} ref={canvasEl}>
      <div>{time.toFixed(2)}</div>
      <Level1>
        <Player playerRef={playerEl}/>
        {/* <div className={classes.BackLimit} style={aux1}></div>
        <div className={classes.FrontLimit} style={aux2}></div> */}
      </Level1>
    </div>
  );
};

export default Canvas;