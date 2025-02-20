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

  
  const body = await req.json(); // Parse o corpo da requisição (os dados do novo post)

  if (!body.imagesForRemove) {
    
    return NextResponse.json({ message: 'Error fetching posts' }, { status: 500 });
  }

  try {

  
    return NextResponse.json({ result : "r"});
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
