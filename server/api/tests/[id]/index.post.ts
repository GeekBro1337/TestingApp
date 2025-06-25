import { promises as fs } from 'node:fs'
import { join } from 'node:path'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params!
  const body = await readBody(event)

  const file = join(process.cwd(), 'data', `${id}.json`)
  await fs.writeFile(file, JSON.stringify(body, null, 2), 'utf-8')
  return { ok: true }
})
