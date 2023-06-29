import {useState, useEffect, useRef, useMemo, useCallback} from "react"
import { GoogleMap, useLoadScript, MarkerF} from "@react-google-maps/api"

import {ReactComponent as CarIcon} from '../../Assets/CarIcon.svg'


// import SearchBar from "../Search/SearchBar";
// import ParkingList from '../ParkingList/ParkingList';

export default function Map({coords}){
  const [inputValue, setInputValue] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongtitude] = useState('')
  

  const handleLocationChange = (value) => {
    setInputValue(value)
  }
  const handleLocationSearch = () => {
    if(inputValue.length === 0) return

  }
  

  const mapRef = useRef()

  // Generate the location once (when user first landing)
  const defaultCenter = useMemo(() =>( {
    lat: 25.033671,
    lng: 121.564427
  }), [])
  // Disable icons that are not use
  const options = useMemo(() => ({
    disableDefaultUI: true,
    clickableIcons: false,
  }), [])

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
        center={defaultCenter}
        mapContainerClassName="map-container"
        options={options}
        onLoad={onLoad}
      >
        <MarkerF 
          position={{lat: latitude, lng: longitude}}
          icon={{
            url: require('../../Assets/CarIcon.svg').default,
          }}
          />
      </GoogleMap>
      
    
    </>
  )
}
