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

import { Post , Video} from './lib/definitions';

import CardNotice from './ui/portal/cardNotice';
import SearchBar from './ui/portal/searchBar';
import HeadMeta from './ui/components/HeadMeta';
import { Metadata } from 'next';


import SideNav from './ui/dashboard/sidenavManager';
import { getCategoyrUrl } from './lib/utils';
import ListNotices from './ui/portal/listNotices';
import { CategoryPost } from './lib/enums/categoryPost';
import ListVideos from './ui/portal/listVideos';
import clsx from 'clsx';
import SideNavMobile from './ui/dashboard/sidenavMobile';
import GridNotices from './ui/portal/gridNotices';
import CardNoticeVideo from './ui/portal/cardNoticeVideo';

export async function generateMetadata( {params: {lang}} ):Promise<Metadata> {

  return {
    
    title: 'Entusiasta da Mobilidade',
    description: 'O Portal de Noticias e Fotografias que é Entusiasta dos Modais de Transporte',
    verification : {
      google : 'gMxVZxkZmbc65mL4VwyUyvt5Be3AtNfRWYzcUt2LZrU'
    },
    keywords: 'notícias, fotografias, transporte, modais, mobilidade',
    openGraph : {
      siteName : 'Entusiasta da Mobilidade',
      title : 'Entusiasta da Mobilidade',
      type: 'website',
      locale: 'pt_BR',
      url: process.env.NEXT_PUBLIC_SITE_URL,     
      images: [
        {
          url: process.env.NEXT_PUBLIC_SITE_URL +'/CARTAO.png',
          width: 800,
          height: 600,
          alt: 'Imagem de capa',
        }
      ],
    }
  };


}

