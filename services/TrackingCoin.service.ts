import { Prisma } from '@prisma/client'
import prisma from '../db/db.config'
import { STATUS_COIN } from '../utils/constants'
import { TrackingCoinForm } from '../utils/types.server'
import { getMarketPrice } from '../utils/externals.api'

export async function addCoin(coinData: TrackingCoinForm) {
  const newCoin = await prisma.trackingCoin.create({
    data: {
      digitalAsset: coinData.digitalAsset,
      detail: coinData.detail,
      price: coinData.price,
      quantity: coinData.quantity,
      img: coinData.img,
      status: STATUS_COIN.created,
    },
  })
  return newCoin
}

export async function getCoins(
  status: number,
  whereFilter?: Prisma.TrackingCoinWhereInput,
) {
  return prisma.trackingCoin.findMany({
    where: {
      status: { equals: status },
      ...whereFilter,
    },
  })
}

export async function deleteCoin(id: string) {
  const itemDeleted = await prisma.trackingCoin.delete({
    where: {
      id: id,
    },
  })

  return !!itemDeleted
}

export async function updateCoin(id: string, updateData: TrackingCoinForm) {
  try {
    // Find the coin by id
    const coin = await prisma.trackingCoin.findUnique({ where: { id: id } })

    // If coin not found, return an error
    if (!coin) {
      throw new Error('Tracking coin not found')
    }

    if (!coin.closedPrice && updateData?.status === STATUS_COIN.sold) {
      const priceSymbol = await getMarketPrice({
        symbol: coin.digitalAsset,
      })
      if (priceSymbol) updateData.closedPrice = Number(priceSymbol?.price)
    }

    // Update coin data with newData
    const updatedCoin = await prisma.trackingCoin.update({
      where: { id: id },
      data: updateData,
    })

    return updatedCoin
  } catch (error) {
    // Handle errors
    console.error('Error updating coin:', error)
    throw new Error('Failed to update coin')
  }
}
