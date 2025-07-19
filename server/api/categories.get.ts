import { promises as fs } from 'node:fs'
import { join } from 'node:path'

export default defineEventHandler(async () => {
  const dir = join(process.cwd(), 'data')
  const file = join(dir, 'categories.json')
  try {
    const data = await fs.readFile(file, 'utf-8')
    return JSON.parse(data) as string[]
  } catch {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    const cats = entries.filter(e => e.isDirectory()).map(e => e.name)
    await fs.writeFile(file, JSON.stringify(cats, null, 2), 'utf-8')
    return cats
  }
})
