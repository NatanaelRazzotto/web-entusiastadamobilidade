// app/api/watermark/route.js
import { NextResponse } from 'next/server';
import path from 'path';
import sharp from 'sharp';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('imageUrl');

  const handleUploadFromGoogleDrive = async (fileId) => {
    try {
      // 1. Baixar a imagem do Google Drive com a URL de download direto
      const response = await fetch(`https://drive.google.com/uc?export=download&id=${fileId}`);
      if (!response.ok) {
        throw new Error("Erro ao obter a imagem do Google Drive");
      }
      const arrayBuffer = await response.arrayBuffer();
      const imageBuffer = Buffer.from(arrayBuffer);  // Converte para buffer de imagem
  
      // 2. Usar o Sharp para converter a imagem para WebP
      const webpBuffer = await sharp(imageBuffer)
        .webp({ quality: 90 })  // Define a qualidade desejada para o WebP (pode ajustar conforme necessário)
        .toBuffer();
  
      // 3. Criar o FormData para o Cloudinary com a imagem no formato WebP
      const formData = new FormData();
      formData.append("file", new Blob([webpBuffer], { type: "image/webp" }), "Teste.webp"); // Definir tipo WebP
      formData.append("upload_preset", "ml_default");  
  
      // 4. Fazer o upload para o Cloudinary
      const cloudinaryResponse = await fetch("https://api.cloudinary.com/v1_1/dcixncjzw/image/upload", {
        method: "POST",
        body: formData,
      });
  
  
      if (!cloudinaryResponse.ok) {
        throw new Error("Erro ao fazer upload para o Cloudinary");
      }
  
      const cloudinaryData = await cloudinaryResponse.json();
      console.log("Imagem enviada para o Cloudinary com sucesso:", cloudinaryData);
  
      return cloudinaryData.secure_url;  // Retorna a URL da imagem no Cloudinary
  
    } catch (error) {
      console.error("Erro durante o processo:", error);
    }
  };
  
  
  

  if (!imageUrl) {
    return NextResponse.json({ message: 'Error fetching posts' }, { status: 500 });
  }

  try {
    // Fetch the original image
    const newURL = await handleUploadFromGoogleDrive(imageUrl)
    // Return the watermarked image
    return NextResponse.json({newCloudURL : newURL});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
