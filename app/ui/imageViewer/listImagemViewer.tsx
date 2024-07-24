'use client'; // Certifique-se de que este é um Client Component

import React, { useState } from "react";
import { Image, OrderImage, Post, Vehicle } from '../../lib/definitions';
import Link from "next/link";
import { saveSelection } from './serverActions';
import { alterOrderImageId } from "@/app/lib/data";

export function ListImagemViewer({ dataPost }) {
  const [selectedImages, setSelectedImages] = useState<OrderImage[]>([]);

  // Função para lidar com a seleção de imagem
  const toggleImageSelection = (order: OrderImage) => {
    setSelectedImages((prevSelected) => {
      const existingIndex = prevSelected.findIndex((selected) => selected.imageId === order.imageId);

      if (existingIndex !== -1) {
        // Se já está selecionada, atualizar suas propriedades ou remover
        const updatedSelection = [...prevSelected];
        const existingOrder = updatedSelection[existingIndex];

        // Atualize as propriedades conforme necessário
        updatedSelection[existingIndex] = {
          ...existingOrder,
          requestImage: !existingOrder.requestImage, // alternar o valor booleano
        };

        return updatedSelection;
      } else {
        // Se não está selecionada, marcar
        console.log("🚀 ~ setSelectedImages ~ order:", order)
        order.requestImage = true//!order.requestImage;
        console.log("a ~ setSelectedImages ~ order:", order)
      
        return [...prevSelected, order];
      }
    });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {dataPost.orderImages.length === 0 ? (
          <p>Sem Imagens</p>
        ) : (
          (dataPost.orderImages as OrderImage[]).map((orderImage: OrderImage) => (
            <div
              key={orderImage.id}
              className={`col-span-1 ${
                selectedImages.some((selected) => selected.imageId === orderImage.imageId) ? "border-4 border-blue-500" : ""
              }`} // Estilo para imagem selecionada
              onClick={() => toggleImageSelection(orderImage)}
            >
              <img
                src={`https://drive.google.com/thumbnail?id=${orderImage.image.pathURL}&sz=w1000`}
                alt={orderImage.image.title}
                className="rounded-md w-full object-cover cursor-pointer"
              />
            </div>
          ))
        )}
      </div>
      <button
        onClick={() => alterOrderImageId(selectedImages)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Salvar Seleção
      </button>
    </div>
  );
}
