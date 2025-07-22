import { promises as fs } from 'node:fs'
import { join } from 'node:path'

export default defineEventHandler(async () => {
  const dir = join(process.cwd(), 'data')
  const files = await fs.readdir(dir)
  const tests = [] as Array<{ id: string; title: string }>

  for (const file of files) {
    if (!file.endsWith('.json')) continue
    try {
      const content = await fs.readFile(join(dir, file), 'utf-8')
      const json = JSON.parse(content) as { title?: string }
      tests.push({ id: file.replace(/\.json$/, ''), title: json.title || file })
    } catch {
      // ignore malformed json
    }
  }

  return tests
})
