import express from 'express'
import * as coinController from '../controllers/Coin.controller'
var router = express.Router()

router.get('/exchangeInfo', coinController.getInfoCoins)

export default router
