// Definindo o enum para as categorias
export enum CategoryPost {
    TransportePublico = 1,
    Aviacao = 2,
    Ferrovia = 3,   
    Automoveis = 4,
    Post = 5 // Adicionei um valor padrão para post
  }

// Função para obter a URL da categoria usando o enum
export const getCategoryUrlNumber = (category: CategoryPost): string => {
  
 
  switch (category) {
    case CategoryPost.TransportePublico:
     return "transporte-publico";
         
    case CategoryPost.Aviacao:
      return "aviacao";
      
    case CategoryPost.Ferrovia:
     return "ferrovia";

    case CategoryPost.Automoveis:
      return "automoveis";

    default:
        return "post";
    }
  }
    
  // Função para converter uma URL em uma categoria usando o enum
  export const getConvertUrl = (url: string): CategoryPost => {
    
   
  switch (url) {
      case "transporte-publico":
        return CategoryPost.TransportePublico;
      case "aviacao":
        return CategoryPost.Aviacao;
      case "ferrovia":
       return CategoryPost.Ferrovia;
      case "automoveis":
       return CategoryPost.Automoveis;
      default:
        return CategoryPost.Post;
    }
  };