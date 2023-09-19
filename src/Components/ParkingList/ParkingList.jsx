/* eslint-disable indent */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import ParkingItem from '../ParkingItem/ParkingItem'
import SearchBar from '../Search/SearchBar'
import styled from 'styled-components'

export default function ParkingList ({
  props,
  aprops,
  mode,
  containerClass,
  mobileClass,
  inputValue,
  isSearch,
  onLocationChange,
  onLocationSearch,
  onCurrentLocationClick,
  onCurrentLotClick,
  onCurrentLotInfoClick,
  onLocationKeyDown,
  onAutocompleteLoad,
  onAutocompletePlaceChange,
  children
}) {
  return (
    <div className={containerClass}>
      {children}
      <SearchBar
        onAutocompleteLoad={onAutocompleteLoad}
        onAutocompletePlaceChange={onAutocompletePlaceChange}
        inputValue={inputValue}
        onLocationChange={onLocationChange}
        onLocationKeyDown={onLocationKeyDown}
        onLocationSearch={onLocationSearch}
        onCurrentLocationClick={onCurrentLocationClick}
      />
      <ParkingSection>
        <ParkingListUl>
          {isSearch
          ? (
            props.map((prop) => {
              return (
                <ParkingItem
                  prop={prop}
                  key={prop.id}
                  aprops={aprops}
                  onCurrentLotClick={(id) => onCurrentLotClick?.(id)}
                  onCurrentLotInfoClick={(id) => onCurrentLotInfoClick?.(id)}
                />
              )
            })
          )
          : (
            <NoInfo>尚未搜尋任何資料</NoInfo>
          )}
        </ParkingListUl>
      </ParkingSection>
    </div>
  )
}

const ParkingSection = styled.section`
  width: 100%;
  height: 40vh;
`
const ParkingListUl = styled.ul`
  width: 100%;
  height: 40vh;
  overflow-y: auto;
  @media screen and (min-width: 768px) {
    margin-top: 1.5em;
    height: 85vh;
  }
`
const NoInfo = styled.div`
  text-align: center;
  margin-top: 1.5em;
  color: rgb(34, 34, 34, 0.6);
  font-size: 18px;
`
