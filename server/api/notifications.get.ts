import { defineEventHandler, getHeader, createError } from 'h3'
import { prisma } from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const auth = getHeader(event, 'authorization')
  if (!auth || !auth.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
  const token = auth.slice('Bearer '.length)
  const notifications = await prisma.notification.findMany({
    where: { userToken: token },
    select: {
      id: true,
      title: true,
      username: true,
      message: true,
      scheduledAt: true,
    },
    orderBy: { scheduledAt: 'asc' },
  })
  return notifications
})
