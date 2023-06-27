import ParkingItem from "../ParkingItem/ParkingItem"
import { ReactComponent as CrossIcon } from "../../Assets/CrossIcon.svg"


export default function ParkingList({mode}) {
  return(
    <section className="parking" data-mode={mode}>
      <button className="close-btn"><CrossIcon/></button>
      <ul className="parking-list">
        <ParkingItem/>
        <ParkingItem/>
        <ParkingItem/>
        <ParkingItem/>
        <ParkingItem/>
        <ParkingItem/>
      </ul>
    </section>
  )
}