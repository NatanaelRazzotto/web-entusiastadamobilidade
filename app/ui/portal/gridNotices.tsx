'use client'

import { Post } from "@/app/lib/definitions";
import Link from "next/link";
import CardNotice from "./cardNotice";
import { CategoryPost, getCategoryUrlNumber } from "@/app/lib/enums/categoryPost";

export default function GridNotices({ newspaperColumnID = "", categoryPost, posts }) {
  const postDefault: Post = {
    id: "1",
    authorId: "1",
    published: true,
    dateCreate: new Date(),
    dateEvent: new Date(),
    category: 1,
    topNews: 0,
    namePost: "Há um post no forno!",
    title: "Há um post no forno!",
    content: "Há um post no forno!",
    coverURL: "1qbDWMQiF_MIGmiPXz3WD3t8ptlhAE90r",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.length === 0 ? (
        <CardNotice key={postDefault.id} postCard={postDefault} />
      ) : (
        posts
          .filter((post) => post.published)
          .map((post) => <CardNotice key={post.id} postCard={post} />)
      )}
    </div>
  );
}
