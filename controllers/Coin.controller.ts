import { Request, Response } from 'express'
import * as coinService from '../services/Coin.service'

export async function getInfoCoins(req: Request, res: Response) {
  try {
    const coins = await coinService.fetchCoinInfo()
    return res.json({ status: 200, data: coins })
  } catch (error) {
    console.error('Error fetching coins:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
