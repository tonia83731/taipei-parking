import ParkingItem from "../ParkingItem/ParkingItem"
import { ReactComponent as CrossIcon } from "../../Assets/CrossIcon.svg"

import {useState, useEffect, useRef, useMemo, useCallback} from "react"

import SearchBar from "../Search/SearchBar";


export default function ParkingList({props, aprops, mode, containerClass, mobileClass,onCurrentLocationClick}) {
  const [inputValue, setInputValue] = useState('')

  const [isSearch, setIsSearch] = useState(false)

  const handleLocationChange = (value) => {
    setInputValue(value)
  }
  const handleLocationSearch = () => {
    if(inputValue.length === 0) return

    setIsSearch(true)

  }
  // console.log(props)
  // console.log(aprops)

  // const parkingLotsData = props.map((prop) => {
  //   if(prop.id <= 10){
  //     return <ParkingItem prop={prop} key={prop.id} aprops={aprops}/>
  //   }
  // })

  return(

     <div className={containerClass}>
        <div className={mobileClass}>
          <SearchBar 
            inputValue={inputValue} 
            onLocationChange={handleLocationChange}
            onLocationSearch={handleLocationSearch}
            onCurrentLocationClick={onCurrentLocationClick}
            />
        </div>
        <section className="parking" data-mode={mode}>
          <button className="close-btn"><CrossIcon/></button>
          <ul className="parking-list">
            {/* {isSearch ?
              props.map((prop) => {
                if(prop.id <= 10){
                  return <ParkingItem prop={prop} key={prop.id} aprops={aprops}/>
                }
              })
            : <div className="no-info">尚未搜尋任何資料</div>} */}
             {props.map((prop) => {
                if(prop.id <= 10){
                  return <ParkingItem prop={prop} key={prop.id} aprops={aprops}/>
                }
              })}
          </ul>
        </section>
      </div>

    
  )
}