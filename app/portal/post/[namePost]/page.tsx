
import { useEffect, useState } from 'react';
import { Image, Post } from '../../../lib/definitions';

import { fetchPostName } from '@/app/lib/data';
import { GetServerSideProps } from 'next';

interface PageProps {
  data: any;
  error?: string;
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { namePost } = context.params as { namePost: string };
//   console.log("🚀 ~ GetServerSideProps= ~ namePost:", namePost)

//   try {
//     // Substitua pela URL da sua API ou pela lógica de processamento necessária
//     const response = await fetch(`https://api.exemplo.com/posts/${namePost}`);
//     if (!response.ok) {
//       throw new Error('Erro na busca de dados');
//     }

//     const data = await response.json();

//     return {
//       props: {
//         data,
//       },
//     };
//   } catch (error) {
//     return {
//       props: {
//         data: null,
//         error: error.message,
//       },
//     };
//   }
// };

export default async function Page({ params }: { params: { namePost: string } }) {

    // const [data, setData] = useState< Post | null>(null);
  const { namePost } = params;
  console.log('Parâmetro namePost:', namePost);

  let dataPost : Post | null = null;
  let error = null;

  try {
    const response : Post= await fetchPostName(namePost)
    
    if (response == null) {
      throw new Error('Erro na busca de dados');
    }

    dataPost = response
    console.log("🚀 ~ data:", dataPost)
  } catch (err) {
    error = err.message;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  if (!dataPost) {
    //notFound();
  
    console.log("🚀 ~ notFound();:")}
   
  //({ data, error }: PageProps) {//({ params }: { params: { namePost: string } }) {
  // const [data, setData] = useState< Post | null>(null);
  // const [loading, setLoading] = useState(true);

  
  //const prisma = new PrismaClient();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     'use server';
  //     try {
  //       if (typeof params.namePost === 'string') {
  //         const post = await fetchPostName(params.namePost);
  //         setData(post);
  //       } else {
  //         throw new Error('Invalid post name');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (params.namePost) {
  //     fetchData();
  //   }
  // }, [params.namePost]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // return (
  //   <div>
  //     <h1>{data?.title}</h1>
  //     <p>{data?.content}</p>
  //   </div>
    
  // );
  return (
    <main>
      <div className="container mx-auto px-4">

      <div className="relative rounded-b-lg bottom-0 left-0 p-4 text-white  bg-black ">
        <h2 className="text-xl font-bold">
            {dataPost.title}
        </h2>     
      </div>  

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          <div className="col-span-2">
            <img
              src={dataPost.coverURL}
              alt="Imagem da Matéria"
              className="rounded-t-md w-full object-cover"
            />
          </div>
          <div className="col-span-1">
            <div className="bg-white rounded-md shadow-md p-4">
            
              <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
                <h2 className="font-bold mt-2 mb-1">  Resumo da Matéria</h2>
              </div>      
  
              <p className="py-4 text-black text-sm">
                {dataPost.resume ? dataPost.resume : "Sem informações de resumo."}
              </p>

            </div>
            <div className="bg-white rounded-md shadow-md p-4">

              <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
                  <h2 className="font-bold mt-2 mb-1">   
                      Veículos Contidos na Matéria
                  </h2>
                </div>     
    
              <p className="py-4 text-black text-sm">
                {dataPost.numberVeicule ? dataPost.numberVeicule : "Sem informações dos Veículos."}
              </p>
            </div>
            <div className="bg-white rounded-md shadow-md p-4">
        
              <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
                <h2 className="font-bold mt-2 mb-1">   
                  Categoria 
                  </h2>
                </div>     
    
              <p className="py-4 text-black text-sm">
                {dataPost.category == 1? "Onibus Elétrico" : "Automoveis"}
              </p>
            </div>
            <div className="bg-white rounded-md shadow-md p-4">
         
              <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
              <h2 className="font-bold mt-2 mb-1">   
                Dia de Publicação
                  </h2>
                </div>     
    
              <p className="py-4 text-black text-sm">
                {dataPost.dateCreate ? dataPost.dateCreate.toString() : "Sem informações de resumo."}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md shadow-md p-4 mt-8">
          <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
              <h2 className="font-bold mt-2 mb-1">   
                MÁTERIA INTEGRA
              </h2>
          </div>     
    
          <p className="py-4 text-black ">
            {dataPost.content}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {
            dataPost.images.length === 0 ?  <p>No posts found</p> :

            (dataPost.images as Image[]).map((image: Image) => (
              <div className="col-span-1">
              <img
                src={image.pathURL}
                alt={image.title}
                className="rounded-md w-full object-cover"
              />
            </div>
            ))
          }         
      
          {/* Adicione mais fotos aqui */}
        </div>

        <div className="flex justify-end mt-8">
          <button className=" bg-orange-700  hover:bg-orange-900  text-white font-bold py-2 px-4 rounded">
            Voltar para a página principal
          </button>
        </div>
      </div>
    </main>
  );
}

  