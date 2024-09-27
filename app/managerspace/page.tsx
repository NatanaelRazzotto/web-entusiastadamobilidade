"use client";
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { getSession } from "next-auth/react";

export default function Page() {
  const [images, setImages] = useState([]); // Guardar as imagens retornadas da API
  const [selectedImages, setSelectedImages] = useState([]); // Imagens selecionadas pelo usuário
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    // Buscar imagens na API
    fetch('/api/images-storage')
      .then(response => response.json())
      .then(data => {
        setImages(data); // Definir as imagens no estado
        console.log(data);
      });
  }, []);

  // Manipulador de seleção de imagens
  const handleSelectImage = (event, image) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      // Adicionar a imagem à lista de selecionadas
      setSelectedImages([...selectedImages, image]);
    } else {
      // Remover a imagem da lista de selecionadas
      setSelectedImages(selectedImages.filter(img => img.id !== image.id));
    }
  };

  // Função de envio do formulário
  async function handleCreateGoal(data) {

    try {
      // Obter a sessão no lado do cliente
      const session = await getSession();


      // Fazer algo com as imagens selecionadas

      // Aqui você pode enviar as imagens selecionadas para uma API, salvar no banco, etc.
    } catch (error) {
      console.error("Erro ao registrar categoria:", error);
    }
  }

  return (
    <div>
      <h1>Gerenciamento</h1>
      
      {/* Formulário */}
      <form onSubmit={handleSubmit(handleCreateGoal)}>
      <h2>Selecione as imagens:</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 mt-8">         
          
            {/* Renderizar a lista de imagens */}
            {images.map(image => (
             <div
             key={image.id}
             className="col-span-1">
                <input 
                  type="checkbox" 
                  value={image.id}
                  onChange={(e) => handleSelectImage(e, image)} 
                />
                <label>{image.name}</label>
                <img
                  src={`https://drive.google.com/thumbnail?id=${image.id}&sz=w1000`}
                  alt="Imagem da Matéria"
                  className="rounded-t-md w-full object-cover"
                />
                     </div>
            ))}
          
          
        </div>

        {/* Botão de envio */}
        <button type="submit">Salvar Seleção</button>
      </form>

      {/* Exibir erros de formulário, se houver */}

    </div>
  );
}