export default async function Page() { 
  
  const prisma = new PrismaClient();

  const postDefault : Post = {
    id : "1",
    authorId : "1",
    published : true,
    dateCreate : new Date(),
    dateEvent : new Date(),
    category : 1,
    topNews : 0,
    namePost : "Há um post no forno!",
    title : "Há um post no forno!",
    content : "Há um post no forno!",
    coverURL : "1qbDWMQiF_MIGmiPXz3WD3t8ptlhAE90r",

  }

  const posts: Post[] = await prisma.post.findMany({
    orderBy: {
      dateCreate: 'desc', 
    },
  });
  const videos : Video[] = await prisma.video.findMany({
    orderBy: {
      dateCreate: 'desc', 
    },
  });
  
  const postTop : Post = posts.find((post) => post.topNews == 1)
  const secondPostTop : Post = posts.find((post) => post.topNews == 2)
  const thirdPostTop : Post = posts.find((post) => post.topNews == 3)

  const SocialCard = ({ platform, link, imageSrc, title, description }: any) => {
    const gradientBackground = clsx({
      "bg-gradient-to-r from-blue-500 to-blue-700": platform === "facebook",
      "bg-gradient-to-r from-red-400 from-red-700": platform === "youtube",
      "bg-gradient-to-r from-purple-600 to-orange-500": platform === "instagram",
      // Adicione mais gradientes conforme necessário
    });
  
    return (
      <div
        className={`${gradientBackground} text-text-light dark:bg-secondarybg-dark dark:text-text-dark rounded-md shadow-md p-4`}
      >
        <Link href={link} legacyBehavior>
          <a target="_blank" rel="noopener noreferrer">
            <div className="flex items-center">
              <img
                src={imageSrc}
                alt="Author Image"
                className="rounded-full w-12 h-12 mr-4"
              />
              <div>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="text-text-dark text-sm">{description}</p>
              </div>
            </div>
          </a>
        </Link>
      </div>
    );
  };

  

  // // Exemplo de uso:
  // const handleClick = () => {
  //   console.log("clicor")
  // };
  
  return (

    <main>
       <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">

       <div className="block md:hidden">
        <SideNavMobile />
      </div>
      <div className="hidden md:block">
        <SideNav />
      </div>
  
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
      <div className="container mx-auto px-4"> 

      <SearchBar />


      <div className="relative rounded-b-lg bottom-0 left-0 p-4 text-white bg-orange-700 ">
        <p className="text-sm justify-center">
          ✨🎄Ho Ho Ho! Um Feliz Natal e Um Próspero Ano Novo!🎄✨
        </p>
     
      </div>     

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-black text-text-dark" >
        <div className="col-span-2">
        {/* News card 1 */}

        {posts.length === 0 && !postTop? ( <CardPost postCard={postDefault} cardTop={true}/>) : postTop != undefined? (<CardPost postCard={postTop} cardTop={true}/>) : (   <CardPost postCard={postDefault} cardTop={true}/>)
      }
        
    
       
        </div>
        <div className="col-span-2 md:col-span-1 pr-2 pt-2 ">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
            {/* News card 2 */}
            <div>
            {posts.length === 0 && !secondPostTop? ( <CardPost postCard={postDefault} cardTop={false}/>) : secondPostTop != undefined? (<CardPost postCard={secondPostTop} cardTop={false}/>) : (   <CardPost postCard={postDefault} cardTop={false}/>)}

            {posts.length === 0 && !thirdPostTop? ( <CardPost postCard={postDefault} cardTop={false} />) : thirdPostTop != undefined? (<CardPost postCard={thirdPostTop} cardTop={false}/>) : (   <CardPost postCard={postDefault} cardTop={false}/>)}
            </div>
            
           
          </div>
        </div>
      </div>
      <div className="py-4">
        <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
          <h4 className="font-bold mt-2 mb-1">Páginas</h4>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Blog 1 */}
        <SocialCard
        platform="facebook"
        link="https://www.facebook.com/webtvbusologa"
        imageSrc="/icon/facebook.png"
        title="WTBus- Entusiasta Da Mobilidade (Facebook)"
        description="Notícias e fotografia sobre o mundo dos transportes. Encontre tudo sobre mobilidade e inovações."
      />

        {/* Blog 2 */}

        <SocialCard
        platform="instagram"
        link="https://www.instagram.com/entusiastadamobilidade/"
        imageSrc="/icon/instagram.png"
        title="Entusiasta Da Mobilidade (Instagram)"
        description="Fotografia e Notícias voltadas ao mundo dos modais. De forma rápida e objetiva."
      />
       
        {/* Blog 3 */}

        <SocialCard
        platform="youtube"
        link="https://www.youtube.com/@entusiastadamobilidade"
        imageSrc="/icon/youtube.png"
        title="NRFv - Entusiasta Da Mobilidade"
        description="Vídeografia de Eventos, Automoveis e Paisagens. Tudo sobre a Mobilidade e Modais."
      />
       
        {/* Blog 4 */}
        {/* <p className="text-gray-600 text-sm hidden md:block" > */}

        <SocialCard
        platform="youtube"
        link="https://www.youtube.com/channel/UC2m3YJu7rARj1wQhFMHmNrg"
        imageSrc="/icon/youtube.png"
        title="WTBUS - Web Tv Busóloga"
        description="Vídeografia de Eventos e Veículos voltados ao Transporte Público (Ônibus). Tudo sobre a Mobilidade Urbana."
      />

       
      </div>

      <div className="py-4">
        <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
          <h4 className="font-bold mt-2 mb-1">Notícias</h4>
        </div>
      </div>
   

      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-4 "> 
        {/* GridNotices - Responsivo 3xN */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts
              .filter((post) => post.published) // Filtrar apenas os posts publicados
              .map((post) => (
                <CardNotice key={post.id} postCard={post} />
              ))}
          </div>
          <div className="py-4">
            <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
              <h4 className="font-bold mt-2 mb-1">Vídeos</h4>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos
              .filter((post) => post.published) // Filtrar apenas os posts publicados
              .map((post) => (
                <CardNoticeVideo key={post.id} postCard={post} />
              ))}
          </div>
          
        </div>

        {/* ListVideos - Responsivo 1 Coluna */}
        <div className="grid grid-cols-1 gap-4">
              
          <div className={`h-40 bg-gradient-to-r from-orange-500 to-orange-700 text-text-light dark:bg-secondarybg-dark dark:text-text-dark rounded-md shadow-md p-4`}>         

              <div>
                <h1 className="text-lg font-bold flex items-center justify-center ">1000 </h1>
                <p className="text-text-dark text-sm flex items-center justify-center  ">INSCRITOS</p>
              </div>    
              <div>
                <h3 className="text-lg font-bold  flex items-center justify-center">EM NOSSO YOUTUBE </h3>
                <p className="text-text-dark text-sm flex items-center justify-center  ">Muito Obrigado!</p>
                <p className="text-text-dark text-sm flex items-center justify-center  ">Alcançamos este MARCO em 2024!</p>
              </div>       
      
         </div>

       
         <div className="aspect-w-9 aspect-h-16">
            <iframe
              src={`https://www.youtube.com/embed/SwpGoyjZFRI?autoplay=1`}
              className="w-full h-96"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        

         

         
        </div>
      </div>


   


      
     
    </div>
    
    </div>
    </div>
     
    </main>
   
  );
}
