// ./app/ui/imageViewer/serverActions.ts
'use server';

import { signOut } from "next-auth/react";



export const saveSelection = async (formData) => {
  const selectedImages = formData.getAll('selectedImages');

  // Adicione aqui a lógica para salvar as seleções no servidor
};

export async function serverSignOut() {
  //await signOut();
  //signOut({ callbackUrl: "/" }); // Redireciona para a página inicial após o logout

}
