import styled from 'styled-components'
import { usePostBlocker } from '../context/postBlocker'
import { useCallback } from 'react'
import Stats from './stats'
import Settings from './settings'

const OverlayContainer = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 9999;
`

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`

const Overlay = () => {
  const { overlayVisible, setOverlayVisible } = usePostBlocker()

  const handleClick = useCallback(
    (event) => {
      if (event.target === event.currentTarget) {
        setOverlayVisible((overlayVisible) => !overlayVisible)
      }
    },
    [setOverlayVisible]
  )

  if (!overlayVisible) {
    return
  }

  return (
    <OverlayContainer onClick={handleClick}>
      <ModalContainer>
        <Stats />
        <Settings />
      </ModalContainer>
    </OverlayContainer>
  )
}

export default Overlay
