/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import styled from 'styled-components'
import { BackBarBtn } from '../ParkingLotInfo/ParkingLotInfo'

export default function DirectionModal ({ onCloseDirectionModal, destination, duration }) {
  // console.log(directions)
  // const destination = directions.routes[0].legs[0].distance.text
  // const duration = directions.routes[0].legs[0].duration.text
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <DirectionDiv>
      <ModalBtn onClick={ onCloseDirectionModal }>
        <div>✖</div>
      </ModalBtn>
      <p>
        目前距離: <span>{destination}</span>
      </p>
      <p>
        估計時間: <span>{duration}</span>
      </p>
    </DirectionDiv>
  )
}

const DirectionDiv = styled.div`
  position: fixed;
  z-index: 999;
  width: 200px;
  height: 90px;
  right: 20px;
  top: 100px;
  padding: 0.2em;
  background-color: rgb(255, 247, 225, .5);
  border: 1px solid #fce292;
  color: rgb(34, 34, 34, 0.8);
  font-weight: 500;
  @media screen and (min-width: 768px) {
    width: 250px;
    height: 120px;
    top: unset;
    bottom: 40px;
    padding: 1em;
  }
`
const ModalBtn = styled(BackBarBtn)`
  display: flex;
  width: 100%;
  justify-content: right;
`
