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

export async function fetchPostID(idPost : string){
  try {
    const post: Post | null = await prisma.post.findFirst({
      where: {
        id: idPost,
      },
      include: {
        // images: {
        //   include: {
        //     vehicle: true,
        //   },
        // },
      },
    });

    return post;
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
        images : true,
        // images: {
        //   include: {
        //     vehicle: true,
        //   },
        // },
        videos : true
      },
    });

    return post;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchPostCategory(idCategory : number){
  try {
    const post: Post[] = await prisma.post.findMany({
      where: {
        category: idCategory,
      },
      include: {
        // images: {
        //   include: {
        //     vehicle: true,
        //   },
        // },
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
    const titlePostSearch = titlePost.trim(); // Remove espaços extras

    const post: Post[] = await prisma.post.findMany({
      where: {
        title: {
          contains: titlePostSearch,
          mode: 'insensitive', // Torna a comparação indiferente a maiúsculas/minúsculas
        }
      },
      take: 5, // Limita o número de resultados
      include: {
        // images: {
        //   include: {
        //     vehicle: true,
        //   },
        // },
      },
    });

    return post;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchIdPath(idurl : string){
  try {
    const image: Image | null = await prisma.image.findFirst({
      where: {
        pathURL: idurl,
      },      
    });

    return image;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function deleteIdPath(idurl : string){
  try {
    const image: Image | null = await prisma.image.delete({
      where: {
        id: idurl,
      },      
    });

    return image;
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
        // vehicle: {
        //   include: {
        //     bodywork: {include: {manufacturer: true}},
        //     powertrain: {include: {manufacturer: true}},
        //     operator : true
        //   },
        // },
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
    return null//throw new Error('Failed to fetch user.');
  }
}

export async function getUserPhone(phone: string): Promise<User | null> {
  console.log("🚀 ~ getUserPhone ~ phone:", phone)
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
            // image: {
            //   include: {
            //     vehicle: true,
            //   },
            // },
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
            // image: {
            //   include: {
            //     vehicle: true,
            //   },
            // },
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

    for (let index = 0; index < orderImages.length; index++) {
     
      const updatedOrderImage = await prisma.orderImage.update({
        where: {
          id : orderImages[index].id
        },
        data: {
          requestImage: orderImages[index].requestImage, // O novo valor para o campo description
        },
      });
      console.log("🚀 ~ alterOrderImageId ~ post:", updatedOrderImage)  
    }

        
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

export async function createPost(newPost : Post,existingUser : User){
 console.log("🚀 ~ createPost ~ existingUser:", existingUser)
 console.log("🚀 ~ createPost ~ newPost:", newPost.category ? newPost.category : 0)
 
  try {  
      const Post = await prisma.post.create({
        data: {
          namePost: newPost.namePost,
          title: newPost.title,
          content: newPost.content,
          coverURL: newPost.coverURL,
          published: newPost.published ? newPost.published : false,
          // newspaperColumnID?: string | null;
          authorId: existingUser.id,
          category:newPost.category ? newPost.category : 0,
          topNews: newPost.topNews,
          resume: newPost.resume,
          tagPost: newPost.tagPost,
          
          }
        }
      );
    
    return Post;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function createImage(orderImages : Image){
 
  try {  
      const Post = await prisma.image.create({
        data: {
          title : orderImages.title,
          pathURL : orderImages.pathURL,
          // posts: {
          //   connect: orderImages.posts.map(post => ({
          //     id: post.id, // ou qualquer outro campo único usado para identificar um Post
          //   })),
          // },
        }
      });
    
    return Post;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function updateImage(orderImages : Image){
 
  try {  
      const Post =  await prisma.image.update({
        where: { pathURL: orderImages.pathURL },
        data: {
          posts: {
            connect: orderImages.posts.map(post => ({
              id: post.id, // ou qualquer outro campo único usado para identificar um Post
            })),
          },
        },
      });
    
    return Post;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function createImages(orderImages: Image[]) {
  try {
    const data = orderImages.map(image => ({
      title: image.title,
      nameFile : image.nameFile,
      pathURL: image.pathURL,
      authorId: image.authorId,
      vehicleIDs : image.vehicleIDs
    }));

    const createdImages = await prisma.image.createMany({
      data: data,
      skipDuplicates: true, // Se você quiser ignorar duplicatas
    });

    return createdImages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function removeDuplicatePathURLs() {
  // Encontrar duplicatas
  const duplicates = await prisma.$queryRaw<
    { pathURL: string; count: number }[]
  >`SELECT pathURL, COUNT(*) as count
    FROM "Image"
    GROUP BY "pathURL"
    HAVING COUNT(*) > 1`;

  // for (const duplicate of duplicates) {
  console.log("🚀 ~ removeDuplicatePathURLs ~ duplicates:", duplicates)
  //   // Encontrar todas as imagens com o pathURL duplicado
  //   const images = await prisma.image.findMany({
  //     where: { pathURL: duplicate.pathURL },
  //   });

  //   // Manter apenas a primeira imagem e deletar o resto
  //   for (let i = 1; i < images.length; i++) {
  //     await prisma.image.delete({
  //       where: { id: images[i].id },
  //     });
  //   }
  // }
}





