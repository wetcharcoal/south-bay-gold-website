import { Button } from '@/components/ui/button';
import { getCalApi } from '@calcom/embed-react';
import { useEffect, useRef, useState } from 'react';

export function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [reduceMotion, setReduceMotion] = useState(
        () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    );
    const [videoFailed, setVideoFailed] = useState(false);
    const showPoster = reduceMotion || videoFailed;

    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ namespace: '30min' });
            cal('ui', {
                cssVarsPerTheme: {
                    light: { 'cal-brand': '#d5a22b' },
                    dark: { 'cal-brand': '#d5a22b' },
                },
                hideEventTypeDetails: false,
                layout: 'month_view',
            });
        })();
    }, []);

    useEffect(() => {
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        const onChange = () => setReduceMotion(media.matches);
        onChange();
        media.addEventListener('change', onChange);
        return () => media.removeEventListener('change', onChange);
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        const video = videoRef.current;
        if (!section || !video || showPoster) return;

        video.muted = true;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    void video.play().catch(() => {
                        // Autoplay can be blocked; the poster stays visible until playback starts.
                    });
                } else {
                    video.pause();
                }
            },
            { threshold: 0.15 },
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, [showPoster]);

    const calConfig = JSON.stringify({
        layout: 'month_view',
        useSlotsViewOnSmallScreen: 'true',
    });

    return (
        <>
            <section
                ref={sectionRef}
                className="relative bg-gradient-to-br from-gold-light via-background to-gold-light/30 py-16 overflow-hidden"
            >
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    {showPoster ? (
                        <img
                            src="/assets/diamond-1.jpg"
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <video
                            ref={videoRef}
                            className="absolute inset-0 h-full w-full object-cover object-bottom"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            poster="/assets/diamond-1.jpg"
                            onError={() => setVideoFailed(true)}
                        >
                            <source src="/assets/hero.mp4" type="video/mp4" />
                        </video>
                    )}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                'linear-gradient(to bottom, oklch(var(--background) / 0.55), oklch(var(--background) / 0.5), oklch(var(--background) / 0.6))',
                        }}
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
                            South Bay's Premier
                            <span className="block text-gold mt-2">Gold & Jewelry Buyer</span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Get the best prices for your gold, silver, platinum, and luxury watches. 
                            Trusted by the community for over 28 years.
                        </p>
                        <Button
                            type="button"
                            data-cal-namespace="30min"
                            data-cal-link="ty-qrvtnj/30min"
                            data-cal-config={calConfig}
                            size="lg" 
                            className="bg-gold hover:bg-gold-dark text-white font-bold text-xl px-12 py-6 h-auto shadow-xl hover:shadow-2xl transition-all"
                        >
                            BOOK APPOINTMENT
                        </Button>
                        
                    </div>
                </div>
            </section>
        </>
    );
}
