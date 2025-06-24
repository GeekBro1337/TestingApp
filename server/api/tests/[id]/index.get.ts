import { promises as fs } from "node:fs";
import { join } from "node:path";

export default defineEventHandler(async (event): Promise<Test.FormConfig> => {
  // DONE: Фильтровать правильные ответы для неадминов по роли из cookie
  const { id } = event.context.params!;
  const path = join(process.cwd(), "data", `${id}.json`); // исправлен путь к файлу
  const file = await fs.readFile(path, "utf-8");
  const data = JSON.parse(file) as Test.FormConfig;

  const role = getCookie(event, "role") as UserRole | undefined;
  if (role !== "admin" && Array.isArray((data as any).questions)) {
    for (const q of (data as any).questions) {
      delete q.correct;
    }
  }

  return data;
});
