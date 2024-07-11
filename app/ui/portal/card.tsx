'use client'

import { Post } from "@/app/lib/definitions"
import Link from "next/link"

export default function CardPost({postCard}) {
  return (
    <Link
    key={'aaaaa'}
    href={'portal/post/' + postCard.namePost}>
  <div className="bg-white rounded-md shadow-md relative">
  <div className="relative">
    <img
      src={`https://drive.google.com/thumbnail?id=${postCard.coverURL}&sz=w1000`}
        alt="Imagem da Matéria"
        className="rounded-t-md w-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75 rounded-t-md"></div>
  </div>
  <div className="absolute bottom-0 left-0 p-4 text-white">
    <h2 className="text-xl font-bold">
      {postCard.title}
    </h2>
    <p className="text-sm">
      {postCard.resume}     
    </p>
  </div>
</div>

    </Link>
    
    )
}



{/* */}