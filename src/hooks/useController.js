import { useState, useEffect } from 'react';

const COMMANDS = ['ArrowUp', 'ArrowLeft', 'ArrowRight']

const useController = () => {
  const [keysDown, setKeysDown] = useState([])

  const keyDownHandler = (e) => {
    if (!COMMANDS.includes(e.key)){
      return
    }

    setKeysDown(oldArray => {
      const newKeysDown = oldArray.includes(e.key) ? [...oldArray] : [...oldArray, e.key]
      return newKeysDown
    })
  }
  
  const keyUpHandler = (e) => {
    if (!COMMANDS.includes(e.key)){
      return
    }
    setKeysDown(oldArray => oldArray.filter(key=>key!==e.key))
  }

  useEffect(()=>{
    const keyDownListener = window.addEventListener('keydown',(e)=>keyDownHandler(e))
    const keyUpListener = window.addEventListener('keyup',keyUpHandler)

    return () => {
      window.removeEventListener(keyDownListener)
      window.removeEventListener(keyUpListener)
    }
  }, [])

  return {
    keysDown
  }
};

export default useController;