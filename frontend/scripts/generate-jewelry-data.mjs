import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const frontendRoot = path.resolve(scriptDir, '..');
const htmlDir = path.join(frontendRoot, 'jewelry pages');
const imageRoot = path.join(frontendRoot, 'public/assets/jewelry_images');
const outDir = path.join(frontendRoot, 'src/data/jewelry');

const IMAGE_EXT = /\.(jpe?g|png|gif|webp)$/i;

const pages = [
    {
        slug: 'fashion',
        title: 'Fashion/Designer Jewelry',
        exportName: 'fashionJewelryPage',
        file: 'fashion.ts',
        html: 'Fashion_Designer_Jewelry.html',
        folder: 'Jewelry',
        aliases: ['jewelry'],
    },
    {
        slug: 'custom',
        title: 'Custom Jewelry Design',
        exportName: 'customJewelryPage',
        file: 'custom.ts',
        html: 'Custom_Jewelry.html',
        folder: 'Custom Jewelry Design',
        aliases: ['custom jewelry design'],
        customProcess: true,
    },
    {
        slug: 'engagement-rings',
        title: 'Engagement Rings',
        exportName: 'engagementRingsPage',
        file: 'engagement-rings.ts',
        html: 'Engagement_Rings.html',
        folder: 'engagement rings',
        aliases: ['engagement rings'],
    },
    {
        slug: 'wedding-bands',
        title: 'Wedding Bands',
        exportName: 'weddingBandsPage',
        file: 'wedding-bands.ts',
        html: 'Wedding_Bands.html',
        folder: 'wedding bands',
        aliases: ['wedding bands'],
    },
    {
        slug: 'halo',
        title: 'Halo Collections',
        exportName: 'haloCollectionPage',
        file: 'halo.ts',
        html: 'Halo_Collection.html',
        folder: 'halo collection',
        aliases: ['halo collection', 'halo collections'],
    },
    {
        slug: 'adamantine',
        title: 'Adamantine Collection',
        exportName: 'adamantineCollectionPage',
        file: 'adamantine.ts',
        html: 'Adamantine_Collection.html',
        folder: 'adamantine collection',
        aliases: ['adamantine collection'],
    },
    {
        slug: 'fleur-de-lis',
        title: 'Fleur de Lis Collection',
        exportName: 'fleurDeLisPage',
        file: 'fleur-de-lis.ts',
        html: 'Fleur_de_Lis_Collection.html',
        folder: 'fleur de lise collection',
        aliases: ['fleur de lis collection', 'fleur de lise collection'],
    },
];

function decode(value) {
    const text = value
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/&quot;/gi, '"')
        .replace(/&#0?39;|&apos;/gi, "'")
        .replace(/&gt;/gi, '>')
        .replace(/&lt;/gi, '<')
        .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/>sup>/gi, ' ');
    return text.replace(/\s+/g, ' ').trim();
}

function basenameFromUrl(url) {
    const clean = decodeURIComponent(url.split('?')[0].split('#')[0]);
    const name = clean.split('/').pop() || '';
    return name.replace(/-\d+x\d+(?=\.[a-z0-9]+$)/i, '');
}

function indexFiles(folder) {
    const dir = path.join(imageRoot, folder);
    const map = new Map();
    for (const name of fs.readdirSync(dir)) {
        if (name.startsWith('.') || name.toLowerCase().endsWith('.psd')) continue;
        map.set(name.toLowerCase(), name);
    }
    return map;
}

function resolveFile(name, fileMap) {
    if (!name || name.toLowerCase().endsWith('.psd')) return null;
    const lower = name.toLowerCase();
    const sized = lower.match(/^(.*)-\d+x\d+(\.[a-z0-9]+)$/i);
    if (sized) {
        const full = fileMap.get(`${sized[1]}${sized[2]}`);
        if (full) return full;
    }
    const exact = fileMap.get(lower);
    if (!exact) return null;
    const exactSized = exact.toLowerCase().match(/^(.*)-\d+x\d+(\.[a-z0-9]+)$/i);
    if (exactSized) {
        const full = fileMap.get(`${exactSized[1]}${exactSized[2]}`);
        if (full) return full;
    }
    return exact;
}

function publicSrc(folder, filename) {
    return `/assets/jewelry_images/${encodeURIComponent(folder)}/${encodeURIComponent(filename)}`;
}

function slugify(value) {
    const slug = value
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/&/g, ' and ')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 80);
    return slug || 'item';
}

function uniqueId(base, used) {
    let id = base || 'item';
    let n = 2;
    while (used.has(id)) {
        id = `${base}-${n}`;
        n += 1;
    }
    used.add(id);
    return id;
}

function normalizeCaption(caption) {
    return caption.replace(/\s+/g, ' ').trim();
}

function normalizeMetalWords(value) {
    return value.replace(/\b(white|yellow|rose|pink)\s*-\s*gold\b/gi, '$1 gold');
}

