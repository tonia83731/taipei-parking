export default function TimeConvert (time) {
  const hours = time.getHours()
  let minutes = time.getMinutes()
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  return hours + ':' + minutes
}
