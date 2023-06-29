// import {useState, useEffect, useRef, useMemo, useCallback} from "react"

// import SearchBar from "./Search/SearchBar";
// import ParkingList from './ParkingList/ParkingList';



// export default function Places({containerClass, mobileClass, mode, onCurrentLocationClick, props, availableProps}){
//   const [inputValue, setInputValue] = useState('')

//   const [isSearch, setIsSearch] = useState(false)

//   const handleLocationChange = (value) => {
//     setInputValue(value)
//   }
//   const handleLocationSearch = () => {
//     if(inputValue.length === 0) return

//     setIsSearch(true)

//   }
//   return(
//     <>
//       <div className={containerClass}>
//         <div className={mobileClass}>
//           <SearchBar 
//             inputValue={inputValue} 
//             onLocationChange={handleLocationChange}
//             onLocationSearch={handleLocationSearch}
//             onCurrentLocationClick={onCurrentLocationClick}
//             />
//         </div>
//         <ParkingList mode={mode} props={props} availableProps={availableProps}/>
//         {/* {isSearch ? <ParkingList mode={mode} props={props} availableProps={availableProps}/> : <div className="no-info">尚未搜尋任何資料</div>} */}
//       </div>
//     </>
//   )
// }