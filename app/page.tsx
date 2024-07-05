import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import { PrismaClient } from '@prisma/client';

import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';

import { useRouter } from 'next/router';
import CardPost from './ui/portal/card';

import { Post } from './lib/definitions';

import CardNotice from './ui/portal/cardNotice';
 
 

export default async function Page() { 
  const prisma = new PrismaClient();

  const postDefault : Post = {
    id : "1",
    authorId : "1",
    published : true,
    dateCreate : new Date(),
    category : 1,
    namePost : "Há um post no forno!",
    title : "Há um post no forno!",
    content : "Há um post no forno!",
    coverURL : "https://scontent.fbfh21-1.fna.fbcdn.net/v/t39.30808-6/449788802_970883095044934_821926565128646951_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFDDmiqafbxpVD6jUaFPYiY32MZ8mXSF5nfYxnyZdIXmZYTNJYSSOQdl7c0E4W-j-dMObejVT4CP3pj3YzE6RAN&_nc_ohc=sfIWoLs3fTwQ7kNvgE6GkXw&_nc_ht=scontent.fbfh21-1.fna&cb_e2o_trans=t&gid=AbxQ4N_BBK6XAJJqPmizI_x&oh=00_AYBD4udwzWuSB8thqAl9SzQtO2oJgzjmjO8abxvB-cAvsA&oe=668CDD12",

  }

  const posts : Post[] = await prisma.post.findMany();
  console.log("🚀 ~ Page ~ post:", posts[0])

  

  // // Exemplo de uso:
  // const handleClick = () => {
  //   console.log("clicor")
  // };
  
  return (
    <main>
      <div className="container mx-auto px-4"> 

      <div className="relative rounded-t-lg bottom-0 left-0 p-4 text-white bg-black flex items-center">
        <input
          className="w-10/12 bg-black rounded-md p-2"
          placeholder="Procurar por uma NOTÍCIA."
        />
        <button className="w-2/12 ml-2 rounded-md border border-white p-2 hover:bg-slate-950">
          <span className="block md:hidden">P</span>
          <span className="hidden md:block">Pesquisar</span>
        </button>
      </div>
   

      <div className="relative rounded-b-lg bottom-0 left-0 p-4 text-white bg-orange-700 ">
        <p className="text-sm">
          Assistente Entusiasta (CURITIBA - PR) |  Confira em tempo real onde está o carro de testes XY049
        </p>
     
      </div>  


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" >
        <div className="col-span-2">
        {/* News card 1 */}

        {posts.length === 0 ? (
        <CardPost postCard={postDefault} />
      ) : (
        <CardPost postCard={posts[0]} />
      )}
        
    
       
      </div>
        <div className="col-span-1">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
            {/* News card 2 */}
            {
              posts.length === 0 ? (
                <CardPost postCard={postDefault} />
              ) : (
              <div>
                {
                posts.slice(0, 2).map((post) => (
                  <CardPost postCard={post} />
                ))}
              </div>
            )}
            {/* News card 3 */}
           
          </div>
        </div>
      </div>
      <div className="py-4">
        <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
          <h2 className="text-2xl font-bold mt-2 mb-1">Páginas</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Blog 1 */}
        <div className="bg-white rounded-md shadow-md p-4">
          <Link href={"https://www.facebook.com/webtvbusologa"} legacyBehavior>
          <a target="_blank" rel="noopener noreferrer">
          <div className="flex items-center">
            <img
              src="/icon/facebook.png"
              alt="Author Image"
              className="rounded-full w-12 h-12 mr-4"
            />
            <div>
              <h3 className="text-lg font-bold">WTBus- Entusiasta Da Mobilidade (Facebook)</h3>
              <p className="text-gray-600 text-sm">
                  Notícias e fotografia sobre o mundo dos transportes. De forma rápida e objetiva, encontre tudo sobre mobilidade e inovações.
              </p>
            </div>
          </div>
          </a>
          </Link>
        </div>
        {/* Blog 2 */}
        <div className="bg-white rounded-md shadow-md p-4">
        <Link target='_blank' href={"https://www.instagram.com/entusiastadamobilidade/"} legacyBehavior>
          <a target="_blank" rel="noopener noreferrer">
          <div className="flex items-center">
            <img
              src="/icon/instagram.png"
              alt="Author Image"
              className="rounded-full w-12 h-12 mr-4"
            />
            <div>
              <h3 className="text-lg font-bold">Entusiasta Da Mobilidade (Instagram)</h3>
              <p className="text-gray-600 text-sm">
              Notícias e fotografia sobre o mundo dos transportes. De forma rápida e objetiva, encontre tudo sobre mobilidade e inovações.
              </p>
            </div>
          </div>
          </a>
          </Link>
        </div>
        {/* Blog 3 */}
        <div className="bg-white rounded-md shadow-md p-4">
          <Link href={"https://www.youtube.com/channel/UCAzsEfkJ4e6G-wFQv8srFXA"} legacyBehavior>
          <a target="_blank" rel="noopener noreferrer">
          <div className="flex items-center">
            <img
                src="/icon/youtube.png"
              alt="Author Image"
              className="rounded-full w-12 h-12 mr-4"
            />
            <div>
              <h3 className="text-lg font-bold">NRFv - Entusiasta Da Mobilidade</h3>
              <p className="text-gray-600 text-sm">
              Notícias e fotografia sobre o mundo dos transportes. De forma rápida e objetiva, encontre tudo sobre mobilidade e inovações.
              </p>
            </div>
          </div>
          </a>
          </Link>
        </div>
        {/* Blog 4 */}
        <div className="bg-white rounded-md shadow-md p-4">
          <Link href={"https://www.youtube.com/channel/UC2m3YJu7rARj1wQhFMHmNrg"}legacyBehavior>
          <a target="_blank" rel="noopener noreferrer">
          <div className="flex items-center">
            <img
               src="/icon/youtube.png"
              alt="Author Image"
              className="rounded-full w-12 h-12 mr-4"
            />
            <div>
              <h3 className="text-lg font-bold">WTBUS - Web Tv Busóloga</h3>
              <p className="text-gray-600 text-sm">
              Notícias e fotografia sobre o mundo dos transportes. De forma rápida e objetiva, encontre tudo sobre mobilidade e inovações.
              </p>
            </div>
          </div>
          </a>
          </Link>
        </div>
      </div>
   

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-">
          <div className="py-4">
            <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
              <h2 className="font-bold mt-2 mb-1">Mobilidade</h2>
            </div>
          </div>
          {/* News card 1 */}

          {
              posts.length === 0 ? (
                <CardNotice postCard={postDefault} />
              ) : (
              <div>
                {
                posts.slice(3, 6).map((post) => (
                  <CardNotice postCard={post} />
                ))}
              </div>
            )
          }        
          
          <div className="flex justify-end mt-8">
            <button className="bg-orange-700 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded">
              Ver mais
            </button>
          </div>
        
        </div>

        {/* 1 */}

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
          <div className="py-4">
            <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
              <h2 className="font-bold mt-2 mb-1">Mobilidade</h2>
            </div>
          </div>
          {/* News card 1 */}
         
          {
              posts.length === 0 ? (
                <CardNotice postCard={postDefault} />
              ) : (
              <div>
                {
                posts.slice(3, 6).map((post) => (
                  <CardNotice postCard={post} />
                ))}
              </div>
            )
          }   

          <div className="flex justify-end mt-8">
            <button className="bg-orange-700 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded">
              Ver mais
            </button>
          </div>
        
        </div>

        {/* 1 */}

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
          <div className="py-4">
            <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
              <h2 className="font-bold mt-2 mb-1">Mobilidade</h2>
            </div>
          </div>
          {/* News card 1 */}
          {
              posts.length === 0 ? (
                <CardNotice postCard={postDefault} />
              ) : (
              <div>
                {
                posts.slice(3, 6).map((post) => (
                  <CardNotice postCard={post} />
                ))}
              </div>
            )
          }   
          <div className="flex justify-end mt-8">
            <button className="bg-orange-700 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded">
              Ver mais
            </button>
          </div>
        
        </div>

        {/* 1 */}

        {/* 1 */}

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
          <div className="py-4">
            <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
              <h2 className="font-bold mt-2 mb-1">Mobilidade</h2>
            </div>
          </div>
          {/* News card 1 */}
          {
              posts.length === 0 ? (
                <CardNotice postCard={postDefault} />
              ) : (
              <div>
                {
                posts.slice(3, 6).map((post) => (
                  <CardNotice postCard={post} />
                ))}
              </div>
            )
          }   
          <div className="flex justify-end mt-8">
            <button className="bg-orange-700 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded">
              Ver mais
            </button>
          </div>
        
        </div>

        {/* 1 */}


        
      
      </div>


      
     
    </div>
    </main>
  );
}
