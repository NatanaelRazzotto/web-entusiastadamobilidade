import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';
import { getUser } from '@/app/lib/data';

export async function GET(req: NextRequest) { // Use NextRequest aqui
  //console.log("🚀 ~ GET ~ req:", req)
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ error: 'No token found' }, { status: 401 });
  }

  const existingUser = await getUser(token.email.trim());

  if (!existingUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ role: existingUser.UserRole });
}
