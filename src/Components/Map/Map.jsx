import {useState, useEffect, useRef, useMemo, useCallback} from "react"
import { GoogleMap, useLoadScript, MarkerF, MarkerClusterer} from "@react-google-maps/api"

import TransferLatLng from "../../Utilities/TransferLatLng"


import { getParkingData, getAvailableSpace } from '../../API/parking';


// import SearchBar from "../Search/SearchBar";
// import ParkingList from '../ParkingList/ParkingList';

export default function Map({currentPosition, props}){
  const [inputValue, setInputValue] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongtitude] = useState('')
  const [allMarker, setAllMarker] = useState([])

  // Get all parking lots info
  const [parkingData, setParkingData] = useState([])
  // Get available parking lots info
  const [availableData, setAvailableData] = useState([])

  

  // const [currentPosition, setCurrentPosition] = useState(defaultCenter)

  const mapRef = useRef()
  // Generate the location once (when user first landing)
  const defaultCenter = useMemo(() =>( {
    lat: 25.033671,
    lng: 121.564427
  }), [])
  const userCenter = {
    lat: latitude, lng: longitude
  }
  // Disable icons that are not use
  const options = useMemo(() => ({
    disableDefaultUI: true,
    clickableIcons: false,
  }), [])

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

          
          // let availableSpace = availableLots.park
          setParkingData(parkingLots.map((parking) => ({...parking})))  
          // setAvailableData(availableSpace)
          // console.log(parkingData)
          // console.log(availableData)
        }

      } catch (error) {
        console.error(error)
      }
    }
    getParkingLots();
  }, [])


  // show user current position (icon is a car)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
      // console.log(position.coords)
      // console.log(position.coords.latitude)
      // console.log(position.coords.longitude)
      setLatitude(position.coords.latitude)
      setLongtitude(position.coords.longitude)
    })
  }, [])

  const onLoad = useCallback(map => (mapRef.current = map), [])

  return(
    <>
    <GoogleMap
        zoom={18}
        center={currentPosition}
        mapContainerClassName="map-container"
        options={options}
        onLoad={onLoad}
      >
        <MarkerF 
          position={userCenter}
          icon={{
            url: require('../../Assets/CarIcon.svg').default,
          }}
        />
        {
        parkingData.map((parking) => {
          const position = TransferLatLng(parking.tw97x, parking.tw97y)
          return (
            <MarkerF 
              key={parking.id} 
              position={position}
            />
          )})
        }
        
      </GoogleMap>
      
    
    </>
  )
}
