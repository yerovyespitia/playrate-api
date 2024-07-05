import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { gameRoute } from './routes/game.routes'

const app = new Hono()

app.get('*', logger())

app.basePath('/api').route('/game', gameRoute)

export default app
