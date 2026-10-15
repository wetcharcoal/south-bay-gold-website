import { Card, CardContent } from '@/components/ui/card';
import { publicAsset } from '@/lib/publicAsset';

export function AboutPage() {
    return (
        <main className="py-16 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About Us</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Trusted expertise in precious metals, diamonds, jewelry, and luxury watches
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground leading-relaxed mb-14">
                    <p className="text-foreground">
                        We specialize in buying and selling gold and diamonds, custom designed jewelry and engagement
                        rings, retail jewelry, gold and silver bullion, rare coins, estate jewelry, luxury watches, and
                        collectibles. Our combined family of businesses have almost 90 years of experience. Since 1997
                        South Bay Gold has been one of the top gold buyers and bullion dealers in southern California.
                        However, SBG&apos;s roots go back to 1987 as a jewelry manufacturer and wholesaler of precious
                        stones and metals. Finley&apos;s Jewelers was established in 1924 &amp; with their great
                        reputation, we realized that they would be a natural fit to join us.
                    </p>
                </div>

                <Card className="max-w-[30rem] mx-auto overflow-hidden border-gold/20 shadow-lg mb-16">
                    <CardContent className="p-0 bg-muted/30">
                        <img
                            src={publicAsset('/assets/about-products-services.png')}
                            alt="Diagram of South Bay Gold retail and wholesale products and services"
                            className="w-full h-auto block"
                            loading="lazy"
                        />
                    </CardContent>
                </Card>

                <section className="max-w-3xl mx-auto mb-14">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
                        Summary of services and products
                    </h2>
                    <div className="space-y-8 text-muted-foreground leading-relaxed">
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">Custom Jewelry Design</h3>
                            <p>Service available to the public &amp; wholesale</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">Jewelry</h3>
                            <p>
                                Engagement Rings, Wedding Bands, Fine Jewelry, Estate Jewelry, Jewelry Repairs, Ring
                                Sizing, Jewelry Appraisal, and Precious Stone Replacements.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">Bullion &amp; Rare Coins</h3>
                            <p>
                                We buy &amp; sell gold, silver, platinum coins/bars, PCGS &amp; NGC certified numismatic
                                coins, and raw coins
                            </p>
                        </div>
                        <p className="text-lg font-semibold text-foreground">
                            Buying And Selling diamonds &amp; precious stones from public
                        </p>
                        <p className="text-lg font-semibold text-foreground">Gold Refinery</p>
                        <p className="text-lg font-semibold text-foreground">
                            Buying: Gold, Platinum, &amp; Silver from public
                        </p>
                        <p className="text-lg font-semibold text-foreground">
                            Buying, Selling and Repairing Luxury Watches
                        </p>
                    </div>
                </section>

                <section className="max-w-3xl mx-auto mb-14">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">Our locations</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        In addition to our headquarters in Torrance (located next to the Citi Bank Building and Lindberg
                        Nutrition building at Hawthorne and Sepulveda Boulevards), our other store is located in
                        Manhattan Beach at the intersection of Marine and Sepulveda. Finley&apos;s Jewelers is located
                        in the Hollywood Riviera of Redondo Beach. Our organization is proud to serve customers residing
                        in Palos Verdes, Hermosa Beach, Redondo Beach, Torrance, Manhattan Beach, Marina Del Rey, Mar
                        Vista, El Segundo, Gardena, Hawthorne, Inglewood, Santa Monica, Venice, The South Bay and
                        greater Los Angeles, and Orange County.
                    </p>
                </section>

                <section className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">Our values</h2>
                    <div className="space-y-6 text-muted-foreground leading-relaxed">
                        <p>
                            The foundation of our company and staff is built upon the bedrock of The Golden Rule. Our
                            employees are carefully screened for their honesty, integrity and commitment to customer
                            service.
                        </p>
                        <p className="text-foreground font-medium">
                            It pleases us to celebrate our third decade of being one of the highest paying gold and
                            diamond buyers in the United States!
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}
