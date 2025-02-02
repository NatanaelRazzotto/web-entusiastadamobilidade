import { fetchScheduled } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";

// Simulação de programação de vídeos
const schedule = [
  { timeInitial: "20:40",timeFinal: "20:59", videoId: "0NzlnTgt2NU" },
  { timeInitial: "18:07", timeFinal: "18:09",videoId: "tMBoMpb3Oq8" },
  { timeInitial: "18:10", timeFinal: "18:13",videoId: "9m6rSOisl-Q" },
];

export async function GET(request: NextRequest) {
  // const now = new Date();
  // const currentHour = now.getHours();
  // console.log(currentHour)
  // const currentMinutes = now.getMinutes();
  // console.log(currentMinutes)


  const fethx = await fetchScheduled()
  // console.log("🚀 ~ GET ~ fethx:", fethx)
  // //Encontrar vídeo programado para este momento
  // const currentVideo = schedule.find((vid) => {
   
  //   const [hour, minute] = vid.timeInitial.split(":").map(Number);
  //   const [hourF, minuteF] = vid.timeFinal.split(":").map(Number);
  //   return hour === currentHour && hourF === currentHour && minute <= currentMinutes  && minuteF >= currentMinutes;
  // });
 
  
  //  // const currentVideo = schedule[0]

  //  console.log("🚀 ~ currentVideo ~ currentVideo:", currentVideo)

  //  if (currentVideo) {
  //   const [hours, minutes] = currentVideo.timeInitial.split(":").map(Number);
  //   const dateConvertido = new Date();
    
  //   // Ajusta a hora e minutos para o tempo inicial
  //   dateConvertido.setHours(hours);
  //   dateConvertido.setMinutes(minutes);
  //   dateConvertido.setSeconds(0);
  //   dateConvertido.setMilliseconds(0);
  
  //   // Obtem o timestamp atual em segundos
  //   const nowD = Math.floor(Date.now() / 1000);
  
  //   // Calcula o tempo decorrido (em segundos)
  //   const elapsed = nowD - Math.floor(dateConvertido.getTime() / 1000);
  
    return NextResponse.json({
      listSchedules : fethx
    });

    // return NextResponse.json({
    //   videoId: currentVideo ? currentVideo.videoId : "fallbackVideoId",
    //   startTime: elapsed,
    // });
  }
  

  //  return NextResponse.json({
  //   videoId: "fallbackVideoId",
  //   startTime:0//  Math.floor(now.getTime() / 1000), // Timestamp atual
  // });



   

