// app/api/searchPosts/route.js
import { NextRequest, NextResponse } from 'next/server';
import { Image, Post } from "@/app/lib/definitions";
import { createImages, createPost, deleteIdPath, fetchIdPath, fetchPostID, fetchPostTitle, getUser, updateImage } from '@/app/lib/data';
import { getToken } from 'next-auth/jwt';
import { ImageGenerate } from '@/app/lib/utilits/utils';


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
    const newPost = ""//await ImageGenerate(body,existingUser); // Função para criar um novo post no banco de dados

    return NextResponse.json({ message: 'Post created successfully', post: newPost }, { status: 201 });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error)
    return NextResponse.json({ message: 'Error creating post', error }, { status: 500 });
  }
}
