/** @type {import('next-sitemap').IConfig} */
const fetchAlbums = async () => {
  try {
    const response = await fetch('https://seusite.com.br/api/albums'); // Substitua pela URL real da API
    if (!response.ok) throw new Error('Erro ao buscar os álbuns');
    
    const albums = await response.json(); // Supondo que a API retorna um array de álbuns
    return albums.map((album) => ({
      loc: `/portal/album/${album.autor}/${album.id}`,
      changefreq: 'weekly',
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Erro ao buscar os álbuns:', error);
    return []; // Retorna um array vazio se houver erro
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
