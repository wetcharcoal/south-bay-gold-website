import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { watchSections, type WatchListing } from '@/data/watches';
import { publicAsset } from '@/lib/publicAsset';
import { cn } from '@/lib/utils';

function WatchCard({ watch }: { watch: WatchListing }) {
    const [index, setIndex] = useState(0);
    const image = watch.images[index];
    const alt = `${watch.title} at South Bay Gold`;
    const hasMultiplePhotos = watch.images.length > 1;

    return (
        <Card className="overflow-hidden border-gold/20">
            {hasMultiplePhotos ? (
                <button
                    type="button"
                    className="aspect-square w-full bg-muted/30 p-4"
                    onClick={() => setIndex((current) => (current + 1) % watch.images.length)}
                    aria-label={`Show another photo of ${watch.title}`}
                >
                    <img src={publicAsset(image)} alt={alt} className="h-full w-full object-contain" />
                </button>
            ) : (
                <div className="aspect-square w-full bg-muted/30 p-4">
                    <img src={publicAsset(image)} alt={alt} className="h-full w-full object-contain" />
                </div>
            )}
            {hasMultiplePhotos && (
                <div className="flex gap-2 px-4 pt-3">
                    {watch.images.map((src, imageIndex) => (
                        <button
                            key={src}
                            type="button"
                            onClick={() => setIndex(imageIndex)}
                            aria-label={`Show photo ${imageIndex + 1} of ${watch.title}`}
                            aria-pressed={imageIndex === index}
                            className={cn(
                                'h-12 w-12 overflow-hidden rounded border bg-muted/30 p-1',
                                imageIndex === index ? 'border-gold' : 'border-border',
                            )}
                        >
                            <img src={publicAsset(src)} alt="" className="h-full w-full object-contain" />
                        </button>
                    ))}
                </div>
            )}
            <CardContent className="p-4">
                <h3 className="text-base font-bold text-foreground">{watch.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-primary">{watch.description}</p>
            </CardContent>
        </Card>
    );
}

export function WatchesGallery() {
    return (
        <div className="bg-background py-16">
            {watchSections.map((section) => (
                <section key={section.id} className="mb-16 last:mb-0" aria-labelledby={section.id}>
                    <h2
                        id={section.id}
                        className="px-4 text-center text-3xl font-bold text-foreground md:text-4xl"
                    >
                        {section.heading}
                    </h2>
                    <div className="mx-auto mt-10 w-full px-4 lg:w-2/3">
                        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                            {section.watches.map((watch) => (
                                <WatchCard key={watch.id} watch={watch} />
                            ))}
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
}
