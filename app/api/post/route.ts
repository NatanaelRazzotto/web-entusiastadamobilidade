// app/api/searchPosts/route.js
import { NextResponse } from 'next/server';
import { Post } from "@/app/lib/definitions";
import { fetchPostTitle } from '@/app/lib/data';


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
