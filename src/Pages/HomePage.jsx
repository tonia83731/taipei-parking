/* eslint-disable react/react-in-jsx-scope */
import Map from '../Components/Map/Map'
import ParkingList from '../Components/ParkingList/ParkingList'
import ParkingLotInfo from '../Components/ParkingLotInfo/ParkingLotInfo'
import DirectionModal from '../Components/Modal/DirectionModal'
import { getParkingData, getAvailableSpace } from '../API/parking'
import TransferLatLng from '../Utilities/TransferLatLng'

import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useLoadScript } from '@react-google-maps/api'
import Swal from 'sweetalert2'

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
  const autoCompleteRef = useRef(null)

  // Get center position
  // eslint-disable-next-line no-unused-vars
  const [coords, setCoords] = useState(defaultCenter)
  // Get user position
  const [currentPosition, setCurrentPosition] = useState(defaultCenter)
  const [enterUserPosition, setUserPosition] = useState('')
  const [directions, setDirections] = useState('')
  const [destination, setDestination] = useState('')
  const [duration, setDuration] = useState('')
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
  const [parkingInfo, setParkingInfo] = useState([])

  // map 狀態 及 顯示資料
  // map 是 google maps 的物件 設置state的變化去追蹤他的變化
  const [map, setMap] = useState(null)
  // const [isLoading, setIsLoading] = useState(false)

  // search input
  const [inputValue, setInputValue] = useState('')
  // user click search button or not
  const [isSearch, setIsSearch] = useState(false)
  // parking lot info toggle
  const [isToggle, setIsToggle] = useState(false)

  const [directionToggle, setDirectionToggle] = useState(false)

  // 地圖加載後進行初始化操作
  const onLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  // ---------------------------- Search Area Break -----------------------------
  const handleAutocompleteLoad = (autoComplete) => {
    autoCompleteRef.current = autoComplete
  }
  const codeAddress = () => {
    if (inputValue.trim() === '') return
    const geocoder = new window.google.maps.Geocoder()
    geocoder.geocode({ address: inputValue }, (results, status) => {
      if (status === 'OK') {
        map?.setCenter(results[0].geometry.location)
      } else {
        console.log('error')
        console.log(`Geocode + ${status}`)
      }
    })
  }
  const handleAutocompletePlaceChange = () => {
    if (autoCompleteRef.current !== null) {
      const place = autoCompleteRef?.current.getPlace()
      if (place && place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat()
        const lng = place.geometry.location.lng()
        setInputValue(place.name)
        map?.setCenter({ lat, lng })
      } else {
        codeAddress()
      }
    }
  }
  // 輸入搜尋關鍵字
  const handleLocationChange = (e) => {
    setInputValue(e?.target.value)
  }

  // 按搜尋鍵搜尋輸入關鍵字結果 "Enter"
  const handleLocationKeyDown = (e) => {
    if (inputValue === '') return
    if (e.key === 'Enter') {
      const value = inputValue.trim().toLowerCase()
      const searchParkingLot = parkingData.filter((lots) => {
        return lots.name.includes(value) || lots.area.includes(value)
      })
      handleAutocompletePlaceChange()
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
    if (inputValue === '') return
    const value = inputValue.trim().toLowerCase()
    const searchParkingLot = parkingData.filter((lots) => {
      return lots.name.includes(value) || lots.area.includes(value)
    })
    // console.log(searchParkingLot)
    // console.log(searchParkingLot)
    handleAutocompletePlaceChange()
    setSearchData(searchParkingLot)
    setIsSearch(true)
    setInputValue('')
  }

  // ---------------------------- Search Area Break -----------------------------

  // 搜尋目前使用者位置 及 周邊停車場空位
  const handleCurrentLocationClick = (e) => {
    e.preventDefault()
    const map = mapRef.current
    // 使用者目前位置經緯度
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        map?.setCenter(userPosition)
        // 設定地圖中心位置 default 為台北市中心
        setCurrentPosition(userPosition)
        // const radius = 1 //(約280公尺)
        // const userLat = position.coords.latitude
        // const userLng = position.coords.longitude
        // const northEast = new window.google.maps.LatLng(
        //   userLat,
        //   userLng
        // )
        // const southWest = new window.google.maps.LatLng(
        //   userLat,
        //   userLng
        // )
        // const bounds = new window.google.maps.LatLngBounds(
        //   southWest, northEast
        // )
        // // console.log(bounds)

        // // 將需要看到的區域經緯度放到該函式，就能將視角移到指定區域參數
        // map.fitBounds(bounds)
        // const visibleLots = parkingData.filter((parkingLot) => {
        //   const {lat, lng} = TransferLatLng(parkingLot.tw97x, parkingLot.tw97y)
        //   return bounds.contains(new window.google.maps.LatLng(lat,lng))
        // })
        // console.log(visibleLots)
        // setVisibleLots(visibleLots)
      },
      () => {
        Swal.fire({
          position: 'middle',
          text: '允許存取使用者位置來使用此功能',
          icon: 'warning',
          // timer: 1000,
          showCloseButton: true,
          showConfirmButton: false
        })
      }
    )
  }

  // 搜尋後按下ParkingItem => location btn 將目前位置顯示於地圖中心
  // 搜尋後按下ParkingItem => location btn 顯示目前停車場資訊
  const handleCurrentLotClick = (id) => {
    const parkingLot = parkingData?.find((lot) => lot.id === id)
    if (parkingLot === undefined) {
      Swal.fire({
        position: 'middle',
        title: '無法獲得此停車場資料!',
        text: '請稍後再嘗試!',
        icon: 'warning',
        timer: 1000,
        showCloseButton: true,
        showConfirmButton: false
      })
      return
    }
    const x = parkingLot.tw97x
    const y = parkingLot.tw97y
    const parkinglotLatLng = TransferLatLng(x, y)
    // setCurrentPosition(parkinglotLatLng)
    // console.log(parkinglotLatLng)
    // console.log(enterUserPosition)
    const service = new window.google.maps.DirectionsService()
    service.route(
      {
        origin: enterUserPosition,
        destination: parkinglotLatLng,
        travelMode: window.google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === 'OK' && result) {
          setDirections(result)
          // console.log(result)
          const destination = result.routes[0].legs[0].distance.text
          const duration = result.routes[0].legs[0].duration.text
          setDestination(destination)
          setDuration(duration)
        }
      }
    )
    // console.log(directions)
    // const distance = leg.distance.text
    // const duration = leg.duration.text
    // setDestination(distance)
    // setDuration(duration)
    setDirectionToggle(true)
  }

  const handleCurrentLotInfoClick = (id) => {
    console.log(id)
    const parkingLot = parkingData?.find((lot) => lot.id === id)
    console.log(parkingLot)
    setIsToggle(true)
    setParkingInfo(parkingLot)
  }
  const handleBackInfoClick = () => {
    setIsToggle(false)
  }

  const handleCloseDirectionToggle = () => {
    setDirectionToggle(false)
  }
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
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // setLatitude(position.coords.latitude);
        // setLongtitude(position.coords.longitude);
        const initialUserCenter = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        // console.log(initialUserCenter)
        setUserPosition(initialUserCenter)
        // console.log(userCenter);
      },
      // 若未開啟位置追蹤，則跳出提示'允許存取使用者位置來使用此功能'
      () => {
        Swal.fire({
          position: 'middle',
          text: '允許存取使用者位置來使用此功能',
          icon: 'warning',
          showCloseButton: true,
          showConfirmButton: false
        })
      }
    )
  }, [])
  // ---------------------------- GET data from Open Data ----------------------------

  if (!isLoaded) return <div>Loading...</div>
  return (
    <>
      <div className="map-div">
        <ParkingList
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
        >
          {isToggle && (
            <ParkingLotInfo
              onBackInfoClick={handleBackInfoClick}
              prop={parkingInfo}
              aprops={availableData}
            ></ParkingLotInfo>
          )}
        </ParkingList>
        {directionToggle && (
          <DirectionModal
            onCloseDirectionModal={handleCloseDirectionToggle}
            destination={destination}
            duration={duration}
          />
        )}
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
          directions={directions}
        />
      </div>
    </>
  )
}
