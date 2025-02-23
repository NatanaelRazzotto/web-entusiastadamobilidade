import { useEffect, useState } from "react";
import { FiLoader, FiSearch } from "react-icons/fi";
import * as Popover from "@radix-ui/react-popover";
import { useForm } from "react-hook-form";
import MultiImageUploader, { UploadDTO } from "./MultiImageUploader";
import { OperationalVehicle, Post } from "@/app/lib/definitions";

export default function ManagerUploads({ dataPost }: { dataPost: Post}) {
  
   const [isLoading, setIsLoading] = useState(false);
  //  const [selectedCategory, setSelectedCategory] = useState('');
   const [dataUpload, setUploadDTO] = useState<UploadDTO | null>(null);

   const [searchTermVehicle, setSearchTermVehicle] = useState("");
   const [selectedVehicle, setSelectedVehicle] = useState(null);
   const [openVehicle, setOpenVehicle] = useState(false);
   const [isLoadingVehicle, setIsLoadingVehicle] = useState(false);
   const [searchResultsVehicle, setSearchResultsVehicle] = useState([]);
 
   const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    //  useEffect(() => {
    //    const fetchSession = async () => {
    //      const session = await getSession();
   
    //      setSession(session);
   
    //    };
    //    fetchSession();
    //  }, []);
   
 
  //  useEffect(() => {
  //    fetch("/api/path-storage")
  //      .then((response) => response.json())
  //      .then((data) => setFolders(data));
  //  }, []);
   
  
  //  useEffect(() => {
  //    if (selectedCategory) {
  //      const fetchFolders = async () => {
  //        setIsLoading(true);
  //        try {
  //          const response = await fetch(`/api/images-storage?category=${selectedCategory}`); // Adiciona o parâmetro na rota
  //          const data = await response.json();
  //          setImages(data); // Atualiza as pastas baseadas na categoria
  //        } catch (error) {
  //          console.error('Erro ao buscar pastas:', error);
  //        } finally {
  //          setIsLoading(false);
  //        }
  //      };
  //      fetchFolders();
  //    }
  //  }, [selectedCategory]); // Dispara o useEffect quando a categoria selecionada muda
 
   const handleSearchVehicles = async () => {
     if (searchTermVehicle.trim() === '') {
       setOpenVehicle(true);
       return;
     } else {
       setOpenVehicle(false);
     }
 
     setIsLoadingVehicle(true);
     try {
       const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL +`/operational-vehicle/serial-number/${searchTermVehicle}`);
       const data = await response.json();
       setSearchResultsVehicle(data);
       setOpenVehicle(data.length > 0);
     } catch (error) {
       console.error('Error searching:', error);
     } finally {
       setIsLoadingVehicle(false);
     }
   };
 
   const handleSelectVehicle = (post) => {
     console.log("🚀 ~ handleSelectVehicle ~ post:", post)
     setSelectedVehicle(post);
    // setValue("Vehicle", post.id);
     setOpenVehicle(false);
   };
 
   async function handleCreateGoal() {
    if (!selectedVehicle || !dataPost) {
      console.error("Veículo ou Post não estão definidos!");
      return;
    }
  
    // Criando um objeto com a estrutura de UploadDTO
    const dataUpload: UploadDTO = {
      idvehicle: selectedVehicle.id,
      idPost: dataPost.id,
    };
  
    // Atualizando o state corretamente
    setUploadDTO(dataUpload);
  
    console.log("Dados para upload:", dataUpload);
  }
  
  
   

  return (
    <div>     

        <h2>Selecione o Veículo:</h2>

        <div className="relative flex flex-col items-center p-4 text-white bg-black">
          <div className="flex items-center w-full">
            <input
              className="w-10/12 bg-gray-900 rounded-md p-2 text-white focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Procurar por um prefixo."
              value={searchTermVehicle}
              onChange={(e) => setSearchTermVehicle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearchVehicles();
              }}
            />
            <button
              type="button"
              className="w-2/12 ml-2 rounded-md border border-white p-2 hover:bg-gray-800 flex items-center justify-center"
              onClick={handleSearchVehicles}
              disabled={isLoading}
            >
              {isLoading ? (
                <FiLoader className="animate-spin text-white" size={24} />
              ) : (
                <FiSearch size={24} />
              )}
            </button>
          </div>

          <Popover.Root open={openVehicle} onOpenChange={setOpenVehicle}>
            <Popover.Anchor className="w-full mt-2" />
            <Popover.Content
              align="start"
              sideOffset={5}
              className="w-10/12 bg-white text-black rounded-md shadow-lg z-10 max-h-60 overflow-y-auto"
            >
              {searchResultsVehicle.length > 0 ? (
                searchResultsVehicle.map((result) => (
                  <div
                    key={result.id}
                    className="block p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSelectVehicle(result)}
                  >
                    {result.serialNumber}
                  </div>
                ))
              ) : (
                <div className="p-2 text-red-500">Nenhum resultado encontrado.</div>
              )}
            </Popover.Content>
          </Popover.Root>

          <div
            className={`absolute top-full left-0 mt-2 p-2 bg-red-500 text-white rounded-md z-10 ${
              searchTermVehicle.trim() === "" && openVehicle ? "block" : "hidden"
            }`}
          >
            Por favor, insira um termo de busca válido.
          </div>
        </div>

        {selectedVehicle && <p>Veículo Selecionado: {selectedVehicle.serialNumber}</p>}

        <button className="bg-orange-700 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded" onClick={()=>{handleCreateGoal()}}>Salvar Seleção</button>


        <MultiImageUploader uploadDTO={dataUpload}></MultiImageUploader>
    </div>
  );
}
