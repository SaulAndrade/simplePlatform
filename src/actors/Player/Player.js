import React from 'react';

import classes from './Player.module.css'

const Player = ({playerRef}) => {
  return (
    <div className={classes.Player} ref={playerRef}>
      
    </div>
  );
};

export default Player;