import { TORRANCE_PHONE } from '@/lib/contact';
import { Facebook, Instagram } from 'lucide-react';

const socialFacebookUrl = 'https://www.facebook.com/southbaygold';
const socialInstagramUrl = 'https://www.instagram.com/southbaygold/';
const socialXUrl = 'https://x.com/southbaygold';

function XSocialIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

function SocialIconLink({
    href,
    label,
    children,
}: {
    href: string;
    label: string;
    children: React.ReactNode;
}) {
    const resolved = href || '#';
    const isExternal = /^https?:\/\//i.test(href);

    return (
        <a
            href={resolved}
            aria-label={label}
            className="text-gold hover:text-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-sm"
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
            {children}
        </a>
    );
}

export function Footer() {
    return (
        <footer className="bg-card border-t border-border py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-muted-foreground">
                        <span>© 2026 South Bay Gold. All rights reserved.</span>
                    </div>
                    <div className="text-gold-light flex flex-row items-left gap-3">
                        <span>Follow us on:</span>
                        <nav className="flex items-center gap-5" aria-label="Social media">
                        <SocialIconLink href={socialFacebookUrl} label="Facebook">
                            <Facebook className="h-5 w-5" strokeWidth={1.75} />
                        </SocialIconLink>
                        <SocialIconLink href={socialInstagramUrl} label="Instagram">
                            <Instagram className="h-5 w-5" strokeWidth={1.75} />
                        </SocialIconLink>
                        <SocialIconLink href={socialXUrl} label="X">
                            <XSocialIcon className="h-5 w-5" />
                        </SocialIconLink>
                        </nav>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-muted-foreground">
                        {/*
                        <button
                            type="button"
                            onClick={() => navigate({ to: '/about' })}
                            className="hover:text-gold transition-colors"
                        >
                            About
                        </button>
                        <span className="hidden sm:inline">•</span>
                        <button
                            type="button"
                            onClick={() => navigate({ to: '/locations' })}
                            className="hover:text-gold transition-colors"
                        >
                            Locations
                        </button>
                        */}
                        <span className="hidden sm:inline"></span>
                        <span>South Bay Gold</span>
                        <span>•</span>
                        <span>Torrance, CA</span>
                        <span>•</span>
                        <span>{TORRANCE_PHONE}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
