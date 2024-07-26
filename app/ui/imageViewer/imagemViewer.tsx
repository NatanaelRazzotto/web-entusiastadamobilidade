
    export function ImagemViewer({orderImage}) {

        // const handleContextMenu = (event: React.MouseEvent) => {
        //     event.preventDefault();
        //   };

          
        return (
            <div style={{position:"relative", display:"inline-block;" }}>
               <img
                src={`https://drive.google.com/thumbnail?id=${orderImage.image.pathURL}&sz=w1000`}
                alt={orderImage.image.title}
                className="rounded-md w-full object-cover cursor-pointer"
              />
            <div style={{position: "absolute", top:0, left:0, right:0, bottom:0,background:"transparent"}} ></div>
          </div>
        );
      }