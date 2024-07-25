
import { useEffect, useState } from 'react';


import { fetchBookId, fetchBookUserId, fetchPostName } from '@/app/lib/data';
import { GetServerSideProps, Metadata } from 'next';
import { list } from 'postcss';
import Link from 'next/link';


import { ImagemViewer } from '@/app/ui/imageViewer/imagemViewer';
import { ListImagemViewer } from '@/app/ui/imageViewer/listImagemViewer';
import { BookOrder } from '@/app/lib/definitions';


export default async function Page({ params }: { params: { idUser: string } }) {

  const { idUser: idUser } = params;
  console.log('Parâmetro namePost:', idUser);

  let dataPost : BookOrder[] | null = null;
 
  let error = null;

  try {
    var response : BookOrder[] = await fetchBookUserId(idUser)
    
    if (response == null) {
      throw new Error('Erro na busca de dados');
    }

    dataPost = response
  
  
  } catch (err) {
    error = err.message;
  }

  if (error) {
    return <div>Erro: {error}</div>;
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
                PÁGINA DO CLIENTE
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
              <h2 className="font-bold mt-2 mb-1">BEM VINDO!</h2>
            </div>
            <p className="py-4 text-black">
              {""}
            </p>
          </div>
          
          <div className="bg-white rounded-md shadow-md p-4 mt-8">
            <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
              <h2 className="font-bold mt-2 mb-1">ESTES SÃO OS SEUS PEDIDOS</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {dataPost.length === 0 ? (
                <p>Sem Pedidos</p>
              ) : (
                (dataPost as BookOrder[]).map((orderImage: BookOrder) => (
                  <Link
                  key={orderImage.id}
                  href={'book/' + orderImage.id}>
                       <div className="bg-white rounded-md shadow-md">
                            <div className="p-4">
                            <h2 className="text-xl font-bold">
                              {orderImage.title}
                            </h2>
                            <h2 className="text-xl font-bold">
                              VALOR DO PEDIDO: {orderImage.costValue}
                            </h2>
                            <ul className="list-disc list-inside text-gray-600 text-sm">
                              <li>Fotos Selecionadas : {!orderImage.request ? "PENDENTE! Click Para Escolher." : "Pedido Realizado"}</li>
                              <li>Status do Pedido: {!orderImage.request ? "Aguardando etapa anterior.": !orderImage.processing ? "Solicitação em ANALISE" : "SEU QRCODE PIX ESTÁ SENDO GERADO!"}</li>
                              <li>Fotos Selecionadas : {!orderImage.request && !orderImage.processing ? "Aguardando etapa anterior.":  !orderImage.concluded ? "Acesse para escolher" : "FOTOS DISPONIVEIS"}</li>

                            </ul>
                          </div>
                        </div>
              
                  </Link>
                ))
              )}
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

  