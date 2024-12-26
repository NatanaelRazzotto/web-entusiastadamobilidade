'use client'

import { Post } from "@/app/lib/definitions"

import Link from "next/link"
import CardNotice from "./cardNotice"
import { CategoryPost, getCategoryUrlNumber } from "@/app/lib/enums/categoryPost"


export default function ListNotices({newspaperColumnID = "",categoryPost, posts }) {  
  
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
     
    </div>
    {/* News card 1 */}
    {
        posts.slice(3, 6) .length === 0 ? (
          <CardNotice key={postDefault.id}  postCard={postDefault} />
        ) : (
        <div>
          {
            newspaperColumnID == "" ? posts
            .filter((post) => post.newspaperColumnID != "030e0d2f-5aad-4018-934a-420b23448fd9" && post.category == categoryPost && post.published) 
            .slice(0, 4) 
            .map((post) => <CardNotice key={post.id} postCard={post} />)
            :
            posts
            .filter((post) => post.newspaperColumnID == newspaperColumnID && post.published) 
            .slice(0, 3) 
            .map((post) => <CardNotice key={post.id} postCard={post} />)
          
          }
        </div>
      )
    }   
    <div className="flex justify-end mt-8">
    <Link href={'portal/'+getCategoryUrlNumber(categoryPost)}>
      <button style={{height:"50px"}}  className="bg-orange-700 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded">
        Ver mais
      </button>
      </Link>
    </div>
  
  </div>
    )
}



{/* */}