"use server"
import prisma from '../lib/prisma';
import { 
  Post,
  User,
  Image,
  BookOrder,
  OrderImage
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

export async function fetchPostTitle(titlePost : string){
  try {
    const post: Post[] = await prisma.post.findMany({
      where: {
        title: {
          contains : titlePost,
        }
      },
      take : 5,
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

export async function fetchIdImage(idImage : string){
  try {
    const image: Image | null = await prisma.image.findFirst({
      where: {
        id: idImage,
      },
      include: {       
        vehicle: {
          include: {
            bodywork: {include: {manufacturer: true}},
            powertrain: {include: {manufacturer: true}},
            operator : true
          },
        },
      },
    });

    return image;
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

export async function getUserPhone(phone: string): Promise<User | null> {
  try {
    const user: User | null = await prisma.user.findUnique({
      where: { phone : phone},
    });

    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchBookId(idPost : string){
  try {
    const post: BookOrder | null = await prisma.bookOrder.findFirst({
      where: {
        id: idPost,
      },
      include: {
        requestingUser : true, 
        orderImages : {
          include : {
            image: {
              include: {
                vehicle: true,
              },
            },
          }
        }
        
      },
    });

    return post;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchBookUserId(idUser : string){
  try {
    const post: BookOrder[] | null = await prisma.bookOrder.findMany({
      where: {
        requestingUserId: idUser,
      },
      include: {
        requestingUser : true, 
        orderImages : {
          include : {
            image: {
              include: {
                vehicle: true,
              },
            },
          }
        }
        
      },
    });

    return post;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function alterOrderImageId(orderImages : OrderImage[]){
 
  try {
    
    console.log("🚀 ~ alterOrderImageId ~ orderImage:", orderImages[0])
    const updatedOrderImage = await prisma.orderImage.update({
      where: {
        id : orderImages[0].id
      },
      data: {
        requestImage: orderImages[0].requestImage, // O novo valor para o campo description
      },
    });
    console.log("🚀 ~ alterOrderImageId ~ post:", updatedOrderImage)

    const OrderBook = await prisma.bookOrder.findFirst({
      where: {
        id : orderImages[0].bookOrderId
      },
      include : {orderImages : true},
    });

    let selectValue = 0
    let costValue = 0
    let unitaryValue = 10.00

    OrderBook.orderImages.forEach(element => {
      if (element.requestImage === true) selectValue = selectValue + 1; 
    });

    costValue = unitaryValue * selectValue

    const updatedBookOrder = await prisma.bookOrder.update({
      where: {
        id : OrderBook.id
      },
      data: {
        request: costValue > 0 ? true : false, // O novo valor para o campo description
        costValue : costValue,
        unit : selectValue
      },
    });
    
    return "post";
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

