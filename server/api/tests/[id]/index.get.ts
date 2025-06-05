import { promises as fs } from 'node:fs'
import {join} from 'node:path'

export default defineEventHandler(async(event) => {
    const id = getRouterParam(event, 'id')
    console.log(id)
    const config = useRuntimeConfig(event)
    const testDir = config.test_directory
    const file = join(testDir,
        id + '.json')
    const json = await fs.readFile(file, 'utf-8')
    return JSON.parse(json)
})