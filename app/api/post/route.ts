// app/api/searchPosts/route.js
import { NextRequest, NextResponse } from 'next/server';
import { Post } from "@/app/lib/definitions";
import { createPost, fetchPostTitle, getUser } from '@/app/lib/data';
import { getToken } from 'next-auth/jwt';


export async function GET(request : any) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('searchTerm');

  try {
    const response : Post[] = await fetchPostTitle(searchTerm)   
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching posts', error }, { status: 500 });
  }
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
    console.log("🚀 ~ POST ~ body:", body)
    const newPost = await createPost(body,existingUser); // Função para criar um novo post no banco de dados

    return NextResponse.json({ message: 'Post created successfully', post: newPost }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating post', error }, { status: 500 });
  }
}
