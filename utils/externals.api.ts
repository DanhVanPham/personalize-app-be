import axios from 'axios'

const API_BINANCE_URL = 'https://www.binance.com/api/v3'

axios.defaults.baseURL = API_BINANCE_URL

export const getMarketPrice = (params: {
  symbols?: string
  symbol?: string
}) => {
  return axios
    .get('/ticker/price', {
      params,
    })
    .then((res) => res.data)
    .catch((error) => console.log(error))
}
