import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const YouTubePlayer = () => {
  const playerRef = useRef<any>(null);
  const [videoId, setVideoId] = useState("");
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    const fetchCurrentVideo = async () => {
      const res = await fetch("/api/schedule");
      const data = await res.json();
      const now = Date.now() / 1000;
      const elapsed = now - data.startTime;

      setVideoId(data.videoId);
      setStartTime(elapsed > 0 ? elapsed : 0);
    };

    fetchCurrentVideo();
    const interval = setInterval(fetchCurrentVideo, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        window.onYouTubeIframeAPIReady = () => {
          playerRef.current = new window.YT.Player("yt-player", {
            height: "315",
            width: "560",
            videoId,
            playerVars: {
              autoplay: 1,
              start: Math.floor(startTime),
              mute: 1,
              controls: 0, // 🔒 Remove controles
              disablekb: 1, // 🔒 Desativa atalhos do teclado
              rel : 0,
            },
            events: {
              onReady: (event: any) => {
                event.target.playVideo();
              },
              onStateChange: (event: any) => {
                if (event.data === window.YT.PlayerState.UNSTARTED) {
                  event.target.playVideo();
                }
              },
              onPlaybackRateChange: (event: any) => {
                event.target.setPlaybackRate(1); // 🔒 Evita mudar a velocidade do vídeo
              },
              onPlaybackQualityChange: (event: any) => {
                event.target.setPlaybackQuality("hd720"); // Define qualidade fixa
              },
            },
          });
        };
      };
    };

    if (!window.YT) {
      loadYouTubeAPI();
    } else {
      if (playerRef.current) {
        playerRef.current.loadVideoById({
          videoId,
          startSeconds: Math.floor(startTime),
        });
      }
    }
  }, [videoId, startTime]);

  return <div id="yt-player"></div>;
};

export default YouTubePlayer;
