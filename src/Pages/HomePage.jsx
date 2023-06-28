// import {GoogleMap, useLoadScript, Marker} from '@react-google-maps'
import Map from '../Components/Map/Map';
import SearchBar from "../Components/Search/SearchBar";
import ParkingList from '../Components/ParkingList/ParkingList';

import MapTest from '../Components/Map/Maptest';


import {useState, useEffect} from 'react'
import { getParkingData, getAvailableSpace } from '../API/parking';


import { Container, Row, Col } from "react-bootstrap";

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




  const [parkingData, setParkingData] = useState(dummyParkingData)
  const [availableData, setAvailableData] = useState(dummyAvailableData)

  
  
  useEffect(() => {
    const getParkingDataAsync = async() => {
      try{
        const data = await getParkingData()
        // let parks = data.data.park
        // setParkingData(parks.map((park) => ({...park})))
      } catch(error){
        console.error(error)
      }
    }
    const getAvailableSpaceAsync = async() => {
      try{
        const data = await getAvailableSpace()
        let availables = data.data.park
        setAvailableData(availables.map((available) => ({...available})))
      } catch(error){
        console.error(error)
      }
    }
    getParkingDataAsync()
    getAvailableSpaceAsync()
  }, [])

  return(
    <>
      {/* <MapTest/> */}
      <MapTest mode="mobile">
        <div className="top-search">
          <SearchBar/>
        </div>
        <ParkingList mode="mobile" props={parkingData}/>
      </MapTest>
      <MapTest mode="desktop">
        <div className="side-menu">
          <SearchBar/>
          <ParkingList mode="desktop" props={parkingData}/>
        </div>
      </MapTest>
    </>
  )
}