"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getSession } from "next-auth/react";
import { FiLoader, FiSearch } from "react-icons/fi";
import * as Popover from "@radix-ui/react-popover";
import Link from "next/link";

import { CheckIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon } from "@radix-ui/themes";

export default function Page() {
  const [images, setImages] = useState([]);
  const [folders, setFolders] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    fetch("/api/path-storage")
      .then((response) => response.json())
      .then((data) => setFolders(data));
  }, []);
 
  useEffect(() => {
    if (selectedCategory) {
      const fetchFolders = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/images-storage?category=${selectedCategory}`); // Adiciona o parâmetro na rota
          const data = await response.json();
          setImages(data); // Atualiza as pastas baseadas na categoria
        } catch (error) {
          console.error('Erro ao buscar pastas:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchFolders();
    }
  }, [selectedCategory]); // Dispara o useEffect quando a categoria selecionada muda

  const handleSelectChangeCategory = (value) => {
    setSelectedCategory(value); // Atualiza o estado da categoria selecionada
    setValue('category', value); // Atualiza o valor do formulário
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      setOpen(true);
      return;
    } else {
      setOpen(false);
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/post?searchTerm=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);
      setOpen(data.length > 0);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPost = (post) => {
    setSelectedPost(post);
    setValue("post", post.id);
    setOpen(false);
  };

  async function handleCreateGoal(data) {
    try {
      // Converte as imagens de volta para objetos
      const parsedImages = data.images.map(imageStr => JSON.parse(imageStr));
  
      const payload = {
        
        ...data,
        images: parsedImages, // Agora envia o array de objetos
      };

      console.log("🚀 ~ handleCreateGoal ~ payload:", payload)
  
   
  
      const response = await fetch("/api/post-image", {
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
      } else {
        const result = await response.json();
        console.log(result.message);
      }
    } catch (error) {
      console.error("Erro ao registrar categoria:", error);
    }
  }
  

  return (
    <div>
      <h1>Gerenciamento</h1>      

      <form onSubmit={handleSubmit(handleCreateGoal)}>
        <h2>Selecione o Post:</h2>
        <div className="relative flex flex-col items-center p-4 text-white bg-black">
          <div className="flex items-center w-full">
            <input
              className="w-10/12 bg-gray-900 rounded-md p-2 text-white focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Procurar por uma NOTÍCIA."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <button
              className="w-2/12 ml-2 rounded-md border border-white p-2 hover:bg-gray-800 flex items-center justify-center"
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? (
                <FiLoader className="animate-spin text-white" size={24} />
              ) : (
                <FiSearch size={24} />
              )}
            </button>
          </div>

          <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Anchor className="w-full mt-2" />
            <Popover.Content
              align="start"
              sideOffset={5}
              className="w-10/12 bg-white text-black rounded-md shadow-lg z-10 max-h-60 overflow-y-auto"
            >
              {searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="block p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSelectPost(result)}
                  >
                 {result.title}
                  </div>
                ))
              ) : (
                <div className="p-2 text-red-500">Nenhum resultado encontrado.</div>
              )}
            </Popover.Content>
          </Popover.Root>

          <div
            className={`absolute top-full left-0 mt-2 p-2 bg-red-500 text-white rounded-md z-10 ${
              searchTerm.trim() === "" && open ? "block" : "hidden"
            }`}
          >
            Por favor, insira um termo de busca válido.
          </div>
        </div>

        {selectedPost && <p>Post Selecionado: {selectedPost.title}</p>}
        {errors.post && (
          <span className="text-sm text-red-600 mt-1">
            Este campo é obrigatório
          </span>
        )}

        <h2>Selecione o Path Drive:</h2>
        <div className="flex flex-col">
          <Select.Root onValueChange={handleSelectChangeCategory}>
            <Select.Trigger className="mt-1 flex items-center justify-between p-2 border border-gray-300 rounded-md bg-white">
              <Select.Value placeholder="Selecione uma pasta" />
              <Select.Icon>
                <ChevronDownIcon />
              </Select.Icon>
            </Select.Trigger>

            <Select.Content className="bg-white border border-gray-300 rounded-md shadow-lg">
              <Select.ScrollUpButton className="flex justify-center py-2">
                <ChevronUpIcon />
              </Select.ScrollUpButton>

              <Select.Viewport className="p-2">
                {folders.map((folder) => (
                  <Select.Item
                    key={folder.id}
                    value={folder.id} // ID da pasta
                    className="flex items-center text-black justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                  >
                    <Select.ItemText    className="text-black" >{folder.name}</Select.ItemText> {/* Nome da pasta */}
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

        <h2>Selecione as imagens:</h2>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
        {images.map((image) => (
  <div key={image.id} className="col-span-1">
    <input
      type="checkbox"
      value={JSON.stringify({ id: image.id, name: image.name })} // Envia o objeto como string
      {...register("images", { required: true })}
    />
    <label>{image.name}</label>
    <img
      src={`https://drive.google.com/thumbnail?id=${image.id}&sz=w1000`}
      alt="Imagem da Matéria"
      className="rounded-t-md w-full object-cover"
    />
  </div>
))}

        </div>

        <button type="submit">Salvar Seleção</button>
      </form>
    </div>
  );
}
