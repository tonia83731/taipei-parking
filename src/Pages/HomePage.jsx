// import {GoogleMap, useLoadScript, Marker} from '@react-google-maps'
import Map from '../Components/Map/Map';
import ParkingList from '../Components/ParkingList/ParkingList' ;



import {useState, useEffect, useMemo, useRef} from 'react'
import { GoogleMap, useLoadScript, MarkerF} from "@react-google-maps/api"


import { getParkingData, getAvailableSpace } from '../API/parking';


const libraries = ['places']

const dummyParkingData = [
  {
    id: "001",
    name: "府前廣場地下停車場",
    serviceTime: "00:00:00~23:59:59",
    totalcar: 2043,
    totalmotor: 1360,
    Pregnancy_First : 40,
    Handicap_First : 45,
  },
  {
    id: "002",
    name: "松壽廣場地下停車場",
    serviceTime: "00:00:00~23:59:59",
    totalcar: 455,
    totalmotor: 0,
    Pregnancy_First : 8,
    Handicap_First : 9,
  },
  {
    id: "003",
    name: "臺北市災害應變中心地下停車場",
    serviceTime: "00:00:00~23:59:59",
    totalcar: 169,
    totalmotor: 200,
    Pregnancy_First : 3,
    Handicap_First : 5,
  },
]

const dummyAvailableData=[
  {
    id: "001",
    availablecar: 261,
    availablemotor: 111
  },
  {
    id: "002",
    availablecar: 2,
    availablemotor: -9
  },
  {
    id: "003",
    availablecar: 9,
    availablemotor: 58
  },
]


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
  const [coords, setCoords] = useState(defaultCenter)
  // Get all parking lots info
  const [parkingData, setParkingData] = useState([])
  // Get available parking lots info
  const [availableData, setAvailableData] = useState([])
  // Get parking lots near center position (surroundings, search)
  const [visibleLots, setVisibleLosts] = useState([])

  // Parking icon user clicks (spot icon)
  const [selected, setSelected] = useState(null)

  const handleCurrentLocationClick = () => {

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
        <ParkingList mobileClass="top-search" mode="mobile" props={parkingData} aprops={availableData} onCurrentLocationClick={handleCurrentLocationClick}/>
        <Map/>
      </div>

      <div className="map-div" data-mode="desktop">
        <ParkingList containerClass="side-menu" mode="desktop" props={parkingData} aprops={availableData}/>
        <Map/>
      </div>
    </>
  )
}