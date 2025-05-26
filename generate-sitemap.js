const fs = require('fs');
const locations = [
  { name: 'Dhaka', slug: 'dhaka' },
  { name: 'Chattogram', slug: 'chattogram' },
  { name: 'Khulna', slug: 'khulna' },
  { name: 'Rajshahi', slug: 'rajshahi' },
  { name: 'Barisal', slug: 'barisal' },
  { name: 'Sylhet', slug: 'sylhet' },
  { name: 'Rangpur', slug: 'rangpur' },
  { name: 'Mymensingh', slug: 'mymensingh' }
];
const baseUrl = 'https://abhawa.com';
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
locations.forEach(loc => {
  sitemap += `  <url>\n    <loc>${baseUrl}/location/${loc.slug}</loc>\n  </url>\n`;
});
sitemap += '</urlset>';
fs.writeFileSync('public/sitemap.xml', sitemap);
console.log('Sitemap generated at public/sitemap.xml');