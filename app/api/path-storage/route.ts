// app/api/searchPosts/route.js
import { NextRequest, NextResponse } from 'next/server';
import { Post } from "@/app/lib/definitions";
import { createPost, fetchPostTitle, getUser } from '@/app/lib/data';
import { getToken } from 'next-auth/jwt';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

async function listFolders(authClient: OAuth2Client): Promise<any> {
  const folderId = '1t2MYzYPNFbsyHNm1jLwIBAGhFCktmLaD'; // ID da pasta
  const drive = google.drive({ version: 'v3', auth: authClient });

  const res = await drive.files.list({
    q: `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.folder'`,
    fields: 'nextPageToken, files(id, name)',
  });

  const folders = res.data.files;

  if (!folders || folders.length === 0) {
    console.log('No folders found.');
    return [];
  }

  return folders;
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

    const files = await listFolders(authClient);

    return NextResponse.json(files);
  } catch (error) {
    console.error('Error fetching posts or listing images:', error);
    return NextResponse.json({ message: 'Error fetching posts or listing images', error }, { status: 500 });
  }
}