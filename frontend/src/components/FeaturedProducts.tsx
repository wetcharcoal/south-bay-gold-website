import { Card, CardContent } from '@/components/ui/card';
import { publicAsset } from '@/lib/publicAsset';

type ProductCardProps = {
    image: string;
    title: string;
    description: string;
    alt: string;
};

function ProductCard({ image, title, description, alt }: ProductCardProps) {
    return (
        <Card className="overflow-hidden hover:shadow-xl transition-shadow border-gold/20">
            <div className="aspect-square bg-muted/30 flex items-center justify-center p-8">
                <img src={publicAsset(image)} alt={alt} className="w-full h-full object-contain" />
            </div>
            <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
                <p className="text-primary">{description}</p>
            </CardContent>
        </Card>
    );
}

const rowGridClass = 'grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto';

export function FeaturedProducts() {
    const products = [
        {
            image: '/assets/Rolex-Oyster-Perpetual-Date-Just-Mens-Blue-Numbers-South-Bay-Gold.png',
            title: 'Watches',
            description: 'Rolex, Omega, and more'
        },
        {
            image: '/assets/diamond-halo-pendant.png',
            title: 'Jewelry',
            description: 'We buy jewerlry of any precious metal'
        },
        {
            image: '/assets/krugerrand.png',
            title: 'Coins/Bullion',
            description: 'Of gold, silver, and more'
        },
        {
            image: '/assets/DiamondsAsher.png',
            title: 'Diamonds',
            description: 'Loose stones and diamond jewelry'
        }
    ];

    const moreProducts =  [
        {
            image: '/assets/gemstones.png',
            title: 'Gemstones',
            description: 'We offer in-house appraisal'
        },
        {
            image: '/assets/presciousmetals.png',
            title: 'Precious Metals',
            description: 'We buy any precious metal and in-store evaluation is free'
        },
        {
            image: '/assets/1795-coin.png',
            title: 'Vintage Coins',
            description: 'Of any year and type'
        },
        {
            image: '/assets/silver.png',
            title: 'Silver',
            description: 'Of all shapes and sizes'
        },
    ];

    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        What We Buy
                    </h2>
                    <p className="text-lg text-primary max-w-2xl mx-auto">
                        From luxury watches to fine jewelry, we offer competitive prices for all your valuables
                    </p>
                </div>
                <div className={rowGridClass}>
                    {products.map((product, index) => (
                        <ProductCard
                            key={`${product.title}-${index}`}
                            image={product.image}
                            title={product.title}
                            description={product.description}
                            alt={product.title}
                        />
                    ))}
                </div>
                <div
                    className={`${rowGridClass} mt-12 pt-12 border-t border-gold/20`}
                    aria-label="More items we buy"
                >
                    {moreProducts.map((product, index) => (
                        <ProductCard
                            key={`placeholder-diamonds-${index}`}
                            image={product.image}
                            title={product.title}
                            description={product.description}
                            alt={product.title}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
