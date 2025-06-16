const fs = require('fs');

const baseUrl = 'https://www.abhawa.com';
const staticUrls = [
  '',
  '/about',
  '/contact',
  '/privacy'
];
let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
staticUrls.forEach(url => {
  sitemap += `  <url>\n    <loc>${baseUrl}${url}</loc>\n  </url>\n`;
});

sitemap += '</urlset>';
fs.writeFileSync('public/sitemap.xml', sitemap);
// console.log('Sitemap generated at public/sitemap.xml');