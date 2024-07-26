
'use client'
import { fetchPostTitle } from "@/app/lib/data";
import { Post } from "@/app/lib/definitions";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SearchBar() {
    
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (searchTerm === '') {
          setSearchResults([]);
          setShowPopup(false);
        }
        
      }, [searchTerm]);

    const handleSearch = async () => {

        if (searchTerm.trim() === '') {
            setShowPopup(true);
            return;
        }
        else{
            setShowPopup(false);
        }

          
        try {
            console.log("🚀 ~ handleSearch ~ handleSearch:", searchTerm)
            const response = await fetch(`/api/post?searchTerm=${searchTerm}`);
            const data = await response.json();        
            console.log("🚀 ~ handleSearch ~ responset:", data)
            console.log("🚀 ~ handleSearch ~ response:", response)
            setSearchResults(data);
        } catch (error) {
          console.error('Error searching:', error);
        }
      };
   
    

      return (
        
        <div className="relative p-4 text-white bg-black flex items-center">
          <input
            className="w-10/12 bg-black rounded-md p-2"
            placeholder="Procurar por uma NOTÍCIA."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="w-2/12 ml-2 rounded-md border border-white p-2 hover:bg-slate-950"
            onClick={handleSearch}
          >
            <span className="block md:hidden">P</span>
            <span className="hidden md:block">Pesquisar</span>
          </button>
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white text-black rounded-md z-10">
              {searchResults.map((result) => (
                <div key={result.id} className="p-2 border-b border-gray-200">
                  <Link className="hover:text-gray-500" href={`portal/post/${result.namePost}`}>
                    {result.title}
                  </Link>
                </div>
              ))}
            </div>
          )}
          {showPopup && (
            <div className="absolute top-full left-0 mt-2 p-2 bg-red-500 text-white rounded-md z-10">
              Por favor, insira um termo de busca válido.
            </div>
          )}
        </div>
      );
    }
  