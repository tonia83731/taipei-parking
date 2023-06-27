import Map from '../Components/Map/Map';
import { Container, Row, Col } from "react-bootstrap";

import ParkingLotInfo from '../Components/ParkingLotInfo/ParkingLotInfo';

export default function InfoPage(){
  return(
    <>
      <Map mode="mobile">
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
      </Map>
    </>
  )
}