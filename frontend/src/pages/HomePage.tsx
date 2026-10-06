import { Hero } from '@/components/Hero';
import { Achievements } from '@/components/Achievements';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { InfoSections } from '@/components/InfoSections';
import { Testimonials } from '@/components/Testimonials';

export function HomePage() {
    return (
        <main>
            <Hero />
            <Achievements />
            {/* <PriceGrids /> */}
            <InfoSections />
            <FeaturedProducts />
            <Testimonials />
        </main>
    );
}
