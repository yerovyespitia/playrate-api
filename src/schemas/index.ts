import { z } from 'zod'

export const idSchema = z.string().uuid()

export const gameSchema = z.object({
  id: idSchema,
  title: z.string().min(3),
  wallpaper: z.string().url(),
  description: z.string().min(20),
  genre: z
    .array(z.enum(['Action', 'Adventure', 'TPS', 'Survival Horror', 'FPS']))
    .min(1),
  platforms: z.array(z.string()).min(1),
  releaseDate: z.date(),
  createdAt: z.date(),
  developers: z.array(z.string()).min(1),
  publishers: z.array(z.string()).min(1),
  rating: z.number().default(0),
  reviews: z.number().default(0),
})

export const postSchema = z.object({
  id: idSchema,
  title: z.string().min(3),
  description: z.string().min(3),
  tags: z.array(z.enum(['General', 'Bug'])).min(1),
  userId: idSchema,
  username: z.string().min(3),
  userPicture: z.string().url(),
  createdAt: z.date(),
})
