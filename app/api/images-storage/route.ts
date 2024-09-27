// app/api/searchPosts/route.js
import { NextRequest, NextResponse } from 'next/server';
import { Post } from "@/app/lib/definitions";
import { createPost, fetchPostTitle, getUser } from '@/app/lib/data';
import { getToken } from 'next-auth/jwt';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

async function listImages(authClient: OAuth2Client): Promise<any> {
  const folderId = '12vbwVt0WI3gNnG_IN3YA1ZHXgVgBoMLy'; // Substitute pelo ID da pasta
  const drive = google.drive({ version: 'v3', auth: authClient });
  const res = await drive.files.list({
    q: `'${folderId}' in parents and mimeType contains 'image/'`,
    fields: 'nextPageToken, files(id, name)',
  });
  const files = res.data.files;
  if (files.length === 0) {
    console.log('No files found.');
    return [];
  }

  return files;
}


export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ error: 'No token found' }, { status: 401 });
  }


  const existingUser = await getUser(token.email.trim());

  if (!existingUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const accessToken = token.accessToken;

  const authClient = new google.auth.OAuth2();
  authClient.setCredentials({
    access_token: accessToken as string,
  });

  try {
    // Authorize and list images

    const files = await listImages(authClient);

    return NextResponse.json(files);
  } catch (error) {
    console.error('Error fetching posts or listing images:', error);
    return NextResponse.json({ message: 'Error fetching posts or listing images', error }, { status: 500 });
  }
}