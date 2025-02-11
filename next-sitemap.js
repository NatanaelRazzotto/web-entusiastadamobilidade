const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const fetchAlbums = async () => {
    try {
      const albums = await prisma.album.findMany({
        select: {
          autor: true,
          id: true,
          imagens: { select: { id: true, url: true, legenda: true } }, // Busca as imagens e seus detalhes
        },
      });
  
      return albums.flatMap((album) => {
        // Mapeia as imagens para a URL correta dentro do álbum
        return album.imagens.map((img) => ({
          loc: `/portal/album/${album.autor}/${img.id}`, // URL única para cada imagem
          changefreq: 'weekly',
          priority: 0.7,
          images: [
            {
              loc: img.url, // URL da imagem
              caption: img.legenda || '', // Legenda da imagem, se disponível
            },
          ],
        }));
      });
    } catch (error) {
      console.error('Erro ao buscar os álbuns:', error);
      return [];
    }
};
  
  

module.exports = {
  siteUrl: 'https://www.entusiastadamobilidade.com.br',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: [
    '/login',
    '/dashboard',
    '/dashboard/*',
    '/managerspace',
    '/managerspace/*',
    '/clientspace',
    '/clientspace/*',
    '/admin',
    '/admin/*',
    '/api/*',
  ],
  additionalPaths: async (config) => {
    const albumPaths = await fetchAlbums();
    const staticPaths = [
      { loc: '/webtvbusologa', changefreq: 'hourly', priority: 1 },
      { loc: '/portal/transporte-publico/', changefreq: 'daily', priority: 0.8 },
      { loc: '/portal/aviacao/', changefreq: 'daily', priority: 0.8 },
      { loc: '/portal/ferrovia/', changefreq: 'daily', priority: 0.8 },
      { loc: '/portal/automoveis/', changefreq: 'daily', priority: 0.8 },
      { loc: '/portal/post/', changefreq: 'daily', priority: 0.8 },
      { loc: '/portal/festividades/', changefreq: 'daily', priority: 0.8 },
      { loc: '/portal/natal/', changefreq: 'daily', priority: 0.8 },
      { loc: '/portal/religiao/', changefreq: 'daily', priority: 0.8 },
    ];

    return [...staticPaths, ...albumPaths].map((path) => ({
      loc: `${config.siteUrl}${path.loc}`,
      changefreq: path.changefreq,
      priority: path.priority,
    }));
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/login',
          '/dashboard',
          '/dashboard/*',
          '/managerspace',
          '/managerspace/*',
          '/clientspace',
          '/clientspace/*',
          '/admin',
          '/admin/*',
          '/api/*',
        ],
      },
    ],
  },
};
