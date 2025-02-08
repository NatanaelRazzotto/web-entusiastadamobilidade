'use client';

import { useEffect, useState } from "react";
import { FiSearch, FiLoader } from 'react-icons/fi';

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsLine, setSearchResultsLine] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      setOpen(true);
      return;
    } else {
      setOpen(false);
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/urbs-vehicle-schedule/${searchTerm}`);
      const data = await response.json();
      if (data.length > 0){
        const responseLine = await fetch(`http://localhost:4000/urbs-line-point/${data[0].codLinha}`);
        const dataLine = await responseLine.json();
        setSearchResultsLine(dataLine)
      }
       
      setSearchResults(data);
      setOpen(data.length > 0);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setIsLoading(false);
    }
  };

  function validateNamePoint(idPoint :string):string {
    console.log("🚀 ~ validateNamePoint ~ idPoint:", idPoint)
    if (searchResultsLine.length > 0){
      console.log("🚀 ~ validateNamePoint ~ searchResultsLine:", searchResultsLine)
      let point = searchResultsLine.find(point => {
       
        return point.NUM == idPoint
      })
      console.log("🚀 ~ validateNamePoint ~ point:", point)
      return point.NOME
    }
    return "Sem info"
  }



  return (
    <main className="flex flex-col p-6">
      <div className="container mx-auto">
        <div className="relative flex flex-col items-center p-4 text-white bg-black">
          <div className="flex items-center w-full">
            <input
              className="w-10/12 bg-gray-900 rounded-md p-2 text-white focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Procurar por um VEÍCULO."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
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
          <div
            className={`absolute top-full left-0 mt-2 p-2 bg-red-500 text-white rounded-md z-10 ${
              searchTerm.trim() === '' && open ? 'block' : 'hidden'
            }`}
          >
            Por favor, insira um termo de busca válido.
          </div>
        </div>

        {/* Resultados da Pesquisa */}
        {searchResults.length > 0 && (
              <div className="p-4 bg-gray-800 text-white rounded-md shadow-md">
                 <h3 className="text-lg font-bold">TABELA DE OPERACAO</h3>
                <h3 className="text-lg "> Veículo: {searchResults[0].veiculo || 'Nome não disponível'}</h3>
              
                
              </div>
        )}

        {searchResults.length > 0 && (
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {searchResults.map((result, index) => (
              <div key={index} className="p-4 bg-gray-800 text-white rounded-md shadow-md">
                <h3 className="text-lg font-bold"> {result.codLinha || '000'} - {result.nomeLinha || 'Nome não disponível'}</h3>
                <p className="text-sm">Ponto: {validateNamePoint(result.codPonto) || 'Sem ponto'}</p>
                <p className="text-sm">Horário: {result.horario || 'N/A'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
