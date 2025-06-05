import { promises as fs } from "node:fs";
import { join } from "node:path";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params!;
  const path = join(process.cwd(), "data", `${id}.json`); // исправлен путь к файлу
  const file = await fs.readFile(path, "utf-8");
  return JSON.parse(file);
});
