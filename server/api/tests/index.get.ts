import { promises as fs } from 'node:fs'
import { join } from 'node:path'

export default defineEventHandler(async () => {
  const dir = join(process.cwd(), 'data')
  const files = await fs.readdir(dir)
  const result = [] as Array<{ id: string; title: string }>

  for (const file of files) {
    if (!file.endsWith('.json')) continue
    const content = await fs.readFile(join(dir, file), 'utf-8')
    try {
      const parsed = JSON.parse(content) as { title?: string }
      result.push({ id: file.replace(/\.json$/, ''), title: parsed.title || file })
    } catch {
      result.push({ id: file.replace(/\.json$/, ''), title: file })
    }
  }

  return result
})
