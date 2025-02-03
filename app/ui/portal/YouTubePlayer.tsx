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
  
  const [currentVideo, setCurrentVideo] = useState<any>(null);
 
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
      
        const startTimeInMinutes = hour * 60 + minute; // Convertendo tudo para minutos
        const endTimeInMinutes = hourF * 60 + minuteF;
        const currentTimeInMinutes = currentHour * 60 + currentMinutes;
      
        return currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes;
      });
      

      if (currentVideo) {

        setCurrentVideo(currentVideo)    
        setVideoId(currentVideo.video.pathURL)         
 
        
        return;
      
      } else {
        
        fallbackVideoId()
        return;
      }
    };

    const fallbackVideoId = async () => {

      setShowFallback(true); // Exibe um conteúdo alternativo
    
      const fallbackVideoId = "EsUZY44e3t8";
      setVideoId(fallbackVideoId);
    
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
          // start: Math.floor(startTime),
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
    if (!playerReady || !playerRef.current || !currentVideo) return;
    const player = playerRef.current;


    const [hours, minutes] = currentVideo.startTime.split(":").map(Number);
 
    const dateConvertido = new Date();
    dateConvertido.setHours(hours);
    dateConvertido.setMinutes(minutes);
    dateConvertido.setSeconds(0);
    dateConvertido.setMilliseconds(0);

    const startTimeInSeconds = Math.floor(dateConvertido.getTime() / 1000);  // Segundos desde 1970

  // Pegando o tempo atual (em segundos desde 1970)
  const nowD = Math.floor(Date.now() / 1000);

  // Calculando a diferença entre o tempo atual e o startTime
  const elapsed = nowD - startTimeInSeconds;

     // Troca de vídeo apenas se necessário
    const videoData = player.getVideoData();
    if (videoData && videoData.video_id !== videoId) {
        player.loadVideoById({
        videoId,
        startSeconds: 0,//Math.floor(elapsed),
      });
    }
    else{
      console.log("🎥 nao:", videoId);
   
    }

     // Calcular a diferença de tempo entre o vídeo atual e o tempo passado
  const currentTime = playerRef.current.getCurrentTime() || 0;

  const elapsedTime = Math.abs(currentTime - elapsed);
   
    // Se a diferença de tempo for grande, ajusta o tempo
    if (elapsedTime >= 20) {

      player.seekTo(elapsed);
    }

    // Ajusta o volume
    player.setVolume(volume);

  }, [videoId, volume, playerReady,currentVideo]);
  

  return (
    <div>
    <div className="bg-secondarybg-dark text-text-dark flex justify-center items-center min-h-[400px]">
    
        <div id="yt-player" className="bg-black w-full max-w-[560px] aspect-video"></div>
     
    </div>

      {/* Lista de Programação */}
      {showFallback ? (       
           <h2 className="text-lg font-bold mt-4 text-center">O vídeo do horário terminou! Aguarde a próxima programação.</h2>
               
      ) : (
        <h2 className="text-lg font-bold mt-4 text-center">Programação</h2>
      )}
     
     <div className="nav-container">
  <ul className="flex space-x-4">
    {scheduleList
      .sort((a, b) => a.startTime.localeCompare(b.startTime))
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
            // onClick={() => setVideoId(item.video.pathURL)}
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
