/* eslint-disable react/react-in-jsx-scope */
import Map from '../Components/Map/Map'
// import ParkingList from "../Components/ParkingList/ParkingList";
import ParkingLotInfo from '../Components/ParkingLotInfo/ParkingLotInfo'
import { getParkingData, getAvailableSpace } from '../API/parking'

import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useLoadScript } from '@react-google-maps/api'

const libraries = ['places']

export default function HomePage () {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  })

  // 台北市的經緯度:預設位置, 使用useMemo hook (dependencies [])只會渲染一次
  const defaultCenter = useMemo(
    () => ({
      lat: 25.033671,
      lng: 121.564427
    }),
    []
  )

  const mapRef = useRef()

  // Get center position
  // eslint-disable-next-line no-unused-vars
  const [coords, setCoords] = useState(defaultCenter)
  // Get user position
  const [currentPosition, setCurrentPosition] = useState(defaultCenter)
  // const [currentPosition, setCurrentPosition] = useState(null)
  // const [showPosition, setShowPosition] = useState(false)
  // Get all parking lots info
  const [parkingData, setParkingData] = useState([])
  // Get available parking lots info
  const [availableData, setAvailableData] = useState([])
  // const [visibleLots, setVisibleLosts] = useState([])
  const [visibleLots, setVisibleLots] = useState([])

  // map 狀態 及 顯示資料
  // map 是 google maps 的物件 設置state的變化去追蹤他的變化
  const [map, setMap] = useState(null)
  // const [isLoading, setIsLoading] = useState(false)
  // 地圖加載後進行初始化操作
  const onLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  // ---------------------- GET data from Open Data (UseEffect) -----------------------
  // 渲染Open data 停車場資訊 及 剩餘位置資訊
  useEffect(() => {
    const getParkingLots = async () => {
      try {
        const lotsInfo = await getParkingData()
        const availableLots = await getAvailableSpace()
        if (lotsInfo && availableLots) {
          const availableId = new Set(availableLots.park.map((lot) => lot.id))
          const parkingLots = lotsInfo.park.filter((parkLot) => {
            return parkLot.totalcar > 0 && availableId.has(parkLot.id)
          })
          const availableSpace = availableLots.park
          setParkingData(parkingLots.map((parking) => ({ ...parking })))
          setAvailableData(availableSpace)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getParkingLots()
  }, [])
  // ---------------------------- GET data from Open Data ----------------------------

  if (!isLoaded) return <div>Loading...</div>
  return (
    <>
      <div className="map-div">
        {/* <ParkingList
          containerClass="side-menu"
          props={searchData}
          aprops={availableData}
          inputValue={inputValue}
          isSearch={isSearch}
          onLocationChange={handleLocationChange}
          onLocationKeyDown={handleLocationKeyDown}
          onLocationSearch={handleLocationSearch}
          onCurrentLocationClick={handleCurrentLocationClick}
          onCurrentLotClick={handleCurrentLotClick}
          onCurrentLotInfoClick={handleCurrentLotInfoClick}
          onAutocompleteLoad={handleAutocompleteLoad}
          onAutocompletePlaceChange={handleAutocompletePlaceChange}
        /> */}
        <ParkingLotInfo></ParkingLotInfo>
        <Map
          mapRef={mapRef}
          coords={coords}
          currentPosition={currentPosition}
          setCurrentPosition={setCurrentPosition}
          onLoad={onLoad}
          map={map}
          setMap={setMap}
          parkingData={parkingData}
          availableData={availableData}
          visibleLots={visibleLots}
          setVisibleLots={setVisibleLots}
        />
      </div>
    </>
  )
}
