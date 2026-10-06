import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMarketPrices } from '@/hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function PriceGrids() {
    const { data: prices, isLoading } = useMarketPrices();

    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                    {/* Market Spot Price */}
                    <Card className="shadow-lg border-gold/20">
                        <CardHeader className="bg-gradient-to-r from-gold/10 to-gold/5 border-b border-gold/20">
                            <CardTitle className="text-2xl font-bold text-center text-gold">
                                Market Spot Price
                            </CardTitle>
                            <p className="text-sm text-center text-muted-foreground mt-1">
                                Live prices per troy ounce
                            </p>
                        </CardHeader>
                        <CardContent className="p-6">
                            {isLoading ? (
                                <div className="space-y-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <Skeleton key={i} className="h-16 w-full" />
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {prices?.marketSpot.map((item) => (
                                        <div
                                            key={item.metal}
                                            className="flex items-center justify-between p-4 rounded-lg bg-card border border-border hover:border-gold/40 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                                                    <span className="text-lg font-bold text-gold">
                                                        {item.metal.charAt(0)}
                                                    </span>
                                                </div>
                                                <span className="font-semibold text-foreground">
                                                    {item.metal}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-foreground">
                                                    ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </div>
                                                {item.change !== 0 && (
                                                    <div className={`text-sm flex items-center justify-end gap-1 ${item.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                                                        {item.change >= 0 ? (
                                                            <TrendingUp className="h-3 w-3" />
                                                        ) : (
                                                            <TrendingDown className="h-3 w-3" />
                                                        )}
                                                        {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Gold Buy Price */}
                    <Card className="shadow-lg border-gold/20">
                        <CardHeader className="bg-gradient-to-r from-gold/10 to-gold/5 border-b border-gold/20">
                            <CardTitle className="text-2xl font-bold text-center text-gold">
                                Gold Buy Price
                            </CardTitle>
                            <p className="text-sm text-center text-muted-foreground mt-1">
                                We pay top dollar for your gold
                            </p>
                        </CardHeader>
                        <CardContent className="p-6">
                            {isLoading ? (
                                <div className="space-y-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <Skeleton key={i} className="h-20 w-full" />
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {prices?.goldBuy.map((item) => (
                                        <div
                                            key={item.karat}
                                            className="p-4 rounded-lg bg-card border border-border hover:border-gold/40 transition-colors"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-lg font-bold text-gold">
                                                    {item.karat}K Gold
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    {item.purity}% pure
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <div className="text-xs text-muted-foreground mb-1">
                                                        Per Penny Weight
                                                    </div>
                                                    <div className="text-xl font-bold text-foreground">
                                                        ${item.perPennyWeight.toFixed(2)}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-muted-foreground mb-1">
                                                        Per Gram
                                                    </div>
                                                    <div className="text-xl font-bold text-foreground">
                                                        ${item.perGram.toFixed(2)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
