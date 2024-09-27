'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import * as Popover from '@radix-ui/react-popover';
import { FiSearch, FiLoader } from 'react-icons/fi';
import { getCategoyrUrl } from "@/app/lib/utils";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchTerm === '') {
      setSearchResults([]);
      setOpen(false);
    }
  }, [searchTerm]);

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
    <div className="relative flex flex-col items-center p-4 text-white bg-black">
      {/* Container do Input e Botão */}
      <div className="flex items-center w-full">
        {/* Input de Pesquisa */}
        <input
          className="w-10/12 bg-gray-900 rounded-md p-2 text-white focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="Procurar por uma NOTÍCIA."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
        />
        {/* Botão de Pesquisa */}
        <button
          className="w-2/12 ml-2 rounded-md border border-white p-2 hover:bg-gray-800 flex items-center justify-center"
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? (
            <FiLoader className="animate-spin text-white" size={24} /> // Ícone de carregamento
          ) : (
            <FiSearch size={24} /> // Ícone de pesquisa padrão
          )}
        </button>
      </div>

      {/* Popover para Resultados */}
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Anchor className="w-full mt-2" /> {/* Anchor para posicionamento correto */}
        <Popover.Content
          align="start" // Alinhamento ao início do elemento pai
          sideOffset={5} // Distância em relação ao anchor
          className="w-10/12 bg-white text-black rounded-md shadow-lg z-10 max-h-60 overflow-y-auto"
        >
          {searchResults.length > 0 ? (
            searchResults.map((result) => (
              <Link
                key={result.id}
                href={`portal/${getCategoyrUrl(result.category)}/${result.namePost}`}
                className="block p-2 hover:bg-gray-200"
                onClick={() => setOpen(false)}
              >
                {result.title}
              </Link>
            ))
          ) : (
            <div className="p-2 text-red-500">Nenhum resultado encontrado.</div>
          )}
        </Popover.Content>
      </Popover.Root>

      {/* Mensagem de Erro */}
      <div
        className={`absolute top-full left-0 mt-2 p-2 bg-red-500 text-white rounded-md z-10 ${
          searchTerm.trim() === '' && open ? 'block' : 'hidden'
        }`}
      >
        Por favor, insira um termo de busca válido.
      </div>
    </div>
  );
}
