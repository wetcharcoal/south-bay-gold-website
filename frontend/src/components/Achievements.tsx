import { useState } from 'react';
import { publicAsset } from '@/lib/publicAsset';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

const BADGES = [
    { src: '/assets/BetterBusinessBureau.png', alt: 'BBB Accredited Business' },
    { src: '/assets/SouthBaysBest.png', alt: "South Bay's Best award" },
    { src: '/assets/BestOfBeach.png', alt: 'Easy Reader Best of the Beach 2026' },
] as const;

const HIGHLIGHTS = [
    { id: 'best-prices', title: 'THE BEST PRICES' },
    { id: 'safe-clean', title: 'SAFE AND CLEAN LOCATION' },
    { id: 'experience', title: 'OVER 100 YEARS OF EXPERIENCE' },
    { id: 'transparent', title: 'TRANSPARENT TESTING' },
] as const;

export function Achievements() {
    const [openTitle, setOpenTitle] = useState<string | null>(null);

    return (
    <section className="bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="mx-auto flex min-h-[11rem] max-w-7xl flex-col gap-6">
                    <div className="shrink-0 flex items-center justify-center py-0.5 pt-6">
                        <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif' }} className="text-center text-xl font-semibold uppercase tracking-[0.18em] text-foreground sm:text-md underline">
                            institutionally accredited
                        </h2>
                    </div>

                    <div className="h-[5rem] shrink-0 flex flex-row items-stretch justify-center gap-2 px-2 sm:gap-6">
                        {BADGES.map(({ src, alt }) => (
                            <div
                                key={src}
                                className="flex min-h-0 min-w-0 flex-1 items-center justify-center"
                            >
                                <img
                                    src={publicAsset(src)}
                                    alt={alt}
                                    className="max-h-full max-w-full object-contain object-center"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="min-h-0 flex-1 grid min-w-0 grid-cols-4 gap-1 px-0.5 pb-0.5 sm:gap-10 sm:px-0">
                        {HIGHLIGHTS.map(({ id, title }) => (
                            <button
                                key={id}
                                type="button"
                                onClick={() => setOpenTitle(title)}
                                className="flex min-h-0 min-w-0 items-center justify-center rounded-md border-4 border-gold 
                                bg-background p-[1.25rem] text-center text-[1rem] font-large font-bold leading-snug shadow-sm 
                                transition-colors hover:border-gold-light hover:bg-gold/10 hover:text-gold-light 
                                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold 
                                focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-xs md:text-sm"
                            >
                                {title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <Dialog open={openTitle !== null} onOpenChange={(open) => !open && setOpenTitle(null)}>
                <DialogContent aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{openTitle}</DialogTitle>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </section>
    );
}
