import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_DIR = path.join(__dirname, '../../uploads');

// Ensure upload directory exists
fs.mkdir(UPLOAD_DIR, { recursive: true }).catch(console.error);

export async function uploadToStorage(file: Express.Multer.File): Promise<string> {
  if (!file) {
    throw new Error('No file provided');
  }

  const fileName = `${uuidv4()}-${file.originalname}`;
  const filePath = path.join(UPLOAD_DIR, fileName);

  try {
    await fs.writeFile(filePath, file.buffer);
    return `/uploads/${fileName}`;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}