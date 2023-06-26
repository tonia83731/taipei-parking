// import {GoogleMap, useLoadScript, Marker} from '@react-google-maps'
import Map from '../Components/Map/Map';
import SearchBar from "../Components/Search/SearchBar";
import ParkingList from '../Components/ParkingList/ParkingList';
import ParkingItem from "../Components/ParkingItem/ParkingItem";


import { Container, Row, Col } from "react-bootstrap";


export default function HomePage(){
  return(
    <Map>
      <SearchBar/>
      <ParkingList/>
    </Map>
  )
}