function designKey(caption) {
    let c = normalizeMetalWords(caption).toLowerCase().replace(/[’‘]/g, "'").replace(/[–—]/g, '-');
    c = c.replace(/&/g, ' and ');
    c = c.replace(/\balso available\b[^|]*/g, ' ');
    c = c.replace(/\bmade to order\b[^|]*/g, ' ');
    c = c.replace(/\bprice depends\b[^|]*/g, ' ');
    c = c.replace(/\bplease (?:call|contact)\b[^|]*/g, ' ');
    c = c.replace(/\bcall (?:us|for)\b[^|]*/g, ' ');
    c = c.replace(/\b1?\s*\(?\d{3}\)?[\s.-]*\d{3}[\s.-]*\d{4}\b/g, ' ');
    c = c.replace(new RegExp(`\\b${itemNumberPattern}`, 'g'), ' ');
    c = c.replace(/\$\s*[\d,.]+/g, ' ');
    c = c.replace(
        /\b(?:2|two)\s*-?\s*tone\s+(?:(?:10|14|18|22|24)\s*k(?:t|arat)?\s+)?(?:white|yellow|rose|pink)\s+and\s+(?:white|yellow|rose|pink)\s+gold\b/g,
        ' metal ',
    );
    c = c.replace(
        /\b(?:(?:10|14|18|22|24)\s*k(?:t|arat)?(?:\s+or\s+(?:10|14|18|22|24)\s*k(?:t|arat)?)?\s+)?(?:white|yellow|rose|pink)\s+gold\b/g,
        ' metal ',
    );
    c = c.replace(/\b(?:white|yellow|rose|pink)\s+and\s+(?:white|yellow|rose|pink)\s+gold\b/g, ' metal ');
    c = c.replace(/\b(?:10|14|18|22|24)\s*k(?:t|arat)?\s+gold\b/g, ' metal ');
    c = c.replace(/(\d+(?:\.\d+)?)\s*g of\b/g, '$1g');
    c = c.replace(/\bbands\b/g, 'band');
    c = c.replace(/\brings\b/g, 'ring');
    c = c.replace(/\b(?:3d|front|side|top)\s+views?\b/g, ' ');
    c = c.replace(/\btop\s+tilt\b/g, ' ');
    c = c.replace(/\b3\s*\/\s*4\b/g, ' ');
    c = c.replace(/\badamantine collection\b/g, ' ');
    c = c.replace(/(\d)\.(\d)/g, '$1<$2');
    c = c.replace(/[^a-z0-9< ]+/g, ' ');
    c = c.replace(/</g, '.');
    c = c.replace(/\s+/g, ' ').trim();
    c = c.replace(/^\s*of\s+/, '');
    return c;
}

function isStrongKey(key) {
    if (/\d+(?:\.\d+)?\s*(?:tcw|ct|carat|g|gr|mm|grams?)\b/.test(key)) return true;
    if (/\b\d+\s+stones?\b/.test(key)) return true;
    if (/\b\d+\s+prongs?\b/.test(key)) return true;
    if (
        /\d/.test(key) &&
        /\b(rings?|bands?|bangles?|pendants?|earrings?|bracelets?|necklaces?|brooches?|diamonds?|gemstones?)\b/.test(key)
    ) {
        return true;
    }
    return false;
}

function isGenericKey(key) {
    const compact = key.replace(/\bmetal\b/g, ' ').replace(/\s+/g, ' ').trim();
    return compact.length < 12;
}

function lightStem(filename) {
    let s = filename.toLowerCase().replace(/\.[a-z0-9]+$/, '');
    s = s.replace(/-top-tilt/g, '');
    s = s.replace(/-(?:white|yellow|rose|pink)-(?:white|yellow|rose|pink)-gold/g, '');
    s = s.replace(/-(?:white|yellow|rose|pink)-gold/g, '');
    s = s.replace(/-(?:white|yellow|rose|pink)(?=-|\.)/g, '');
    s = s.replace(/(?:^|-)(?:front|side|top|3d)(?:-view)?(?=-|$)/g, '');
    s = s.replace(/-\d+[ryw]$/g, '');
    s = s.replace(/-f\d+$/g, '');
    s = s.replace(/gold\d+$/g, '');
    s = s.replace(/-\d{1,2}$/g, '');
    s = s.replace(/[^a-z0-9]+/g, '');
    return s;
}

function coreStem(filename) {
    let s = filename.toLowerCase().replace(/\.[a-z0-9]+$/, '');
    s = s.replace(/-\d+x\d+$/, '');
    s = s.replace(/-top-tilt/g, '');
    s = s.replace(/-(?:white|yellow|rose|pink)-(?:white|yellow|rose|pink)-gold/g, '');
    s = s.replace(/-(?:white|yellow|rose|pink)-gold/g, '');
    s = s.replace(/-(?:white|yellow|rose|pink)(?=-|$)/g, '');
    s = s.replace(/-(?:wg|yg|rg)(?=-|$)/g, '');
    s = s.replace(/(?:^|-)(?:front|side|top|3d)(?:-view)?(?=-|$)/g, '');
    s = s.replace(/-view(?=-|$)/g, '');
    s = s.replace(/-\d+[ryw](?=$)/g, '');
    s = s.replace(/-f?\d+a(?=$|-)/g, '');
    s = s.replace(/-f\d+(?=$)/g, '');
    s = s.replace(/gold\d+$/g, 'gold');
    s = s.replace(/-\d{1,2}(?=$|-)/g, '');
    for (const noise of [
        'south-bay-gold',
        'southbay-gold',
        'south-bay',
        'torrance',
        'finleys',
        'finley',
        'jewelers',
        'jewelry-store',
        'jewelry',
        'los-angeles',
        'los-aangeles',
        'christmas-sale',
        'black-friday',
        'del-amo',
        'sbg',
    ]) {
        s = s.replaceAll(noise, '');
    }
    s = s.replace(/[^a-z0-9]+/g, '');
    s = s.replace(/(\D)\d{1,2}$/g, '$1');
    return s;
}

