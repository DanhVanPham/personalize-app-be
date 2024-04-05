import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import trackingCoinRoutes from './routes/TrackingCoint.routes'

const app = express()
const PORT = 3000

app.use(cors({}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1.0', trackingCoinRoutes)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
