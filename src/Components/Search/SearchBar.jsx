import { ReactComponent as SearchIcon } from "../../Assets/SearchIcon.svg"
import { Autocomplete } from "@react-google-maps/api"

export default function SearchBar({
  inputValue, 
  onLocationChange, 
  onLocationSearch,
  onCurrentLocationClick, 
  onLocationKeyDown, 
  onAutocompleteLoad, 
  onAutocompletePlaceChange
}){
  // const autoCompleteRef = useRef(null)
  const options = {
    componentRestrictions:{country: 'tw'},
  }

  return(
    <>
      <form action="" className="search">
        <Autocomplete
          options={options}
          onLoad={onAutocompleteLoad}
          onPlaceChange={onAutocompletePlaceChange}
        >
          <input type="text" className="search-input" placeholder="請輸入地址..." id="search-input" value={inputValue} onChange={onLocationChange} onKeyDown={onLocationKeyDown}/>
        </Autocomplete>
        <div className="btn-group">
          <button className="search-btn" onClick={onLocationSearch}><SearchIcon/></button>
          <button className="current-location" onClick={onCurrentLocationClick}>目前位置</button>
        </div>
      </form>
    </>
  )
}



// export default function SearchBar({mode, onLocationSearch, onLocationInput, showCurrentLocation}){
//   return(
//     <>
//       {/* <h5 className="page-title title">可以停哪裡?</h5> */}
//       <form action="" className="search" onSubmit={onLocationSearch}>
//         <input type="text" className="search-input" placeholder="請輸入地址..." id="search-input" onChange={onLocationInput}/>
//         <div className="btn-group">
//           <button className="search-btn"><SearchIcon/></button>
//           {/* <button className="search-btn" data-mode="desktop">搜尋</button> */}
//           <button className="current-location">目前位置</button>
//           {/* <label htmlFor="current-location-input" className="current-location">
//             <input type="checkbox" className="current-location-input" id="current-location-input" />
//             <span className="current-location-span">目前位置</span>
//           </label> */}
//         </div>
//       </form>
//     </>
//   )
// }