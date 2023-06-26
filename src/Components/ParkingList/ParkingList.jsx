import ParkingItem from "../ParkingItem/ParkingItem"
import { ReactComponent as CrossIcon } from "../../Assets/CrossIcon.svg"


export default function ParkingList() {
  return(
    <div className="parking">
      <button className="close-btn"><CrossIcon/></button>
      <ul className="parking-list">
        <ParkingItem/>
        <ParkingItem/>
        <ParkingItem/>
        <ParkingItem/>
        <ParkingItem/>
        <ParkingItem/>
      </ul>
    </div>
  )
}