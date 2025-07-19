import { promises as fs } from "node:fs";
import { createError } from "h3";
import { findTestFile } from "../../../utils/findTestFile";

export default defineEventHandler(async (event): Promise<Test.FormConfig> => {
  const { id } = event.context.params!;
  const path = await findTestFile(id);
  if (!path) {
    throw createError({ statusCode: 404, statusMessage: 'Test not found' });
  }
  const file = await fs.readFile(path, 'utf-8');
  return JSON.parse(file) as Test.FormConfig;
});