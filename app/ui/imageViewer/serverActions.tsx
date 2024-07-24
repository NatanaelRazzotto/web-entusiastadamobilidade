// ./app/ui/imageViewer/serverActions.ts
'use server';

export const saveSelection = async (formData) => {
  const selectedImages = formData.getAll('selectedImages');
  console.log("Imagens selecionadas:", selectedImages);
  // Adicione aqui a lógica para salvar as seleções no servidor
};
