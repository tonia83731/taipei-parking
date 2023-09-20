/* eslint-disable key-spacing */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { ReactComponent as SearchIcon } from '../../Assets/SearchIcon.svg'
import { Autocomplete } from '@react-google-maps/api'
import styled from 'styled-components'

export default function SearchBar ({
  inputValue,
  onLocationChange,
  onLocationSearch,
  onCurrentLocationClick,
  onLocationKeyDown,
  onAutocompleteLoad,
  onAutocompletePlaceChange
}) {
  // const autoCompleteRef = useRef(null)
  const options = {
    componentRestrictions:{ country: 'tw' }
  }

  return (
    <>
      <SearchForm>
        <Autocomplete
          options={options}
          onLoad={onAutocompleteLoad}
          onPlaceChange={onAutocompletePlaceChange}
        >
          <SearchInput
            type="text"
            placeholder="請輸入地址..."
            id="search-input"
            value={inputValue}
            onChange={onLocationChange}
            onKeyDown={onLocationKeyDown}
          ></SearchInput>
        </Autocomplete>
        <SearchBtnGroup>
          <SearchBtn onClick={onLocationSearch}>
            <SearchIcon />
          </SearchBtn>
          <CurrentLocationBtn onClick={onCurrentLocationClick}>
            目前位置
          </CurrentLocationBtn>
        </SearchBtnGroup>
      </SearchForm>
    </>
  )
}
const SearchForm = styled.form`
  z-index: 1;
  position: fixed;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 45px;
  line-height: 45px;
  padding: 0 1em;
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-gap: 0.5em;
  align-items: center;
  @media screen and (min-width: 768px) {
    all: unset;
    display: grid;
    grid-template-columns: 3fr 1.5fr;
    grid-gap: 1em;
    height: 55px;
    line-height: 55px;
    margin-top: 1.5em;
    padding: 0 1em;
  }
`
const SearchInput = styled.input`
  height: 45px;
  line-height: 45px;
  width: 100%;
  border: none;
  border-radius: 10px;
  padding: 0 1em;
  box-shadow: var(--box-shadow);
  font-size: 16px;
  &::placeholder {
    font-size: 12px;
  }
  @media screen and (min-width: 768px) {
    height: 55px;
    line-height: 55px;
    font-size: 18px;
    &::placeholder {
      font-size: 14px;
    }
  }
`
const SearchBtnGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 0.25em;
  @media screen and (min-width: 450px) {
    grid-template-columns: 1fr 2fr;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1.5fr;
    height: 55px;
    line-height: 55px;
  }
`
const SearchBtn = styled.button`
  padding: 0.4em 0.5em;
  background-color: #94d2a7;
  font-size: 14px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 10px;
  &:hover {
    background-color: #81c995;
  }
  svg {
    width: auto;
    height: 20px;
    path{
      fill: #FFFFFF;
    }
  }
`
const CurrentLocationBtn = styled.button`
  display: block;
  height: 45px;
  line-height: 45px;
  min-width: 80px;
  text-align: center;
  background-color: #b4cfbd;
  color: #ffffff;
  font-size: 14px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 10px;

  &:hover {
    background-color: #81c995;
  }
  @media screen and (min-width: 768px) {
    height: 55px;
    line-height: 55px;
  }
`
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
