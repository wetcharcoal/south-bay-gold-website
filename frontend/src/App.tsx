import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import { HomePage } from './pages/HomePage';
import { LocationsPage } from './pages/LocationsPage';
import { AboutPage } from './pages/AboutPage';
import { WatchesPage } from './pages/WatchesPage';
import { BuyWatchesPage } from './pages/BuyWatchesPage';
import { SellGoldPage } from './pages/SellGoldPage';
import { BuyDiamondsPage } from './pages/BuyDiamondsPage';
import { SellDiamondsPage } from './pages/SellDiamondsPage';
import {
    AdamantineCollectionPage,
    CustomJewelryPage,
    EngagementRingsPage,
    FashionJewelryPage,
    FleurDeLisPage,
    HaloCollectionPage,
    WeddingBandsPage,
} from './pages/JewelryCatalogPage';
import { Layout } from './components/Layout';

const rootRoute = createRootRoute({
    component: Layout,
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage,
});

const locationsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/locations',
    component: LocationsPage,
});

const aboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/about',
    component: AboutPage,
});

const watchesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/watches',
    component: WatchesPage,
});

const buyWatchesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/buy-watches',
    component: BuyWatchesPage,
});

const sellGoldRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/sell-gold',
    component: SellGoldPage,
});

const buyDiamondsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/buy-diamonds',
    component: BuyDiamondsPage,
});

const sellDiamondsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/sell-diamonds',
    component: SellDiamondsPage,
});

const fashionJewelryRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/jewelry/fashion',
    component: FashionJewelryPage,
});

const customJewelryRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/jewelry/custom',
    component: CustomJewelryPage,
});

const engagementRingsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/jewelry/engagement-rings',
    component: EngagementRingsPage,
});

const weddingBandsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/jewelry/wedding-bands',
    component: WeddingBandsPage,
});

const haloCollectionRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/jewelry/halo',
    component: HaloCollectionPage,
});

const adamantineCollectionRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/jewelry/adamantine',
    component: AdamantineCollectionPage,
});

const fleurDeLisRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/jewelry/fleur-de-lis',
    component: FleurDeLisPage,
});

const routeTree = rootRoute.addChildren([
    indexRoute,
    locationsRoute,
    aboutRoute,
    watchesRoute,
    buyWatchesRoute,
    sellGoldRoute,
    buyDiamondsRoute,
    sellDiamondsRoute,
    fashionJewelryRoute,
    customJewelryRoute,
    engagementRingsRoute,
    weddingBandsRoute,
    haloCollectionRoute,
    adamantineCollectionRoute,
    fleurDeLisRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

export default function App() {
    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <RouterProvider router={router} />
            <Toaster />
        </ThemeProvider>
    );
}
