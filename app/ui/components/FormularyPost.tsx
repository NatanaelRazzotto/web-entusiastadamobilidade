import { useForm } from "react-hook-form";
import * as Select from "@radix-ui/react-select";
import { CheckIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@radix-ui/themes";
import { Post } from "@/app/lib/definitions";
import { CategoryPost } from "@/app/lib/enums/categoryPost";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { PopupOrder } from "../imageViewer/popupOrder";

import ReactMarkdown from 'react-markdown';
import ManagerCoverPost from "./ManagerCoverPost";

export default function FormularyPost({ dataPost, isEditing }: { dataPost?: Post; isEditing: boolean }) {

  const topNewsOptions = ["No", "Top", "SubPrimeiro", "SubSegundo"];
  const [selectedTopNews, setSelectedTopNews] = useState<string>(dataPost.topNews.toString());
  
  const [selectedCategory, setSelectedCategory] = useState<string>(dataPost.category.toString());
  const { register, handleSubmit, setValue, watch ,formState: { errors } } = useForm();

  const content = watch("content");

  const title = watch("title"); // Observe o campo "title"

  useEffect(() => {
    if (title && !isEditing) { // Se o campo "title" tiver um valor
      const namePost = title
        .toLowerCase() // Converte para minúsculas
        .replace(/[^a-z0-9]+/g, "-"); // Substitui caracteres não alfanuméricos por "-"
      setValue("namePost", namePost); // Define o valor do campo "namePost"
    }
  }, [title, setValue]); // O useEffect depende do valor de "title" e da função "setValue"


  const [serverResponse, setServerResponse] = useState(null); // Estado para armazenar a resposta do servidor
      
    // Função para fechar o popup
  const closePopup = () => {
  setServerResponse(null);
  //router.push('/'); // redirecionar para a página desejada
  };

  useEffect(() => {
    if (dataPost) {
      setValue("namePost", dataPost.namePost);
      setValue("title", dataPost.title);
      setSelectedCategory(dataPost.category.toString()); 
      setValue("content", dataPost.content);
      setValue("resume", dataPost.resume);
      setValue("tagPost", dataPost.tagPost || "");
  
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

        const method = isEditing ? "PUT" : "POST";      

        const endpoint = isEditing ? `/api/post/${dataPost?.id}` : "/api/post";

        const response = await fetch(endpoint, {
          method,
          headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`,
              },
          body: JSON.stringify(data),
        });
  
         if (!response.ok) {
          const result = await response.json();
          console.error(result.message);
          setServerResponse("NAO REALIZADO");
        } else {
          const result = await response.json();
          console.log("Post atualizado com sucesso:", result.message);
          setServerResponse(result.message);
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
    
      // Função para inserir caracteres no cursor atual do textarea
      function insertAtCursor(
        fieldName: string, 
        text: string, 
        setValue: (name: string, value: any) => void, 
        watch: (name: string) => any
      ) {
        const currentValue = watch(fieldName) || "";
        setValue(fieldName, currentValue + text);
      }

      const handleFormat = (format: "bold" | "italic" | "newline") => {
        const fieldName = "content";
        const textarea = document.getElementById("contentTextarea") as HTMLTextAreaElement;
    
        if (!textarea) return;
    
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const content = watch(fieldName) || "";
    
        let formattedText = content.substring(start, end);
    
        // Aplica a formatação Markdown correta
        if (format === "bold") {
          formattedText = `**${formattedText}**`; // Markdown para negrito
        } else if (format === "italic") {
          formattedText = `*${formattedText}*`; // Markdown para itálico
        } else if (format === "newline") {
          formattedText = "\n"; // Markdown para nova linha
        }
    
        const newContent = content.substring(0, start) + formattedText + content.substring(end);
        setValue(fieldName, newContent);
    
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + formattedText.length;
          textarea.focus();
        }, 0);
      };
      
      
      
   return (
      
      <>
        {serverResponse && (
            <PopupOrder
              titulo="Agradecemos pela Escolha!"
              message={serverResponse}
              message2="Você pode acompanhar o Andamento:"
              message3="Pelo SITE ou nosso WHATSAPP."
              onClose={closePopup} // Função para fechar o popup
            />
      )}

      {isEditing ? 
      <ManagerCoverPost dataPost={dataPost}></ManagerCoverPost>
      
      :""

      }


      <form onSubmit={handleSubmit(handleUpdatePost)} className="space-y-6 max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
        {/* Nome do Post */}
        <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700">Title:</label>
      <input {...register("title", { required: true })} className="mt-1 p-2 border border-gray-300 rounded-md" />
      {errors.title && <span className="text-sm text-red-600 mt-1">Este campo é obrigatório</span>}
    </div>

    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700">Name Post:</label>
      <input {...register("namePost", { required: true })} className="mt-1 p-2 border border-gray-300 rounded-md" />
      {errors.namePost && <span className="text-sm text-red-600 mt-1">Este campo é obrigatório</span>}
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


      {/* Botões para inserir caracteres */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Content:</label>

        <div className="flex gap-2 mb-2">
          <button type="button" onClick={() => handleFormat("bold")} className="p-2 border rounded">
            𝗕
          </button>
          <button type="button" onClick={() => handleFormat("italic")} className="p-2 border rounded">
            𝘐
          </button>
          <button type="button" onClick={() => handleFormat("newline")} className="p-2 border rounded">
            ↵
          </button>
        </div>

        <textarea
          id="contentTextarea"
          {...register("content", { required: true })}
          className="mt-1 p-2 border border-gray-300 rounded-md"
        />

     </div>
  
        {/* Resumo */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Resume:</label>
          <input {...register("resume")} className="mt-1 p-2 border border-gray-300 rounded-md" />
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
      </>
    );
}
