// import {GoogleMap, useLoadScript, Marker} from '@react-google-maps'
import Map from '../Components/Map/Map';
import ParkingList from '../Components/ParkingList/ParkingList' ;
import TransferLatLng from '../Utilities/TransferLatLng';


import {useState, useEffect, useMemo, useRef} from 'react'
import { GoogleMap, useLoadScript, MarkerF} from "@react-google-maps/api"


import { getParkingData, getAvailableSpace } from '../API/parking';

import Swal from 'sweetalert2'

const libraries = ['places']


export default function HomePage(){
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  // Center of Taipei => default center only render once
  const defaultCenter = useMemo(() =>( {
    lat: 25.033671,
    lng: 121.564427
  }), [])

  const mapRef = useRef()

  // Get center position (user position)
  // const [coords, setCoords] = useState(defaultCenter)
  const [currentPosition, setCurrentPosition] = useState(defaultCenter)
  // Get all parking lots info
  const [parkingData, setParkingData] = useState([])
  // Get available parking lots info
  const [availableData, setAvailableData] = useState([])
  // Get parking lots near center position (surroundings, search)
  const [visibleLots, setVisibleLosts] = useState([])

  // Parking icon user clicks (spot icon)
  const [selected, setSelected] = useState(null)

  // search input
  const [inputValue, setInputValue] = useState('')
  // user click search button or not
  const [isSearch, setIsSearch] = useState(false)
  
  const handleLocationChange = (e) => {
    setInputValue(e.target.value)
  }
  const handleLocationKeyDown = (e) => {
    if(inputValue === "") return
    if(e.key === 'Enter'){
      const value = inputValue.trim().toLowerCase()
      const searchParkingLot = parkingData.filter((lots) => {
        return lots.name.includes(value) || lots.area.includes(value)
      })
      // console.log(searchParkingLot)
      setVisibleLosts(searchParkingLot)
      // console.log(visibleLots)
      setIsSearch(true)
      setInputValue('')
    }
  }
  const handleLocationSearch = (e) => {
    e.preventDefault()
    // console.log('click')
    if(inputValue === "") return
    const value = inputValue.trim().toLowerCase()
    const searchParkingLot = parkingData.filter((lots) => {
      return lots.name.includes(value) || lots.area.includes(value)
    })
    // console.log(searchParkingLot)
    setVisibleLosts(searchParkingLot)
    setIsSearch(true)
    setInputValue('')
    
  }
  

  const handleCurrentLocationClick = (e) => {
    e.preventDefault()
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })
  }

  const handleCurrentLotClick = (e) => {
    e.preventDefault()
    const id = e.target.dataset.id
    console.log(id)
    const parkingLot = parkingData?.find((lot) => lot.id === id)
    console.log(parkingLot)
    
    if(parkingLot === undefined){
       Swal.fire({
        position: 'middle',
        title: '無法獲得此停車場資料!',
        text: '請稍後再嘗試!',
        icon: 'warning',
        timer: 1000,
        showCloseButton: true,
        showConfirmButton: false,
      });
      return 
    }
    const x = parkingLot.tw97x
    const y = parkingLot.tw97y
    const parkinglotLatLng = TransferLatLng(x, y)
    setCurrentPosition(parkinglotLatLng)
  }

  // render open data here 
  useEffect(() => {
    const getParkingLots = async() => {
      try{
        const lotsInfo = await getParkingData()
        const availableLots = await getAvailableSpace()

        if(lotsInfo && availableLots) {
          const availableId = new Set(availableLots.park.map((lot) => lot.id))
          const parkingLots = lotsInfo.park.filter((parkLot) => {
            return parkLot.totalcar > 0 && availableId.has(parkLot.id)
          })

          
          let availableSpace = availableLots.park
          setParkingData(parkingLots.map((parking) => ({...parking})))  
          setAvailableData(availableSpace)
          // console.log(parkingData)
          // console.log(availableData)
        }

      } catch (error) {
        console.error(error)
      }
    }
    getParkingLots();
  }, [])

  
  if(!isLoaded) return <div>Loading...</div>
  return(
    <>
      <div className="map-div" data-mode="mobile">
        <ParkingList 
          mobileClass="top-search" 
          mode="mobile" 
          props={visibleLots} 
          aprops={availableData} 
          inputValue={inputValue}
          isSearch={isSearch}
          onLocationChange={handleLocationChange}
          onLocationKeyDown={handleLocationKeyDown}
          onLocationSearch={handleLocationSearch}
          onCurrentLocationClick={handleCurrentLocationClick}
          onCurrentLotClick={handleCurrentLotClick}
          />
        <Map currentPosition={currentPosition}/>
      </div>

      <div className="map-div" data-mode="desktop">
        <ParkingList 
          containerClass="side-menu" 
          mode="desktop" 
          props={visibleLots} 
          aprops={availableData}
          inputValue={inputValue}
          isSearch={isSearch}
          onLocationChange={handleLocationChange}
          onLocationKeyDown={handleLocationKeyDown}
          onLocationSearch={handleLocationSearch}
          onCurrentLocationClick={handleCurrentLocationClick}
          onCurrentLotClick={handleCurrentLotClick}
          />
        <Map 
          currentPosition={currentPosition}
          props={parkingData}
          />
      </div>
    </>
  )
}