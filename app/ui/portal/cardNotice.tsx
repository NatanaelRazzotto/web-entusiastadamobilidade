'use client'

import { Post } from "@/app/lib/definitions"
import { getCategoyrUrl } from "@/app/lib/utils"
import Link from "next/link"

export default function CardNotice({ postCard , pathDefault = "portal/"}) {
  return (
    <Link
      href={`${pathDefault}${getCategoyrUrl(postCard.category)}/` + postCard.namePost}>
      <div className="bg-secondarybg-light text-text-light dark:bg-secondarybg-dark dark:text-text-dark  rounded-md shadow-md">
        <img
          src={`https://drive.google.com/thumbnail?id=${postCard.coverURL}&sz=w1000`}
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
