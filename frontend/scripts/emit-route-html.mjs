import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const frontendRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(frontendRoot, 'dist');
const origin = 'https://wetcharcoal.github.io';

const routes = [
    {
        path: '/',
        title: "South Bay's Premier Gold & Jewelry Buyer",
        description:
            'Get the best prices for your gold, silver, platinum, and luxury watches. Trusted by the community for over 28 years.',
    },
    {
        path: '/about/',
        title: 'About Us',
        description: 'Trusted expertise in precious metals, diamonds, jewelry, and luxury watches',
    },
    {
        path: '/locations/',
        title: 'Our Locations',
        description: 'Visit any of our three convenient locations in the South Bay area',
    },
    {
        path: '/watches/',
        title: 'Watch Repair',
        description:
            'No matter what brand, no matter what the problem is, the basic reason we all have watches is that we need the basic information they provide, when we need it.',
    },
    {
        path: '/buy-watches/',
        title: 'Buy Watches',
        description: 'Men’s – Pre Owned Luxury Watches',
    },
    {
        path: '/sell-gold/',
        title: 'Sell Gold and Silver',
        description: 'jewelry, bullion, coins, and more',
    },
    {
        path: '/buy-diamonds/',
        title: 'Buy Diamonds',
        description: 'South Bay Gold buys, sells, and trades Diamonds along with all other precious stones.',
    },
    {
        path: '/sell-diamonds/',
        title: 'Sell Diamonds',
        description: 'South Bay Gold is the South Bay’s biggest diamond buyer.',
    },
    {
        path: '/jewelry/fashion/',
        title: 'Fashion/Designer Jewelry',
        description: 'Fashion & Designer Jewelry',
    },
    {
        path: '/jewelry/custom/',
        title: 'Custom Jewelry Design',
        description:
            'With nearly 100 years of combined experience in Custom Jewelry Designs, manufacturing and sales, we are here to help you Custom Design your engagement or wedding rings.',
    },
    {
        path: '/jewelry/engagement-rings/',
        title: 'Engagement Rings',
        description: 'Diamond Engagement Rings',
    },
    {
        path: '/jewelry/wedding-bands/',
        title: 'Wedding Bands',
        description: 'Wedding Bands for Women',
    },
    {
        path: '/jewelry/halo/',
        title: 'Halo Collections',
        description: 'Setting includes Modern Pave´, Beaded, Classic, & Regal',
    },
    {
        path: '/jewelry/adamantine/',
        title: 'Adamantine Collection',
        description:
            'Gemstone Rings: Each design is solely based on the center stone. One Stone, One Design, & One Unique Ring',
    },
    {
        path: '/jewelry/fleur-de-lis/',
        title: 'Fleur de Lis Collection',
        description:
            'Fleur De Lis Design on Bands, Bangles, Stackable Rings, & Pendants set in 18k Yellow Gold, White Gold, or Rose Gold',
    },
];

function pagesBase() {
    const base = process.env.VITE_BASE?.trim() || '/south-bay-gold-website/';
    if (!base.startsWith('/') || !base.endsWith('/')) {
        throw new Error('VITE_BASE must start and end with /');
    }
    return base;
}

function escapeHtml(value) {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;');
}

function pageUrl(routePath, siteRoot) {
    if (routePath === '/') return siteRoot;
    return `${siteRoot}${routePath.replace(/^\//, '')}`;
}

function withHead(shell, route, siteRoot) {
    const fullTitle = `${route.title} | South Bay Gold`;
    const canonical = pageUrl(route.path, siteRoot);
    const title = escapeHtml(fullTitle);
    const description = escapeHtml(route.description);
    const href = escapeHtml(canonical);
    const tags = [
        `<meta name="description" content="${description}" />`,
        `<link rel="canonical" href="${href}" />`,
        `<meta property="og:title" content="${title}" />`,
        `<meta property="og:description" content="${description}" />`,
        `<meta property="og:url" content="${href}" />`,
    ].join('\n        ');

    return shell
        .replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
        .replace('</head>', `        ${tags}\n    </head>`);
}

function writeSitemap(siteRoot) {
    const urls = routes
        .map((route) => `  <url><loc>${escapeHtml(pageUrl(route.path, siteRoot))}</loc></url>`)
        .join('\n');
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml);
}

function writeRobots(siteRoot) {
    const body = `User-agent: *\nAllow: /\n\nSitemap: ${siteRoot}sitemap.xml\n`;
    fs.writeFileSync(path.join(distDir, 'robots.txt'), body);
}

const shellPath = path.join(distDir, 'index.html');
const shell = fs.readFileSync(shellPath, 'utf8');
const siteRoot = new URL(pagesBase(), origin).href;

for (const route of routes) {
    const html = withHead(shell, route, siteRoot);
    if (route.path === '/') {
        fs.writeFileSync(shellPath, html);
        continue;
    }
    const dir = path.join(distDir, route.path.replace(/^\//, '').replace(/\/$/, ''));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
}

fs.writeFileSync(path.join(distDir, '404.html'), shell);
writeSitemap(siteRoot);
writeRobots(siteRoot);
