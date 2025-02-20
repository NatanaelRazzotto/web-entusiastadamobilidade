// app/api/watermark/route.js
import { NextResponse } from 'next/server';
import path from 'path';
import sharp from 'sharp';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('imageUrl');

  if (!imageUrl) {
    return NextResponse.json({ message: 'Error fetching posts' }, { status: 500 });
  }

  try {
    // Fetch the original image
    const response = await fetch(`https://drive.google.com/uc?export=download&id=${imageUrl}`);
    const arrayBuffer = await response.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    // Path to the watermark image
    const watermarkPath = path.resolve('./public/logovetorado25.png');

    // Get metadata of the original image
    const originalMetadata = await sharp(imageBuffer).metadata();

    // Get metadata of the watermark image
    const watermarkMetadata = await sharp(watermarkPath).metadata();

    console.log('Original Image Dimensions:', originalMetadata.width, originalMetadata.height);
    console.log('Watermark Dimensions:', watermarkMetadata.width, watermarkMetadata.height);

    // Resize the watermark to fit within the dimensions of the original image
    const watermarkResized = await sharp(watermarkPath)
      .resize({
        width: Math.min(originalMetadata.width, watermarkMetadata.width),
        height: Math.min(originalMetadata.height, watermarkMetadata.height),
        fit: 'inside'
      })
      .png()
      .toBuffer();

    console.log('Resized Watermark Dimensions:', await sharp(watermarkResized).metadata());

    // Apply watermark to the original image
    const watermarkedImageBuffer = await sharp(imageBuffer)
      .composite([{ input: watermarkResized, gravity: 'center', blend: 'overlay' }])
      .toBuffer();

    // Return the watermarked image
    return new NextResponse(watermarkedImageBuffer, {
      headers: {
        'Content-Type': 'image/png',
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
