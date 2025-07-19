import { promises as fs } from 'node:fs'
import { join } from 'node:path'
import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const { order } = await readBody<{ order: string[] }>(event)
  const file = join(process.cwd(), 'data', 'categories.json')
  await fs.writeFile(file, JSON.stringify(order, null, 2), 'utf-8')
  return { success: true }
})
