"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Select from "@radix-ui/react-select";

import { CheckIcon } from "@heroicons/react/20/solid";
import { getSession } from "next-auth/react";
import { CategoryPost } from "@/app/lib/enums/categoryPost";
import { ChevronDownIcon } from "@radix-ui/themes";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

export default function Page({ params }: { params: { idPost: string } }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/postById?id=${params.idPost}`);
        const data = await response.json();
        console.log("🚀 ~ fetchPost ~ data:", data)

        if (data){
          // Popula os campos com os valores do banco
          setValue("namePost", data.namePost);
          setValue("title", data.title);
          setValue("category", data.category.toString());
          setValue("content", data.content);
          setValue("resume", data.resume);
          setValue("tagPost", data.tagPost || "");
          setValue("coverURL", data.coverURL);
          setValue("topNews", data.topNews.toString());
          setValue("published", data.published);

        }

        
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar post:", error);
        setLoading(false);
      }
    }

    fetchPost();
  }, [params.idPost, setValue]);

  async function handleUpdatePost(data) {
    try {
      const session = await getSession();

      const response = await fetch(`/api/post/${params.idPost}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        console.error(result.message);
      } else {
        const result = await response.json();
        console.log("Post atualizado com sucesso:", result.message);
      }
    } catch (error) {
      console.error("Erro ao atualizar post:", error);
    }
  }

  const handleSelectChange = (value) => setValue("topNews", Number(value));
  const handleSelectChangeCategory = (value) => setValue("category", Number(value));

  if (loading) return <p>Carregando...</p>;

  return (
    <form onSubmit={handleSubmit(handleUpdatePost)} className="space-y-6 max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
      {/* Nome do Post */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Name Post:</label>
        <input {...register("namePost", { required: true })} className="mt-1 p-2 border border-gray-300 rounded-md" />
        {errors.namePost && <span className="text-sm text-red-600 mt-1">Este campo é obrigatório</span>}
      </div>

      {/* Título */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Title:</label>
        <input {...register("title", { required: true })} className="mt-1 p-2 border border-gray-300 rounded-md" />
        {errors.title && <span className="text-sm text-red-600 mt-1">Este campo é obrigatório</span>}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Category:</label>
        <Select.Root onValueChange={handleSelectChangeCategory}>
        <Select.Trigger className="mt-1 flex items-center justify-between p-2 border border-gray-300 rounded-md bg-white">
          <Select.Value placeholder="Select option" />
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>

        <Select.Content className="bg-white border border-gray-300 rounded-md shadow-lg">
          <Select.ScrollUpButton className="flex justify-center py-2">
            <ChevronUpIcon />
          </Select.ScrollUpButton>

          <Select.Viewport className="p-2">
            {Object.entries(CategoryPost)
              .filter(([key, value]) => typeof value === "number") // filtra apenas as chaves do enum
              .map(([key, value]) => (
                <Select.Item
 
                  value={value.toString()} // converte o valor para string, necessário para o Select.Item
                  className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                >
                  <Select.ItemText>{key}</Select.ItemText>
                  <Select.ItemIndicator>
                    <CheckIcon className="w-5 h-5 text-green-500" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
          </Select.Viewport>

          <Select.ScrollDownButton className="flex justify-center py-2">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Root>
        {errors.category && <span className="text-sm text-red-600 mt-1">This field is required</span>}
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Content:</label>
        <textarea {...register("content")} className="mt-1 p-2 border border-gray-300 rounded-md" />
      </div>

      {/* Resumo */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Resume:</label>
        <input {...register("resume")} className="mt-1 p-2 border border-gray-300 rounded-md" />
      </div>

      {/* URL da Capa */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Cover URL:</label>
        <input {...register("coverURL")} className="mt-1 p-2 border border-gray-300 rounded-md" />
      </div>

      {/* Top News */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Top News:</label>
        <Select.Root onValueChange={handleSelectChange}>
          <Select.Trigger className="mt-1 flex items-center justify-between p-2 border border-gray-300 rounded-md bg-white">
            <Select.Value placeholder="Selecione um nível" />
            <Select.Icon>
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          <Select.Content className="bg-white border border-gray-300 rounded-md shadow-lg">
            <Select.Viewport className="p-2">
              {["No", "Top", "SubPrimeiro", "SubSegundo"].map((option, index) => (
                <Select.Item key={index} value={String(index)} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                  <Select.ItemText>{option}</Select.ItemText>
                  <Select.ItemIndicator>
                    <CheckIcon className="w-5 h-5 text-green-500" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Root>
      </div>

      {/* Publicado */}
      <div className="flex items-center">
        <input type="checkbox" {...register("published")} className="mr-2" />
        <label className="text-sm font-medium text-gray-700">Published</label>
      </div>

      {/* Botão de salvar */}
      <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Salvar Post</button>
    </form>
  );
}
