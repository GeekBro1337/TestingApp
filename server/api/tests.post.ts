import { defineEventHandler, readBody, createError } from 'h3';
import type { H3Event } from 'h3';
import { promises as fs } from 'fs';
import path from 'path';
import { testSchema } from './schema/test'; 

export default defineEventHandler(async (event: H3Event) => {
  if (event.method !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
  }

  // 1. Читаем тело запроса
  const body = await readBody<Record<string, unknown>>(event);
  // 2. Валидируем

  const parsed = testSchema.safeParse(body);
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation error',
      data: parsed.error.format(),
    });
  }
  
  const data = parsed.data; // тип гарантирован
  const dir = path.resolve('data');
  const filePath = path.join(dir, data.fileName);
  
  // 3. Создаём папку Data, если нужно
  await fs.mkdir(dir, { recursive: true });
  
  // 4. Сохраняем файл (если нужно, можно добавить проверку существования)
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  
  // 5. Отдаём ответ
  return { success: true, file: data.fileName };
});