import { Metadata } from 'next';
import { fetchPostCategory, fetchPostName } from '@/app/lib/data';
import Link from 'next/link';
import React from 'react';
import { Post } from '@/app/lib/definitions';
import { getCategoyrUrl, getConvertUrl } from '@/app/lib/utils';
import CardNotice from '@/app/ui/portal/cardNotice';

export async function generateMetadata({ params }: { params: { category: string; } }): Promise<Metadata> {
  const { category } = params;

  let urlConvert = getConvertUrl(category)

  if (urlConvert == 0) {
    return {

      title: 'Entusiasta da Mobilidade',
      description: 'O Portal de Noticias e Fotografias que é Entusiasta dos Modais de Transporte',
      keywords: 'notícias, fotografias, transporte, modais, mobilidade',
      openGraph : {
        type: 'website',
        locale: 'pt_BR',
        url: process.env.SITE_URL,     
        images: [
          {
            url: process.env.SITE_URL +'/CARTAO.png',
            width: 800,
            height: 600,
            alt: 'Imagem de capa',
          }
        ],
      }
    };
  }

  return {
    title: category,
    description:  'O Portal de Notícias e Fotografias que é Entusiasta dos Modais de Transporte',
    keywords: 'notícias, fotografias, transporte, modais, mobilidade',
    openGraph: {
      type: 'article',
      locale: 'pt_BR',
      url: process.env.SITE_URL+ `/${category}`,
      images: [
        {
          url: process.env.SITE_URL+'/CARTAO.png',
          width: 800,
          height: 600,
          alt: category,
        },
      ]
    },
  };
}

export default async function Page({ params }: {params: { category: string }}) {
  const { category } = params;

  let posts : Post[] = []
  let error = null;

  let urlConvert = getConvertUrl(category)


  if (urlConvert == 0) {
    return <div>Categoria não encontrada</div>;
  }

  try {
    
    posts = await fetchPostCategory(urlConvert);   
  

  } catch (err) {
    error = err.message;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  if (posts.length == 0) {
    return <div>Post não encontrado</div>;
  }

  
  return (
    <main>
      <div className="container mx-auto px-4">
        <div className="relative flex justify-between rounded-b-lg text-white bg-black">
          <div className='relative flex justify-between' style={{ width: "5%" }}>
            <div className='rounded-l' style={{ height: "100%", width: "50%", backgroundColor: "brown" }}></div>
            <div style={{ height: "100%", width: "50%", backgroundColor: "chocolate" }}></div>
          </div>
          <div style={{ width: "80%", padding: "10px" }}>
            <h2 className="text-xl font-bold">
              {category}
            </h2>
          </div>
          <div style={{ width: "10%", padding: "10px" }}>
            <div className='w-[80%] md:w-[100%]'>
              <img
                src="/logo.svg"
                alt="Author Image"
              />
            </div>
          </div>
        </div>       

        <div className="bg-white rounded-md shadow-md p-4 mt-8">
         
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
        
          {/* News card 1 */}
          {
             
            <div>
              {
                posts
                .filter((post) => post.published)               
                .map((post) => <CardNotice key={post.id} postCard={post} />)
              }
            </div>
            
          }          
        
        </div>
        </div>

        <div className="flex justify-end mt-8">
          <Link href={"/"}>
            <button className="bg-orange-700 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded">
              Voltar para a página principal
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
