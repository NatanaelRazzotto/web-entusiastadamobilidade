'use client'

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../ui/SliderCover.css'; // Supondo que você crie este arquivo CSS

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
    className={className}
    style={{ 
      ...style, 
      display: "block",    
      scale : "15px",      
      right: "5px", // Ajuste a distância da borda direita      
      zIndex: 10 // Garante que o botão esteja acima dos slides  
    }}
    onClick={onClick}
  />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ 
        ...style, 
        display: "block",    
        scale : "15px",
        left: "5px", // Ajuste a distância da borda direita
        zIndex: 10 // Garante que o botão esteja acima dos slides
      }}
      onClick={onClick}
    />
  );
}

export default function SliderCover({dataPost }) {
  console.log("🚀 ~ SliderCover ~ dataPost:", dataPost)
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    //  adaptiveHeight: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  return (

    <div>
      {
        dataPost && dataPost.videos.length > 0 ? <Slider {...settings} className="slider-container">
        <div className="slide-content pt-4 pl-4 pr-4">
          <iframe
                  className="h-96 xs:h-44 sm:h-96 md:h-96 lg:h-96 xl:h-[450px] "
          style={{ width:"100%", border: 'none' }} // Remover bordas se necessário
          src={`https://www.youtube.com/embed/${dataPost.videos[0].pathURL}?controls=&modestbranding=1`}
          title="YouTube Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
       </div>  
       <div  className=" pt-4 pl-4 pr-4" >
        <img
            src={`https://drive.google.com/thumbnail?id=${dataPost.coverURL}&sz=w1000`}
            alt="Imagem da Matéria"
            className="rounded-t-md w-full object-cover"
          />
        </div>    
       
     
           
      </Slider> 
        :
          <div  className=" mt-4 ml-4  pr-4">
            <img
            src={`https://drive.google.com/thumbnail?id=${dataPost.coverURL}&sz=w1000`}
            alt="Imagem da Matéria"
            className="rounded-t-md w-full object-cover"
          /> 
              </div>
      }

    </div>

    
    
  );
}


// export function SliderCover() {
//   return (
//     // <Swiper 
//     // modules={[Navigation]} // Adicionando o módulo de navegação  
//     // spaceBetween={10}
//     // slidesPerView={2}
//     // navigation
//     // onSlideChange={() => console.log('slide change')}
//     // onSwiper={(swiper) => console.log(swiper)}
//     // style={{height : "100%", width : "100%"}}
//     // >
//     //   <SwiperSlide>
//     //   <iframe
//     //         width="100%"
//     //         height="100%"
//     //         src="https://www.youtube.com/embed/nxRt-TWFuCA?controls=&modestbranding=1"
//     //         title="YouTube Video"
//     //         frameBorder="0"
//     //         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//     //         allowFullScreen
//     //       ></iframe> 
//     //   </SwiperSlide>
//     //   <SwiperSlide>Slide 2</SwiperSlide>
//     //   <SwiperSlide>Slide 3</SwiperSlide>
//     //   <SwiperSlide>Slide 4</SwiperSlide>      
//     // </Swiper>
//   );
// };