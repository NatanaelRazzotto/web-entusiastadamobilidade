'use client'

import { Post } from "@/app/lib/definitions"
import { getCategoyrUrl } from "@/app/lib/utils"
import Link from "next/link"

export default function CardNoticeVideo({postCard }) {
  return (
    <Link
    key={postCard.id}
    href={`https://www.youtube.com/watch?v=${postCard.pathURL}`}>
         <div className="bg-white rounded-md shadow-md">
            <img
                src={`https://img.youtube.com/vi/${postCard.pathURL}/hqdefault.jpg`}
                  alt="Imagem da Matéria"
                  className="rounded-t-md w-full object-cover"
              />
            <div className="p-4">
              <h2 className="text-xl font-bold">
                {postCard.title}
              </h2>
              <ul className="list-disc list-inside text-gray-600 text-sm">
                <li>{postCard.resume}</li>
              </ul>
            </div>
          </div>

    </Link>
    
    )
}



{/* */}