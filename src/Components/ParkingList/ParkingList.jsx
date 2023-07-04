import ParkingItem from "../ParkingItem/ParkingItem"
import SearchBar from "../Search/SearchBar";


export default function ParkingList({
  props, 
  aprops, 
  mode, 
  containerClass, 
  mobileClass, 
  inputValue, 
  isSearch, 
  onLocationChange, 
  onLocationSearch, 
  onCurrentLocationClick, 
  onCurrentLotClick, 
  onLocationKeyDown, 
  onAutocompleteLoad, 
  onAutocompletePlaceChange
}) {

  return(

     <div className={containerClass}>
        <SearchBar
          onAutocompleteLoad={onAutocompleteLoad}
          onAutocompletePlaceChange={onAutocompletePlaceChange}
          inputValue={inputValue} 
          onLocationChange={onLocationChange}
          onLocationKeyDown={onLocationKeyDown}
          onLocationSearch={onLocationSearch}
          onCurrentLocationClick={onCurrentLocationClick}
          />
        <section className="parking">
          <ul className="parking-list">
             {isSearch ? props.map((prop) => {
                return <ParkingItem prop={prop} key={prop.id} aprops={aprops} onCurrentLotClick={(id) => onCurrentLotClick?.(id)}/>
              }) : 
              <div className="no-info">尚未搜尋任何資料</div>
              }
          </ul>
        </section>
      </div>

    
  )
}