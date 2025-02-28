"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Post } from "@/app/lib/definitions";
import FormularyPost from "@/app/ui/components/FormularyPost";
import HeaderSection from "@/app/ui/components/HeaderSection";
import ManagerUploads from "@/app/ui/components/ManagerUploads";

export default function Page({ params }: { params: { idPost?: string } }) {
  const [dataPost, setDataPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(!!params.idPost);

  useEffect(() => {
    async function fetchPost() {
      if (!params.idPost) return; // Se não há id, não busca o post

      try {
        const response = await fetch(`/api/postById?id=${params.idPost}`);
        const data: Post = await response.json();
        console.log("🚀 ~ fetchPost ~ data:", data)

        if (data) {
          setDataPost(data);
        }

        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar post:", error);
        setLoading(false);
      }
    }

    fetchPost();
  }, [params.idPost]);

  if (loading) return <p>Carregando...</p>;

  return (
    <main>
      <HeaderSection title={params.idPost ? "Editor de Postagens" : "Criar Nova Postagem"} />
     
      <FormularyPost dataPost={dataPost} isEditing={!!params.idPost} />
      {params.idPost && dataPost && <ManagerUploads dataPost={dataPost} />}
    </main>
  );
}
