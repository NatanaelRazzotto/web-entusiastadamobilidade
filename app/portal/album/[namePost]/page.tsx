
import { useEffect, useState } from 'react';
import { BookOrder, Image, Post, Vehicle } from '../../../lib/definitions';

import { fetchBookId, fetchPostName } from '@/app/lib/data';
import { GetServerSideProps, Metadata } from 'next';
import { list } from 'postcss';
import Link from 'next/link';
import HeadMeta from '../../../ui/components/HeadMeta'

import { ImagemViewer } from '@/app/ui/imageViewer/imagemViewer';
import { ListImagemViewer } from '@/app/ui/imageViewer/listImagemViewer';

export default async function Page({ params }: { params: { idBook: string } }) {

    // const [data, setData] = useState< Post | null>(null);
  const { idBook: idBook } = params;
  console.log('Parâmetro namePost:', idBook);

  let dataPost : BookOrder | null = null;
  let dataVehicle : Vehicle [] = [];
  let error = null;

  try {
    var response : BookOrder= await fetchBookId(idBook)
    
    if (response == null) {
      throw new Error('Erro na busca de dados');
    }

    dataPost = response
    if (dataPost){
      if (dataPost.orderImages[0]){
        console.log("🚀 ~ llllll:", dataPost.orderImages[0].image.vehicle)
        dataPost.orderImages.forEach(element => {
          if (element.image.vehicle[0]){
            dataVehicle.push(element.image.vehicle[0])
            console.log("🚀 ~ dataVehicle:", dataVehicle)
          }         

        });
      }
    }
 
  
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
          <div className="relative flex justify-between rounded-b-lg text-white bg-black">
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

          <div className="bg-white rounded-md shadow-md p-4 mt-8">
            <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
              <h2 className="font-bold mt-2 mb-1">PONTOS IMPORTANTES!</h2>
            </div>
            <p className="py-4 text-black">
              {""}
            </p>
          </div>

         <ListImagemViewer dataPost={dataPost}></ListImagemViewer>

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

  