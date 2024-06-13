"use client";

import { useEffect, useState } from 'react';

export default function Page({ params }: { params: { namePost: string } }) {
  const [data, setData] = useState<{ title: string; content: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // Função a ser executada quando namePost é recebido
  const fetchData = async (namePost: string) => {
    try {
      // Simulação de uma chamada API
      console.log(`Fetching data for post: ${namePost}`);
      // const response = await fetch(`/api/posts/${namePost}`);
      // const data = await response.json();
      // setData(data);

      // Para demonstração, usaremos um setTimeout para simular uma chamada API
      setTimeout(() => {
        setData({ title: `Post: ${namePost}`, content: 'This is the post content.' });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  // useEffect para chamar fetchData quando namePost muda
  useEffect(() => {
    if (params.namePost) {
      fetchData(params.namePost);
    }
  }, [params.namePost]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // return (
  //   <div>
  //     <h1>{data?.title}</h1>
  //     <p>{data?.content}</p>
  //   </div>
    
  // );
  return (
    <main>
      <div className="container mx-auto px-4">
        <div className="relative bottom-0 left-0 p-4 text-white bg-black bg-opacity-75">
          <h2 className="text-xl font-bold">
            Matéria: Título da Matéria
          </h2>
          <p className="text-sm">
            Subtítulo da Matéria
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          <div className="col-span-2">
            <img
              src="https://picsum.photos/800/400"
              alt="Imagem da Matéria"
              className="rounded-t-md w-full object-cover"
            />
          </div>
          <div className="col-span-1">
            <div className="bg-white rounded-md shadow-md p-4">
              <h3 className="text-lg font-bold">
                Resumo da Matéria
              </h3>
              <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md shadow-md p-4 mt-8">
          <h3 className="text-lg font-bold">
            Conteúdo da Matéria
          </h3>
          <p className="text-gray-600 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          <div className="col-span-1">
            <img
              src="https://picsum.photos/400/200"
              alt="Foto 1"
              className="rounded-md w-full object-cover"
            />
          </div>
          <div className="col-span-1">
            <img
              src="https://picsum.photos/400/200"
              alt="Foto 2"
              className="rounded-md w-full object-cover"
            />
          </div>
          <div className="col-span-1">
            <img
              src="https://picsum.photos/400/200"
              alt="Foto 3"
              className="rounded-md w-full object-cover"
            />
          </div>
          {/* Adicione mais fotos aqui */}
        </div>

        <div className="flex justify-end mt-8">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Voltar para a página principal
          </button>
        </div>
      </div>
    </main>
  );
}

  