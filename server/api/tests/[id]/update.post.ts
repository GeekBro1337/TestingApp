import { defineEventHandler, readBody, createError } from 'h3';
import type { H3Event } from 'h3';
import { promises as fs } from 'node:fs';
import { join, dirname } from 'node:path';
import { findTestFile } from '../../utils/findTestFile';
import { testSchema } from '../../schema/test';

export default defineEventHandler(async (event: H3Event) => {
  if (event.method !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
  }

  const { id } = event.context.params as { id: string };
  const body = await readBody<Record<string, unknown>>(event);

  // Always enforce original file name
  const parsed = testSchema.safeParse({
    ...body,
    fileName: `${id}.json`,
    category: (body as any).category,
  });
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation error',
      data: parsed.error.format(),
    });
  }

  const existing = await findTestFile(id)
  const filePath = existing || join(process.cwd(), 'data', parsed.data.category, `${id}.json`)
  await fs.mkdir(dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, JSON.stringify(parsed.data, null, 2), 'utf8')

  return { success: true, file: `${id}.json` };
});
