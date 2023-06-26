export default function TimeConvert(time){
  let hours = time.getHours()
  let minutes = time.getMinutes()
  if(minutes < 10) {
    minutes = "0" + minutes
  }
  return hours + ":" + minutes
}