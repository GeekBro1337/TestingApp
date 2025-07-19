import { promises as fs } from 'node:fs'
import type { H3Event } from 'h3'
import { readBody, createError } from 'h3'
import { evaluateAnswers } from '../../../utils/evaluateAnswers'
import { findTestFile } from '../../../utils/findTestFile'

export default defineEventHandler(async (event: H3Event) => {
  const { id } = event.context.params!
  const body = await readBody<Test.FormState>(event)

  const path = await findTestFile(id)
  if (!path) {
    throw createError({ statusCode: 404, statusMessage: 'Test not found' })
  }
  const file = await fs.readFile(path, 'utf-8')
  const config = JSON.parse(file) as Test.FormConfig & {
    fields: Array<Test.FormField & { correct?: string[]; points?: number }>
  }

  return evaluateAnswers(config, body)
})
