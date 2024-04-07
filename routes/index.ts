import express from 'express'
import trackingCoinRoutes from './TrackingCoint.routes'
import coinRoutes from './Coin.routes'
var router = express.Router()

router.use(trackingCoinRoutes)
router.use(coinRoutes)

export default router
