import { z } from 'zod'

export const idSchema = z.string().uuid()

export const gameSchema = z.object({
  id: idSchema,
  title: z.string().min(3),
  wallpaper: z.string().url(),
  description: z.string().min(20),
  genre: z.string().array().min(1),
  platforms: z.string().array().min(1),
  releaseDate: z.date(),
  createdAt: z.date(),
  developers: z.string().array().min(1),
  publishers: z.string().array().min(1),
  rating: z.number().default(0),
})
