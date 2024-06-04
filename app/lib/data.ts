import prisma from '../lib/prisma';
import { 
  User
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
