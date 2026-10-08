import type { JewelryPage } from './types';
import { fashionJewelryPage } from './fashion';
import { customJewelryPage } from './custom';
import { engagementRingsPage } from './engagement-rings';
import { weddingBandsPage } from './wedding-bands';
import { haloCollectionPage } from './halo';
import { adamantineCollectionPage } from './adamantine';
import { fleurDeLisPage } from './fleur-de-lis';

export { fashionJewelryPage, customJewelryPage, engagementRingsPage, weddingBandsPage, haloCollectionPage, adamantineCollectionPage, fleurDeLisPage };

export const jewelryPages: JewelryPage[] = [
    fashionJewelryPage,
    customJewelryPage,
    engagementRingsPage,
    weddingBandsPage,
    haloCollectionPage,
    adamantineCollectionPage,
    fleurDeLisPage,
];
