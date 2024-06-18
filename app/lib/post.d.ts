// post.d.ts
interface Post {
    id: string;
    namePost: string;
    título: string;
    conteúdo: string;
    CoverURL: string;
    publicado: boolean;
    authorId: string;
    autor: Usuário | null;
    images: Image[];
  }