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
  const [playerReady, setPlayerReady] = useState(false);
  const [scheduleList, setScheduleList] = useState<any[]>([]); // Lista de programação
  const [showFallback, setShowFallback] = useState(false);



  // Função para buscar a programação
  useEffect(() => {
    const scheduleManager = async (listData: any[]) => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();

      // Encontrar o vídeo correto baseado no horário
      const currentVideo = listData.find((vid) => {
        const [hour, minute] = vid.startTime.split(":").map(Number);
        const [hourF, minuteF] = vid.endTime.split(":").map(Number);
        return hour === currentHour && hourF === currentHour && minute <= currentMinutes && minuteF >= currentMinutes;
      });

      if (currentVideo) {
        const [hours, minutes] = currentVideo.startTime.split(":").map(Number);
        const dateConvertido = new Date();
        dateConvertido.setHours(hours);
        dateConvertido.setMinutes(minutes);
        dateConvertido.setSeconds(0);
        dateConvertido.setMilliseconds(0);

        const nowD = Math.floor(Date.now() / 1000);
        const elapsed = nowD - Math.floor(dateConvertido.getTime() / 1000);

        setVideoId(currentVideo.video.pathURL);
        setStartTime(elapsed > 0 ? elapsed : 0);
        setShowFallback(false); 
      
      } else {
        
        fallbackVideoId()
      }
    };

    const fallbackVideoId = async () => {
      console.log("Vídeo sem grade!");
      setShowFallback(true); // Exibe um conteúdo alternativo
    
      const fallbackVideoId = "EsUZY44e3t8";
      setVideoId(fallbackVideoId);
      setStartTime(0);
    
      if (playerRef.current) {
        playerRef.current.loadVideoById({
          videoId: fallbackVideoId,
          startSeconds: 0,
        });
      }
    }

    const fetchCurrentVideo = async () => {
      try {
        const res = await fetch("/api/schedule");
        const data = await res.json();
        console.log("🚀 ~ fetchCurrentVideo ~ data:", data)
        setScheduleList(data.listSchedules)
        await scheduleManager(data.listSchedules);

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
            if (event.data === window.YT.PlayerState.ENDED) {
              console.log("Vídeo terminou!");
              setShowFallback(true); // Exibe um conteúdo alternativo
            
              const fallbackVideoId = "EsUZY44e3t8";
              setVideoId(fallbackVideoId);
              setStartTime(0);
            
              if (playerRef.current) {
                playerRef.current.loadVideoById({
                  videoId: fallbackVideoId,
                  startSeconds: 0,
                });
              }
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

  return (
    <div>
    <div className="bg-secondarybg-dark text-text-dark flex justify-center items-center min-h-[400px]">
      {showFallback ? (
        <div className="text-white text-center">
          <p>O vídeo terminou! Aguarde a próxima programação.</p>
        </div>
      ) : (
        <div id="yt-player" className="bg-black w-full max-w-[560px] aspect-video"></div>
      )}
    </div>

      {/* Lista de Programação */}
      <h2 className="text-lg font-bold mt-4 text-center">Programação</h2>
      <div className="overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
        <ul className="flex space-x-4 p-2 bg-gray-900 rounded-lg shadow-md">
          {scheduleList
            .sort((a, b) => a.startTime.localeCompare(b.startTime)) // Ordenação cronológica
            .map((item) => {
              const isActive = item.video.pathURL === videoId;

              return (
                <li
                  key={item.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "bg-blue-500 text-white font-bold shadow-lg scale-105"
                      : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                  }`}
                  onClick={() => setVideoId(item.video.pathURL)}
                >
                  <p className="text-sm">
                    <strong>{item.startTime} - {item.endTime}</strong>
                  </p>
                  <p className="truncate max-w-[150px]">{item.video.title}</p>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default YouTubePlayer;
