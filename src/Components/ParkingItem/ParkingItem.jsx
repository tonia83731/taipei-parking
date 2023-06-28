/* import svg icons here */
// import { ReactComponent as ShareIcon } from "../../Assets/ShareIcon.svg"
import { ReactComponent as CheckIcon } from "../../Assets/CheckIcon.svg"
import { ReactComponent as LocationArrowIcon } from "../../Assets/LocationArrowIcon.svg"
import { ReactComponent as InfoIcon } from "../../Assets/InfoIcon.svg"

/* import time convert here */
import SplitStartAndEnd from '../../Utilities/SplitStartAndEnd'


// export default function ParkingItem(){

//   return(
//     <>
//       <li className="parking-item">
//         <div className="parking-info">
//           <h5 className="name title">府前廣場地下停車場</h5>
//           <p className="service-time">營業時間: {SplitStartAndEnd("00:00:00~23:59:59")}</p>
//           <ul className="space">
//             <li className="car">汽車剩餘停車位: <span className="remain">0</span> / 2043</li>
//             <li className="motor">機車剩餘停車位: <span className="remain">0</span> / 1360</li>
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
//         <div className="parking-link">
//           <button className="info btn"><InfoIcon/></button>
//           <button className="location btn"><LocationArrowIcon/></button>
//         </div>
//       </li>
//       <span className="break-line"></span>
//     </>
//   )
// }

export default function ParkingItem({prop}){
  let name = prop.name
  let serviceTime = prop.serviceTime

  let totalcar = prop.totalcar
  let totalmotor = prop.totalmotor
  let Pregnancy_First = prop.Pregnancy_First
  let Handicap_First = prop.Handicap_First

  // let availablecar = aProp.availablecar
  // let availablemotor = aProp.availablemotor

  return(
    <>
      <li className="parking-item">
        <div className="parking-info">
          <h5 className="name title">{name}</h5>
          {/* <p className="service-time">營業時間: {SplitStartAndEnd(serviceTime)}</p> */}
          <p className="address">地址: </p>
          <ul className="space">
            <li className="car">總停車位: <span>{totalcar}</span></li>
            <li className="car">剩餘空位: <span>0</span></li>
            {/* <li className="car">汽車剩餘停車位: <span className="remain">0</span> / {totalcar}</li>
            <li className="motor">機車剩餘停車位: <span className="remain">0</span> / {totalmotor}</li> */}
          </ul>
          <div className="other-info">
            {Pregnancy_First > 0 &&
              <span className="pregnancy">
                <i className="icon"><CheckIcon/></i>
                婦幼車位
              </span>
            }
            {
              Handicap_First > 0 && 
              <span className="handicap">
                <i className="icon"><CheckIcon/></i>
                殘障車位
              </span>
            }
          </div>
        </div>
        {/* <div className="parking-link">
          <button className="info btn"><InfoIcon/></button>
          <button className="location btn"><LocationArrowIcon/></button>
        </div> */}
      </li>
      <span className="break-line"></span>
    </>
  )
}