import Map from '../Components/Map/Map';
import { Container, Row, Col } from "react-bootstrap";

import MapTest from '../Components/Map/Maptest';

import ParkingLotInfo from '../Components/ParkingLotInfo/ParkingLotInfo';

export default function InfoPage(){
  return(
    <>
      <div className="info-container" data-mode="mobile">
        <ParkingLotInfo/>
      </div>
      <MapTest mode="desktop">
        <div className="side-menu">
          <ParkingLotInfo/>
        </div>
      </MapTest>
      
      
      {/* <Map mode="mobile">
        <Container>
          <Row>
            <Col md={12}>
              <ParkingLotInfo/>
            </Col>
          </Row>
        </Container>
      </Map>
      <Map mode="desktop">
        <div className="side-page">
          <ParkingLotInfo/>
        </div>
      </Map> */}
    </>
  )
}