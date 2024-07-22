import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { gameRoute } from './routes/game.routes'
import { postRoute } from './routes/forum.routes'

const app = new Hono()

app.get('*', logger())

app.basePath('/api').route('/game', gameRoute).route('/forum', postRoute)

export default app
