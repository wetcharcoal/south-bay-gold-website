import { Outlet } from '@tanstack/react-router';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}
