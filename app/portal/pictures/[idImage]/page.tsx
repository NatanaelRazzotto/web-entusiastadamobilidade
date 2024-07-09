
import { useEffect, useState } from 'react';
import { Image, Post, Vehicle } from '../../../lib/definitions';

import { fetchIdImage, fetchPostName } from '@/app/lib/data';
import { GetServerSideProps } from 'next';
import { list } from 'postcss';
import Link from 'next/link';

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

export default async function Page({ params }: { params: { idImage: string } }) {

    // const [data, setData] = useState< Post | null>(null);
  const { idImage: idImage } = params;
  console.log('Parâmetro idImage:', idImage);

  let dataPost : Image | null = null;
  let dataVehicle : Vehicle [] = [];
  let error = null;

  try {
    const response : Image= await fetchIdImage(parseFloat(idImage))
    
    if (response == null) {
      throw new Error('Erro na busca de dados');
    }

    dataPost = response
    // if (dataPost){
    //   if (dataPost.images[0]){
    //     console.log("🚀 ~ llllll:", dataPost.images[0].vehicle)
    //     dataPost.images.forEach(element => {
    //       if (element.vehicle[0]){
    //         dataVehicle.push(element.vehicle[0])
    //         console.log("🚀 ~ dataVehicle:", dataVehicle)
    //       }         

    //     });
    //   }
    // }
 
  
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

  function formatDate(dateString : string):string {
    const date = new Date(dateString);
    const day = (`0${date.getDate()}`).slice(-2);
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const year = date.getFullYear();
    const hours = (`0${date.getHours()}`).slice(-2);
    const minutes = (`0${date.getMinutes()}`).slice(-2);
    const seconds = (`0${date.getSeconds()}`).slice(-2);
  
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  return (
    <main>
      <div className="container mx-auto px-4">

      <div className="relative flex  justify-between rounded-b-lg rounded-b-lg  text-white bg-black">
      <div className='relative flex  justify-between'  style={{ width: "5%" }}>
        <div className='rounded-l' style={{ height: "100%", width: "50%", backgroundColor: "brown" }}></div>
        <div style={{ height: "100%", width: "50%", backgroundColor: "chocolate" }}></div>
      </div>
      <div style={{ width: "80%", padding: "10px"}}>
        <h2 className="text-xl font-bold">
          {dataPost.title}
        </h2>
      </div>
      <div style={{ width: "10%",padding: "10px" }}>
      <div className='w-[80%] md:w-[100%]'>   
        <img
                src="/logo.svg"
                alt="Author Image"  
              
              
        />
      </div>
      </div>
    </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          <div className="col-span-2">
            <img
              src={dataPost.pathURL}
              alt="Imagem da Matéria"
              className="rounded-t-md w-full object-cover"
            />
          </div>
          <div className="col-span-1">
            <div className="flex">
            <div className="bg-white rounded-md shadow-md p-4">
            
              <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
                <h2 className="font-bold mt-2 mb-1"> Prefixo do Veículo</h2>
              </div>      
  
              <p className="py-4 text-black text-sm">
                {dataPost.vehicle ? dataPost.vehicle[0].serialNumber : "Sem Prefixo"}
              </p>

            </div>
            <div className="bg-white rounded-md shadow-md p-4">
            
              <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
                <h2 className="font-bold mt-2 mb-1">Placa do Veículo</h2>
              </div>      

              <p className="py-4 text-black text-sm">
               {dataPost.vehicle ? dataPost.vehicle[0].plate : "SEM PLACA"}
              </p>

            </div>
            </div>
            <div className="flex">
            <div className="bg-white rounded-md shadow-md p-4">
            
              <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
                <h2 className="font-bold mt-2 mb-1"> Fabricante da Carroceria</h2>
              </div>      
  
              <p className="py-4 text-black text-sm">
                {dataPost.vehicle ? dataPost.vehicle[0].serialNumber : "Sem Prefixo"}
              </p>

            </div>
            <div className="bg-white rounded-md shadow-md p-4">
            
              <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
                <h2 className="font-bold mt-2 mb-1"> Modelo de Carroceria</h2>
              </div>      

              <p className="py-4 text-black text-sm">
               {dataPost.vehicle ? dataPost.vehicle[0].plate : "SEM PLACA"}
              </p>

            </div>
            </div>

            <div className="flex">
            <div className="bg-white rounded-md shadow-md p-4">
            
              <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
                <h2 className="font-bold mt-2 mb-1"> Fabricante do Chassi</h2>
              </div>      
  
              <p className="py-4 text-black text-sm">
                {dataPost.vehicle ? dataPost.vehicle[0].serialNumber : "Sem Prefixo"}
              </p>

            </div>
            <div className="bg-white rounded-md shadow-md p-4">
            
              <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
                <h2 className="font-bold mt-2 mb-1"> Modelo de Carroceria</h2>
              </div>      

              <p className="py-4 text-black text-sm">
               {dataPost.vehicle ? dataPost.vehicle[0].plate : "SEM PLACA"}
              </p>

            </div>
            </div>

            <div className="flex">
            <div className="bg-white rounded-md shadow-md p-4">
            
              <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
                <h2 className="font-bold mt-2 mb-1"> Fabricante da Carroceria</h2>
              </div>      
  
              <p className="py-4 text-black text-sm">
                {dataPost.vehicle ? dataPost.vehicle[0].serialNumber : "Sem Prefixo"}
              </p>

            </div>
              <div className="bg-white rounded-md shadow-md p-4">
              
              <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
              <h2 className="font-bold mt-2 mb-1">   
                Dia de Publicação
                  </h2>
                </div>     
    
              <p className="py-4 text-black text-sm">
                {dataPost.id ? formatDate(dataPost.id.toString()) : "Sem informações de resumo."}
              </p>

              </div>
            </div>
          
           
          </div>

          
        </div>

        <div className="bg-white rounded-md shadow-md p-4 mt-8">
          <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
              <h2 className="font-bold mt-2 mb-1">   
                COMENTÁRIOS
              </h2>
          </div>     
    
          <p className="py-4 text-black ">
            EM BREVE!!!
          </p>
        </div>

        <div className="flex justify-end mt-8">
          <Link href={"/"}>
          <button className=" bg-orange-700  hover:bg-orange-900  text-white font-bold py-2 px-4 rounded">
            Voltar para a página principal
          </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

  