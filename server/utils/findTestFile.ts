import { promises as fs } from 'node:fs'
import { join } from 'node:path'

export async function findTestFile(id: string): Promise<string | null> {
  const root = join(process.cwd(), 'data')
  const dirs = await fs.readdir(root, { withFileTypes: true })
  for (const dirent of dirs) {
    if (!dirent.isDirectory()) continue
    const file = join(root, dirent.name, `${id}.json`)
    try {
      await fs.access(file)
      return file
    } catch {
      // ignore
    }
  }
  return null
}
