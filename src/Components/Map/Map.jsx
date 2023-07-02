import {useState, useEffect, useRef, useMemo, useCallback} from "react"
import { GoogleMap, useLoadScript, MarkerF} from "@react-google-maps/api"
import { MarkerClusterer, SuperClusterAlgorithm } from '@googlemaps/markerclusterer';

import TransferLatLng from "../../Utilities/TransferLatLng"


import { getParkingData, getAvailableSpace } from '../../API/parking';

import Swal from 'sweetalert2'

// import SearchBar from "../Search/SearchBar";
// import ParkingList from '../ParkingList/ParkingList';

export default function Map({
  map, 
  currentPosition, 
  parkingData,
  availableData, 
  onMapLoad, 
  onParkingMarkerClick,
  visibleLots,
  setVisibleLots
}){
  // const [inputValue, setInputValue] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongtitude] = useState('')

  
  // 當地圖停止托拽時為true
  const [isMapIdle, setIsMapIdle] = useState(false)
  const [currentInfoWindow, setCurrentInfoWindow] = useState(null)

  // // Parking icon user clicks (spot icon)
  const [selected, setSelected] = useState(null)

  // ******** where should be put// need to pass to Parents
  // const [visibleLots, setVisibleLosts] = useState([])

  // const [allMarker, setAllMarker] = useState([])

  // Get all parking lots info
  // const [parkingData, setParkingData] = useState([])
  // Get available parking lots info
  // const [availableData, setAvailableData] = useState([])

  

  // const [currentPosition, setCurrentPosition] = useState(defaultCenter)

  // const mapRef = useRef()
  // Generate the location once (when user first landing)
  // const defaultCenter = useMemo(() =>( {
  //   lat: 25.033671,
  //   lng: 121.564427
  // }), [])
  const userCenter = {
    lat: latitude, lng: longitude
  }
  // Disable icons that are not use
  const options = useMemo(() => ({
    disableDefaultUI: true,
    clickableIcons: false,
    zoomControl: true,
    mapTypeControl: false,
  }), [])

  const createMarkers = (visibleLots) => {
    const markers = visibleLots?.map((parkingLot) => {
      const {lat, lng} = TransferLatLng(parkingLot.tw97x, parkingLot.tw97y)
      const selectedMarker = parkingLot
      const marker = new window.google.maps.Marker({
        key: parkingLot.id,
        position: {lat, lng},
        icon: {
          url: require('../../Assets/ParkingIcon.svg').default,
          scaledSize: new window.google.maps.Size(40,40),
          origin: new window.google.maps.Point(0,0),
          anchor: new window.google.maps.Point(15,15),
          zIndex: 1,
        },
      })
      const infoWindow = new window.google.maps.InfoWindow()
      marker.addListener('click', () => {
        const selectedLot = availableData?.find((space) => {
          if(space.id === selectedMarker.id){
            return space
          }
        })
        infoWindow.setContent(`
          <div className="modal">
            <div className="modal-body">
              <h5 className="modal-title">${selectedMarker.name}</h5>
              <p className="total">總停車位${selectedMarker.totalcar}個車位</p>
              <p className="remain">目前剩餘${selectedLot.availablecar}個車位</p>
              <p className="payex">
                (${selectedMarker.payex})
              </p>
            </div>
            <div className="modal-triangle-down"></div>
          </div>
        `)
        infoWindow.open(map, marker)
        setCurrentInfoWindow(infoWindow)
        setSelected(selectedMarker)
      })
      return marker
    })
    return markers
  }
  // render open data here 
  // useEffect(() => {
  //   const getParkingLots = async() => {
  //     try{
  //       const lotsInfo = await getParkingData()
  //       const availableLots = await getAvailableSpace()

  //       if(lotsInfo && availableLots) {
  //         const availableId = new Set(availableLots.park.map((lot) => lot.id))
  //         const parkingLots = lotsInfo.park.filter((parkLot) => {
  //           return parkLot.totalcar > 0 && availableId.has(parkLot.id)
  //         })

          
  //         // let availableSpace = availableLots.park
  //         setParkingData(parkingLots.map((parking) => ({...parking})))  
  //         // setAvailableData(availableSpace)
  //         // console.log(parkingData)
  //         // console.log(availableData)
  //       }

  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   getParkingLots();
  // }, [])



  // show user current position (icon is a car)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
      // console.log(position.coords)
      // console.log(position.coords.latitude)
      // console.log(position.coords.longitude)
      setLatitude(position.coords.latitude)
      setLongtitude(position.coords.longitude)
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
  }, [])

  useEffect(() => {
    if(map) {
      // 監聽地圖是否停止拖拽
      const listener = map.addListener('idle', () => {
        setIsMapIdle(true)
      });
      return () => {
        window.google.maps.event.removeListener(listener);
      }
    }
  }, [map])

  useEffect(() => {
    if(isMapIdle) {
      // 地圖停止拖拽 顯示以下資料
      const bounds = map.getBounds() // getBounds()返回當前視窗的東北/西南 經緯度
      const visibleLots = parkingData?.filter((parkingLot) => {
        const {lat, lng} = TransferLatLng(parkingLot.tw97x, parkingLot.tw97y)
        return bounds.contains(new window.google.maps.LatLng(lat, lng))
      })
      const markers = createMarkers(visibleLots)
      new MarkerClusterer({
        map,
        markers,
        algorithm: new SuperClusterAlgorithm({radius: 300}),
      })

      setVisibleLots(visibleLots)
      setIsMapIdle(false)
    }
  }, [isMapIdle])

  // const onLoad = useCallback(map => (mapRef.current = map), [])

  return(
    <>
    <GoogleMap
        zoom={18}
        center={currentPosition}
        mapContainerClassName="map-container"
        options={options}
        onLoad={onMapLoad}
      >
        <MarkerF 
          position={userCenter}
          icon={{
            url: require('../../Assets/CarIcon.svg').default,
          }}
        />
        {/* {
        parkingData.map((parking) => {
          const position = TransferLatLng(parking.tw97x, parking.tw97y)
          return (
            <MarkerF 
              key={parking.id} 
              position={position}
              onClick={onParkingMarkerClick}
            />
          )})
        } */}
        
      </GoogleMap>
      
    
    </>
  )
}
