import { lstat as lstatCallback } from "fs";
import { join } from "path";
import { promisify } from "util";

const lstat = promisify(lstatCallback);

export async function getFileType(dir: string, name?: string) {
  // Check if it's a file.
  const fullPath = name ? join(dir, name) : dir;
  try {
    const stat = await lstat(fullPath);
    return stat.isFile() ? "file" : "dir";
  } catch {
    return "na";
  }
}
