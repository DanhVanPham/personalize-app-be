import { getExchangeInfo } from '../utils/externals.api'

export async function fetchCoinInfo() {
  try {
    const data = await getExchangeInfo()
    const symbols = data.symbols

    // Extract symbols and names
    const coinInfo = symbols.map((symbol: any) => ({
      symbol: symbol.symbol,
      name: symbol.baseAsset,
    }))

    return coinInfo
  } catch (error) {
    throw new Error('Error fetching coin information')
  }
}
