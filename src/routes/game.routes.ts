import { Hono } from 'hono'
import { z } from 'zod'
import { gameSchema, idSchema } from '../schemas'

type Game = z.infer<typeof gameSchema>

const testGames: Game[] = [
  {
    id: 'fd16c96a-3e63-4a62-8f50-0d27b6a2be7a',
    title: 'The Last of Us',
    wallpaper:
      'https://res.cloudinary.com/duyusab1p/image/upload/v1652041626/skyrim_tf2pba.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    genre: ['Action', 'Adventure'],
    platforms: ['Playstation 3', 'Playstation 4', 'PC'],
    releaseDate: new Date(),
    createdAt: new Date(),
    developers: ['Naughty Dog'],
    publishers: ['Sony Computer', 'Entertainment'],
    rating: 0,
  },
  {
    id: 'fd16c96a-3e63-4a62-8f50-0d27b6a2be9a',
    title: 'The Last of Us Part II',
    wallpaper:
      'https://res.cloudinary.com/duyusab1p/image/upload/v1652041626/skyrim_tf2pba.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    genre: ['Action'],
    platforms: ['Playstation 5', 'PC'],
    releaseDate: new Date(),
    createdAt: new Date(),
    developers: ['Naughty Dog'],
    publishers: ['Sony Computer', 'Entertainment'],
    rating: 0,
  },
]

export const gameRoute = new Hono()
  .get('/', (c) => {
    // Get all games
    return c.json({ games: testGames, length: testGames.length })
  })
  .get('/:id', (c) => {
    // Get game by id
    try {
      const id = idSchema.parse(c.req.param('id'))
      const game = testGames.find((g) => g.id === id)

      if (!game) {
        c.status(404)
        return c.json({ message: 'Game not found' })
      }

      c.status(201)
      return c.json(game)
    } catch (error) {
      c.status(404)
      return c.json({ message: 'Invalid game schema' })
    }
  })
