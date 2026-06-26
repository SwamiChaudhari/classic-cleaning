import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "src", "data");

// Ensure data directory exists
async function ensureDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // already exists
  }
}

// Read JSON data file, fallback to config if not exists
export async function readData<T>(filename: string, fallback: T): Promise<T> {
  await ensureDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content) as T;
  } catch {
    return fallback;
  }
}

// Write JSON data file
export async function writeData<T>(filename: string, data: T): Promise<void> {
  await ensureDir();
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}
