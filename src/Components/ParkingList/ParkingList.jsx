import ParkingItem from "../ParkingItem/ParkingItem"
import { ReactComponent as CrossIcon } from "../../Assets/CrossIcon.svg"


export default function ParkingList({props, mode}) {
  return(
    <section className="parking" data-mode={mode}>
      <button className="close-btn"><CrossIcon/></button>
      <ul className="parking-list">
        {
          props.map(prop => {
            return <ParkingItem prop={prop} key={prop.id}/>
          })
        }
        {/* <ParkingItem/>
        <ParkingItem/>
        <ParkingItem/>
        <ParkingItem/>
        <ParkingItem/>
        <ParkingItem/> */}
      </ul>
    </section>
  )
}