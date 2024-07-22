
    export function ImagemViewer({dataPost}) {

        // const handleContextMenu = (event: React.MouseEvent) => {
        //     event.preventDefault();
        //   };

          
        return (
            <div style={{position:"relative", display:"inline-block;" }}>
            <img
              src={`https://drive.google.com/thumbnail?id=${dataPost.coverURL}&sz=w1000`}
              alt="Imagem da Matéria"
              className="rounded-t-md w-full object-cover"        
            />
            <div style={{position: "absolute", top:0, left:0, right:0, bottom:0,background:"transparent"}} ></div>
          </div>
        );
      }