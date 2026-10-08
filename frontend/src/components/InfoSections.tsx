import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from '@/components/ui/dialog';
import { CONTACT_EMAIL, TORRANCE_PHONE, copyToClipboard, handleCallClick, showContactToast } from '@/lib/contact';
import { Coins, Gem, Crown, Watch, Heart, WandSparkles, Sparkles, Mail } from 'lucide-react';

async function handleEmailClick() {
    try {
        await copyToClipboard(CONTACT_EMAIL);
        showContactToast('email copied to clipboard');
    } catch {
        // Leave the popup open when the browser blocks clipboard access.
    }
}

const DESCRIPTION_MAX_LENGTH = 330;

type SectionSource = {
    icon: typeof Coins;
    title: string;
    description: string;
    image: string;
};

type InfoSection = SectionSource & {
    expanded: string;
};

function truncateAtWord(text: string, max: number): string {
    if (text.length <= max) return text;
    const slice = text.slice(0, max);
    const lastSpace = slice.lastIndexOf(' ');
    if (lastSpace <= 0) return slice.trimEnd();
    return slice.slice(0, lastSpace).trimEnd();
}

const SECTION_SOURCES: SectionSource[] = [
    {
        icon: Coins,
        title: "The South Bay's Biggest Gold Dealer",
        description:
            "South Bay Gold is the biggest gold dealer, buyer, and refiner in  the South Bay. With decades of experience and expertise, we offer the most competitive prices for your gold, whether you're selling scrap gold, gold jewelry, or gold coins. Our state-of-the-art refining facility ensures you get the maximum value for your precious metals.",
        image: '/assets/10-zoom.gif',
    },
    {
        icon: Gem,
        title: '#1 Diamond Buyer and Dealer',
        description:
            'As the #1 diamond buyer and dealer in the South Bay, South Bay Gold has built a reputation for fair pricing and expert gemological services. Our certified gemologists evaluate each diamond with precision, ensuring you receive top dollar for your diamonds, whether loose stones or diamond jewelry. We buy diamonds of all sizes, shapes, and qualities.',
        image: '/assets/diamond-2.png',
    },
    {
        icon: Crown,
        title: 'Estate & Vintage Jewelry Experts',
        description:
            "South Bay Gold specializes in buying and selling estate and vintage jewelry. Our team of experts has extensive knowledge of antique jewelry, designer pieces, and collectible items. Whether you're looking to sell inherited jewelry or find a unique vintage piece, we offer exceptional service and competitive pricing for all estate jewelry.",
        image: '/assets/lion.png',
    },
    {
        icon: Watch,
        title: 'Luxury Watches',
        description:
            "We are the South Bay's premier exchange for vintage and pre-owned luxury watches. We specialize in Rolex, Patek Philippe, Omega, and other prestigious brands. Our expert watchmakers authenticate and service every timepiece, ensuring quality and value. Whether buying or selling, trust SBG Luxury Watches for the finest selection of luxury timepieces.",
        image: '/assets/Rolex-Mens-Oyster-Perpetual-Milgauss-Black-116400-Southbay-SoCal.png',
    },
    {
        icon: WandSparkles,
        title: 'Custom Jewelry Design',
        description:
            'We are here to help you Custom Design your jewelry. We design & manufacture from a simple diamond-stud earrings to very complex pieces of jewelry. Using the industry’s highest standards and state of the art machines, computers, and programs we create your setting with precious metals such as gold, silver or platinum and/or the precious metal alloys to make the perfect color white-gold, yellow-gold, or rose-gold.',
        image: '/assets/Custom.png',
    },
    {
        icon: Heart,
        title: 'Wedding Bands and Rings',
        description:
            "We are here to help you Custom Design your engagement or wedding rings. We design & manufacture from a simple band to very complex rings that boast passion and commitment. Using the industry’s highest standards and state of the art machines, computers, and programs we create your setting with precious metals such as gold, silver or platinum and/or the precious metal alloys to make the perfect color white-gold, yellow-gold, or rose-gold. We also offer a wide range of wedding bands and rings in a variety of styles and metals.",
        image: '/assets/WeddRing.png',
    },
    {
        icon: Watch,
        title: 'Watch Repair and Servicing',
        description:
            "With over 25,000 current makes and models in service today, finding one place ready to perform quick and accurate watch repair on your favorite one is becoming a bit of a challenge. Now you have a cost-effective alternative to the 'one size fits all' fix-it shop for watch repair. South Bay Gold has resources to take care of the simplest Timex to the dearest Rolex. Each watch repair is done right the first time by our master watchmakers.",
        image: '/assets/WatchRepair.png',
    },
    {
        icon: Sparkles,
        title: 'Precious Gems and Stones',
        description:
            "We are the South Bay's premier specialist for precious gems and stones. We carry a wide range of diamonds, rubies, sapphires, emeralds, and other precious stones. We also offer a wide range of jewelry settings and bands in a variety of styles and metals. ",
        image: '/assets/Gemstones1.png',
    },
];

