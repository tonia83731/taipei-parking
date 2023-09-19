import axios from 'axios'

const baseUrl = 'https://tcgbusfs.blob.core.windows.net/blobtcmsv'

export const getParkingData = async () => {
  try {
    const res = await axios.get(`${baseUrl}/TCMSV_alldesc.json`)
    return res.data.data
  } catch (error) {
    console.error('[Get parking info failed]:', error)
  }
}

export const getAvailableSpace = async () => {
  try {
    const res = await axios.get(`${baseUrl}/TCMSV_allavailable.json`)
    return res.data.data
  } catch (error) {
    console.error('[Get space available failed]:', error)
  }
}
