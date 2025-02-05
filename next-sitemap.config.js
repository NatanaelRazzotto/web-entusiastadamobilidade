/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.entusiastadamobilidade.com.br',
    generateRobotsTxt: false,
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
      '/portal/transporte',
      '/portal/transporte/*'
    ],
    additionalPaths: async (config) => {
        return [        
          { loc: '/webtvbusologa', changefreq: 'hourly', priority: 1 },
          { loc: '/portal/transporte-publico/', changefreq: 'daily', priority: 0.8 },
          { loc: '/portal/aviacao/', changefreq: 'daily', priority: 0.8 },
          { loc: '/portal/ferrovia/', changefreq: 'daily', priority: 0.8 },
          { loc: '/portal/automoveis/', changefreq: 'daily', priority: 0.8 },
          { loc: '/portal/post/', changefreq: 'daily', priority: 0.8 },
          { loc: '/portal/festividades/', changefreq: 'daily', priority: 0.8 },
          { loc: '/portal/natal/', changefreq: 'daily', priority: 0.8 },
          { loc: '/portal/religiao/', changefreq: 'daily', priority: 0.8 }
        ].map((path) => ({
          loc: `${config.siteUrl}${path.loc}`,
          changefreq: path.changefreq,
          priority: path.priority,
        }));
      },
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', allow: '/', disallow: ['/login', '/dashboard', '/dashboard/*', '/managerspace', '/managerspace/*', '/clientspace', '/clientspace/*', '/admin', '/admin/*', '/api/*'] },
      ],
    },
  };
  