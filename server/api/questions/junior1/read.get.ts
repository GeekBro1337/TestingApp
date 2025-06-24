import { promises as fs } from 'node:fs'
import {join} from 'node:path'

// DONE: Эндпоинт оставлен для совместимости
export default defineEventHandler(async() => {
  const file = join(process.cwd(),
    'data', 'junior1.json')
    const json = await fs.readFile(file, 'utf-8')
    return JSON.parse(json)
})
