import { promises as fs } from 'node:fs'
import { join } from 'node:path'
import { evaluateAnswers } from '#imports'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params!
  const answers = await readBody<Test.FormState>(event)

  const file = join(process.cwd(), 'data', `${id}.json`)
  const json = JSON.parse(await fs.readFile(file, 'utf-8')) as Test.FormConfig & {
    fields: Array<Test.FormField & { correct?: string[]; points?: number }>
  }

  const result = evaluateAnswers(json, answers)
  return result
})
