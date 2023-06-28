import {useState, useEffect, useRef, useMemo} from "react"
import { GoogleMap, useLoadScript, MarkerF} from "@react-google-maps/api"


export default function MapTest({children, mode}){
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })

  const defaultCenter = useMemo(() =>( {
    lat: 25.033671,
    lng: 121.564427
  }), [])
  
  if(!isLoaded) return <div>Loading...</div>
  return(
    <div className="map-div" data-mode={mode}>
      {children}
      <GoogleMap
        zoom={18}
        center={defaultCenter}
        mapContainerClassName="map-container"
      >
        <MarkerF position={{lat: 25.0288, lng: 121.5662}}/>
      </GoogleMap>
    </div>
  )
}