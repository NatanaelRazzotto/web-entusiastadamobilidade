import { useState } from "react";
import * as Select from "@radix-ui/react-select";
import { useForm } from "react-hook-form";
import { UploadCoverDTO } from "./MultiImageUploader";
import { ChevronDownIcon } from "@radix-ui/themes";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Post } from "@/app/lib/definitions";
import Image from "next/image"; // ✅ Importação correta
import { getSession } from "next-auth/react";

export default function ManagerCoverPost({ dataPost }: { dataPost: Post }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [dataUpload, setUploadDTO] = useState<UploadCoverDTO | null>(null);
  
  const { handleSubmit, formState: { errors } } = useForm();

  const handleSelectImage = (image) => {
    setSelectedImage(image);
  };

  async function handleCreateCover() {
    if (!selectedImage || !dataPost) {
      console.error("Imagem ou Post não estão definidos!");
      return;
    }

    // Criando um objeto para envio ao backend
    const dataUpload: UploadCoverDTO = {
      idImage: selectedImage.id,
      idPost: dataPost.id,
    };

    setUploadDTO(dataUpload);

    try {
           const session = await getSession();
   
           const method =  "PUT";      
   
           const endpoint = `/api/post-cover` ;
   
           const response = await fetch(endpoint, {
             method,
             headers: {
                   "Content-Type": "application/json",
                   Authorization: `Bearer ${session?.accessToken}`,
                 },
             body: JSON.stringify(dataUpload),
           });
     
            if (!response.ok) {
             const result = await response.json();
             console.error(result.message);
            // setServerResponse("NAO REALIZADO");
           } else {
             const result = await response.json();
             console.log("Post atualizado com sucesso:", result.message);
             //setServerResponse(result.message);
           }  
         
         } catch (error) {
           console.error("Erro ao atualizar post:", error);
         }
  }

  return (
    <div className="flex flex-col space-y-4">
      <label className="text-sm font-medium text-gray-700">Selecione a Capa:</label>

      {selectedImage && (
        <Image
          src={`https://${selectedImage.storagePathURL}image/upload/f_auto,q_auto,w_800/${selectedImage.pathURL}`}
          alt={dataPost.title || "Veículo"}
          width={800}
          height={600}
          className="rounded-md object-cover"
          priority
        />
      )}

      <Select.Root value={selectedImage?.id || ""} onValueChange={(value) => {
        const image = dataPost.images.find(img => img.id.toString() === value);
        handleSelectImage(image);
      }}>
        <Select.Trigger className="flex items-center justify-between p-2 border border-gray-300 rounded-md bg-white">
          <Select.Value>{selectedImage ? selectedImage.title : "Escolha uma imagem"}</Select.Value>
          <Select.Icon><ChevronDownIcon /></Select.Icon>
        </Select.Trigger>

        <Select.Content className="bg-white border border-gray-300 rounded-md shadow-lg">
          <Select.Viewport className="p-2">
            {dataPost.images.map((image) => (
              <Select.Item key={image.id} value={image.id.toString()} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                <Select.ItemText>{image.title}</Select.ItemText>
                <Select.ItemIndicator><CheckIcon className="w-5 h-5 text-green-500" /></Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Root>

      {errors.category && <span className="text-sm text-red-600 mt-1">Este campo é obrigatório</span>}

      <button onClick={handleCreateCover} className="px-4 py-2 bg-blue-600 text-white rounded-md">Definir CAPA!</button>
    </div>
  );
}
