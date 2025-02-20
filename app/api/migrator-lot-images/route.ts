// app/api/watermark/route.js
import { fetchIdsImages, getUser } from '@/app/lib/data';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import sharp from 'sharp';

export async function POST(req: NextRequest) { // Use NextRequest aqui
  //console.log("🚀 ~ GET ~ req:", req)
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ error: 'No token found' }, { status: 401 });
  }

  const existingUser = await getUser(token.email.trim());

  if (!existingUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const handleUploadFromGoogleDrive = async (file) => {

    try {
      // 1. Baixar a imagem do Google Drive
      const response = await fetch(
        `https://drive.google.com/uc?export=download&id=${file.pathURL}`
      );
      if (!response.ok) {
        throw new Error(`Erro ao obter imagem: ${file.id}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      const imageBuffer = Buffer.from(arrayBuffer);

      // 2. Converter para WebP
      const webpBuffer = await sharp(imageBuffer)
        .webp({ quality: 90 })
        .toBuffer();

      // 3. Criar FormData e enviar para o Cloudinary
      const formData = new FormData();
      formData.append(
        "file",
        new Blob([webpBuffer], { type: "image/webp" }),
        "Teste.webp"
      );
      formData.append("upload_preset", "ml_default");

      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dcixncjzw/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!cloudinaryResponse.ok) {
        throw new Error(`Erro ao enviar imagem ${file.id} para o Cloudinary`);
      }

      const cloudinaryData = await cloudinaryResponse.json();
      const imageUrl = cloudinaryData.secure_url;

      // 4. Atualizar o banco de dados usando Prisma
      // await prisma.post.update({
      //   where: { fileId }, // Certifique-se de que `fileId` existe no seu modelo
      //   data: { imageUrl },
      // });

      return { fileId: file, url: imageUrl };
    } catch (error) {
      console.error(`Erro ao processar imagem ${file}:`, error);
      return { fileId: file, error: error.message };
    }
  };

  const body = await req.json(); // Parse o corpo da requisição (os dados do novo post)

  if (!body.imagesForRemove) {
    
    return NextResponse.json({ message: 'Error fetching posts' }, { status: 500 });
  }

  try {

    const fileIds = await fetchIdsImages(body.imagesForRemove)
    console.log("🚀 ~ POST ~ fileIds:", fileIds)
    // Processa todas as imagens em paralelo e atualiza no banco de dados
    const results = await Promise.all(fileIds.map(handleUploadFromGoogleDrive));
    return NextResponse.json({ results});
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro interno no servidor." },
      { status: 500 }
    );
  }

  
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('imageUrl');

  
}
