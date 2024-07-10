'use client'

import { Post } from "@/app/lib/definitions"
import Link from "next/link"

export default function CardNotice({postCard}) {
  return (
    <Link
    key={'aaaaa'}
    href={'portal/post/' + postCard.namePost}>
         <div className="bg-white rounded-md shadow-md">
            <img
              src={postCard.coverURL}
              alt="News Image"
              className="rounded-t-md"
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