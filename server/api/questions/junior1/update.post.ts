import { promises as fs } from 'node:fs'
import {join} from 'node:path'

export default defineEventHandler(async(event) => {
    const body = await readBody(event) // читаем тело запроса

    if (!body.questions || !Array.isArray(body.questions)){ // валидация массива
        throw createError({ statusCode: 400, statusMessage: 'Invalid payload'})
    } 

    // запись полученого json файла в data
    const file = join(process.cwd(), 'data', 'junior1.json')
    await fs.writeFile(file, JSON.stringify(body, null, 2), 'utf-8')
    return { ok: true, saved: body.questions.length}
})