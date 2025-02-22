import { getUser } from '@/app/lib/data';
import { OperationalVehicle } from '@/app/lib/definitions';
import { extrairCaminhoImagem, ImageGenerate } from '@/app/lib/utilits/utils';
import { UploadDTO } from '@/app/ui/components/MultiImageUploader';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import path from 'path';
import sharp from 'sharp';

export async function POST(req) {

  const token = await getToken({ req });

  if (!token) {
    return new Response(JSON.stringify({ error: 'No token found' }), { status: 401 });
  }

   const existingUser = await getUser(token.email.trim());
  
    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    
  // Recebendo os arquivos da requisição
  const formData = await req.formData();
  const files = formData.getAll("files");


  if (!files || files.length === 0) {
    return new Response(JSON.stringify({ error: "Nenhuma imagem foi enviada" }), { status: 400 });
  }

  // Pega o JSON e faz o parsing
const jsonBlob = formData.get("json");
const jsonData : UploadDTO | null = jsonBlob ? JSON.parse(await jsonBlob.text()) : null;

  let operationalVehicle : OperationalVehicle = null
  if (jsonData.idvehicle)
  {
    const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL +`/operational-vehicle/${jsonData.idvehicle}`);
    operationalVehicle = await response.json();
  }


  const uploadedImages = [];

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    // Caminho da marca d'água
    const watermarkPath = path.resolve('./public/logovetorado25.png');

    // Obter dimensões da imagem original
    const originalMetadata = await sharp(imageBuffer).metadata();
    const watermarkMetadata = await sharp(watermarkPath).metadata();

    // Redimensionar a marca d'água para se ajustar à imagem
    const watermarkResized = await sharp(watermarkPath)
      .resize({
        width: Math.min(originalMetadata.width, watermarkMetadata.width),
        height: Math.min(originalMetadata.height, watermarkMetadata.height),
        fit: 'inside'
      })
      .png()
      .toBuffer();

    // Aplicar a marca d'água na imagem original e converter para WebP
    const watermarkedImageBuffer = await sharp(imageBuffer)
      .composite([{ input: watermarkResized, gravity: 'center', blend: 'overlay' }])
      .webp({ quality: 90 }) // Converte para WebP
      .toBuffer();

    // Converte Buffer para Blob (solução do erro)
    const webpBlob = new Blob([watermarkedImageBuffer], { type: "image/webp" });

    // Define um novo nome de arquivo corrigido
    const originalName = path.parse(file.name).name;
    const newFileName = `${originalName}.webp`;

    // Envia para Cloudinary
    const cloudinaryFormData = new FormData();
    if (operationalVehicle){
      cloudinaryFormData.append("file", webpBlob, operationalVehicle.serialNumber.toString()+'.webp');
    }
    else{
      cloudinaryFormData.append("file", webpBlob, newFileName);
    }
   
   
    cloudinaryFormData.append("upload_preset", "ml_default"); // Substitua pelo seu upload_preset

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dcixncjzw/image/upload", {
        method: "POST",
        body: cloudinaryFormData,
      });

      const data = await response.json();        

      let dataSpec : UploadDTO =  {
        idPost : jsonData.idPost,
        idvehicle : jsonData.idvehicle,
        nameFile: originalName,
        newPathURL: extrairCaminhoImagem( data.secure_url),
      }
      const newPost = await ImageGenerate(dataSpec,operationalVehicle,existingUser);

      uploadedImages.push(data.secure_url);
    } catch (error) {
      console.error("Erro no upload da imagem:", error);
      return new Response(JSON.stringify({ error: "Erro ao enviar imagem para o Cloudinary" }), { status: 500 });
    }
  }

  return new Response(JSON.stringify({ images: uploadedImages }), { status: 200 });
}
