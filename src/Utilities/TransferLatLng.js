import twd97tolatlng from 'twd97-to-latlng'

// transfer TWD97 to WGS84

export default function TransferLatLng (x, y) {
  const { lat, lng } = twd97tolatlng(x, y)
  return { lat, lng }
}
