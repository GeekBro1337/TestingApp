import { promises as fs } from 'node:fs'
import { join } from 'node:path'
import { readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const { name } = await readBody<{ name: string }>(event)
  if (!name) {
    throw createError({ statusCode: 400, statusMessage: 'Name required' })
  }
  const dir = join(process.cwd(), 'data')
  const file = join(dir, 'categories.json')
  let categories: string[] = []
  try {
    categories = JSON.parse(await fs.readFile(file, 'utf-8'))
  } catch {}
  if (!categories.includes(name)) {
    categories.push(name)
    await fs.writeFile(file, JSON.stringify(categories, null, 2), 'utf-8')
    await fs.mkdir(join(dir, name), { recursive: true })
  }
  return { success: true }
})