function stemFor(caption, filename) {
    const key = designKey(caption);
    return isGenericKey(key) ? lightStem(filename) : coreStem(filename);
}

function canonicalKarat(value) {
    return value.toLowerCase().replace(/karats?/g, 'k').replace(/kt/g, 'k').replace(/\s+/g, '');
}

const itemNumberPattern = String.raw`item\s*#?\s*([a-z0-9]+(?:-[a-z0-9]+)*)`;

function tidyLabel(value) {
    return value
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/\bgold\b/gi, 'Gold')
        .replace(/\bplatinum\b/gi, 'Platinum');
}

function titleFromFilename(filename) {
    let value = filename.replace(/\.[a-z0-9]+$/i, '');
    value = value.replace(/-top-tilt/gi, ' ');
    value = value.replace(/-(?:front|side|top|3d)(?:-view)?/gi, ' ');
    value = value.replace(/-(?:white|yellow|rose|pink)(?:-gold)?/gi, ' ');
    value = value.replace(
        /-(?:south-bay-gold|southbay-gold|torrance|finleys|jewelers|jewelry-store|los-angeles|los-aangeles)/gi,
        ' ',
    );
    value = value.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
    if (!value) return '';
    return value.replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
}

function metalFrom(caption, filename) {
    const c = normalizeMetalWords(caption).replace(/\balso available\b[^|]*/gi, ' ');
    const two = c.match(
        /((?:2|two)\s*-?\s*tone\s+)?((?:(?:10|14|18|22|24)\s*k(?:t|arat)?\s+)?)((?:white|yellow|rose|pink)\s+and\s+(?:white|yellow|rose|pink))\s+gold/i,
    );
    if (two) {
        const tone = two[1] ? '2 Tone' : '';
        const karat = tidyLabel(two[2] || '');
        const colors = tidyLabel(two[3]);
        const label = tidyLabel(`${tone} ${karat} ${colors} Gold`);
        return {
            key: `two|${canonicalKarat(karat)}|${colors.toLowerCase()}`,
            label,
        };
    }

    const withKarat = [
        ...c.matchAll(
            /((?:10|14|18|22|24)\s*k(?:t|arat)?(?:\s+or\s+(?:10|14|18|22|24)\s*k(?:t|arat)?)?\s+)((?:white|yellow|rose|pink)\s+gold)/gi,
        ),
    ];
    if (withKarat.length > 0) {
        const karat = tidyLabel(withKarat[0][1]);
        const color = withKarat[0][2].toLowerCase();
        return {
            key: `one|${canonicalKarat(karat)}|${color}`,
            label: tidyLabel(`${karat} ${withKarat[0][2]}`),
        };
    }
    const colorOnly = c.match(/\b((?:white|yellow|rose|pink)\s+gold)\b/i);
    if (colorOnly) {
        return { key: `one||${colorOnly[1].toLowerCase()}`, label: tidyLabel(colorOnly[1]) };
    }

    if (/\bplatinum\b/i.test(c) && !/\bgold\b/i.test(c)) {
        return { key: 'platinum', label: 'Platinum' };
    }

    const fromFile = metalFromFilename(filename);
    if (fromFile) return fromFile;

    const generic = c.match(/\b((?:10|14|18|22|24)\s*k(?:t|arat)?)\s+gold\b/i);
    if (generic) {
        return {
            key: `generic|${canonicalKarat(generic[1])}`,
            label: tidyLabel(generic[0]),
        };
    }

    return { key: 'unspecified', label: '' };
}

function metalFromFilename(filename) {
    const name = filename.toLowerCase();
    const two = name.match(/(white|yellow|rose|pink)-(white|yellow|rose|pink)-gold/);
    if (two) {
        const label = `2 Tone ${capitalize(two[1])} and ${capitalize(two[2])} Gold`;
        return { key: `two||${two[1]} and ${two[2]}`, label };
    }
    const named = name.match(/(white|yellow|rose|pink)-gold/);
    if (named) {
        return { key: `one||${named[1]} gold`, label: `${capitalize(named[1])} Gold` };
    }
    const code = name.match(/-(wg|yg|rg)(?=-|\.)/);
    if (code) {
        const map = { wg: 'white', yg: 'yellow', rg: 'rose' };
        const color = map[code[1]];
        return { key: `one||${color} gold`, label: `${capitalize(color)} Gold` };
    }
    const token = name.match(/-(white|yellow|rose|pink)(?=-|\.)/);
    if (token) {
        return { key: `one||${token[1]} gold`, label: `${capitalize(token[1])} Gold` };
    }
    const suffix = name.match(/-(\d+)([ryw])(?=\.)/);
    if (suffix) {
        const map = { r: 'rose', y: 'yellow', w: 'white' };
        const color = map[suffix[2]];
        return { key: `one||${color} gold`, label: `${capitalize(color)} Gold` };
    }
    return null;
}

