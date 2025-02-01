"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const YouTubePlayer = () => {
  const playerRef = useRef<any>(null);
  const [videoId, setVideoId] = useState("odjhvulIO6w");
  const [startTime, setStartTime] = useState(0);
  const [volume, setVolume] = useState(100);
  const [playerReady, setPlayerReady] = useState(false); // Estado para garantir que o player esteja pronto

  useEffect(() => {
    const fetchCurrentVideo = async () => {
      try {
        const res = await fetch("/api/schedule");
        const data = await res.json();
        console.log("🚀 ~ fetchCurrentVideo ~ data:", data)
        //const now = Date.now() / 1000;
        const elapsed = data.startTime;
        console.log("🚀 ~ fetchCurrentVideo ~ elapsed:", elapsed)
        setVideoId(data.videoId);
        setStartTime(elapsed > 0 ? elapsed : 0);
      } catch (error) {
        console.error("Erro ao buscar vídeo:", error);
      }
    };

    fetchCurrentVideo();
    const interval = setInterval(fetchCurrentVideo, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const initYouTubePlayer = () => {
      playerRef.current = new window.YT.Player("yt-player", {
        height: "315",
        width: "560",
        videoId,
        playerVars: {
          autoplay: 1,
          start: Math.floor(startTime),
          mute: 0,
          controls: 1,
          disablekb: 1,
          rel: 0,
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
            event.target.setVolume(volume);
            setPlayerReady(true);
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.UNSTARTED) {
              event.target.playVideo();
            }
          },
        },
      });
    };

    if (!window.YT) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);

      window.onYouTubeIframeAPIReady = () => {
        if (!playerRef.current) {
          initYouTubePlayer();
        }
      };
    } else {
      initYouTubePlayer();
    }
  }, []);

  useEffect(() => {
    if (playerReady && playerRef.current) {
      playerRef.current.loadVideoById({
        videoId,
        startSeconds: Math.floor(startTime),
      });
      playerRef.current.setVolume(volume);
    }
  }, [videoId, startTime, volume, playerReady]);

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value, 10);
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
    }
  };

  return (
    <div>
      <div id="yt-player"></div>     
    </div>
  );
};

export default YouTubePlayer;
