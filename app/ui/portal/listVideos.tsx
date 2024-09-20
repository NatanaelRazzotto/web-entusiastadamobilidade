'use client'

import { Post } from "@/app/lib/definitions"

import Link from "next/link"
import CardNotice from "./cardNotice"
import { CategoryPost, getCategoryUrlNumber } from "@/app/lib/enums/categoryPost"
import CardNoticeVideo from "./cardNoticeVideo"


export default function ListVideos({newspaperColumnID = "",categoryPost, videos }) {  
  
  const postDefault : Post = {
    id : "1",
    authorId : "1",
    published : true,
    dateCreate : new Date(),
    dateEvent : new Date(),
    category : 1,
    topNews : 0,
    namePost : "Há um post no forno!",
    title : "Há um post no forno!",
    content : "Há um post no forno!",
    coverURL : "1qbDWMQiF_MIGmiPXz3WD3t8ptlhAE90r",

  }
 
  return (
    <div >
    <div className="py-4">
      <div className="inline-block rounded-lg text-white bg-orange-700 px-4">
        <h2 className="font-bold mt-2 mb-1">Videos</h2>
      </div>
    </div>
    {/* News card 1 */}
    {
        videos.slice(0, 3) .length === 0 ? (
          <CardNotice postCard={postDefault} />
        ) : (
        <div>
          {
            videos
            .slice(0, 3) 
            .map((post) => <CardNoticeVideo key={post.id} postCard={post} />)
          
          }
        </div>
      )
    }   
    {/* <div className="flex justify-end mt-8">
    <Link href={'portal/'+getCategoryUrlNumber(categoryPost)}>
      <button style={{height:"50px"}}  className="bg-orange-700 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded">
        Ver mais
      </button>
      </Link>
    </div> */}
  
  </div>
    )
}



{/* */}