"use client";
import HeaderSection from "@/app/ui/components/HeaderSection";
import { useEffect, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { useForm } from "react-hook-form";
import { FiLoader, FiSearch } from "react-icons/fi";
import Link from "next/link";
import { ListImagemViewerPost } from "@/app/ui/components/listImagemViewerPost";
import { PopupOrder } from "@/app/ui/imageViewer/popupOrder";
import { List } from "postcss/lib/list";

export default function Page({ params }: { params: { idPost: string } }) {
   
      const [dataPost, setDataPost] = useState<Post | null>(null);
      const { setValue } = useForm();
      const [loading, setLoading] = useState(true);
        const [serverResponse, setServerResponse] = useState(null); // Estado para armazenar a resposta do servidor
      
     // Função para fechar o popup
  const closePopup = () => {
    setServerResponse(null);
    //router.push('/'); // redirecionar para a página desejada
  };

      useEffect(() => {
        async function fetchPost() {
          try {
            const response = await fetch(`/api/postById?id=${params.idPost}`);
            const data: Post = await response.json();
            console.log("🚀 ~ fetchPost ~ data:", data);
    
            if (data) {
              setDataPost(data); // 🔹 Passamos os dados para o estado
            }
    
            setLoading(false);
          } catch (error) {
            console.error("Erro ao buscar post:", error);
            setLoading(false);
          }
        }
    
        fetchPost();
      }, [params.idPost]);

        // Função para salvar as seleções
    const handleSaveSelection = async (selectedImages : Array<number>) => {
      try {

        if (selectedImages.length <= 0)
        {
          return;
        }

        const payload = {
          imagesForRemove: selectedImages, // Agora envia o array de objetos
        };
  
        console.log("🚀 ~ handlePathImages ~ payload:", payload)        
    
        const response = await fetch("/api/migrator-lot-images", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${session.accessToken}`,
          },
          body: JSON.stringify(payload),
        });
    
        if (!response.ok) {
          const result = await response.json();
          console.error(result.message);
           //setEdit(false);
          setServerResponse("response"); // Armazena a resposta do servidor no estado
        } else {
          const result = await response.json();
          console.log(result.message);
           //setEdit(false);
           setServerResponse("response"); // Armazena a resposta do servidor no estado
        }
      } catch (error) {
        console.error("Erro ao registrar categoria:", error);
      }
    };

   
    return (
        <main>
            <HeaderSection title={"Gerenciador de Migração"}></HeaderSection>
            <ListImagemViewerPost dataPost={dataPost} handleSave={handleSaveSelection}></ListImagemViewerPost>

            {serverResponse && (
            <PopupOrder
              titulo="Agradecemos pela Escolha!"
              message="Seleção Enviada!"
              message2="Você pode acompanhar o Andamento:"
              message3="Pelo SITE ou nosso WHATSAPP."
              onClose={closePopup} // Função para fechar o popup
            />
      )}
        </main>
        
    )
}