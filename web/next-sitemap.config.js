/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  generateRobotsTxt: true,
  outDir: './public',
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/admin/**'],
  robotsTxtOptions: {
    additionalSitemaps: [

      `${process.env.NEXT_PUBLIC_BASE_URL}/server-sitemap.xml`, // sitemap động
    ],
  },
  // Fix App Router + (main)
  transform: async (config, path) => {
    if (
      path.includes('_') ||
      path.includes('/api') 
    
    ) {
      return null;
    }

    return {
        loc: `${config.siteUrl}${path}`,
    changefreq: config.changefreq,
    priority: config.priority,
    lastmod: new Date().toISOString(),
   
    };
  },
};
