import { promises as fs } from 'node:fs'
import { join } from 'node:path'
import { getCookie } from 'h3'

export default defineEventHandler(async (event): Promise<Test.FormConfig> => {
  const { id } = event.context.params!
  const path = join(process.cwd(), 'data', `${id}.json`)
  const file = await fs.readFile(path, 'utf-8')
  const json = JSON.parse(file) as Test.FormConfig & { fields: Array<Test.FormField & { correct?: string[]; points?: number }> }

  // Remove correct answers for non-admin users based on cookie role
  const role = getCookie(event, 'role')
  if (role !== 'admin') {
    json.fields = json.fields.map(({ correct, points, ...rest }) => ({ ...rest }))
  }

  return json as Test.FormConfig
})
