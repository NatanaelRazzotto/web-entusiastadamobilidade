"use client";

import { useEffect, useRef, useState } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

const UniversalVideoPlayer = () => {
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const [source, setSource] = useState({
    type: "youtube", // "youtube", "vimeo" ou "html5"
    url: "odjhvulIO6w", // ID do YouTube ou URL do vídeo
    startTime: 0,
  });

  useEffect(() => {
    const fetchCurrentVideo = async () => {
      try {
        const res = await fetch("/api/schedule");
        const data = await res.json();
        const now = Date.now() / 1000;
        const elapsed = now - data.startTime;

        setSource({
          type: data.type, // "youtube", "vimeo" ou "html5"
          url: data.videoId || data.url,
          startTime: elapsed > 0 ? elapsed : 0,
        });
      } catch (error) {
        console.error("Erro ao buscar vídeo:", error);
      }
    };

    fetchCurrentVideo();
    const interval = setInterval(fetchCurrentVideo, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (playerRef.current) {
      const player = new Plyr(playerRef.current, {
        autoplay: true,
        controls: ["play", "progress", "volume", "fullscreen"],
      });

      player.on("ready", () => {
        player.currentTime = source.startTime;
        player.play();
      });

      return () => player.destroy();
    }
  }, [source]);

  return (
    <div>
      {source.type === "html5" ? (
        <video ref={playerRef} controls>
          <source src={source.url} type="video/mp4" />
          Seu navegador não suporta o vídeo.
        </video>
      ) : (
        <div
          data-plyr-provider={source.type}
          data-plyr-embed-id={source.url}
        ></div>
      )}
    </div>
  );
};

export default UniversalVideoPlayer;
