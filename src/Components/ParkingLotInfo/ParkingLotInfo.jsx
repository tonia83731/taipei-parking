/* eslint-disable multiline-ternary */
/* eslint-disable quotes */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { ReactComponent as BackArrowIcon } from '../../Assets/BackArrowIcon.svg'
// import { ReactComponent as PregnancyIcon } from '../../Assets/PregnancyIcon.svg'
// import { ReactComponent as DisableIcon } from '../../Assets/DisableIcon.svg'
// import { ReactComponent as CrossIcon } from '../../Assets/CrossIcon.svg'

// import SplitStartAndEnd from '../../Utilities/SplitStartAndEnd'
import { ParkingLotTitle } from '../ParkingItem/ParkingItem'
import styled from 'styled-components'
// import { useState } from 'react'

export default function ParkingLotInfo ({ prop, aprops, onBackInfoClick }) {
  const aprop = aprops.find((aprop) => aprop.id === prop.id)
  // console.log(aprop)
  const chargeStation =
    aprop.ChargeStation === undefined ? "-" : aprop.ChargeStation
  console.log(chargeStation)
  return (
    <ParkingLotInfoSection>
      <BackBar>
        <BackBarBtn onClick={onBackInfoClick}>
          <BackArrowIcon />
          回到主頁
        </BackBarBtn>
      </BackBar>
      <ParkingInfoArea>
        <ParkingLotTitle>{prop.name}</ParkingLotTitle>
        <ul>
          <InfoBodyItem>
            連絡電話: <a href={`tel:02${prop.tel}`}>(02) {prop.tel}</a>
          </InfoBodyItem>
          <InfoBodyItem>
            營業時間: <span>{prop.serviceTime}</span>
          </InfoBodyItem>
          <InfoBodyItem>
            停車費用: <span>{prop.payex}</span>
          </InfoBodyItem>
        </ul>
        <InfoDescription>{prop.summary}</InfoDescription>
        <InfoFooter>
          <ParkingLotTitle>車位使用情況</ParkingLotTitle>
          <div>
            <ParkingSapceInfoGroup>
              <ParkingSubTitle> 一般汽車位</ParkingSubTitle>
              <ParkingSpaceTable>
                <tr>
                  <th>剩餘車位</th>
                  <th>車位總數</th>
                </tr>
                <tr>
                  {aprop.availablecar <= 5 && prop.totalcar !== 0 ? (
                    <Warning>
                      {aprop.availablecar < 0 ? 0 : aprop.availablecar}
                    </Warning>
                  ) : (
                    <td>{aprop.availablecar < 0 ? 0 : aprop.availablecar}</td>
                  )}
                  <td>{prop.totalcar}</td>
                </tr>
              </ParkingSpaceTable>
            </ParkingSapceInfoGroup>
            <ParkingSapceInfoGroup>
              <ParkingSubTitle> 一般機車位</ParkingSubTitle>
              <ParkingSpaceTable>
                <tr>
                  <th>剩餘車位</th>
                  <th>車位總數</th>
                </tr>
                <tr>
                  {aprop.availablemotor <= 5 && prop.totalmotor !== 0 ? (
                    <Warning>
                      {aprop.availablemotor < 0 ? 0 : aprop.availablemotor}
                    </Warning>
                  ) : (
                    <td>
                      {aprop.availablemotor < 0 ? 0 : aprop.availablemotor}
                    </td>
                  )}
                  <td>{prop.totalmotor}</td>
                </tr>
              </ParkingSpaceTable>
            </ParkingSapceInfoGroup>
            <ParkingSapceInfoGroup>
              <ParkingSubTitle>電動車充電站</ParkingSubTitle>
              <ParkingSpaceTable>
                <tr>
                  <th>充電位總數</th>
                </tr>
                <tr>
                  <td>{prop.ChargingStation ? prop.ChargingStation : 0}</td>
                </tr>
              </ParkingSpaceTable>
            </ParkingSapceInfoGroup>
          </div>
        </InfoFooter>
      </ParkingInfoArea>
    </ParkingLotInfoSection>
  )
}

const Warning = styled.td`
  color: #e24134;
  font-weight: 700;
`
const ParkingLotInfoSection = styled.section`
  background-color: #ffffff;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40vh;
  overflow-y: scroll;
  @media screen and (min-width: 768px) {
    min-height: 100vh;
  }
`
const BackBar = styled.div`
  padding: 1em 0.5em;
  border-bottom: 1px solid #e9eaee;
`
export const BackBarBtn = styled.button`
  font-size: 16px;
  color: rgb(34, 34, 34, 0.6);
  &:hover {
    color: rgb(34, 34, 34, 0.8);
  }
  svg {
    width: auto;
    height: 16px;
    margin-right: 0.5em;
    path {
      fill: rgb(34, 34, 34, 0.6);
    }
  }
`
const ParkingInfoArea = styled.div`
  padding: 1em 1.2em;
`
const InfoBodyItem = styled.li`
  margin-left: 1.5em;
  list-style-type: disc;
`
const InfoDescription = styled.p`
  margin: 0.5em 0;
`
const InfoFooter = styled.div`
  margin-top: 1em;
`
const ParkingSubTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 0.5em;
  @media screen and (min-width: 768px) {
    font-size: 20px;
  }
`
const ParkingSapceInfoGroup = styled.div`
  margin-bottom: 0.8em;
`
const ParkingSpaceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff7e1;
  border: 1px solid #fce292;
  text-align: center;
  td,
  th {
    border: 1px solid #fce292;
  }
`
