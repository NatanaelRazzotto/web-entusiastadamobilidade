
import { useEffect, useState } from "react";
import { Image, Post, Vehicle } from "../../../lib/definitions";
import { fetchIdImage, fetchPostName } from "@/app/lib/data";
import { Metadata } from "next";
import Link from "next/link";
import { getWatermarkedImageUrl } from "@/app/lib/utils";
import { getCategoryUrlNumber } from "@/app/lib/enums/categoryPost";
import VehicleDetailsSection from "@/app/ui/components/bookImage/VehicleDetailsSection";

interface PageProps {
  params: { idImage: string };
}

export async function generateMetadata({ params }: {params: { idImage: string}}): Promise<Metadata> {
  const { idImage } = params;

  const dataPost: Image | null = await fetchIdImage(idImage)  

  if (!dataPost) {
    return {
      title: "Entusiasta da Mobilidade",
      description: "O Portal de Notícias e Fotografias que é Entusiasta dos Modais de Transporte",
      keywords: "notícias, fotografias, transporte, modais, mobilidade",
      openGraph: {
        type: "website",
        locale: "pt_BR",
        url: process.env.SITE_URL,
        images: [
          {
            url: process.env.SITE_URL + "CARTAO.png",
            width: 800,
            height: 600,
            alt: "Imagem de capa",
          },
        ],
      },
    };
  }

  // return {
  //   title: dataPost.title,
  //   description: dataPost.description || "O Portal de Notícias e Fotografias que é Entusiasta dos Modais de Transporte",
  //   keywords: "notícias, fotografias, transporte, modais, mobilidade",
  //   openGraph: {
  //     siteName: "Entusiasta da Mobilidade",
  //     title: dataPost.title,
  //     type: "article",
  //     locale: "pt_BR",
  //     url: `${process.env.SITE_URL}/portal/${getCategoryUrlNumber(dataPost.category)}/${namePost}`,
  //     images: [
  //       {
  //         url: getWatermarkedImageUrl(dataPost.coverURL),
  //         width: 800,
  //         height: 600,
  //         alt: dataPost.title,
  //       },
  //     ],
  //   },
  // };
}

export default async function Page({ params }: {params: { idImage: string}}) {
  const { idImage } = params;
  let dataPost : Image | null = null

  if (idImage) {
    dataPost = await fetchIdImage(idImage)  
  }
 

  return (
    <main>
      {!dataPost ? (
        "Sem Informações"
      ) : (
        <div className="container mx-auto px-4">
          <HeaderSection dataPost={dataPost} />
          <VehicleDetailsSection dataPost={dataPost} />
          <CommentSection />
          <BackButton />
        </div>
      )}
    </main>
  );
}

function HeaderSection({ dataPost }: { dataPost: Image }) {
  return (
    <div className="relative flex justify-between rounded-b-lg bg-black text-text-dark">
      <div className="relative flex justify-between" style={{ width: "5%" }}>
        <div className="rounded-l" style={{ height: "100%", width: "50%", backgroundColor: "brown" }}></div>
        <div style={{ height: "100%", width: "50%", backgroundColor: "chocolate" }}></div>
      </div>
      <div style={{ width: "80%", padding: "10px" }}>
        <h2 className="text-xl font-bold">{dataPost.title}</h2>
      </div>
      <div style={{ width: "10%", padding: "10px" }}>
        <div className="w-[80%] md:w-[100%]">
          <img src="/logo.svg" alt="Author Image" />
        </div>
      </div>
    </div>
  );
}

function CommentSection() {
  return (
    <div className="bg-primarybg-light text-text-light dark:bg-primarybg-dark dark:text-text-dark rounded-md shadow-md p-4 mt-8">
      <div className="inline-block rounded-lg dark:text-text-dark bg-orange-700 px-4">
        <h2 className="font-bold mt-2 mb-1">COMENTÁRIOS</h2>
      </div>
      <p className="py-4 text-black dark:text-text-dark">EM BREVE!!!</p>
    </div>
  );
}

function BackButton() {
  return (
    <div className="flex justify-end mt-8">
      <Link href="/">
        <button className="bg-orange-700 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded">Voltar para a página principal</button>
      </Link>
    </div>
  );
}
