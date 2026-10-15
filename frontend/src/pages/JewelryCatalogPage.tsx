import { JewelryGallery } from '@/components/JewelryGallery';
import {
    adamantineCollectionPage,
    customJewelryPage,
    engagementRingsPage,
    fashionJewelryPage,
    fleurDeLisPage,
    haloCollectionPage,
    weddingBandsPage,
} from '@/data/jewelry';
import type { JewelryPage } from '@/data/jewelry/types';
import { publicAsset } from '@/lib/publicAsset';

function StepList({ steps, start }: { steps: string[]; start?: number }) {
    return (
        <ol start={start} className="mx-auto mt-6 max-w-3xl list-decimal space-y-3 pl-6 text-primary leading-relaxed">
            {steps.map((step) => (
                <li key={step}>{step}</li>
            ))}
        </ol>
    );
}

export function JewelryCatalogPage({ page }: { page: JewelryPage }) {
    return (
        <main className="bg-background pb-16">
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-center text-4xl font-bold text-foreground md:text-5xl">{page.title}</h1>
                {page.subtitle ? (
                    <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-primary">{page.subtitle}</p>
                ) : null}
                {page.hero ? (
                    <figure className="mx-auto mt-8 max-w-5xl">
                        <img src={publicAsset(page.hero.src)} alt={page.hero.alt} className="max-h-[420px] w-full object-contain" />
                        {page.heroCaption ? (
                            <figcaption className="mt-3 text-center text-primary">{page.heroCaption}</figcaption>
                        ) : null}
                    </figure>
                ) : null}
                {page.intro?.map((paragraph) => (
                    <p key={paragraph} className="mx-auto mt-6 max-w-3xl leading-relaxed text-primary">
                        {paragraph}
                    </p>
                ))}
                {page.stepsBeforeGallery ? <StepList steps={page.stepsBeforeGallery} /> : null}
                <JewelryGallery sections={page.sections} />
                {page.stepsAfterGallery ? (
                    <StepList steps={page.stepsAfterGallery} start={(page.stepsBeforeGallery?.length ?? 0) + 1} />
                ) : null}
            </div>
        </main>
    );
}

export function FashionJewelryPage() {
    return <JewelryCatalogPage page={fashionJewelryPage} />;
}

export function CustomJewelryPage() {
    return <JewelryCatalogPage page={customJewelryPage} />;
}

export function EngagementRingsPage() {
    return <JewelryCatalogPage page={engagementRingsPage} />;
}

export function WeddingBandsPage() {
    return <JewelryCatalogPage page={weddingBandsPage} />;
}

export function HaloCollectionPage() {
    return <JewelryCatalogPage page={haloCollectionPage} />;
}

export function AdamantineCollectionPage() {
    return <JewelryCatalogPage page={adamantineCollectionPage} />;
}

export function FleurDeLisPage() {
    return <JewelryCatalogPage page={fleurDeLisPage} />;
}
