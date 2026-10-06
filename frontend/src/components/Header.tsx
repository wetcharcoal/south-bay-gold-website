import { Button } from '@/components/ui/button';
import { Phone, Mail, Menu, Moon, Sun } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useDarkMode } from '@/hooks/useDarkMode';

export function Header() {
    const navigate = useNavigate();
    const { isDark, toggle } = useDarkMode();

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'Locations', path: '/locations' },
    ];

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
                            {navItems.map((item) => (
                                <button
                                    key={item.path}
                                    onClick={() => navigate({ to: item.path })}
                                    className="text-sm font-medium text-foreground hover:text-gold transition-colors"
                                >
                                    {item.label}
                                </button>
                            ))}
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
                                    {navItems.map((item) => (
                                        <button
                                            key={item.path}
                                            onClick={() => navigate({ to: item.path })}
                                            className="text-left text-lg font-medium text-foreground hover:text-gold transition-colors"
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
