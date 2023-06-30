import { ReactComponent as DotIcon } from "../../Assets/DotIcon.svg"
import { ReactComponent as BackArrowIcon } from "../../Assets/BackArrowIcon.svg"
import { ReactComponent as PregnancyIcon } from "../../Assets/PregnancyIcon.svg"
import { ReactComponent as DisableIcon } from "../../Assets/DisableIcon.svg"
import { ReactComponent as CrossIcon } from "../../Assets/CrossIcon.svg"

import SplitStartAndEnd from "../../Utilities/SplitStartAndEnd"

export default function ParkingLotInfo({mode, prop, aprops, onCloseInfoClick}){
  const aprop = aprops.find((aprop) => aprop.id === prop.id)
  return(
    <section className="parking-lot-info" data-mode={mode}>
      <button className="back-bar" onClick={onCloseInfoClick}>
        <span className="icon"><CrossIcon/></span>
        {/* <span className="back-bar-title">回到主頁</span> */}
      </button>
      <div className="info-area">
        <div className="info-header">
          <h5 className="info-name title">{prop.name}</h5>
          {/* <a href="" className="info-route-link">搜尋移動路線</a> */}
        </div>
        <div className="info-body">
          <div className="info-body-group">
            <i className="dot-icon">
              <DotIcon/>
            </i>
            <div className="tel info-body-detail">連絡電話: <a href={`tel:${prop.tel}`} className="tel-link">{prop.tel}</a></div>
          </div>
          <div className="info-body-group">
            <i className="dot-icon">
              <DotIcon/>
            </i>
            <div className="time info-body-detail">營業時間: <span>{prop.serviceTime}</span></div>
          </div>
          <div className="info-body-group">
            <i className="dot-icon">
              <DotIcon/>
            </i>
            <div className="price info-body-detail">停車費用: <span>{prop.payex}</span></div>
          </div>
        </div>  
        <div className="info-footer">
          <h5 className="title">車位使用情況</h5>
          <div className="info-available">
            <div className="available-status">
              <div className="available-title sub-title">
                一般汽車位
                {prop.Pregnancy_First > 0 && <i className="pregnancy-icon available-icon"><PregnancyIcon/></i>}
                {prop.Handicap_First > 0 &&<i className="disable-icon available-icon"><DisableIcon/></i>}
                <div className="available">
                  <div className="remain unavailable">餘0個車位</div>
                  <div className="total">共{prop.totalcar}個車位</div>
                </div>
              </div>
            </div>
            {/* <div className="available-status">
              <div className="available-title sub-title">
                一般機車位
                <div className="available">
                  <div className="remain">餘0個車位</div>
                  <div className="total">共1360個車位</div>
                </div>
              </div>
            </div> */}
            <div className="available-status">
              <div className="available-title sub-title">
                電動車充電站
                <div className="available">
                  <div className="remain">餘0個充電位</div>
                  <div className="total">共{prop.ChargingStation}個充電位</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}