// app/api/upload/route.js
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import FormData from 'form-data';
import fetch from 'node-fetch';
import path from 'path';

export async function POST(req) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ error: 'No token found' }, { status: 401 });
  }

  // Recebendo os arquivos da requisição
  const formData = await req.formData();
  const files = formData.getAll("files"); // Recebe um array de arquivos

  if (!files || files.length === 0) {
    return NextResponse.json({ error: 'Nenhuma imagem enviada' }, { status: 400 });
  }

  try {
    const uploadedUrls = [];

    for (const file of files) {
      const buffer = await file.arrayBuffer();
      const imageBuffer = Buffer.from(buffer);

      // Converter para WebP usando Sharp
      const webpBuffer = await sharp(imageBuffer)
        .webp({ quality: 90 }) // Define qualidade do WebP (ajuste conforme necessário)
        .toBuffer();

      // Criar FormData para envio ao Cloudinary
      const cloudinaryFormData = new FormData();
      
      const originalName = path.parse(file.name).name; 
      const newFileName = `${originalName}.webp`;
      
      cloudinaryFormData.append("file", webpBuffer, { filename: newFileName });
      cloudinaryFormData.append("upload_preset", "ml_default");

      // Enviar para o Cloudinary
      const cloudinaryResponse = await fetch("https://api.cloudinary.com/v1_1/dcixncjzw/image/upload", {
        method: "POST",
        body: cloudinaryFormData,
      });

      const cloudinaryData = await cloudinaryResponse.json();
      uploadedUrls.push(cloudinaryData.secure_url);
    }

    return NextResponse.json({ urls: uploadedUrls });
  } catch (error) {
    console.error("Erro ao processar imagens:", error);
    return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500 });
  }
}
