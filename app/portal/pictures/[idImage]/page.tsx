"use client"
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

export default function Page({ params }: { params: { idImage: string } }) {

    // const [data, setData] = useState< Post | null>(null);
  const { idImage: idImage } = params;
  const [dataPost, setDataPost] = useState< Image | null>(null);
  const [dataVehicle, setDataVehicle] = useState< Vehicle | null>(null);

  let error = null;
  
  useEffect(() => {
    if (idImage) {
      const fetchPost = async () => {
        // setIsLoading(true);
        try {
          const response : Image= await fetchIdImage(idImage)
    
          if (response == null) {
            throw new Error('Erro na busca de dados');
          }

          setDataPost(response)
        } catch (error) {
          console.error('Erro ao buscar pastas:', error);
        } finally {
          // setIsLoading(false);
        }
      };
      fetchPost();
    }
  }, []); 


  useEffect(() => {
    if (dataPost && dataPost.vehicleIDs.length > 0) {
      const fetchFolders = async () => {
        // setIsLoading(true);
        console.log("🚀 ~ fetchFolders ~ process.env.SERVER_URL:", process.env.NEXT_PUBLIC_SERVER_URL)
        try {
          const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL+`/vehicles/${dataPost.vehicleIDs[0]}`); // Adiciona o parâmetro na rota
          const data = await response.json();          
          setDataVehicle(data); // Atualiza as pastas baseadas na categoria
        } catch (error) {
          console.error('Erro ao buscar pastas:', error);
        } finally {
          // setIsLoading(false);
        }
      };
      fetchFolders();
    }
  }, [dataPost]); // Dispara o useEffect quando a categoria selecionada m


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

    {!dataPost ? "Sem Informações" : 
    <div className="container mx-auto px-4">
    <div className="relative flex justify-between rounded-b-lg bg-black text-text-dark">
      
      <div className='relative flex justify-between' style={{ width: "5%" }}>
        <div className='rounded-l' style={{ height: "100%", width: "50%", backgroundColor: "brown" }}></div>
        <div style={{ height: "100%", width: "50%", backgroundColor: "chocolate" }}></div>
      </div>
      <div style={{ width: "80%", padding: "10px" }}>
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


<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2 bg-secondarybg-dark text-text-dark">
  <div className="col-span-2 bg-black h-auto">
    <iframe
      src={`https://drive.google.com/file/d/${dataPost.pathURL}/preview`}
      title={dataPost.title}
      className="rounded-md w-full object-cover"     
      height="100%"     
      style={{ border: 'none' }}
    ></iframe>
  </div>
  <div className="col-span-1 justify-self-end p-4 mt-4 mr-4 " >
      <div className="flex">
      <div className=" rounded-md shadow-md p-1 ">
      <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
            <h2 className="font-bold mt-2 mb-1"> Prefixo do Veículo</h2>
          </div>      

          <p className="py-4 text-white text-sm">
            {dataVehicle ? dataVehicle.serialNumber : "Sem Prefixo"}
          </p>

        </div>
        <div className=" rounded-md shadow-md p-1 ">
          <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
            <h2 className="font-bold mt-2 mb-1">Placa do Veículo</h2>
          </div>      

          <p className="py-4 text-white text-sm">
           {dataVehicle ? dataVehicle.plate : "SEM PLACA"}
          </p>

        </div>
        </div>
        <div className="flex">
        <div className=" rounded-md shadow-md p-1 ">
        <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
            <h2 className="font-bold mt-2 mb-1"> Fabricante da Carroceria</h2>
          </div>      

          <p className="py-4 text-white text-sm">
            {dataVehicle ? 
              dataVehicle.bodywork ?
              dataVehicle.bodywork.manufacturer ?
              dataVehicle.bodywork.manufacturer.name : "Sem Info" :  "Sem Info":  "Sem Info"}
          </p>

        </div>
        <div className=" rounded-md shadow-md p-1 ">
        <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
            <h2 className="font-bold mt-2 mb-1"> Modelo de Carroceria</h2>
          </div>      

          <p className="py-4 text-white text-sm">
          {dataVehicle ? 
              dataVehicle.bodywork ?
              dataVehicle.bodywork.nameModel : "Sem Info" :  "Sem Info"}
          </p>

        </div>
        </div>

        <div className="flex">
        <div className=" rounded-md shadow-md p-1 ">
        <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
            <h2 className="font-bold mt-2 mb-1"> Fabricante do Chassi</h2>
          </div>      

          <p className="py-4 text-white text-sm">
          {dataVehicle ? 
              dataVehicle.powertrain ?
              dataVehicle.powertrain.manufacturer ?
              dataVehicle.powertrain.manufacturer.name : "Sem Info" :  "Sem Info":  "Sem Info"}
          </p>

        </div>
        <div className=" rounded-md shadow-md p-1 ">
        <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
            <h2 className="font-bold mt-2 mb-1"> Modelo de Carroceria</h2>
          </div>      

          <p className="py-4 text-white text-sm">
          {dataVehicle ? 
              dataVehicle.powertrain ?
              dataVehicle.powertrain.nameModel : "Sem Info":  "Sem Info"}
          </p>

        </div>
        </div>

        <div className="flex">
        <div className=" rounded-md shadow-md p-1 ">
        <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
            <h2 className="font-bold mt-2 mb-1"> Operador do Veículo</h2>
          </div>      

          <p className="py-4 text-white text-sm">
            {dataVehicle ? dataVehicle.operator ? dataVehicle.operator.name : "Sem Operador": "Sem Operador"}
          </p>

        </div>
        <div className=" rounded-md shadow-md p-1 ">
        <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
          <h2 className="font-bold mt-2 mb-1">   
            Dia de Publicação
              </h2>
            </div>     

          <p className="py-4 text-white text-sm">
            { dataPost.dateCreate ? formatDate(dataPost.dateCreate.toString()) : "Sem informações de resumo."}
          </p>

          </div>
        </div>
      
       
      </div>

      
    </div>

    <div className="bg-primarybg-light text-text-light dark:bg-primarybg-dark dark:text-text-dark rounded-md shadow-md p-4 mt-8">
    <div className="inline-block rounded-lg dark:text-text-dark bg-orange-700 px-4">
          <h2 className="font-bold mt-2 mb-1">   
            COMENTÁRIOS
          </h2>
      </div>     

      <p className="py-4 text-black dark:text-text-dark ">
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
    }
   
    </main>
  );
}

  