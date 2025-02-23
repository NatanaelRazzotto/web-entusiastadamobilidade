"use client";
import HeaderSection from "@/app/ui/components/HeaderSection";
import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { useForm } from "react-hook-form";
import { FiLoader, FiSearch } from "react-icons/fi";
import Link from "next/link";

export default function Page() {
    const [selectedPost, setSelectedPost] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
     const [searchResults, setSearchResults] = useState([]);
     const { register, handleSubmit, setValue, formState: { errors } } = useForm();

     const handleSelectPost = (post) => {
        setSelectedPost(post);
        //setValue("post", post.id);
        setOpen(false);
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

    return (
        <main>
            <HeaderSection title={"Gerenciador de Postagens"}></HeaderSection>
            {/* <form onSubmit={handleSubmit(handleCreateGoal)}> */}
                
                    <div className="relative flex flex-col items-center p-4 text-white bg-black">
                      <div className="flex items-center w-full">
                        <input
                          className="w-10/12 bg-gray-900 rounded-md p-2 text-white focus:outline-none focus:ring focus:ring-blue-500"
                          placeholder="Procurar por um POST."
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
            
                    {selectedPost ? (
                    <>
                        <p>Post Selecionado: {selectedPost.title}</p> 
                        <Link href={`/managerspace/managedPost/${selectedPost.id}`}>
                        <button className="bg-orange-700 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded">
                            Editar o POST
                        </button>
                        </Link>
                    </>
                    ) : ""}

                    {errors.post && (
                      <span className="text-sm text-red-600 mt-1">
                        Este campo é obrigatório
                      </span>
                    )}
            {/* </form> */}
        </main>
        
    )
}