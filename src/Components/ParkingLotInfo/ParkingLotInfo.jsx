import { ReactComponent as DotIcon } from "../../Assets/DotIcon.svg"
import { ReactComponent as BackArrowIcon } from "../../Assets/BackArrowIcon.svg"
import { ReactComponent as PregnancyIcon } from "../../Assets/PregnancyIcon.svg"
import { ReactComponent as DisableIcon } from "../../Assets/DisableIcon.svg"

export default function ParkingLotInfo({mode}){
  return(
    <section className="parking-lot-info" data-mode={mode}>
      <a href="/" className="back-bar">
        <span className="icon"><BackArrowIcon/></span>
        <span className="back-bar-title">回到主頁</span>
      </a>
      <div className="info-area">
        <div className="info-header">
          <h5 className="info-name title">府前廣場地下停車場</h5>
          <a href="" className="info-route-link">搜尋移動路線</a>
        </div>
        <div className="info-body">
          <div className="info-body-group">
            <i className="dot-icon">
              <DotIcon/>
            </i>
            <div className="tel info-body-detail">連絡電話: <a href="tel:02-2722-0152" className="tel-link">02-2722-0152</a></div>
          </div>
          <div className="info-body-group">
            <i className="dot-icon">
              <DotIcon/>
            </i>
            <div className="time info-body-detail">營業時間: <span>00:00:00~23:59:59</span></div>
          </div>
          <div className="info-body-group">
            <i className="dot-icon">
              <DotIcon/>
            </i>
            <div className="price info-body-detail">停車費用: <span>配合2/1-2/19台灣燈會期間費率調整為，周一至周五17-22時，週六至周日與行政機關放假之紀念日與民俗日10時至22時，調整小型車費率，計時60元，其餘時段維持原費率。小型車全日月票4200元，夜間月票1000元(限周一至周五19-8，及周六、日與行政機關放假之紀念日、民俗日)，小型車計時30元(9-18)，夜間計時10元(18-9)；機車計時10元(當日當次上限20元)，機車月票300元。</span></div>
          </div>
        </div>  
        <div className="info-footer">
          <h5 className="title">車位使用情況</h5>
          <div className="info-available">
            <div className="available-status">
              <div className="available-title sub-title">
                一般汽車位
                <i className="pregnancy-icon available-icon"><PregnancyIcon/></i>
                <i className="disable-icon available-icon"><DisableIcon/></i>
                <div className="available">
                  <div className="remain unavailable">餘0個車位</div>
                  <div className="total">共2043個車位</div>
                </div>
              </div>
            </div>
            <div className="available-status">
              <div className="available-title sub-title">
                一般機車位
                <div className="available">
                  <div className="remain">餘0個車位</div>
                  <div className="total">共1360個車位</div>
                </div>
              </div>
            </div>
            <div className="available-status">
              <div className="available-title sub-title">
                電動車充電站
                <div className="available">
                  <div className="remain">餘0個充電位</div>
                  <div className="total">共40個充電位</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}