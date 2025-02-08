// app/api/searchPosts/route.js
import { NextRequest, NextResponse } from 'next/server';
import { Post } from "@/app/lib/definitions";
import { createPost, fetchPostID, fetchPostTitle, getUser } from '@/app/lib/data';
import { getToken } from 'next-auth/jwt';


export async function GET(request : any) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('id');

  try {
    const response : Post = await fetchPostID(searchTerm)   
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching posts', error }, { status: 500 });
  }
}

