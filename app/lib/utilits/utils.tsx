import { UploadDTO } from "@/app/ui/components/MultiImageUploader";
import { createImages, fetchIdPath, fetchPostID, updateImage } from "../data";
import { Image, OperationalVehicle } from "../definitions";

export function extrairCaminhoImagem(url) {
  const regex = /\/(v\d+\/[^\/]+)$/; // Captura "vXXXXXX/arquivo.ext"
  const match = url.match(regex);
  return match ? match[1] : null;
}

function generatedMetaTitle (vehicle : any , existingUser: any){
    return vehicle.serialNumber +' | '+ vehicle.operator.name + " | "+ " - Autoria de " + existingUser.name + " | Entusiasta da Mobilidade"
}
  
function generatedMetaTitleBasic (fileName : string , existingUser: any){
return ' Fotografia | ' + fileName + " | "+ " Autoria de " + existingUser.name + " | Entusiasta da Mobilidade"
}

export async function ImageGenerate(body : UploadDTO, operationalVehicle : OperationalVehicle, existingUser: any){
  console.log("🚀 ~ ImageGenerate ~ body:", body)
  
    let post = await fetchPostID(body.idPost);
    console.log("🚀 ~ listImages ~ post:", post);
  
    const imagesToCreate: Image[] = [];
   // const aToCreate: Image[] = [];
  

   console.log("🚀 ~ ImageGenerate ~ data:", operationalVehicle)
  
  let imagePath = await fetchIdPath(body.newPathURL);
  console.log("🚀 ~ ImageGenerate ~ imagePath:", imagePath)

  let image: Image = {
    id: 1,
    title: operationalVehicle ? generatedMetaTitle(operationalVehicle,existingUser) : generatedMetaTitleBasic(body.nameFile,existingUser),
    nameFile : body.nameFile,
    published: false,
    publicStorage: true,
    storagePathURL: "res.cloudinary.com/dcixncjzw/",
    pathURL: body.newPathURL.toString(), // Certifique-se de que pathURL é uma string
    authorId: existingUser.id,
    vehicleIDs : operationalVehicle ? [operationalVehicle.id.toString()] : [],
    posts: [
      post
    ],
  };

  if (!imagePath) {      
  //   console.log("🚀 nao existe");
    imagesToCreate.push(image);
      // Atualize cada imagem com os posts    
  } else {
  //  await deleteIdPath(imagePath.id);
    console.log("🚀 ja existe");
    if ( imagePath.posts.length > 0 ){
      imagePath.posts.forEach((element)=>{
        image.posts.push(element)
      })      
    }
    
      await updateImage(image);
  }
        
    
  
    console.log("🚀 ~ ImageGenerate ~ imagesToCreate:", imagesToCreate)
  
    if (imagesToCreate.length > 0) {
      
      let listI = await createImages(imagesToCreate);
      console.log("🚀 ~ listImages ~ listI:", listI)
      for (const image of imagesToCreate) {
        await updateImage(image);
      }
    }
  
    return true;
  }