import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useDarkMode } from '@/hooks/useDarkMode';
import { useNavigate } from '@tanstack/react-router';
import { ChevronDown, Mail, Menu, Moon, Phone, Sun } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Sell Gold/Silver', path: '/sell-gold' },
    { label: 'Locations', path: '/locations' },
] as const;

const watchLinks = [
    { label: 'Watch Repair', path: '/watches' },
    { label: 'Buy Watches', path: '/buy-watches' },
] as const;

const linkClassName = 'text-sm font-medium text-foreground hover:text-gold transition-colors';

function DesktopWatchesMenu() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setOpen(false);
        };
        const onPointerDown = (event: MouseEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
        };

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('mousedown', onPointerDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('mousedown', onPointerDown);
        };
    }, [open]);

    return (
        <div
            ref={rootRef}
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <button
                type="button"
                className={`${linkClassName} inline-flex items-center gap-1`}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-controls="watches-menu"
                onClick={() => setOpen(true)}
            >
                Watches
                <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
            </button>
            {open ? (
                <div className="absolute left-0 top-full z-50 pt-2">
                    <div
                        id="watches-menu"
                        role="menu"
                        className="min-w-44 rounded-md border border-border bg-card p-2 shadow-md"
                    >
                        {watchLinks.map((item) => (
                            <button
                                key={item.path}
                                type="button"
                                role="menuitem"
                                className={`${linkClassName} block w-full rounded-sm px-3 py-2 text-left`}
                                onClick={() => {
                                    setOpen(false);
                                    navigate({ to: item.path });
                                }}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
}

function MobileNavLink({
    label,
    path,
}: {
    label: string;
    path: '/' | '/about' | '/locations' | '/watches' | '/buy-watches' | '/sell-gold';
}) {
    const navigate = useNavigate();

    return (
        <SheetClose asChild>
            <button
                type="button"
                onClick={() => navigate({ to: path })}
                className="text-left text-lg font-medium text-foreground hover:text-gold transition-colors"
            >
                {label}
            </button>
        </SheetClose>
    );
}

function MobileWatchesMenu() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col gap-3">
            <button
                type="button"
                className="inline-flex items-center gap-2 text-left text-lg font-medium text-foreground hover:text-gold transition-colors"
                aria-expanded={open}
                aria-controls="mobile-watches-menu"
                onClick={() => setOpen((current) => !current)}
            >
                Watches
                <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
            </button>
            {open ? (
                <div id="mobile-watches-menu" className="flex flex-col gap-3 pl-4">
                    {watchLinks.map((item) => (
                        <MobileNavLink key={item.path} label={item.label} path={item.path} />
                    ))}
                </div>
            ) : null}
        </div>
    );
}

export function Header() {
    const navigate = useNavigate();
    const { isDark, toggle } = useDarkMode();
    const beforeWatches = navItems.filter((item) => item.path !== '/locations');
    const locations = navItems.find((item) => item.path === '/locations');

    return (
        <header className="border-b border-border bg-card shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-8">
                        <button onClick={() => navigate({ to: '/' })} className="focus:outline-none">
                            <img
                                src="/assets/South-Bay-Gold-Logo-new.png"
                                alt="South Bay Gold"
                                className="h-16 w-auto object-contain cursor-pointer"
                            />
                        </button>
                        <nav className="hidden lg:flex items-center gap-6">
                            {beforeWatches.map((item) => (
                                <button
                                    key={item.path}
                                    onClick={() => navigate({ to: item.path })}
                                    className={linkClassName}
                                >
                                    {item.label}
                                </button>
                            ))}
                            <DesktopWatchesMenu />
                            {locations ? (
                                <button
                                    onClick={() => navigate({ to: locations.path })}
                                    className={linkClassName}
                                >
                                    {locations.label}
                                </button>
                            ) : null}
                        </nav>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="h-4 w-4 shrink-0 text-gold" />
                                <span className="font-medium text-foreground">(310) 371-4653</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Mail className="h-4 w-4 shrink-0 text-gold" />
                                <a
                                    href="mailto:info@southbaygold.com"
                                    className="font-medium text-foreground hover:text-gold transition-colors"
                                >
                                    info@southbaygold.com
                                </a>
                            </div>
                        </div>
                        <Button variant="default" className="hidden sm:flex bg-gold hover:bg-gold-dark text-white">
                            Get Quote
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={toggle}
                            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {isDark ? (
                                <Sun className="h-4 w-4 text-gold" aria-hidden />
                            ) : (
                                <Moon className="h-4 w-4 text-gold" aria-hidden />
                            )}
                        </Button>
                        <Sheet>
                            <SheetTrigger asChild className="lg:hidden">
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <nav className="flex flex-col gap-4 mt-8">
                                    {beforeWatches.map((item) => (
                                        <MobileNavLink key={item.path} label={item.label} path={item.path} />
                                    ))}
                                    <MobileWatchesMenu />
                                    {locations ? (
                                        <MobileNavLink label={locations.label} path={locations.path} />
                                    ) : null}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
