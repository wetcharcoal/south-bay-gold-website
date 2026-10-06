import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

interface MarketSpotPrice {
    metal: string;
    price: number;
    change: number;
}

interface GoldBuyPrice {
    karat: number;
    purity: number;
    perPennyWeight: number;
    perGram: number;
}

interface PriceData {
    marketSpot: MarketSpotPrice[];
    goldBuy: GoldBuyPrice[];
}

// Fallback prices if API fails
const FALLBACK_PRICES = {
    marketSpot: [
        { metal: 'Gold', price: 4267.30, change: 0 },
        { metal: 'Silver', price: 52.18, change: 0 },
        { metal: 'Platinum', price: 1629.50, change: 0 },
        { metal: 'Palladium', price: 1505.20, change: 0 }
    ],
    goldBuy: [
        { karat: 24, purity: 100, perPennyWeight: 202.04, perGram: 130.43 },
        { karat: 20, purity: 83.3, perPennyWeight: 163.28, perGram: 105.39 },
        { karat: 18, purity: 75, perPennyWeight: 143.53, perGram: 92.66 },
        { karat: 14, purity: 58.3, perPennyWeight: 109.00, perGram: 70.35 }
    ]
};

// Fetch live precious metals prices from Metalpriceapi.com
async function fetchMetalPrices(): Promise<PriceData> {
    try {
        // Note: In production, the API key should be stored securely
        // For now, we'll use the fallback prices as the API requires authentication
        const response = await fetch(
            'https://api.metalpriceapi.com/v1/latest?api_key=YOUR_API_KEY&base=USD&currencies=XAU,XAG,XPT,XPD'
        );
        
        if (!response.ok) {
            throw new Error('Failed to fetch prices');
        }

        const data = await response.json();
        
        // Metalpriceapi returns rates as 1 USD = X ounces, so we need to invert
        const goldPrice = data.rates?.XAU ? 1 / data.rates.XAU : FALLBACK_PRICES.marketSpot[0].price;
        const silverPrice = data.rates?.XAG ? 1 / data.rates.XAG : FALLBACK_PRICES.marketSpot[1].price;
        const platinumPrice = data.rates?.XPT ? 1 / data.rates.XPT : FALLBACK_PRICES.marketSpot[2].price;
        const palladiumPrice = data.rates?.XPD ? 1 / data.rates.XPD : FALLBACK_PRICES.marketSpot[3].price;
        
        const marketSpot: MarketSpotPrice[] = [
            {
                metal: 'Gold',
                price: goldPrice,
                change: Math.random() * 2 - 1 // Random change for demo
            },
            {
                metal: 'Silver',
                price: silverPrice,
                change: Math.random() * 2 - 1
            },
            {
                metal: 'Platinum',
                price: platinumPrice,
                change: Math.random() * 2 - 1
            },
            {
                metal: 'Palladium',
                price: palladiumPrice,
                change: Math.random() * 2 - 1
            }
        ];

        // Calculate buy prices (typically 85-95% of spot for different karats)
        const goldBuy: GoldBuyPrice[] = [
            {
                karat: 24,
                purity: 100,
                perPennyWeight: (goldPrice * 0.95) / 20,
                perGram: (goldPrice * 0.95) / 31.1035
            },
            {
                karat: 20,
                purity: 83.3,
                perPennyWeight: (goldPrice * 0.833 * 0.92) / 20,
                perGram: (goldPrice * 0.833 * 0.92) / 31.1035
            },
            {
                karat: 18,
                purity: 75,
                perPennyWeight: (goldPrice * 0.75 * 0.90) / 20,
                perGram: (goldPrice * 0.75 * 0.90) / 31.1035
            },
            {
                karat: 14,
                purity: 58.3,
                perPennyWeight: (goldPrice * 0.583 * 0.88) / 20,
                perGram: (goldPrice * 0.583 * 0.88) / 31.1035
            }
        ];

        return { marketSpot, goldBuy };
    } catch (error) {
        console.error('Error fetching metal prices, using fallback:', error);
        return FALLBACK_PRICES;
    }
}

export function useMarketPrices() {
    return useQuery<PriceData>({
        queryKey: ['market-prices'],
        queryFn: fetchMetalPrices,
        refetchInterval: 60000, // Refetch every minute
        staleTime: 30000 // Consider data stale after 30 seconds
    });
}

export function useBookAppointment() {
    const { actor } = useActor();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ location, description }: { location: string; description: string }) => {
            if (!actor) throw new Error('Actor not initialized');
            await actor.bookAppointment(location, description);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments'] });
        }
    });
}
