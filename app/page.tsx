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
import SearchBar from './ui/portal/searchBar';

 

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
    coverURL : "1qbDWMQiF_MIGmiPXz3WD3t8ptlhAE90r",

  }

  const posts : Post[] = await prisma.post.findMany();
  console.log("🚀 ~ Page ~ post:", posts)

  

  // // Exemplo de uso:
  // const handleClick = () => {
  //   console.log("clicor")
  // };
  
  return (
    <main>
      <div className="container mx-auto px-4"> 

      <SearchBar />


      <div className="relative rounded-b-lg bottom-0 left-0 p-4 text-white bg-orange-700 ">
        <p className="text-sm">
          É NOSSO ANIVERSÁRIO!!!!! 12 ANOS DE WEB TV BUSÓLOGA BR!!! ANOS DE ENTUSIASTA!!!!!
        </p>
     
      </div>  

   
{/* 
      <div className="relative rounded-b-lg bottom-0 left-0 p-4 text-white bg-orange-700 ">
        <p className="text-sm">
          Assistente Entusiasta (CURITIBA - PR) |  Confira em tempo real onde está o carro de testes XY049
        </p>
     
      </div>   */}


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" >
        <div className="col-span-2">
        {/* News card 1 */}

        {posts.length === 0 ? (
        <CardPost postCard={postDefault} />
      ) : (
        <CardPost postCard={posts[0]} />
      )}
        
    
       
      </div>
        <div className="col-span-2 md:col-span-1 ">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
            {/* News card 2 */}
            {
              posts.slice(1, 2).length === 0 ? (
                <CardPost postCard={postDefault} />
              ) : (
              <div>
                {
                posts.slice(1, 2).map((post) => (
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
        {/* <p className="text-gray-600 text-sm hidden md:block" > */}
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
              <h2 className="font-bold mt-2 mb-1">Transporte Público</h2>
            </div>
          </div>
          {/* News card 1 */}

          {
              posts.slice(3, 6) .length === 0 ? (
                <CardNotice postCard={postDefault} />
              ) : (
              <div>
                {
                  posts
                  .filter((post) => post.newspaperColumnID == "030e0d2f-5aad-4018-934a-420b23448fd9") 
                  .slice(0, 3) 
                  .map((post) => <CardNotice postCard={post} />)
                }
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
              <h2 className="font-bold mt-2 mb-1">Aviação</h2>
            </div>
          </div>
          {/* News card 1 */}
            {/* 
              TransportePublico: 1,
              Aviacao: 2,
              Ferrovia: 3,
              Automoveis: 4,

            
            1 */}
          {
              posts.slice(3, 6) .length === 0 ? (
                <CardNotice postCard={postDefault} />
              ) : (
              <div>
                {
                  posts
                  .filter((post) => post.newspaperColumnID != "030e0d2f-5aad-4018-934a-420b23448fd9" && post.category == 2) 
                  .slice(0, 3) 
                  .map((post) => <CardNotice postCard={post} />)
                }
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
              <h2 className="font-bold mt-2 mb-1">Ferrovia</h2>
            </div>
          </div>
          {/* News card 1 */}
          {
              posts.slice(3, 6) .length === 0 ? (
                <CardNotice postCard={postDefault} />
              ) : (
              <div>
                {
                  posts
                  .filter((post) => post.newspaperColumnID != "030e0d2f-5aad-4018-934a-420b23448fd9" && post.category == 3) 
                  .slice(0, 3) 
                  .map((post) => <CardNotice postCard={post} />)
                }
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
              <h2 className="font-bold mt-2 mb-1">Automóveis</h2>
            </div>
          </div>
          {/* News card 1 */}
          {
              posts.slice(3, 6) .length === 0 ? (
                <CardNotice postCard={postDefault} />
              ) : (
              <div>
                {
                  posts
                  .filter((post) => post.newspaperColumnID != "030e0d2f-5aad-4018-934a-420b23448fd9" && post.category == 4) 
                  .slice(0, 3) 
                  .map((post) => <CardNotice postCard={post} />)
                }
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