function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function itemNumbers(caption) {
    return [...caption.matchAll(new RegExp(`\\b${itemNumberPattern}`, 'gi'))].map((match) => match[1]);
}

function stripPhotoSuffix(value) {
    const match = value.match(/^(.*\d.*)-(\d{2})$/);
    if (match && match[1].replace(/\D/g, '').length >= 3) return match[1];
    return value;
}

function chooseBase(numbers) {
    if (numbers.length === 0) return '';
    const unique = [...new Set(numbers.map(stripPhotoSuffix))];
    const sorted = [...unique].sort((a, b) => b.length - a.length);
    for (const long of sorted) {
        if (unique.some((short) => short !== long && (long.endsWith(short) || long.endsWith(`-${short}`)))) {
            return long;
        }
    }
    return [...unique].sort((a, b) => a.length - b.length)[0];
}

function applyBase(caption, base) {
    if (!base || !/\bitem\s*#/i.test(caption)) return caption;
    return caption.replace(new RegExp(`\\b${itemNumberPattern}`, 'i'), `Item #${base}`);
}

function looksGeneric(title) {
    return /^(?:price depends|please call|call us|call for|contact us)\b/i.test(title);
}

function cleanAltTitle(alt) {
    let value = alt.replace(/\s+-\s+.*$/, '');
    value = value.replace(/\b(?:south bay gold|sbg|finley'?s|jewelry store|torrance|los ang(?:e|le)s).*/i, '');
    value = value.replace(/\b(?:white|yellow|rose|pink)\s+gold\b/gi, '');
    value = value.replace(/\s+\b(?:in|on|set)\s*$/i, '');
    value = value.replace(/\s+/g, ' ').trim().replace(/[\s,–—:-]+$/g, '');
    if (!value) return '';
    if (value === value.toLowerCase()) {
        value = value.replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
    }
    return value;
}

function pieceTitle(caption, alt = '', filename = '') {
    let title = caption.split('|')[0] ?? caption;
    title = title.replace(
        /\b(?:10|14|18|22|24)\s*k(?:t|arat)?(?:\s+or\s+(?:10|14|18|22|24)\s*k(?:t|arat)?)?\s+(?:white|yellow|rose|pink)\s+gold\b/gi,
        '',
    );
    title = title.replace(/\b(?:white|yellow|rose|pink)\s+and\s+(?:white|yellow|rose|pink)\s+gold\b/gi, '');
    title = title.replace(/\b(?:white|yellow|rose|pink)\s+gold\b/gi, '');
    title = title.replace(/^(?:3d|front|side|top)\s+views?\s+of\s+/i, '');
    title = title.replace(/\s+(?:set\s+)?(?:on|in)\s*$/i, '');
    title = title.replace(/\s+/g, ' ').trim();
    title = title.replace(/[\s,–—:-]+$/g, '').trim();
    if (!title || looksGeneric(title)) {
        const fromAlt = cleanAltTitle(alt);
        if (fromAlt) return fromAlt;
        const fromFile = titleFromFilename(filename);
        if (fromFile) return fromFile;
    }
    return title || 'Jewelry';
}

function stripMetalPhrases(value) {
    return value
        .replace(
            /\b(?:2|two)\s*-?\s*tone\s+(?:(?:10|14|18|22|24)\s*k(?:t|arat)?\s+)?(?:white|yellow|rose|pink)\s+and\s+(?:white|yellow|rose|pink)\s+gold\b/gi,
            '',
        )
        .replace(
            /\b(?:(?:10|14|18|22|24)\s*k(?:t|arat)?(?:\s+or\s+(?:10|14|18|22|24)\s*k(?:t|arat)?)?\s+)?(?:white|yellow|rose|pink)\s+gold\b/gi,
            '',
        )
        .replace(/\b(?:10|14|18|22|24)\s*k(?:t|arat)?\s+gold\b/gi, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function stripPrices(value) {
    if (!value) return value;
    let text = value.replace(/\$\s*(?:\d[\d,]*(?:\.\d+)?|x+)/gi, '');
    text = text.replace(/\s*(?:\|\s*){2,}/g, ' | ');
    text = text.replace(/(?:\s*·\s*){2,}/g, ' · ');
    text = text.replace(/\s+\|\s*$/g, '').replace(/^\s*\|\s*/g, '');
    text = text.replace(/\s*·\s*$/g, '').replace(/^\s*·\s*/g, '');
    text = text.replace(/\s+,/g, ',');
    text = text.replace(/,\s*(?=\||·|$)/g, '');
    text = text.replace(/\s{2,}/g, ' ');
    return text.trim();
}

function isExcludedCustomPiece(piece) {
    if (/diamond solitaire engagement or wedding ring/i.test(piece.title)) return true;
    return piece.variants.some((variant) =>
        variant.images.some((image) =>
            /Diamond-Engagement-Wedding-Ring-South-Bay-Gold1/i.test(decodeURIComponent(image.src)),
        ),
    );
}

function buildSummary(title, caption, variantCount) {
    const parts = caption
        .split('|')
        .map((part) => part.trim())
        .filter(Boolean);
    const kept = [];
    for (let part of parts) {
        if (/^item\s*#/i.test(part)) continue;
        part = part.replace(/\s*[–—-]?\s*also available\b.*/i, '');
        if (variantCount > 1) part = stripMetalPhrases(part);
        part = part.replace(/\s+/g, ' ').trim();
        part = part.replace(/^(?:of|set)$/i, '').replace(/\s+of\s*$/i, '').trim();
        part = part.replace(/\s+set\s+in\s*$/i, '').replace(/\s+available\s+in\s*$/i, '').trim();
        part = part.replace(/^[\s,–—:-]+|[\s,–—:-]+$/g, '').trim();
        if (!part) continue;
        if (part.toLowerCase() === title.toLowerCase()) continue;
        kept.push(part);
    }
    const summary = kept.join(' · ');
    if (!summary || summary.toLowerCase() === title.toLowerCase()) return '';
    if (/^(?:3d|front|side|top) views? of /i.test(summary) && summary.toLowerCase().includes(title.toLowerCase())) {
        return '';
    }
    return summary;
}

function parseGalleryItem(block) {
    const href = /<a[^>]+href="([^"]+)"/i.exec(block)?.[1] ?? '';
    const src = /<img[^>]+src="([^"]+)"/i.exec(block)?.[1] ?? '';
    const alt = /<img[^>]+alt="([^"]*)"/i.exec(block)?.[1] ?? '';
    const captionRaw = /gallery-caption[^>]*>([\s\S]*?)<\/dd>/i.exec(block)?.[1] ?? '';
    const hrefName = href ? basenameFromUrl(href) : '';
    const srcName = src ? basenameFromUrl(src) : '';
    const filename = IMAGE_EXT.test(hrefName) ? hrefName : srcName;
    return {
        filename,
        alt: decode(alt),
        caption: normalizeCaption(decode(captionRaw)),
    };
}

