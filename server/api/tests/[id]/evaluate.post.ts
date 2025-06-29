import { promises as fs } from 'node:fs'
import { join } from 'node:path'
import type { H3Event } from 'h3'
import { evaluateAnswers } from '../../utils/evaluateAnswers'

export default defineEventHandler(async (event: H3Event) => {
  const { id } = event.context.params!
  const body = await readBody<Test.FormState>(event)

  const path = join(process.cwd(), 'data', `${id}.json`)
  const file = await fs.readFile(path, 'utf-8')
  const config = JSON.parse(file) as Test.FormConfig & {
    fields: Array<Test.FormField & { correct?: string[]; points?: number }>
  }

  return evaluateAnswers(config, body)
})
