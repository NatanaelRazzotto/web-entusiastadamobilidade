
import { useEffect, useState } from 'react';


import { fetchBookId, fetchBookUserId, fetchPostName } from '@/app/lib/data';
import { GetServerSideProps, Metadata } from 'next';
import { list } from 'postcss';
import Link from 'next/link';


import { ImagemViewer } from '@/app/ui/imageViewer/imagemViewer';
import { ListImagemViewer } from '@/app/ui/imageViewer/listImagemViewer';
import { BookOrder } from '@/app/lib/definitions';
import { useSession } from 'next-auth/react';


export default async function Page({ params }: { params: { idUser: string } }) {

  const { idUser: idUser } = params;
  console.log('Parâmetro namePost:', idUser);
 // const { data: session, status } = useSession();  

  let dataPost : BookOrder[] | null = null;
 
  let error = null;

  console.log("🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 ~ Page ~ idUser:", idUser)
 // console.log("🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 ~ Page ~ session.user.id:", session.user.id)

  try {

    if (!idUser){
      throw new Error('Este usuario nao é autorizado');
    }
    var response : BookOrder[] = await fetchBookUserId(idUser)
    console.log("🚀 ~ Page ~ response:", response)

    if (response.length == 0) {
      throw new Error('Não há dados');
    }
    
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
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    {dataPost[0] && dataPost[0].requestingUser ? "NOME: " + dataPost[0].requestingUser.name: ""}
                  </h2>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  TELEFONE: {dataPost[0] && dataPost[0].requestingUser ? dataPost[0].requestingUser.phone: ""}
                  </h2>
                </div>
                
              </div>
              <p className="text-lg font-medium text-gray-700 mb-4">
              
              </p>
              <p className="text-lg font-medium text-gray-700 mb-4">
                E-MAIL: {dataPost[0] && dataPost[0].requestingUser ? dataPost[0].requestingUser.email? dataPost[0].requestingUser.email : "Sem Informações": ""}
              </p>

            </div>

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
                  href={!orderImage.processing ? '../book/' + orderImage.id : orderImage.concluded ? orderImage.bookURL : ""}>
                     <div className="bg-white rounded-lg shadow-lg p-6">
  <div className="grid grid-cols-2 gap-4 mb-4">
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        {orderImage.title}
      </h2>
    </div>
    <div className="text-right">
      <h2 className="text-2xl font-semibold text-gray-800">
        TOTAL: R$ {orderImage.request ? orderImage.costValue : "00,00"}
      </h2>
    </div>
  </div>
  <p className="text-lg font-medium text-gray-700 mb-4">
    FOTOS SELECIONADAS: {orderImage.request ? orderImage.unit : "Sem informação"}
  </p>
  <ul className="list-disc list-inside text-gray-600 text-sm space-y-2">
    <li className={`text-${!orderImage.request ? 'red' : 'green'}-600`}>
      Fotos Selecionadas: {!orderImage.request ? "PENDENTE! Click Para Escolher." : "Pedido Realizado"}
    </li>
    <li className={`text-${!orderImage.request ? 'gray' : !orderImage.processing ? 'orange' : 'blue'}-600`}>
      Status do Pedido: {!orderImage.request ? "Aguardando etapa anterior." : !orderImage.processing ? "Solicitação em ANÁLISE" : "SEU QRCODE PIX ESTÁ SENDO GERADO!"}
    </li>
    <li className={`text-${!orderImage.processing ? 'gray' : !orderImage.paymentAccept ? 'orange' : 'blue'}-600`}>
      Status Pagamento: {!orderImage.processing ? "Aguardando etapa anterior." : !orderImage.paymentAccept ? "Aguardando PAGAMENTO" : "PAGAMENTO APROVADO"}
    </li>
    <li className={`text-${!orderImage.paymentAccept || !orderImage.processing ? 'gray' : !orderImage.concluded ? 'orange' : 'green'}-600`}>
      Fotos Selecionadas: {!orderImage.paymentAccept || !orderImage.processing ? "Aguardando etapa anterior." : !orderImage.concluded ? "Em Breve suas FOTOS DISPONÍVEIS" : "FOTOS DISPONÍVEIS"}
    </li>
  </ul>
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

  