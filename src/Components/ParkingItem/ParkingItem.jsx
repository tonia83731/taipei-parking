import { ReactComponent as CheckIcon } from "../../Assets/CheckIcon.svg"
import { ReactComponent as LocationArrowIcon } from "../../Assets/LocationArrowIcon.svg"

export default function ParkingItem({
  prop, 
  aprops, 
  onCurrentLotClick, 
}){
  const aprop = aprops.find((aprop) => aprop.id === prop.id)
  return(
    <>
      <li className="parking-item">
        <div className="parking-info">
          <h5 className="name title">{prop.name}</h5>
          <p className="address">地址: {prop.address}</p>
          <ul className="space">
            <li className="car">總停車位: <span>{prop.totalcar}</span></li>
            <li className="car">剩餘空位: <span>{aprop.availablecar <= 0 ? "0" : aprop.availablecar}</span></li>
          </ul>
          <div className="other-info">
            {
              prop.Pregnancy_First > 0 &&
              <span className="pregnancy">
                <i className="icon"><CheckIcon/></i>
                婦幼車位
              </span>
            }
            {
              prop.Handicap_First > 0 && 
              <span className="handicap">
                <i className="icon"><CheckIcon/></i>
                殘障車位
              </span>
            }
          </div>
        </div>
        <div className="parking-link">
          {/* <button className="info btn" onClick={onCurrentInfoClick} data-id={prop.id}><InfoIcon/></button> */}
          <button className="location btn" onClick={() => {onCurrentLotClick?.(prop.id)}} data-id={prop.id}><LocationArrowIcon/></button>
        </div>
      </li>
      <span className="break-line"></span>
    </>
  )
}



// export default function ParkingItem(){

//   return(
//     <>
//       <li className="parking-item">
//         <div className="parking-info">
//           <h5 className="name title">府前廣場地下停車場</h5>
//           {/* <p className="service-time">營業時間: {SplitStartAndEnd("00:00:00~23:59:59")}</p> */}
//           <p className="address">地址: </p>
//            <ul className="space">
//             <li className="car">總停車位: <span>1234</span></li>
//             <li className="car">剩餘空位: <span>0</span></li>
//           </ul>
//           <div className="other-info">
//             <span className="pregnancy">
//               <i className="icon"><CheckIcon/></i>
//               婦幼車位
//             </span>
//             <span className="handicap">
//               <i className="icon"><CheckIcon/></i>
//               殘障車位
//             </span>
//           </div>
//         </div>
//         {/* <div className="parking-link">
//           <button className="info btn"><InfoIcon/></button>
//           <button className="location btn"><LocationArrowIcon/></button>
//         </div> */}
//       </li>
//       <span className="break-line"></span>
//     </>
//   )
// }