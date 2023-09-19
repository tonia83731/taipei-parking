/* eslint-disable quotes */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { ReactComponent as CheckIcon } from '../../Assets/CheckIcon.svg'
import { ReactComponent as LocationArrowIcon } from '../../Assets/LocationArrowIcon.svg'
import { ReactComponent as InfoIcon } from '../../Assets/InfoIcon.svg'
import styled from 'styled-components'

export default function ParkingItem ({ prop, aprops, onCurrentLotClick, onCurrentLotInfoClick }) {
  const aprop = aprops.find((aprop) => aprop.id === prop.id)
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <>
      <ParkingItemLi>
        <ParkingInfo>
          <ParkingLotTitle>{prop.name}</ParkingLotTitle>
          <p>地址: {prop.address}</p>
          <SpaceUl>
            <li>
              總停車位: <span>{prop.totalcar}</span>
            </li>
            <li>
              剩餘空位:{" "}
              <span>{aprop.availablecar <= 0 ? "0" : aprop.availablecar}</span>
            </li>
          </SpaceUl>
          <div>
            {prop.Pregnancy_First > 0 && (
              <span>
                <CheckIconStyle>
                  <CheckIcon />
                </CheckIconStyle>
                婦幼車位
              </span>
            )}
            <SpaceSpan></SpaceSpan>
            {prop.Handicap_First > 0 && (
              <span>
                <CheckIconStyle>
                  <CheckIcon />
                </CheckIconStyle>
                殘障車位
              </span>
            )}
          </div>
        </ParkingInfo>
        <ParkingLink>
          <ItemBtn
            onClick={() => {
              onCurrentLotClick?.(prop.id)
            }}
            data-id={prop.id}
          >
            <LocationArrowIcon />
          </ItemBtn>
          <SpaceSpan></SpaceSpan>
          <ItemBtn
            onClick={() => {
              onCurrentLotInfoClick?.(prop.id)
            }}
          >
            <InfoIcon />
          </ItemBtn>
        </ParkingLink>
      </ParkingItemLi>
      <BreakLine></BreakLine>
    </>
  )
}

const ParkingItemLi = styled.li`
  padding: 0.8rem 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: #f6f7f9;
  }
`
const CheckIconStyle = styled.i`
  margin-right: 0.2em;
  svg {
    width: auto;
    height: 16px;
    path {
      fill: #81c995;
    }
  }
`
const ParkingInfo = styled.div`
  line-height: 1;
  text-align: start;
`
const SpaceUl = styled.ul`
  margin-left: 1.2rem;
  padding-top: 0.4em;
  padding-bottom: 0.35em;
  li {
    list-style-type: circle;
    margin-bottom: 0.35em;
    margin-left: 0.2em;
  }
`
const ParkingLink = styled.div`
  display: flex;
  align-items: center;
`
const ItemBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background-color: #f1f3f4;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #e9eaee;
  }
  svg {
    width: auto;
    height: 20px;
    path {
      fill: #669ef7;
    }
  }
  @media screen and (min-width: 1100px) {
    width: 60px;
    height: 60px;
  }
`
const SpaceSpan = styled.span`
  margin: 0 0.4em;
`
export const ParkingLotTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 0.5em;
  color: rgb(34, 34, 34);
  @media screen and (min-width: 768px){
    font-size: 24px;
  }
`
const BreakLine = styled.span`
  display: block;
  width: 100%;
  height: 10px;
  background-color: #e9eaee;
`
