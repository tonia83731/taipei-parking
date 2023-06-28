import { ReactComponent as SearchIcon } from "../../Assets/SearchIcon.svg"
import { ReactComponent as TargetIcon } from "../../Assets/TargetIcon.svg"

export default function SearchBar({mode, onLocationSearch, onLocationInput, showCurrentLocation}){
  return(
    <>
      <h5 className="page-title title">可以停哪裡?</h5>
      <form action="" className="search" onSubmit={onLocationSearch}>
        <input type="text" className="search-input" placeholder="請輸入地址..." id="search-input" onChange={onLocationInput}/>
        <div className="btn-group">
          <button className="search-btn"><SearchIcon/></button>
          {/* <button className="search-btn" data-mode="desktop">搜尋</button> */}
          <label htmlFor="current-location-input" className="current-location">
            <input type="checkbox" className="current-location-input" id="current-location-input" />
            <span className="current-location-span">目前位置</span>
          </label>
        </div>
      </form>
    </>
  )
}