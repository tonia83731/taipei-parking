import { ReactComponent as SearchIcon } from "../../Assets/SearchIcon.svg"
import { ReactComponent as TargetIcon } from "../../Assets/TargetIcon.svg"

export default function SearchBar({onLocationSearch, onLocationInput, showCurrentLocation}){
  return(
    <form action="" className="search" onSubmit={onLocationSearch}>
      <input type="text" className="search-input" placeholder="請輸入地址..." onChange={onLocationInput}/>
      <div className="btn-group">
        <button className="search-btn" data-mode="mobile"><SearchIcon/></button>
        <button className="current-location-btn" data-mode="mobile" onClick={showCurrentLocation}><TargetIcon/></button>
        <button className="search-btn" data-mode="desktop">搜尋</button>
        <button className="current-location-btn" data-mode="desktop" onClick={showCurrentLocation}>目前位置</button>
      </div>
    </form>
  )
}