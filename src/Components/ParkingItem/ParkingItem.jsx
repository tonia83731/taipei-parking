/* import svg icons here */
import { ReactComponent as ShareIcon } from "../../Assets/ShareIcon.svg"
import { ReactComponent as CheckIcon } from "../../Assets/CheckIcon.svg"
import { ReactComponent as LocationArrowIcon } from "../../Assets/LocationArrowIcon.svg"

/* import time convert here */
import SplitStartAndEnd from '../../Utilities/SplitStartAndEnd'


export default function ParkingItem(){

  return(
    <>
      <li className="parking-item">
        <div className="parking-info">
          <h5 className="name title">府前廣場地下停車場</h5>
          <p className="address">地址: 松壽路1號地下 <a href="" className="parking-detail"><ShareIcon/></a></p>
          <p className="service-time">營業時間: {SplitStartAndEnd("00:00:00~23:59:59")}</p>
          <ul className="space">
            <li className="car">汽車剩餘停車位: <span className="remain">0</span> / 2043</li>
            <li className="motor">機車剩餘停車位: <span className="remain">0</span> / 1360</li>
          </ul>
          <div className="other-info">
            <span className="pregnancy">
              <i className="icon"><CheckIcon/></i>
              婦幼車位
            </span>
            <span className="handicap">
              <i className="icon"><CheckIcon/></i>
              殘障車位
            </span>
          </div>
        </div>
        <div className="parking-link">
          <button className="location btn"><LocationArrowIcon/></button>
        </div>
      </li>
      <span className="break-line"></span>
    </>
  )
}