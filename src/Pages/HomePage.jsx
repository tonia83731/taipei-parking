// import {GoogleMap, useLoadScript, Marker} from '@react-google-maps'
import Map from '../Components/Map/Map';
import ParkingList from '../Components/ParkingList/ParkingList' ;
import { getParkingData, getAvailableSpace } from '../API/parking';


import {useState, useEffect, useMemo, useRef, useCallback} from 'react'
import { GoogleMap, useLoadScript, MarkerF, Autocomplete} from "@react-google-maps/api"
import { MarkerClusterer, SuperClusterAlgorithm } from '@googlemaps/markerclusterer';
import TransferLatLng from '../Utilities/TransferLatLng';
import Swal from 'sweetalert2'

const libraries = ['places']


export default function HomePage(){
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  // 台北市的經緯度:預設位置, 使用useMemo hook (dependencies [])只會渲染一次
  const defaultCenter = useMemo(() =>( {
    lat: 25.033671,
    lng: 121.564427
  }), [])

  const mapRef = useRef()
  // console.log(mapRef)
  const autoCompleteRef = useRef(null)

  // Get center position
  const [coords, setCoords] = useState(defaultCenter)
  // Get user position
  const [currentPosition, setCurrentPosition] = useState(defaultCenter)
  // const [currentPosition, setCurrentPosition] = useState(null)
  // const [showPosition, setShowPosition] = useState(false)
  // Get all parking lots info
  const [parkingData, setParkingData] = useState([])
  // Get available parking lots info
  const [availableData, setAvailableData] = useState([])
  // Get parking lots near center position (surroundings, search)
  const [searchData, setSearchData] = useState([])
  // const [visibleLots, setVisibleLosts] = useState([])
  const [visibleLots, setVisibleLots] = useState([])

  // map 狀態 及 顯示資料
  // map 是 google maps 的物件 設置state的變化去追蹤他的變化
  const [map, setMap] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // search input
  const [inputValue, setInputValue] = useState('')
  // user click search button or not
  const [isSearch, setIsSearch] = useState(false)


  // ---------------------------- Search Area Break -----------------------------
  const handleAutocompleteLoad = (autoComplete) => {
    autoCompleteRef.current = autoComplete
  }
  const codeAddress = () => {
    
  }
  const handleAutocompletePlaceChange = () => {
    
  }
  // 輸入搜尋關鍵字
  const handleLocationChange = (e) => {
    setInputValue(e?.target.value)
  }
  
  // 按搜尋鍵搜尋輸入關鍵字結果 "Enter"
  const handleLocationKeyDown = (e) => {
    if(inputValue === "") return
    if(e.key === 'Enter'){
      const value = inputValue.trim().toLowerCase()
      const searchParkingLot = parkingData.filter((lots) => {
        return lots.name.includes(value) || lots.area.includes(value)
      })
      // console.log(searchParkingLot)
      setSearchData(searchParkingLot)
      // console.log(visibleLots)
      setIsSearch(true)
      setInputValue('')
    }
  }
  // 按搜尋鍵搜尋輸入關鍵字結果
  const handleLocationSearch = (e) => {
    e.preventDefault()
    // const map = mapRef.current
    // console.log('click')
    if(inputValue === "") return
    const value = inputValue.trim().toLowerCase()
    const searchParkingLot = parkingData.filter((lots) => {
      return lots.name.includes(value) || lots.area.includes(value)
    })
    console.log(searchParkingLot)
    // console.log(searchParkingLot)
    setSearchData(searchParkingLot)
    setIsSearch(true)
    setInputValue('')
  }
  
  // ---------------------------- Search Area Break -----------------------------

  // 搜尋目前使用者位置 及 周邊停車場空位
  const handleCurrentLocationClick = (e) => {
    e.preventDefault()
    const map = mapRef.current
    navigator.geolocation.getCurrentPosition(
      (position) => {
      // setCurrentPosition({
      //   lat: position.coords.latitude,
      //   lng: position.coords.longitude
      // })
      const userPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      map?.setCenter(userPosition)
      setCurrentPosition(userPosition)
      // setShowPosition(true)

      const radius = 0.001 //(約280公尺)
      const userLat = position.coords.latitude
      const userLng = position.coords.longitude
      const northEast = new window.google.maps.LatLng(
        userLat + radius,
        userLng + radius
      )
      const southWest = new window.google.maps.LatLng(
        userLat + radius,
        userLng + radius
      )
      const bounds = new window.google.maps.LatLngBounds(
        southWest, northEast
      )
      map.fitBounds(bounds)
      const visibleLots = parkingData.filter((parkingLot) => {
        const {lat, lng} = TransferLatLng(parkingLot.tw97x, parkingLot.tw97y)
        return bounds.contains(new window.google.maps.LatLng(lat,lng))
      })
      setVisibleLots(visibleLots)
    },
    () => {
      Swal.fire({
        position: 'middle',
        text: '允許存取使用者位置來使用此功能',
        icon: 'warning',
        // timer: 1000,
        showCloseButton: true,
        showConfirmButton: false,
      });
    }
    )
  }

  // 搜尋後按下ParkingItem => location btn 將目前位置顯示於地圖中心
  // 搜尋後按下ParkingItem => location btn 顯示目前停車場資訊
  const handleCurrentLotClick = (id) => {
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


  // 用 useRef 與 useCallback 儲存 Google Map 實例
  const onLoad = useCallback((map) => {
    mapRef.current = map;
  })
  // 儲存map目前顯示狀態 // ******
  const handleMapLoad = useCallback((map) => {
    mapRef.current = map
    setMap(map)
    map.setZoom(16)
    map.setCenter(coords)
    onLoad(map)
  })


  // ---------------------- GET data from Open Data (UseEffect) -----------------------
  // 渲染Open data 停車場資訊 及 剩餘位置資訊
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

        }

      } catch (error) {
        console.error(error)
      }
    }
    getParkingLots();
  }, [])
  // ---------------------------- GET data from Open Data ----------------------------
  
  if(!isLoaded) return <div>Loading...</div>
  return(
    <>
      <div className="map-div" data-mode="mobile">
        <ParkingList 
          mobileClass="top-search" 
          mode="mobile" 
          props={searchData} 
          aprops={availableData}
          // onLoad={onLoad} 
          inputValue={inputValue}
          isSearch={isSearch}
          onLocationChange={handleLocationChange}
          onLocationKeyDown={handleLocationKeyDown}
          onLocationSearch={handleLocationSearch}
          onCurrentLocationClick={handleCurrentLocationClick}
          onCurrentLotClick={handleCurrentLotClick}
          onAutocompleteLoad={handleAutocompleteLoad}
          onAutocompletePlaceChange={handleAutocompletePlaceChange}
          />
        <Map 
          coords={coords}
          currentPosition={currentPosition}
          onMapLoad={handleMapLoad}
          parkingData={parkingData}
          availableData={availableData}
          visibleLots={visibleLots}
          setVisibleLots={setVisibleLots}
        />
      </div>

      <div className="map-div" data-mode="desktop">
        <ParkingList 
          containerClass="side-menu" 
          mode="desktop" 
          props={searchData} 
          aprops={availableData}
          inputValue={inputValue}
          isSearch={isSearch}
          onLocationChange={handleLocationChange}
          onLocationKeyDown={handleLocationKeyDown}
          onLocationSearch={handleLocationSearch}
          onCurrentLocationClick={handleCurrentLocationClick}
          onCurrentLotClick={handleCurrentLotClick}
          onAutocompleteLoad={handleAutocompleteLoad}
          onAutocompletePlaceChange={handleAutocompletePlaceChange}
          />
        <Map 
          coords={coords}
          currentPosition={currentPosition}
          onMapLoad={handleMapLoad}
          parkingData={parkingData}
          availableData={availableData}
          visibleLots={visibleLots}
          setVisibleLots={setVisibleLots}
          />
      </div>
    </>
  )
}