import express from 'express'
import * as trackingCoinController from '../controllers/TrackingCoin.controller'
var router = express.Router()

router.post('/tracking-coin', trackingCoinController.addCoin)
router.put('/tracking-coin/:id', trackingCoinController.updateCoin)
router.delete('/tracking-coin/:id', trackingCoinController.deleteCoin)
router.get('/tracking-coin', trackingCoinController.getCoins)

export default router
