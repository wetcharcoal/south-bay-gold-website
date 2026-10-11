import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useDarkMode } from '@/hooks/useDarkMode';
import { TORRANCE_PHONE } from '@/lib/contact';
import { useNavigate } from '@tanstack/react-router';
import { ChevronDown, Mail, Menu, Moon, Phone, Sun } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Locations', path: '/locations' },
    { label: 'Sell Gold/Silver', path: '/sell-gold' },
    { label: 'About', path: '/about' },
] as const;

const watchLinks = [
    { label: 'Watch Repair', path: '/watches' },
    { label: 'Buy Watches', path: '/buy-watches' },
] as const;

const diamondLinks = [
    { label: 'Buy Diamonds', path: '/buy-diamonds' },
    { label: 'Sell Diamonds', path: '/sell-diamonds' },
] as const;

const jewelryLinks = [
    { label: 'Fashion/Designer Jewelry', path: '/jewelry/fashion' },
    { label: 'Custom Jewelry Design', path: '/jewelry/custom' },
    { label: 'Engagement Rings', path: '/jewelry/engagement-rings' },
    { label: 'Wedding Bands', path: '/jewelry/wedding-bands' },
    { label: 'Halo Collections', path: '/jewelry/halo' },
    { label: 'Adamantine Collection', path: '/jewelry/adamantine' },
    { label: 'Fleur de Lis Collection', path: '/jewelry/fleur-de-lis' },
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

function DesktopDiamondsMenu() {
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
                aria-controls="diamonds-menu"
                onClick={() => {
                    setOpen(false);
                    navigate({ to: '/buy-diamonds' });
                }}
            >
                Diamonds
                <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
            </button>
            {open ? (
                <div className="absolute left-0 top-full z-50 pt-2">
                    <div
                        id="diamonds-menu"
                        role="menu"
                        className="min-w-44 rounded-md border border-border bg-card p-2 shadow-md"
                    >
                        {diamondLinks.map((item) => (
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

function DesktopJewelryMenu() {
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
                aria-controls="jewelry-menu"
                onClick={() => setOpen(true)}
            >
                Jewelry
                <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
            </button>
            {open ? (
                <div className="absolute left-0 top-full z-50 pt-2">
                    <div
                        id="jewelry-menu"
                        role="menu"
                        className="max-h-[70vh] min-w-64 overflow-y-auto rounded-md border border-border bg-card p-2 shadow-md"
                    >
                        {jewelryLinks.map((item) => (
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
    path:
        | '/'
        | '/about'
        | '/locations'
        | '/watches'
        | '/buy-watches'
        | '/sell-gold'
        | '/buy-diamonds'
        | '/sell-diamonds'
        | '/jewelry/fashion'
        | '/jewelry/custom'
        | '/jewelry/engagement-rings'
        | '/jewelry/wedding-bands'
        | '/jewelry/halo'
        | '/jewelry/adamantine'
        | '/jewelry/fleur-de-lis';
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

function MobileDiamondsMenu() {
    return (
        <div className="flex flex-col gap-3">
            <MobileNavLink label="Diamonds" path="/buy-diamonds" />
            <div className="flex flex-col gap-3 pl-4">
                {diamondLinks.map((item) => (
                    <MobileNavLink key={item.path} label={item.label} path={item.path} />
                ))}
            </div>
        </div>
    );
}

function MobileJewelryMenu() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col gap-3">
            <button
                type="button"
                className="inline-flex items-center gap-2 text-left text-lg font-medium text-foreground hover:text-gold transition-colors"
                aria-expanded={open}
                aria-controls="mobile-jewelry-menu"
                onClick={() => setOpen((current) => !current)}
            >
                Jewelry
                <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
            </button>
            {open ? (
                <div id="mobile-jewelry-menu" className="flex flex-col gap-3 pl-4">
                    {jewelryLinks.map((item) => (
                        <MobileNavLink key={item.path} label={item.label} path={item.path} />
                    ))}
                </div>
            ) : null}
        </div>
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
    const beforeMenus = navItems.filter((item) => item.path !== '/about');
    const about = navItems.find((item) => item.path === '/about');

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
                            {beforeMenus.map((item) => (
                                <button
                                    key={item.path}
                                    onClick={() => navigate({ to: item.path })}
                                    className={linkClassName}
                                >
                                    {item.label}
                                </button>
                            ))}
                            <DesktopWatchesMenu />
                            <DesktopDiamondsMenu />
                            <DesktopJewelryMenu />
                            {about ? (
                                <button
                                    onClick={() => navigate({ to: about.path })}
                                    className={linkClassName}
                                >
                                    {about.label}
                                </button>
                            ) : null}
                        </nav>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="h-4 w-4 shrink-0 text-gold" />
                                <span className="font-medium text-foreground">{TORRANCE_PHONE}</span>
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
                                    {beforeMenus.map((item) => (
                                        <MobileNavLink key={item.path} label={item.label} path={item.path} />
                                    ))}
                                    <MobileWatchesMenu />
                                    <MobileDiamondsMenu />
                                    <MobileJewelryMenu />
                                    {about ? (
                                        <MobileNavLink label={about.label} path={about.path} />
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