function parseTokens(html) {
    const tokens = [];
    const re = /<h1[^>]*>([\s\S]*?)<\/h1>|<h2[^>]*>([\s\S]*?)<\/h2>|<dl class="gallery-item">([\s\S]*?)<\/dl>/gi;
    let match;
    let h1Count = 0;
    while ((match = re.exec(html))) {
        if (match[1] !== undefined) {
            h1Count += 1;
            if (h1Count === 1) continue;
            tokens.push({ type: 'h1', text: decode(match[1]) });
        } else if (match[2] !== undefined) {
            tokens.push({ type: 'h2', text: decode(match[2]) });
        } else {
            tokens.push({ type: 'item', html: match[3] });
        }
    }
    return tokens;
}

function findHero(html, folder, fileMap) {
    const stripped = html.replace(/<dl class="gallery-item">[\s\S]*?<\/dl>/gi, '');
    const re = /<img\b[^>]*>/gi;
    let match;
    while ((match = re.exec(stripped))) {
        const tag = match[0];
        const src = /src="([^"]+)"/i.exec(tag)?.[1];
        if (!src) continue;
        const file = resolveFile(basenameFromUrl(src), fileMap);
        if (!file) continue;
        const alt = decode(/alt="([^"]*)"/i.exec(tag)?.[1] ?? file);
        const after = stripped.slice(match.index, match.index + 700);
        const captionMatch = /wp-caption-text[^>]*>([\s\S]*?)<\/p>/i.exec(after);
        const heroCaption = captionMatch ? decode(captionMatch[1]) : '';
        return {
            hero: { src: publicSrc(folder, file), alt },
            heroCaption,
        };
    }
    return { hero: undefined, heroCaption: '' };
}

