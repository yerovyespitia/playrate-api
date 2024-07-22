import { Hono } from 'hono'
import { z } from 'zod'
import { idSchema, postSchema } from '../schemas'

type Post = z.infer<typeof postSchema>

const testPosts: Post[] = [
  {
    id: 'fd16c96a-3e63-4a62-8f50-0d27b6a2be7a',
    title: 'The Last of Us is a great game',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    tags: ['Fantasy', 'Adventure'],
    userId: 'fd18c86a-3e63-4a62-8f50-0d27b6a2be7a',
    username: 'placeholder',
    userPicture:
      'https://res.cloudinary.com/duyusab1p/image/upload/v1652041626/skyrim_tf2pba.png',
    createdAt: new Date(),
  },
  {
    id: 'fd16c96a-3e63-4a62-8f50-0d27b6a2be8a',
    title: 'The Last of Us is a bad game',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    tags: ['Adventure'],
    userId: 'fd18c86a-3e63-4a62-8f50-0d27b6a2be5a',
    username: 'placeholder 2',
    userPicture:
      'https://res.cloudinary.com/duyusab1p/image/upload/v1652041626/skyrim_tf2pba.png',
    createdAt: new Date(),
  },
]

export const postRoute = new Hono()
  .get('/', (c) => {
    // Get all posts
    return c.json({ posts: testPosts, length: testPosts.length })
  })
  .get('/:id', (c) => {
    // Get post by id
    try {
      const id = idSchema.parse(c.req.param('id'))
      const post = testPosts.find((p) => p.id === id)

      if (!post) {
        c.status(404)
        return c.json({ message: 'Post not found' })
      }

      c.status(201)
      return c.json(post)
    } catch (error) {
      c.status(404)
      return c.json({ message: 'Invalid post schema' })
    }
  })
