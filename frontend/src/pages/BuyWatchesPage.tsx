import { WatchesGallery } from '@/components/WatchesGallery';
import { WatchesHero } from '@/components/WatchesHero';

export function BuyWatchesPage() {
    return (
        <main className="bg-background">
            <WatchesHero />
            <WatchesGallery />
        </main>
    );
}
