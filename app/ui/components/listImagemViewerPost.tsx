'use client'; // Certifique-se de que este é um Client Component

import React, { useEffect, useState } from "react";
import { Image } from '../../lib/definitions';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { PopupOrder } from "../imageViewer/popupOrder";

// Função para gerar URL com marca d'água
const getWatermarkedImageUrl = (imageUrl: string) => {
  return `/api/watermark?imageUrl=${encodeURIComponent(imageUrl)}`;
};

interface ImageManager {
  imageId: number;
  requestImage: boolean;
  image?: Image | null;
}

export function ListImagemViewerPost({ dataPost, handleSave }: { dataPost: Post; handleSave: (selectedImages: any) => void }) {
  const [selectedImages, setSelectedImages] = useState<number[]>([]); // Array de IDs de imagens selecionadas
  const [edit, setEdit] = useState<boolean>(true);
  const router = useRouter();

  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };
    fetchSession();
  }, []);

  // Função para alternar a seleção de imagem
  const toggleImageSelection = (imageId: number) => {
    setSelectedImages((prevSelected) => {
      // Se a imagem já estiver selecionada, remove ela, caso contrário, adiciona
      if (prevSelected.includes(imageId)) {
        return prevSelected.filter((id) => id !== imageId);
      } else {
        return [...prevSelected, imageId];
      }
    });
  };


  // Verifica se a imagem está selecionada
  const isImageSelected = (imageId: number) => {
    return selectedImages.includes(imageId);
  };

  return (
    <div>
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-8">
        {!dataPost ? (
          <p>Sem Imagens</p>
        ) : (
          (dataPost.images as Image[]).map((imagesPost: Image) => (
            <div
              key={imagesPost.id}
              className={`col-span-1 ${isImageSelected(imagesPost.id) ? "border-4 border-blue-500" : ""}`} // Estilo para imagem selecionada
              onClick={() => toggleImageSelection(imagesPost.id)} // Alterna a seleção da imagem ao clicar
              style={{ position: 'relative' }} // Torna o contêiner da imagem um contexto de posicionamento
            >
              <img
                   src={`https://drive.google.com/thumbnail?id=${imagesPost.pathURL}&sz=w1000`}
                alt={imagesPost.title}
                className="rounded-md w-full object-cover cursor-pointer"
              />
              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  background: 'rgba(255, 255, 255, 0.5)',
                  padding: '5px',
                  borderRadius: '5px',
                  pointerEvents: 'none',
                }}
              >
                <span style={{ color: 'black', fontWeight: 'bold' }}>{imagesPost.id}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {edit && selectedImages.length > 0 && (
        <div className="flex justify-end mt-8">
          <button
            onClick={() => handleSave(selectedImages)}
            className="bg-orange-700 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded"
          >
            Salvar Seleção
          </button>
        </div>
      )}
      
    </div>
  );
}
