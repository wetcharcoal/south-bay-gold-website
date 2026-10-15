import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Phone } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { TORRANCE_PHONE, handleCallClick } from '@/lib/contact';
import { cn } from '@/lib/utils';
import type { JewelryPiece } from '@/data/jewelry/types';
import { publicAsset } from '@/lib/publicAsset';

const actionButtonClass =
    'inline-flex min-h-16 flex-col items-center justify-center gap-1 rounded-md border border-gold/30 bg-gold/10 px-4 py-3 text-center text-foreground transition-colors hover:bg-gold/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold';

function JewelryDetailBody({ piece, onClose }: { piece: JewelryPiece; onClose: () => void }) {
    const navigate = useNavigate();
    const [variantIndex, setVariantIndex] = useState(0);
    const [angleIndex, setAngleIndex] = useState(0);
    const variant = piece.variants[variantIndex] ?? piece.variants[0];
    const image = variant.images[angleIndex] ?? variant.images[0];
    const showMetalChoices = piece.variants.length > 1;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <div>
                <div className="flex aspect-square items-center justify-center rounded-md bg-muted/30 p-4">
                    <img
                        src={publicAsset(image.src)}
                        alt={image.alt || piece.title}
                        className="max-h-[70vh] w-full object-contain"
                    />
                </div>
                {variant.images.length > 1 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {variant.images.map((angle, index) => (
                            <button
                                key={angle.src}
                                type="button"
                                aria-label={`Show photo ${index + 1} of ${piece.title}`}
                                aria-pressed={index === angleIndex}
                                onClick={() => setAngleIndex(index)}
                                className={cn(
                                    'h-16 w-16 overflow-hidden rounded border bg-muted/30 p-1',
                                    index === angleIndex ? 'border-gold' : 'border-border',
                                )}
                            >
                                <img src={publicAsset(angle.src)} alt="" className="h-full w-full object-contain" />
                            </button>
                        ))}
                    </div>
                ) : null}
            </div>
            <div className="flex h-full min-h-0 flex-col pr-8">
                <DialogTitle className="text-2xl font-bold text-foreground">{piece.title}</DialogTitle>
                <DialogDescription className="mt-3 text-sm leading-relaxed text-primary">
                    {variant.caption}
                </DialogDescription>
                {showMetalChoices ? (
                    <div className="mt-5" role="group" aria-label="Gold type">
                        <p className="text-sm font-semibold text-foreground">Gold type</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {piece.variants.map((option, index) => (
                                <button
                                    key={option.id}
                                    type="button"
                                    aria-pressed={index === variantIndex}
                                    onClick={() => {
                                        setVariantIndex(index);
                                        setAngleIndex(0);
                                    }}
                                    className={cn(
                                        'rounded-md border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
                                        index === variantIndex
                                            ? 'border-gold bg-gold/15 text-foreground'
                                            : 'border-border text-primary hover:border-gold/60',
                                    )}
                                >
                                    {option.metalLabel}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : variant.metalLabel ? (
                    <p className="mt-5 text-sm font-medium text-foreground">{variant.metalLabel}</p>
                ) : null}
                <div className="mt-auto border-t border-gold/20 pt-4">
                    <h3 className="text-center text-lg font-bold text-foreground">Interested?</h3>
                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <button type="button" className={actionButtonClass} onClick={() => void handleCallClick()}>
                            <span className="inline-flex items-center gap-2 text-base font-semibold">
                                <Phone className="h-4 w-4 text-gold" aria-hidden />
                                Call Us
                            </span>
                            <span className="text-sm text-muted-foreground">{TORRANCE_PHONE}</span>
                        </button>
                        <button
                            type="button"
                            className={actionButtonClass}
                            onClick={() => {
                                onClose();
                                navigate({ to: '/locations/' });
                            }}
                        >
                            <span className="text-base font-semibold">Visit Us</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function JewelryDetailDialog({
    piece,
    onOpenChange,
}: {
    piece: JewelryPiece | null;
    onOpenChange: (open: boolean) => void;
}) {
    return (
        <Dialog open={piece !== null} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] max-w-5xl overflow-y-auto">
                {piece ? <JewelryDetailBody key={piece.id} piece={piece} onClose={() => onOpenChange(false)} /> : null}
            </DialogContent>
        </Dialog>
    );
}
