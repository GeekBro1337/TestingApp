import { promises as fs } from "node:fs";
import { join } from "node:path";

export default defineEventHandler(async (event) => {
  // DONE: читать id из параметров
  const { id } = event.context.params!;
  const body = await readBody(event); // читаем тело запроса

  // DONE: проверка что body соответствует типу test.d.ts Test (базовая валидация)
  if (!body.questions || !Array.isArray(body.questions)) {
    // валидация массива
    throw createError({ statusCode: 400, statusMessage: "Invalid payload" });
  }

  // запись полученного json файла в data
  const file = join(process.cwd(), "data", `${id}.json`);
  await fs.writeFile(file, JSON.stringify(body, null, 2), "utf-8");
  return { ok: true, saved: body.questions.length };
});

