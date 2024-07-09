import prisma from '../lib/prisma';
import { 
  Post,
  User,
  Image
} from './definitions';
import { formatCurrency } from './utils';

export async function fetchPost() {
  try {
    const feed = await prisma.post.findMany({
      where: { published: true },
      include: {
        author: {
          select: { name: true },
        },
      },
    });
    return feed;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchPostName(namePost : string){
  try {
    const post: Post | null = await prisma.post.findFirst({
      where: {
        namePost: namePost,
      },
      include: {
        images: {
          include: {
            vehicle: true,
          },
        },
      },
    });

    return post;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function getUser(email: string): Promise<User | null> {
  try {
    const user: User | null = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

