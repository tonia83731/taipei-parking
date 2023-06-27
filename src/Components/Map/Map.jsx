


export default function Map({children, mode}){
  return(
    <div className="map-bg" style={{backgroundImage: `url('https://picsum.photos/300/200')`}} data-mode={mode}>
      {children}
    </div>
  )
}