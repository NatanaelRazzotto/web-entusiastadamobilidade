
import { useEffect, useState } from "react";

import { fetchIdImage, fetchPostName } from "@/app/lib/data";
import { Metadata } from "next";
import Link from "next/link";
import { getWatermarkedImageUrl } from "@/app/lib/utils";
import { getCategoryUrlNumber, getUrlPicture } from "@/app/lib/enums/categoryPost";
import VehicleDetailsSection from "@/app/ui/components/bookImage/VehicleDetailsSection";
import YouTubePlayer from "@/app/ui/portal/YouTubePlayer";

interface PageProps {
  params: { idImage: string };
}

export async function generateMetadata({ params }: {params: { idImage: string}}): Promise<Metadata> {
  const { idImage } = params;

    return {
      title: "Entusiasta da Mobilidade",
      description: "O Portal de Notícias e Fotografias que é Entusiasta dos Modais de Transporte",
      keywords: "notícias, fotografias, transporte, modais, mobilidade",
      openGraph: {
        type: "website",
        locale: "pt_BR",
        url: process.env.NEXT_PUBLIC_SITE_URL,
        images: [
          {
            url: process.env.NEXT_PUBLIC_SITE_URL + "comemorativo25.png",
            width: 800,
            height: 600,
            alt: "Imagem de capa",
          },
        ],
      },
    };
  

}

export default async function Page({ params }: {params: { idImage: string}}) {
  const { idImage } = params;
  let dataPost = null

  return (
    <main>
      {dataPost ? (
        "Sem Informações"
      ) : (
        <div className="container mx-auto px-4">
            <HeaderSection></HeaderSection>
             <YouTubePlayer></YouTubePlayer>
        </div>
      )}
    </main>
  );
}

function HeaderSection() {
  return (
    <div className="relative flex justify-between rounded-b-lg bg-black text-text-dark">
      <div className="relative flex justify-between" style={{ width: "5%" }}>
        <div className="rounded-l" style={{ height: "100%", width: "50%", backgroundColor: "brown" }}></div>
        <div style={{ height: "100%", width: "50%", backgroundColor: "chocolate" }}></div>
      </div>
      <div style={{ width: "80%", padding: "10px" }}>
        <h2 className="text-xl font-bold">{"WEBTV - Programação ao vivo"}</h2>
      </div>
      <div style={{ width: "10%", padding: "10px" }}>
        <div className="w-[80%] md:w-[100%]">
          <img src="/logo.svg" alt="Author Image" />
        </div>
      </div>
    </div>
  );
}