function parseCustomCopy(html) {
    const withoutGallery = html.replace(/<div id="gallery-[\s\S]*?<br style="clear: both">\s*<\/div>/i, '');
    const paragraphs = [...withoutGallery.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
        .map((match) => decode(match[1]))
        .filter((text) => text.length > 80 && !text.includes('#gallery') && !text.includes('margin: auto'));
    const steps = [...html.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)].map((match) => decode(match[1]));
    if (paragraphs.length < 2) {
        throw new Error(`Expected custom intro paragraphs, found ${paragraphs.length}`);
    }
    if (steps.length !== 7) {
        throw new Error(`Expected 7 custom steps, found ${steps.length}: ${steps.join(' | ')}`);
    }
    return {
        intro: paragraphs.slice(0, 2),
        stepsBeforeGallery: steps.slice(0, 4),
        stepsAfterGallery: steps.slice(4),
    };
}

function headingKey(value) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function groupPhotos(photos) {
    const groups = [];
    for (const photo of photos) {
        const strong = isStrongKey(photo.designKey);
        const existing = groups.find((group) => {
            if (group.designKey !== photo.designKey) return false;
            if (strong && group.strong) return true;
            return group.stem === photo.stem;
        });
        if (existing) {
            existing.items.push(photo);
        } else {
            groups.push({
                designKey: photo.designKey,
                strong,
                stem: photo.stem,
                items: [photo],
            });
        }
    }
    return groups;
}

function buildPiece(group, usedIds) {
    const variantMap = new Map();
    for (const photo of group.items) {
        let variant = variantMap.get(photo.metal.key);
        if (!variant) {
            variant = {
                metalKey: photo.metal.key,
                metalLabel: photo.metal.label,
                photos: [],
            };
            variantMap.set(photo.metal.key, variant);
        }
        if (!variant.photos.some((item) => item.src === photo.src)) {
            variant.photos.push(photo);
        }
    }

    const variants = [...variantMap.values()];
    const firstPhoto = variants[0].photos[0];
    const title = pieceTitle(firstPhoto.caption, firstPhoto.alt, firstPhoto.filename);
    const id = uniqueId(slugify(title), usedIds);
    const usedVariantIds = new Set();

    return {
        id,
        title,
        summary: stripPrices(buildSummary(title, variants[0].photos[0].caption, variants.length)),
        variants: variants.map((variant) => {
            const numbers = variant.photos.flatMap((photo) => itemNumbers(photo.caption));
            const base = chooseBase(numbers);
            const source = variant.photos.find((photo) => itemNumbers(photo.caption).some((n) => stripPhotoSuffix(n) === base))
                ?? variant.photos[0];
            const caption = stripPrices(applyBase(source.caption, base) || title);
            const variantId = uniqueId(slugify(variant.metalLabel || 'metal'), usedVariantIds);
            return {
                id: variantId,
                metalLabel: variant.metalLabel,
                caption,
                images: variant.photos.map((photo) => ({
                    src: photo.src,
                    alt: photo.alt || title,
                })),
            };
        }),
    };
}

function buildPage(config) {
    const html = fs.readFileSync(path.join(htmlDir, config.html), 'utf8');
    const fileMap = indexFiles(config.folder);
    const tokens = parseTokens(html);
    const aliases = new Set([config.title, ...config.aliases].map(headingKey));
    const dropped = [];
    let subtitle = '';
    let pendingHeading = '';
    const sectionDrafts = [];

    function sectionFor(heading) {
        let section = sectionDrafts.find((draft) => draft.heading === heading);
        if (!section) {
            section = { heading, photos: [] };
            sectionDrafts.push(section);
        }
        return section;
    }

    for (const token of tokens) {
        if (token.type === 'h1') {
            pendingHeading = token.text;
            continue;
        }
        if (token.type === 'h2') {
            if (!subtitle) subtitle = token.text;
            continue;
        }
        const parsed = parseGalleryItem(token.html);
        const file = resolveFile(parsed.filename, fileMap);
        if (!file) {
            dropped.push(parsed.filename || parsed.caption);
            continue;
        }
        const photo = {
            src: publicSrc(config.folder, file),
            alt: parsed.alt,
            caption: parsed.caption,
            filename: file,
            designKey: designKey(parsed.caption),
            stem: stemFor(parsed.caption, file),
            metal: metalFrom(parsed.caption, file),
        };
        sectionFor(pendingHeading).photos.push(photo);
    }

    if (sectionDrafts.length === 1 && aliases.has(headingKey(sectionDrafts[0].heading)) && subtitle) {
        sectionDrafts[0].heading = subtitle;
        subtitle = '';
    }

    const usedSectionIds = new Set();
    const usedPieceIds = new Set();
    const sections = sectionDrafts
        .map((draft) => {
            const pieces = groupPhotos(draft.photos)
                .map((group) => buildPiece(group, usedPieceIds))
                .filter((piece) => config.slug !== 'custom' || !isExcludedCustomPiece(piece));
            const heading = draft.heading;
            return {
                id: uniqueId(slugify(heading || config.slug), usedSectionIds),
                heading,
                pieces,
            };
        })
        .filter((section) => section.pieces.length > 0);

    const { hero, heroCaption } = findHero(html, config.folder, fileMap);
    const page = {
        slug: config.slug,
        title: config.title,
        sections,
    };
    if (hero) page.hero = hero;
    if (heroCaption) page.heroCaption = heroCaption;
    if (subtitle) page.subtitle = subtitle;
    if (config.customProcess) {
        Object.assign(page, parseCustomCopy(html));
    }
    return { page, dropped };
}

function assert(condition, message) {
    if (!condition) throw new Error(message);
}

function allPieces(page) {
    return page.sections.flatMap((section) => section.pieces);
}

function findPiece(page, predicate) {
    return allPieces(page).find(predicate);
}

function metalText(piece) {
    return piece.variants.map((variant) => variant.metalLabel.toLowerCase()).join(' | ');
}

function assertCatalog(catalog) {
    const fleur = catalog.get('fleur-de-lis');
    const bangle = findPiece(
        fleur,
        (piece) => /bangle/i.test(piece.title) && !/cigar|stackable/i.test(piece.title),
    );
    assert(bangle, 'Missing Fleur bangle');
    assert(bangle.variants.length === 2, `Fleur bangle variants: ${metalText(bangle)}`);
    assert(bangle.variants.every((variant) => variant.images.length === 2), 'Fleur bangle should have two angles per metal');
    assert(/white gold/i.test(metalText(bangle)) && /yellow gold/i.test(metalText(bangle)), metalText(bangle));
    assert(!/rose gold/i.test(metalText(bangle)), `Fleur bangle should not include rose: ${metalText(bangle)}`);
        assert(
        bangle.variants.some((variant) => /2684/.test(variant.caption) && !/\$/.test(variant.caption)),
        `Fleur bangle caption should keep the item number and drop the price: ${bangle.variants.map((variant) => variant.caption).join(' || ')}`,
    );
    for (const variant of bangle.variants) {
        const srcs = variant.images.map((image) => image.src.toLowerCase()).join(' ');
        assert(/top-tilt/.test(srcs) && /34/.test(srcs), `Fleur bangle angles missing: ${srcs}`);
    }

    const stackable = findPiece(fleur, (piece) => /stackable/i.test(piece.title));
    assert(stackable, 'Missing Fleur stackable band');
    assert(stackable.variants.length === 3, `Stackable variants: ${metalText(stackable)}`);
    assert(
        ['white gold', 'yellow gold', 'rose gold'].every((color) => metalText(stackable).includes(color)),
        metalText(stackable),
    );
    assert(stackable.variants.every((variant) => variant.images.length === 2), 'Stackable band should have two angles');
    assert(stackable.variants.every((variant) => !/\$/.test(variant.caption)), 'Stackable price should be removed');

    const bands = catalog.get('wedding-bands');
    const seven = findPiece(bands, (piece) => /7 stone bezel/i.test(piece.title));
    assert(seven, 'Missing 7-stone bezel band');
    assert(seven.variants.length >= 2, metalText(seven));
    assert(
        seven.variants.every((variant) => variant.images.length >= 2),
        '7-stone band should group angle photos',
    );

    const eighteen = findPiece(bands, (piece) => /18 stone diamonds wedding bands for ladies/i.test(piece.title));
    assert(eighteen, 'Missing 18-stone ladies band');
    assert(
        ['yellow gold', 'white gold', 'rose gold'].every((color) => metalText(eighteen).includes(color)),
        metalText(eighteen),
    );
    assert(
        eighteen.variants.every((variant) => variant.images.length >= 2),
        '18-stone band should have multiple angles per metal',
    );

    const fashion = catalog.get('fashion');
    const quartz = findPiece(fashion, (piece) => /white quartz/i.test(piece.title) && /tear\s*drop|teardrop/i.test(piece.title));
    assert(quartz, 'Missing white quartz earrings');
    assert(quartz.variants.length === 1, `Quartz should be white gold only: ${metalText(quartz)}`);
    assert(/white gold/i.test(quartz.variants[0].metalLabel), quartz.variants[0].metalLabel);

    const rings = catalog.get('engagement-rings');
    const solitaire = findPiece(
        rings,
        (piece) => piece.variants.some((variant) => /2\.50/.test(variant.caption) && /6 prongs/i.test(variant.caption)),
    );
    assert(solitaire, 'Missing 2.50ct 6-prong solitaire');
    assert(solitaire.variants.length === 3, `Solitaire metals: ${metalText(solitaire)}`);
    const solitaireSrc = solitaire.variants
        .flatMap((variant) => variant.images.map((image) => decodeURIComponent(image.src)))
        .join(' ');
    for (const token of ['1R', '2R', '3R', '1W', '2W', '3W', '1Y', '2Y', '3Y']) {
        assert(solitaireSrc.includes(token), `Solitaire missing ${token}`);
    }

    const adamantine = catalog.get('adamantine');
    const emerald = allPieces(adamantine).filter((piece) =>
        piece.variants.some((variant) => /2738/.test(variant.caption) && /2\.0ct oval/i.test(variant.caption)),
    );
    assert(emerald.length === 1, `Expected one Adamantine 2738 piece, found ${emerald.length}`);
    assert(emerald[0].variants.length === 1, metalText(emerald[0]));
    assert(/white gold/i.test(emerald[0].variants[0].metalLabel), emerald[0].variants[0].metalLabel);
    assert(emerald[0].variants[0].images.length >= 3, 'Adamantine 2738 should group angle photos');
    assert(/item #2738\b/i.test(emerald[0].variants[0].caption), emerald[0].variants[0].caption);

    const custom = catalog.get('custom');
    const views = findPiece(custom, (piece) =>
        piece.variants.some((variant) => {
            const src = variant.images.map((image) => decodeURIComponent(image.src).toLowerCase()).join(' ');
            return src.includes('3d-view') && src.includes('front-view') && src.includes('side-view') && src.includes('top-view');
        }),
    );
    assert(views, 'Custom design ring views were not grouped');
    const solitaires = allPieces(custom).filter((piece) => /solitaire/i.test(piece.title));
    assert(allPieces(custom).length === 2, `Custom page should have two pieces, found ${allPieces(custom).length}`);
    assert(
        !allPieces(custom).some((piece) => /engagement or wedding ring/i.test(piece.title)),
        'Excluded custom solitaire is still present',
    );
    assert(solitaires.length >= 1, 'Custom solitaire missing');
    assert(
        solitaires.every((piece) => !piece.variants.some((variant) => variant.images.some((image) => /3d-view/i.test(image.src)))),
        'Solitaire should stay separate from the custom design views',
    );
    assert(custom.stepsBeforeGallery?.length === 4, 'Custom steps before gallery');
    assert(custom.stepsAfterGallery?.length === 3, 'Custom steps after gallery');
    assert(/wax/i.test(custom.stepsBeforeGallery[3]), custom.stepsBeforeGallery[3]);
    assert(/cast/i.test(custom.stepsAfterGallery[0]), custom.stepsAfterGallery[0]);

    const halo = catalog.get('halo');
    const haloHeadings = halo.sections.map((section) => section.heading);
    for (const heading of ['Classic Halo', 'Beaded Halo', 'Regal Halo']) {
        assert(haloHeadings.includes(heading), `Missing halo section ${heading}: ${haloHeadings.join(', ')}`);
    }
    assert(haloHeadings.some((heading) => /modern pave/i.test(heading)), haloHeadings.join(', '));
    assert(/modern pave/i.test(halo.subtitle ?? ''), halo.subtitle ?? '');
    for (const section of halo.sections) {
        for (const piece of section.pieces) {
            const name = `${piece.title} ${piece.variants.map((variant) => variant.caption).join(' ')}`.toLowerCase();
            const kinds = ['earring', 'pendant', 'ring'].filter((kind) => new RegExp(`\\b${kind}s?\\b`).test(name));
            assert(kinds.length <= 1, `Halo piece mixes jewelry types: ${piece.title}`);
        }
    }

    for (const page of catalog.values()) {
        for (const piece of allPieces(page)) {
            assert(!/\$/.test(piece.summary), `Price left in summary: ${piece.title} / ${piece.summary}`);
            for (const variant of piece.variants) {
                assert(!/\$/.test(variant.caption), `Price left in caption: ${piece.title} / ${variant.caption}`);
                assert(variant.images.length > 0, `Empty variant ${piece.title}`);
                for (const image of variant.images) {
                    assert(!image.src.includes('150x150'), image.src);
                    assert(!image.src.toLowerCase().includes('.psd'), image.src);
                    assert(!image.src.includes('southbaygold.com'), image.src);
                    const decoded = decodeURIComponent(image.src);
                    const relative = decoded.replace(/^\/assets\/jewelry_images\//, '');
                    const [folder, filename] = [relative.slice(0, relative.lastIndexOf('/')), relative.slice(relative.lastIndexOf('/') + 1)];
                    assert(fs.existsSync(path.join(imageRoot, folder, filename)), `Missing file for ${image.src}`);
                }
            }
        }
    }
}

function writePage(config, page) {
    const json = JSON.stringify(page, null, 4);
    const contents = `// Generated by frontend/scripts/generate-jewelry-data.mjs. Do not edit by hand.\nimport type { JewelryPage } from './types';\n\nexport const ${config.exportName}: JewelryPage = ${json};\n`;
    fs.writeFileSync(path.join(outDir, config.file), contents);
}

function writeIndex() {
    const imports = pages
        .map((page) => `import { ${page.exportName} } from './${page.file.replace(/\.ts$/, '')}';`)
        .join('\n');
    const names = pages.map((page) => page.exportName).join(', ');
    const list = pages.map((page) => page.exportName).join(',\n    ');
    const contents = `import type { JewelryPage } from './types';\n${imports}\n\nexport { ${names} };\n\nexport const jewelryPages: JewelryPage[] = [\n    ${list},\n];\n`;
    fs.writeFileSync(path.join(outDir, 'index.ts'), contents);
}

const catalog = new Map();
for (const config of pages) {
    const { page, dropped } = buildPage(config);
    catalog.set(config.slug, page);
    const pieceCount = allPieces(page).length;
    console.log(
        `${config.slug}: ${pieceCount} pieces, ${page.sections.length} sections, hero=${Boolean(page.hero)}, dropped=${dropped.length}`,
    );
    for (const section of page.sections) {
        console.log(`  ${section.heading || '(untitled)'}: ${section.pieces.length}`);
    }
    const notable = allPieces(page).filter(
        (piece) => piece.variants.length > 1 || piece.variants.some((variant) => variant.images.length > 1),
    );
    for (const piece of notable) {
        const detail = piece.variants
            .map((variant) => `${variant.metalLabel || 'unspecified'} x${variant.images.length}`)
            .join(', ');
        console.log(`    * ${piece.title} — ${detail}`);
    }
    if (dropped.length) {
        console.log(`    dropped sample: ${dropped.slice(0, 6).join(' | ')}`);
    }
}

assertCatalog(catalog);
fs.mkdirSync(outDir, { recursive: true });
for (const config of pages) writePage(config, catalog.get(config.slug));
writeIndex();
console.log('Wrote jewelry catalog data.');
