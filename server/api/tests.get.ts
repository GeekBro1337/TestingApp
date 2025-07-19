import { promises as fs } from 'node:fs'
import { join } from 'node:path'
import { getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  const category = getQuery(event).category as string | undefined
  const root = join(process.cwd(), 'data')

  const categories = category
    ? [category]
    : (await fs.readdir(root, { withFileTypes: true }))
        .filter((d) => d.isDirectory())
        .map((d) => d.name)

  const tests: Array<{ id: string; title: string; category: string }> = []

  for (const cat of categories) {
    const dir = join(root, cat)
    let files: string[] = []
    try {
      files = await fs.readdir(dir)
    } catch {
      continue
    }
    for (const file of files) {
      if (!file.endsWith('.json')) continue
      try {
        const content = await fs.readFile(join(dir, file), 'utf-8')
        const json = JSON.parse(content) as { title?: string }
        tests.push({
          id: file.replace(/\.json$/, ''),
          title: json.title || file,
          category: cat,
        })
      } catch {
        // ignore malformed json
      }
    }
  }

  return tests
})
