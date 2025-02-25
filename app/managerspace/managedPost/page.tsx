"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Post } from "@/app/lib/definitions";
import FormularyPost from "@/app/ui/components/FormularyPost";
import HeaderSection from "@/app/ui/components/HeaderSection";
import ManagerUploads from "@/app/ui/components/ManagerUploads";

export default function Page() {
    const defaultPost: Post = {
        id: "",
        namePost: "",
        title: "",
        content: "",
        category: 0, // Se for um enum, ajuste conforme necessário
        topNews: 0,  // Se for um enum, ajuste conforme necessário
        coverURL: "",
        published: false,
        authorId: "",
        dateCreate: new Date(), 
        dateEvent: new Date(), 
      };
      
      
      const [dataPost, setDataPost] = useState<Post>(defaultPost);
       

  return (
    <main>
      <HeaderSection title={"Criar Nova Postagem"} />
      <FormularyPost dataPost={dataPost} isEditing={false} />
    </main>
  );
}
