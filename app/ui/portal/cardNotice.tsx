'use client'

import { Post } from "@/app/lib/definitions"
import { CategoryPost, getCategoryUrlNumber } from "@/app/lib/enums/categoryPost";
import { getCategoyrUrl } from "@/app/lib/utils"
import Link from "next/link"

export default function CardNotice({ postCard, pathDefault = "portal/" }) {
  return (
    <Link
      href={`${pathDefault}${getCategoyrUrl(postCard.category)}/` + postCard.namePost}
    >
      <div className="bg-secondarybg-light text-text-light dark:bg-secondarybg-dark dark:text-text-dark rounded-md shadow-md relative">
        <div className="absolute top-2 left-2 rounded-sm text-white bg-black px-2 z-10">
          <p>New</p>
        </div>
        <img
          src={`https://drive.google.com/thumbnail?id=${postCard.coverURL}&sz=w1000`}
          alt="Imagem da Matéria"
          className="rounded-t-md w-full object-cover"
        />
        <div className="p-4">
        <div className="inline-block rounded-md text-white bg-orange-700 px-2">
               <p className="">{getCategoryUrlNumber(postCard.category)}</p>
          </div>
          <h6 className="font-bold">
          

            {postCard.title.length > 50
              ? `${postCard.title.slice(0, 50)}...`
              : postCard.title}
            </h6>
          
          <p className="list-disc list-inside text-gray-600 text-sm">
            {postCard.resume.length > 60
              ? `${postCard.resume.slice(0, 60)}...`
              : postCard.resume}
          </p>
        </div>
      </div>
    </Link>
  );
}

