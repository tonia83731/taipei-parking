import TimeConvert from './TimeConvert'

export default function SplitStartAndEnd (time) {
  const splitTime = time.split('~')
  let start = '0000-01-01 ' + splitTime[0]
  start = new Date(start)
  let end = '0000-01-01 ' + splitTime[1]
  end = new Date(end)

  start = TimeConvert(start)
  end = TimeConvert(end)

  return start + ' ~ ' + end
}
