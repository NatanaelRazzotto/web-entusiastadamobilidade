import { Metadata } from 'next';
import { fetchPostName } from '@/app/lib/data';
import { Post, Vehicle, Image } from '../../../lib/definitions';
import { getWatermarkedImageUrl, getCategoyrUrl} from '../../../lib/utils'
import Link from 'next/link';
import React from 'react';
import SliderCover from '@/app/ui/portal/slider';


export async function generateMetadata({ params }: { params: { category: string; namePost: string } }): Promise<Metadata> {
  const { category, namePost } = params;

  const dataPost: Post = await fetchPostName(namePost);

  if (!dataPost) {
    return {
      title: 'Portal Entusiasta da Mobilidade',
      description: 'O Portal de Notícias e Fotografias que é Entusiasta dos Modais de Transporte',
      keywords: 'notícias, fotografias, transporte, modais, mobilidade',
      openGraph: {
        type: 'website',
        locale: 'pt_BR',
        url: 'https://entusiastadamobilidade.vercel.app/',
        images: [
          {
            url: 'https://entusiastadamobilidade.vercel.app/CARTAO.png',
            width: 800,
            height: 600,
            alt: 'Imagem de capa',
          },
        ],
      },
    };
  }

  return {
    title: dataPost.title,
    description: dataPost.resume || 'O Portal de Notícias e Fotografias que é Entusiasta dos Modais de Transporte',
    keywords: 'notícias, fotografias, transporte, modais, mobilidade',
    openGraph: {
      type: 'article',
      locale: 'pt_BR',
      url: `https://entusiastadamobilidade.vercel.app/portal/${getCategoyrUrl(dataPost.category)}/${namePost}`,
      images: [
        {
          url: getWatermarkedImageUrl(dataPost.coverURL),
          width: 800,
          height: 600,
          alt: dataPost.title,
        },
      ]
    },
  };
}

export default async function Page({ params }: {params: { category: string; namePost: string }}) {
  const { category, namePost } = params;
  console.log("🚀 ~ generateMetadata ~ category:", category)

  let dataPost: Post | null = null;
  let dataVehicle: Vehicle[] = [];
  let error = null;

  try {
    const response: Post = await fetchPostName(namePost);

    if (response == null) {
      throw new Error('Erro na busca de dados');
    }

    dataPost = response;
    if (dataPost && dataPost.images[0]) {
      dataPost.images.forEach((element) => {
        if (element.vehicle[0]) {
          dataVehicle.push(element.vehicle[0]);
        }
      });
    }
  } catch (err) {
    error = err.message;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  if (!dataPost) {
    return <div>Post não encontrado</div>;
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = (`0${date.getDate()}`).slice(-2);
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const year = date.getFullYear();
    const hours = (`0${date.getHours()}`).slice(-2);
    const minutes = (`0${date.getMinutes()}`).slice(-2);
    const seconds = (`0${date.getSeconds()}`).slice(-2);

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  // Função para renderizar texto com quebras de linha
  function renderContentWithLineBreaks(content: string) {
   // let a = content.split('\n')
    return content.split('\\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  }

  return (
    <main>
      <div className="container mx-auto px-4">
        <div className="relative flex justify-between rounded-b-lg text-white bg-slate-950">
          <div className='relative flex justify-between' style={{ width: "5%" }}>
            <div className='rounded-l' style={{ height: "100%", width: "50%", backgroundColor: "brown" }}></div>
            <div style={{ height: "100%", width: "50%", backgroundColor: "chocolate" }}></div>
          </div>
          <div style={{ width: "80%", padding: "10px" }}>
            <h2 className="text-xl font-bold">
              {dataPost.title}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 bg-slate-950">
            <div className="col-span-2 bg-black ">
              <SliderCover dataPost={dataPost} />
            </div>
            <div className="col-span-1 justify-self-end w-72 p-4 mt-4 mr-4 " >
            <div className=" rounded-md shadow-md p-1 ">
              <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
                <h2 className="font-bold mt-2 mb-1">Resumo da Matéria</h2>
              </div>
              <p className="py-4 text-white text-sm">
                {dataPost.resume ? dataPost.resume : "Sem informações de resumo."}
              </p>
            </div>
            <div className=" rounded-md shadow-md p-1">
              <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
                <h2 className="font-bold mt-2 mb-1">Veículos na Matéria</h2>
              </div>
              {
                dataVehicle.length === 0 ?
                  <p className="py-4 text-white text-sm">Sem informações dos Veículos.</p> :
                  dataVehicle.map((vehicle) => (
                    <Link href={'portal/pictures/'} key={vehicle.serialNumber}>
                      <p className="py-4 text-black text-sm">
                        {vehicle.serialNumber.toString()}
                      </p>
                    </Link>
                  ))
              }
            </div>
            <div className=" rounded-md shadow-md p-1">
              <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
                <h2 className="font-bold mt-2 mb-1">Categoria</h2>
              </div>
              <p className="py-4 text-white text-sm">
                {dataPost.category == 1 ? "Transporte Público" : dataPost.category == 2 ? "Aviação" : dataPost.category == 3 ? "Ferrovia" : dataPost.category == 4 ? "Automóveis" : "Geral"}
              </p>
            </div>
            <div className=" rounded-md shadow-md p-1">
              <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
                <h2 className="font-bold mt-2 mb-1">Dia de Publicação</h2>
              </div>
              <p className="py-4 text-white text-sm">
                {dataPost.dateCreate ? formatDate(dataPost.dateCreate.toString()) : "Sem informações de data."}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md shadow-md p-4 mt-8">
          <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
            <h2 className="font-bold mt-2 mb-1">MÁTERIA INTEGRA</h2>
          </div>
          <p className="py-4 text-black">
            {renderContentWithLineBreaks(dataPost.content)}
          </p>
        </div>

        <div className="bg-white rounded-md shadow-md p-4 mt-8">
          <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
            <h2 className="font-bold mt-2 mb-1"> Confira! {dataPost.images.length} Fotos Disponíveis</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">

       
            {
              dataPost.images.length === 0 ? <p>Sem Imagens</p> :
            
                dataPost.images.map((image) => (
                  <Link href={'../pictures/' + image.id} key={image.id}>
                    <div className="col-span-1">
                      <img
                        src={`https://drive.google.com/thumbnail?id=${image.pathURL}&sz=w1000`}
                        alt={image.title}
                        className="rounded-md w-full object-cover"
                      />
                    </div>
                  </Link>
                ))
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
