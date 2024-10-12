// app/api/searchPosts/route.js
import { NextRequest, NextResponse } from 'next/server';
import { Image, Post } from "@/app/lib/definitions";
import { createImages, createPost, deleteIdPath, fetchIdPath, fetchPostID, fetchPostTitle, getUser, updateImage } from '@/app/lib/data';
import { getToken } from 'next-auth/jwt';

function generatedMetaTitle (vehicle : any , existingUser: any){
  return vehicle.operator.name + " "+vehicle.serialNumber + " Onibus - Autoria de " + existingUser.name + " - Entusiasta da Mobilidade"
}

async function ImageGenerate(body : any,existingUser: any){
console.log("🚀 ~ ImageGenerate ~ body:", body)

  let post = await fetchPostID(body.post);
  console.log("🚀 ~ listImages ~ post:", post);

  const imagesToCreate: Image[] = [];
 // const aToCreate: Image[] = [];

 const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL +`/operational-vehicle/${body.Vehicle}`);
 const data = await response.json();
 console.log("🚀 ~ ImageGenerate ~ data:", data)

  for (const file of body.images) {
    console.log(`${file.name} (${file.id})`);

    let imagePath = await fetchIdPath(file.id);

    let image: Image = {
      id: file.id,
      title: generatedMetaTitle(data,existingUser),
      nameFile : file.name,
      published: false,
      pathURL: file.id.toString(), // Certifique-se de que pathURL é uma string
      authorId: existingUser.id,
      vehicleIDs : [data.id.toString()],
      posts: [
        post
      ],
    };

    if (!imagePath) {      
   //   console.log("🚀 nao existe");
      imagesToCreate.push(image);
       // Atualize cada imagem com os posts    
    } else {
   //  await deleteIdPath(imagePath.id);
     console.log("🚀 ja existe");
      //aToCreate.push(image);
      // // console.log("🚀 ~ ImageGenerate ~ updateImage:")
       await updateImage(image);
    }
      
  }

  console.log("🚀 ~ ImageGenerate ~ imagesToCreate:", imagesToCreate)

  if (imagesToCreate.length > 0) {
    
    let listI = await createImages(imagesToCreate);
    console.log("🚀 ~ listImages ~ listI:", listI)
    for (const image of imagesToCreate) {
      await updateImage(image);
    }
  }

  return true;
}


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

  try {
    
    const body = await req.json(); // Parse o corpo da requisição (os dados do novo post)
    const newPost = await ImageGenerate(body,existingUser); // Função para criar um novo post no banco de dados

    return NextResponse.json({ message: 'Post created successfully', post: newPost }, { status: 201 });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error)
    return NextResponse.json({ message: 'Error creating post', error }, { status: 500 });
  }
}
