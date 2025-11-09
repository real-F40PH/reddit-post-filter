import styled from 'styled-components'
import { useCallback, useContext, useState } from 'react'
import { usePostBlocker } from '../context/postBlocker'

const CounterContainer = styled('div')`
  position: fixed;
  bottom: 6px;
  right: 6px;
  height: 12px;
  padding: 3px;
  background-color: rgba(215, 211, 211, 0.7);
  font-size: 10px;
  line-height: 12px;
  color: #282626;
  text-align: center;
  border-radius: 4px;
  z-index: 9999;
  font-family: sans-serif;
  cursor: pointer;
`

const Counter = () => {
  const { total, setOverlayVisible } = usePostBlocker()

  const handleClick = useCallback(() => {
    setOverlayVisible((overlayVisible) => !overlayVisible)
  }, [setOverlayVisible])

  return <CounterContainer onClick={handleClick}>💩 {total}</CounterContainer>
}

export default Counter
