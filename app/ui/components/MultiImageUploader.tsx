import { useState } from "react";

export interface UploadDTO{
  idPost : string
  idvehicle : string
  nameFile?: string | null
  newPathURL?: string | null
  oldPathURL?: string | null
}

export default function MultiImageUploader({ uploadDTO }: { uploadDTO: UploadDTO})  {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const selectedFiles = Array.from(files);
      setImages(selectedFiles);

      // Gerar previews
      const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
      setPreviews(previewUrls);
    }
  };

  const handleUpload = async () => {

    if (!uploadDTO) {
      console.error("DTO NAO definidos!");
      return;
    }

    if (images.length === 0) return;
    setUploading(true);

    try {
      const formData = new FormData();

      // Adiciona imagens ao FormData
      images.forEach((image) => formData.append("files", image));


      // Converte o JSON para Blob e adiciona ao FormData
      formData.append("json", new Blob([JSON.stringify(uploadDTO)], { type: "application/json" }));

      const response = await fetch("/api/image-uploader", {
        method: "POST",
        body: formData,
      });


      const data = await response.json();
      setImageUrls(data.images);
    } catch (error) {
      console.error("Erro no upload das imagens", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 border p-4 rounded-lg">
      <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" id="fileInput" />
      <label htmlFor="fileInput" className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md">
        Selecionar Imagens
      </label>

      {/* Previews */}
      <div className="flex flex-wrap gap-2">
        {previews.map((preview, index) => (
          <img key={index} src={preview} alt={`Preview ${index}`} className="w-20 h-20 object-cover rounded-md" />
        ))}
      </div>

      <button onClick={handleUpload} disabled={uploading} className="px-4 py-2 bg-green-500 text-white rounded-md disabled:opacity-50">
        {uploading ? "Enviando..." : "Enviar Imagens"}
      </button>

      {/* Links das imagens enviadas */}
      {imageUrls.length > 0 && (
        <div className="mt-2 text-center">
          <p>Imagens enviadas:</p>
          <ul className="text-blue-500 break-all">
            {imageUrls.map((url, index) => (
              <li key={index}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
