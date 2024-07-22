
"use client"; // Certifique-se de que este é um Client Component

import React, { useState } from "react";
import { Image, Post, Vehicle } from '../../lib/definitions';
import Link from "next/link";

export function ListImagemViewer({ dataPost }) {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  // Função para lidar com a seleção de imagem
  const toggleImageSelection = (imageId: string) => {
    setSelectedImages((prevSelected) => {
      if (prevSelected.includes(imageId)) {
        // Se já está selecionada, desmarcar
        return prevSelected.filter((id) => id !== imageId);
      } else {
        // Se não está selecionada, marcar
        return [...prevSelected, imageId];
      }
    });
  };

  // Função para salvar seleção
  const saveSelection = () => {
    // Lógica para salvar as seleções
    console.log("Imagens selecionadas:", selectedImages);
    // Aqui você pode adicionar a lógica para enviar os dados ao servidor ou outra ação desejada
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {dataPost.images.length === 0 ? (
          <p>Sem Imagens</p>
        ) : (
          (dataPost.images as Image[]).map((image: Image) => (
            <div
              key={image.id}
              className={`col-span-1 ${
                selectedImages.includes(image.id) ? "border-4 border-blue-500" : ""
              }`} // Estilo para imagem selecionada
              onClick={() => toggleImageSelection(image.id)}
            >
             
                <img
                  src={`https://drive.google.com/thumbnail?id=${image.pathURL}&sz=w1000`}
                  alt={image.title}
                  className="rounded-md w-full object-cover cursor-pointer"
                />
           
            </div>
          ))
        )}
      </div>
      <button
        onClick={saveSelection}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Salvar Seleção
      </button>
    </div>
  );
}
