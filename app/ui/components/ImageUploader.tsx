import { useState } from "react";

export default function ImageUploader() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "ml_default"); // Substitua pelo seu upload_preset

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dcixncjzw/image/upload", {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      console.log("🚀 ~ handleUpload ~ data:", data)
      setImageUrl(data.secure_url);
    } catch (error) {
      console.error("Erro no upload da imagem", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 border p-4 rounded-lg">
      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="fileInput" />
      <label htmlFor="fileInput" className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md">Selecionar Imagem</label>
      {preview && <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded-md" />}
      <button onClick={handleUpload} disabled={uploading} className="px-4 py-2 bg-green-500 text-white rounded-md disabled:opacity-50">
        {uploading ? "Enviando..." : "Enviar Imagem"}
      </button>
      {imageUrl && (
        <div className="mt-2 text-center">
          <p>Imagem enviada:</p>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 break-all">{imageUrl}</a>
        </div>
      )}
    </div>
  );
}
