import { User } from "../definitions";

// Definindo o enum para as categorias
export enum CategoryPost {
    TransportePublico = 1,
    Aviacao = 2,
    Ferrovia = 3,   
    Automoveis = 4,
    Post = 5, // Adicionei um valor padrão para post
    Festividades = 6,
    Natal = 7,
    Religiao = 8
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

      case CategoryPost.Post:
        return "post";

        case CategoryPost.Festividades:
          return "festividades";

          case CategoryPost.Natal:
            return "natal";

            case CategoryPost.Religiao:
            return "religiao";

    default:
        return "post";
    }
  }

  export const getUrlPicture = (user: User): string => {

    if (user && user.name){
      return user.name
    }

    return "WTBUS";
  
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
      case "post":
        return CategoryPost.Post;
      case "festividades":
          return CategoryPost.Festividades;

          case "natal":
            return CategoryPost.Natal;

            case"religiao" :
            return  CategoryPost.Religiao;
      default:
        return CategoryPost.Post;
    }
  };