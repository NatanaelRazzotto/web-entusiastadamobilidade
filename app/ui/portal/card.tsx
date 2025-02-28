'use client'

import { Post } from "@/app/lib/definitions"
import { getCategoyrUrl } from "@/app/lib/utils"
import Image from "next/image"
import Link from "next/link"

export default function CardPost({postCard, cardTop}) {
 
  return (
    <Link
    key={postCard.id}
    href={`portal/${getCategoyrUrl(postCard.category)}/` + postCard.namePost}>
  <div className="bg-white rounded-md shadow-md relative">
  <div className="relative">
   
    {postCard?.coverImageId !=null && postCard?.coverImage.publicStorage ? (
                            <Image
                            src={`https://${postCard.coverImage.storagePathURL}image/upload/f_auto,q_auto,w_800/${postCard.coverImage.pathURL}`}
                            alt={postCard.title || "Veículo"}
                            width={800} // Ajuste conforme necessário
                            height={600}
                            className="rounded-md object-cover"
                            priority
                      />
                    ) : (
                      <img
                      src={`https://drive.google.com/thumbnail?id=${postCard.coverURL}&sz=w1000`}
                        alt="Imagem da Matéria"
                        className="rounded-t-md w-full object-cover"
                    />
                    )} 
    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75 rounded-t-md"></div>
  </div>
  <div className="absolute bottom-0 left-0 p-4 text-white">
    <h4 className=" font-bold">
      {postCard.title}
    </h4>
    {
      cardTop ?  
      <p className="text-sm">
      {postCard.resume}     
      </p>
      :""
    }
   
  </div>
</div>

    </Link>
    
    )
}



{/* */}