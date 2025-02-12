import { useForm } from "react-hook-form";
import * as Select from "@radix-ui/react-select";
import { CheckIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@radix-ui/themes";
import { Post } from "@/app/lib/definitions";
import { CategoryPost } from "@/app/lib/enums/categoryPost";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

export default function FormularyPost({ dataPost }: { dataPost: Post;}) {
  const topNewsOptions = ["No", "Top", "SubPrimeiro", "SubSegundo"];
  const [selectedTopNews, setSelectedTopNews] = useState<string>(dataPost.topNews.toString());
  
  const [selectedCategory, setSelectedCategory] = useState<string>(dataPost.category.toString());
  const { register, handleSubmit, setValue ,formState: { errors } } = useForm();

  useEffect(() => {
    if (dataPost) {
      setValue("namePost", dataPost.namePost);
      setValue("title", dataPost.title);
      setSelectedCategory(dataPost.category.toString()); 
      setValue("content", dataPost.content);
      setValue("resume", dataPost.resume);
      setValue("tagPost", dataPost.tagPost || "");
      setValue("coverURL", dataPost.coverURL);
      setSelectedTopNews(dataPost.topNews.toString());
      setValue("published", dataPost.published);
    }
  }, [dataPost, setValue]);

  const handleSelectChangeTopNews = (value: string) => {
      setValue("topNews", Number(value));
      setSelectedTopNews(value);
    };
    
    // Função para obter o nome da opção de Top News
    const getTopNewsLabel = (value: string) => {
      return topNewsOptions[Number(value)] || "Selecione um nível";
    };
    
    // Função para pegar o nome da categoria pelo valor
    const getCategoryName = (value: string) => {
      const categoryKey = Object.keys(CategoryPost).find(
        (key) => CategoryPost[key as keyof typeof CategoryPost] === Number(value)
      );
      return categoryKey || "Selecione uma categoria";
    };
  
    async function handleUpdatePost(data) {
      try {
        const session = await getSession();
  
        const response = await fetch(`/api/post/${"params.idPost"}`, {
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
  
    const handleSelectChangeCategory = (value: string) => {
      setValue("category", Number(value));
      setSelectedCategory(value); // Atualiza o estado local para refletir no Select
    };
  

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
          <Select.Root 
    value={selectedCategory} 
    onValueChange={handleSelectChangeCategory}
  >
    <Select.Trigger className="mt-1 flex items-center justify-between p-2 border border-gray-300 rounded-md bg-white">
      <Select.Value>{getCategoryName(selectedCategory)}</Select.Value>
      <Select.Icon>
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>
  
    <Select.Content className="bg-white border border-gray-300 rounded-md shadow-lg">
      <Select.Viewport className="p-2">
        {Object.entries(CategoryPost)
          .filter(([key, value]) => typeof value === "number") 
          .map(([key, value]) => (
            <Select.Item
              key={value}
              value={value.toString()} // O value precisa ser exatamente igual ao selectedCategory
              className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer"
            >
              <Select.ItemText>{key}</Select.ItemText>
              <Select.ItemIndicator>
                <CheckIcon className="w-5 h-5 text-green-500" />
              </Select.ItemIndicator>
            </Select.Item>
          ))}
      </Select.Viewport>
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
    <Select.Root value={selectedTopNews} onValueChange={handleSelectChangeTopNews}>
      <Select.Trigger className="mt-1 flex items-center justify-between p-2 border border-gray-300 rounded-md bg-white">
        <Select.Value>{getTopNewsLabel(selectedTopNews)}</Select.Value>
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
  
      <Select.Content className="bg-white border border-gray-300 rounded-md shadow-lg">
        <Select.Viewport className="p-2">
          {topNewsOptions.map((option, index) => (
            <Select.Item
              key={index}
              value={String(index)} // Garante que o valor seja o mesmo do banco
              className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer"
            >
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
