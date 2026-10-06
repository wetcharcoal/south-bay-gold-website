import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import { HomePage } from './pages/HomePage';
import { LocationsPage } from './pages/LocationsPage';
import { AboutPage } from './pages/AboutPage';
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

const routeTree = rootRoute.addChildren([indexRoute, locationsRoute, aboutRoute]);

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
