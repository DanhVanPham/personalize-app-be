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

if (process.env.BUILD_MODE === 'production') {
  app.listen(3000, () => {
    console.log(`Production App listening on port ${3000}`)
  })
} else {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
  })
}
