import { useEffect, useState } from 'react';

type Testimonial = {
    quote: string;
    author: string;
};

/** Replace placeholder entries with real customer reviews. */
const TESTIMONIALS: Testimonial[] = [
    {
        quote: 'Came in with a ring missing a heart shaped stone that I wanted to replace. Juan worked with me for over a month to help find a heart shaped stone that would fit the ring, in my price range, and in a color I liked. The ring turned out better than I ever imagined!!!',
        author: 'Elizabeth M.',
    },
    {
        quote: 'South Bay Gold provides the best customer service again and again.  I have been a customer to South Bay Gold For many years now. Each time I go in I have been pleasantly pleased with their Customer service skills and friendliness. I recommend South Bay Gold and can honestly say I have left a happy customer every time.',
        author: 'Shanda S.',
    },
    {
        quote: 'Very polite and professional. I have been to many other gold buyers and jewelry stores and have only encountered rude service and below fair pricing. South bay gold takes the cake when it comes to running a successful business. Would definitely recommend.',
        author: 'Jayson T.',
    },
];

/** Full visibility before fade-out starts (ms). */
const DISPLAY_MS = 5000;
/** Fade-out and fade-in duration (ms each). Cycle: DISPLAY_MS visible → FADE_MS out → swap → FADE_MS in → repeat. */
const FADE_MS = 500;

export function Testimonials() {
    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        let disposed = false;
        let timer: ReturnType<typeof setTimeout>;

        const scheduleNext = () => {
            timer = setTimeout(() => {
                if (disposed) return;
                setVisible(false);
                timer = setTimeout(() => {
                    if (disposed) return;
                    setIndex((i) => (i + 1) % TESTIMONIALS.length);
                    setVisible(true);
                    timer = setTimeout(() => {
                        if (disposed) return;
                        scheduleNext();
                    }, FADE_MS);
                }, FADE_MS);
            }, DISPLAY_MS);
        };

        scheduleNext();
        return () => {
            disposed = true;
            clearTimeout(timer);
        };
    }, []);

    const current = TESTIMONIALS[index];

    return (
        <section
            className="py-16 bg-muted/30"
            aria-label="Customer testimonials"
        >
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gold-light mb-4">
                        Testimonials
                    </h2>
                </div>

                <div
                    className="max-w-7xl mx-auto flex justify-center"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    <div
                        className={`w-full max-w-3xl transition-opacity duration-500 ease-in-out ${
                            visible ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <blockquote className="mx-auto">
                            <div className="flex flex-row items-stretch gap-1 sm:gap-3 md:gap-4">
                                <span
                                    className="shrink-0 text-5xl sm:text-6xl md:text-7xl font-serif leading-none text-gold-light select-none"
                                    aria-hidden
                                >
                                    “
                                </span>
                                <p className="flex-1 min-w-0 pt-2 sm:pt-3 text-base sm:text-lg md:text-xl text-muted-foreground text-center sm:text-left leading-relaxed">
                                    {current.quote}
                                </p>
                                <span
                                    className="shrink-0 text-5xl sm:text-6xl md:text-7xl font-serif leading-none text-gold-light self-end select-none"
                                    aria-hidden
                                >
                                    ”
                                </span>
                            </div>
                            <footer className="mt-6 text-center sm:text-left text-sm text-muted-foreground">
                                — {current.author}
                            </footer>
                        </blockquote>
                    </div>
                </div>
            </div>
        </section>
    );
}
