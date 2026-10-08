import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { JewelryDetailDialog } from '@/components/JewelryDetailDialog';
import type { JewelryPiece, JewelrySection } from '@/data/jewelry/types';

function JewelryCard({ piece, onOpen }: { piece: JewelryPiece; onOpen: (piece: JewelryPiece) => void }) {
    const image = piece.variants[0]?.images[0];
    if (!image) return null;

    return (
        <Card className="h-full overflow-hidden border-gold/20 transition-shadow hover:shadow-xl">
            <button
                type="button"
                onClick={() => onOpen(piece)}
                className="flex h-full w-full flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
                <div className="aspect-square bg-muted/30 p-4">
                    <img src={image.src} alt={image.alt || piece.title} className="h-full w-full object-contain" />
                </div>
                <div className="flex flex-1 flex-col p-4">
                    <h3 className="text-base font-bold text-foreground">{piece.title}</h3>
                    {piece.summary ? (
                        <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-primary">{piece.summary}</p>
                    ) : null}
                </div>
            </button>
        </Card>
    );
}

export function JewelryGallery({ sections }: { sections: JewelrySection[] }) {
    const [piece, setPiece] = useState<JewelryPiece | null>(null);

    return (
        <>
            {sections.map((section) => (
                <section key={section.id} className="mt-12" aria-labelledby={section.heading ? section.id : undefined}>
                    {section.heading ? (
                        <h2 id={section.id} className="text-center text-3xl font-bold text-foreground md:text-4xl">
                            {section.heading}
                        </h2>
                    ) : null}
                    <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                        {section.pieces.map((item) => (
                            <JewelryCard key={item.id} piece={item} onOpen={setPiece} />
                        ))}
                    </div>
                </section>
            ))}
            <JewelryDetailDialog piece={piece} onOpenChange={(open) => !open && setPiece(null)} />
        </>
    );
}