const sections: InfoSection[] = SECTION_SOURCES.map((s) => ({
    ...s,
    expanded: s.description,
}));

export function InfoSections() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Expertise</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
                    {sections.map((section, index) => {
                        const Icon = section.icon;
                        const full = section.description;
                        const isTruncated = full.length > DESCRIPTION_MAX_LENGTH;
                        const preview = isTruncated ? truncateAtWord(full, DESCRIPTION_MAX_LENGTH) : full;

                        return (
                            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow border-gold/20">
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(index)}
                                    className="flex w-full cursor-pointer flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold md:flex-row"
                                >
                                    <div className="md:w-1/3 flex items-center self-stretch justify-center p-6">
                                        <img
                                            src={section.image}
                                            alt={section.title}
                                            className="w-full object-contain max-h-48"
                                        />
                                    </div>
                                    <CardContent className="md:w-2/3 p-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="p-2 bg-gold/10 rounded-lg">
                                                <Icon className="h-6 w-6 text-gold" />
                                            </div>
                                            <h3 className="text-xl font-bold text-foreground">{section.title}</h3>
                                        </div>
                                        <p className="text-primary leading-relaxed">
                                            {preview}
                                            {isTruncated ? (
                                                <span className="text-base leading-relaxed underline text-gold-dark">
                                                    {' '}
                                                    more:
                                                </span>
                                            ) : null}
                                        </p>
                                    </CardContent>
                                </button>
                            </Card>
                        );
                    })}
                </div>
            </div>

            <Dialog open={openIndex !== null} onOpenChange={(open) => !open && setOpenIndex(null)}>
                <DialogContent
                    aria-describedby={undefined}
                    className="flex max-h-[90vh] flex-col overflow-hidden sm:max-w-2xl [&>button>svg]:h-8 [&>button>svg]:w-8"
                >
                    {openIndex !== null ? (
                        <>
                            <div className="min-h-0 flex-1 overflow-y-auto">
                                <div className="flex justify-center items-start gap-2 pr-14 text-right">
                                    <DialogTitle className="text-3xl font-bold leading-tight text-foreground">
                                        {sections[openIndex].title}
                                    </DialogTitle>
                                </div>
                                <p className="pt-2 text-base leading-relaxed text-muted-foreground">
                                    {sections[openIndex].expanded}
                                </p>
                            </div>
                            <div className="shrink-0 space-y-4 border-t border-gold/20 pt-4">
                                <p className="text-center text-lg font-bold leading-snug text-foreground">
                                    Interested or want to learn more?
                                </p>
                                <div className="flex items-center justify-evenly gap-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            void handleEmailClick();
                                        }}
                                        className="inline-flex min-w-[9.5rem] flex-col items-center justify-center gap-1 rounded-md border border-gold/30 bg-gold/10 px-4 py-3 text-center text-foreground transition-colors hover:bg-gold/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                                    >
                                        <span className="inline-flex items-center gap-2 text-base font-semibold">
                                            <Mail className="h-4 w-4 text-gold" aria-hidden />
                                            email us
                                        </span>
                                        <span className="text-sm text-muted-foreground">{CONTACT_EMAIL}</span>
                                    </button>
                                    <span className="text-lg font-bold leading-snug text-foreground">or</span>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            void handleCallClick();
                                        }}
                                        className="inline-flex min-w-[9.5rem] flex-col items-center justify-center gap-1 rounded-md border border-gold/30 bg-gold/10 px-4 py-3 text-center text-foreground transition-colors hover:bg-gold/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                                    >
                                        <span className="text-base font-semibold">call us</span>
                                        <span className="text-sm text-muted-foreground">{TORRANCE_PHONE}</span>
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : null}
                </DialogContent>
            </Dialog>
        </section>
    );
}
