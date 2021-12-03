import React from 'react';

import classes from './Level1.module.css'

const Level1 = ({children}) => {
  return (
    <div className={classes.Level1}>
      {children}
    </div>
  );
};

export default Level1;