"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getSession } from "next-auth/react";
import { Post } from "@/app/lib/definitions";
import FormularyPost from "@/app/ui/components/FormularyPost";
import HeaderSection from "@/app/ui/components/HeaderSection";
import ImageUploader from "@/app/ui/components/ImageUploader";
import MultiImageUploader from "@/app/ui/components/MultiImageUploader";
import ManagerUploads from "@/app/ui/components/ManagerUploads";


export default function Page({ params }: { params: { idPost: string } }) {
  const [dataPost, setDataPost] = useState<Post | null>(null);
  const { setValue } = useForm();
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Carregando...</p>;
  if (!dataPost) return <p>Post não encontrado.</p>;

  return (
    <main>
    <HeaderSection title={"Editor de Postagens"}></HeaderSection>
    <ManagerUploads dataPost={dataPost}></ManagerUploads>  
    <FormularyPost dataPost={dataPost} /> 
    </main>
  );
}
