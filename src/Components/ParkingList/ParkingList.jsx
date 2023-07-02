import ParkingItem from "../ParkingItem/ParkingItem"
import { ReactComponent as CrossIcon } from "../../Assets/CrossIcon.svg"

import {useState, useEffect, useRef, useMemo, useCallback} from "react"

import SearchBar from "../Search/SearchBar";
import ParkingLotInfo from "../ParkingLotInfo/ParkingLotInfo";


export default function ParkingList({props, aprops, mode, containerClass, mobileClass, inputValue, isSearch, onLocationChange, onLocationSearch, onCurrentLocationClick, onCurrentLotClick, onLocationKeyDown, onAutocompleteLoad, onAutocompletePlaceChange}) {

  return(

     <div className={containerClass}>
        <div className={mobileClass}>
          <SearchBar
            onAutocompleteLoad={onAutocompleteLoad}
            onAutocompletePlaceChange={onAutocompletePlaceChange}
            inputValue={inputValue} 
            onLocationChange={onLocationChange}
            onLocationKeyDown={onLocationKeyDown}
            onLocationSearch={onLocationSearch}
            onCurrentLocationClick={onCurrentLocationClick}
            />
        </div>
        <section className="parking" data-mode={mode}>
          {/* <button className="close-btn"><CrossIcon/></button> */}
          <ul className="parking-list">
             {isSearch ? props.map((prop) => {
                return <ParkingItem prop={prop} key={prop.id} aprops={aprops} onCurrentLotClick={(id) => onCurrentLotClick?.(id)}/>
              }) : 
              <div className="no-info">尚未搜尋任何資料</div>
              }
              {/* {isToggle && <ParkingLotInfo prop={oneParkingInfo} aprops={aprops} onCloseInfoClick={() => {setIsToggle(false)}}/>} */}
          </ul>
        </section>
      </div>

    
  )
}