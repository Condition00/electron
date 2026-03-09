import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export async function cropToSquare(filePath: string): Promise<string> {
  const processedDir = path.join(path.dirname(filePath), '../processed');
  
  if (!fs.existsSync(processedDir)) {
    fs.mkdirSync(processedDir, { recursive: true });
  }

  const filename = path.basename(filePath);
  const outputPath = path.join(processedDir, filename);

  // Get image metadata
  const metadata = await sharp(filePath).metadata();
  const size = Math.min(metadata.width || 800, metadata.height || 800);

  // Crop to square from center
  await sharp(filePath)
    .resize(size, size, {
      fit: 'cover',
      position: 'center'
    })
    .jpeg({ quality: 85 })
    .toFile(outputPath);

  // Delete original
  fs.unlinkSync(filePath);

  return outputPath;
}
