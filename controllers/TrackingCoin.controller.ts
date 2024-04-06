import { Request, Response } from 'express'
import * as trackingCoinService from '../services/TrackingCoin.service'
import { getMarketPrice } from '../utils/externals.api'
import { STATUS_COIN } from '../utils/constants'

export async function addCoin(req: Request, res: Response) {
  const data = req.body
  const trackingCoin = await trackingCoinService.addCoin(data)

  return res.json({
    status: 200,
    data: trackingCoin,
    message: 'Tracking Coin Added successfully!',
  })
}

export async function getCoins(req: Request, res: Response) {
  const status = req.query?.status || STATUS_COIN.created
  let trackingCoins = await trackingCoinService.getCoins(Number(status))

  const symbols = trackingCoins?.reduce((result, currCoin) => {
    if (!result.includes(currCoin.digitalAsset as never))
      result.push(currCoin.digitalAsset as never)
    return result
  }, [])

  if (Number(status) === STATUS_COIN.created) {
    const priceSymbols = await getMarketPrice({
      symbols: JSON.stringify(symbols),
    })

    if (priceSymbols) {
      trackingCoins = trackingCoins.map((coin) => ({
        ...coin,
        currentPrice:
          priceSymbols?.find((item: any) => item?.symbol === coin.digitalAsset)
            ?.price || 0,
      }))
    }
  }

  return res.json({ status: 200, data: trackingCoins })
}

export async function deleteCoin(req: Request, res: Response) {
  const itemDeleted = await trackingCoinService.deleteCoin(
    String(req.params?.id),
  )

  if (!!itemDeleted)
    return res.json({ status: 200, message: 'Delete successfully' })
  return res.json({ status: 400, message: 'Delete failed!' })
}

export async function updateCoin(req: Request, res: Response) {
  const id = String(req.params?.id)

  if (!id) return res.json({ status: 400, message: 'Id is not valid!' })

  const updateData = req.body
  console.log({ updateData })
  const updatedData = await trackingCoinService.updateCoin(id, updateData)
  if (!!updatedData)
    return res.json({ status: 200, message: 'Update successfully' })
  return res.json({ status: 400, message: 'Update failed!' })
}
