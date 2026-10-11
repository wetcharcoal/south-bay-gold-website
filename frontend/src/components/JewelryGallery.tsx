import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { JewelryDetailDialog } from '@/components/JewelryDetailDialog';
import { cn } from '@/lib/utils';
import type { JewelryPiece, JewelrySection } from '@/data/jewelry/types';

type OpenPiece = {
    piece: JewelryPiece;
    angleIndex: number;
};

function JewelryCard({ piece, onOpen }: { piece: JewelryPiece; onOpen: (piece: JewelryPiece, angleIndex: number) => void }) {
    const images = piece.variants[0]?.images ?? [];
    const [index, setIndex] = useState(0);
    const image = images[index];
    if (!image) return null;

    const hasMultiplePhotos = images.length > 1;

    return (
        <Card className="flex h-full flex-col overflow-hidden border-gold/20 transition-shadow hover:shadow-xl">
            {hasMultiplePhotos ? (
                <button
                    type="button"
                    className="aspect-square w-full bg-muted/30 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    onClick={() => setIndex((current) => (current + 1) % images.length)}
                    aria-label={`Show another photo of ${piece.title}`}
                >
                    <img src={image.src} alt={image.alt || piece.title} className="h-full w-full object-contain" />
                </button>
            ) : (
                <button
                    type="button"
                    className="aspect-square w-full bg-muted/30 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    onClick={() => onOpen(piece, 0)}
                    aria-label={`View ${piece.title}`}
                >
                    <img src={image.src} alt={image.alt || piece.title} className="h-full w-full object-contain" />
                </button>
            )}
            {hasMultiplePhotos ? (
                <div className="flex gap-2 px-4 pt-3">
                    {images.map((angle, imageIndex) => (
                        <button
                            key={angle.src}
                            type="button"
                            onClick={() => setIndex(imageIndex)}
                            aria-label={`Show photo ${imageIndex + 1} of ${piece.title}`}
                            aria-pressed={imageIndex === index}
                            className={cn(
                                'h-12 w-12 overflow-hidden rounded border bg-muted/30 p-1',
                                imageIndex === index ? 'border-gold' : 'border-border',
                            )}
                        >
                            <img src={angle.src} alt="" className="h-full w-full object-contain" />
                        </button>
                    ))}
                </div>
            ) : null}
            <button
                type="button"
                onClick={() => onOpen(piece, index)}
                className="flex flex-1 flex-col p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
                <h3 className="text-base font-bold text-foreground">{piece.title}</h3>
                {piece.summary ? (
                    <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-primary">{piece.summary}</p>
                ) : null}
            </button>
        </Card>
    );
}

export function JewelryGallery({
    sections,
    centered = false,
}: {
    sections: JewelrySection[];
    centered?: boolean;
}) {
    const [selection, setSelection] = useState<OpenPiece | null>(null);

    return (
        <>
            {sections.map((section) => (
                <section key={section.id} className="mt-12" aria-labelledby={section.heading ? section.id : undefined}>
                    {section.heading ? (
                        <h2 id={section.id} className="text-center text-3xl font-bold text-foreground md:text-4xl">
                            {section.heading}
                        </h2>
                    ) : null}
                    <div
                        className={cn(
                            'mt-8 gap-6',
                            centered
                                ? 'mx-auto grid w-full max-w-3xl grid-cols-2'
                                : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
                        )}
                    >
                        {section.pieces.map((item) => (
                            <JewelryCard
                                key={item.id}
                                piece={item}
                                onOpen={(piece, angleIndex) => setSelection({ piece, angleIndex })}
                            />
                        ))}
                    </div>
                </section>
            ))}
            <JewelryDetailDialog
                piece={selection?.piece ?? null}
                initialAngle={selection?.angleIndex ?? 0}
                onOpenChange={(open) => !open && setSelection(null)}
            />
        </>
    );
}
