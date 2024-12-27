'use client'

import { Post } from "@/app/lib/definitions"
import { getCategoyrUrl } from "@/app/lib/utils"
import { PlayCircleIcon } from "@heroicons/react/20/solid"
import { Bars3Icon, PlayIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

export default function CardNoticeVideo({postCard }) {
  return (
    <Link
    key={postCard.id}
    href={`https://www.youtube.com/watch?v=${postCard.pathURL}`}>
      
        <div className="bg-secondarybg-light text-text-light dark:bg-secondarybg-dark dark:text-text-dark rounded-md shadow-md relative">
          <div className="absolute inset-0 flex items-center justify-center z-10">
         
            <PlayCircleIcon className="w-10 bg-opacity-50"/>
          </div>
        <img
            src={`https://img.youtube.com/vi/${postCard.pathURL}/hqdefault.jpg`}
          alt="Imagem da Matéria"
          className="rounded-t-md w-full object-cover"
        />
    
        <div className="p-4">
        <div className="inline-block rounded-md text-white bg-orange-700 px-2">
               <p className="">Transporte Público</p>
          </div>
          <h6 className="font-bold">
          

            {postCard.title.length > 50
              ? `${postCard.title.slice(0, 50)}...`
              : postCard.title}
            </h6>        
       
        </div>
      </div>

    </Link>
    
    )
}



{/* */}