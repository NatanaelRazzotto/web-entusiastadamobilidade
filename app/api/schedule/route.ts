import { NextRequest, NextResponse } from "next/server";

// Simulação de programação de vídeos
const schedule = [
  { time: "10:00", videoId: "0NzlnTgt2NU" },
  { time: "10:30", videoId: "SuE-m7GfyA4" },
  { time: "11:00", videoId: "0NzlnTgt2NU" },
];

export async function GET(request: NextRequest) {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();

  // Encontrar vídeo programado para este momento
//   const currentVideo = schedule.find((vid) => {
//     const [hour, minute] = vid.time.split(":").map(Number);
//     return hour === currentHour && minute <= currentMinutes;
//   });
    const currentVideo = schedule[0]

  return NextResponse.json({
    videoId: currentVideo ? currentVideo.videoId : "fallbackVideoId",
    startTime: Math.floor(now.getTime() / 1000), // Timestamp atual
  });
}
