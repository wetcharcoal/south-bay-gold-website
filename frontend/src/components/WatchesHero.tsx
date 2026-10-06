import { useEffect, useRef, useState } from 'react';

const bannerSrc = '/assets/watches/buy-sell-breitling-banner.jpg';

export function WatchesHero() {
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [reduceMotion, setReduceMotion] = useState(
        () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    );
    const [videoFailed, setVideoFailed] = useState(false);
    const showPoster = reduceMotion || videoFailed;

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

    return (
        <section
            ref={sectionRef}
            className="relative flex min-h-[70vh] items-center overflow-hidden bg-gradient-to-br from-gold-light via-background to-gold-light/30"
            aria-label="Pre-Owned Luxury Watches"
        >
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                {showPoster ? (
                    <img src={bannerSrc} alt="" className="h-full w-full object-cover" />
                ) : (
                    <video
                        ref={videoRef}
                        className="absolute inset-0 h-full w-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        poster={bannerSrc}
                        onError={() => setVideoFailed(true)}
                    >
                        <source src="/assets/watches.mp4" type="video/mp4" />
                    </video>
                )}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'linear-gradient(to bottom, oklch(var(--background) / 0.05), oklch(var(--background) / 0.1), oklch(var(--background) / 0.05))',
                    }}
                />
            </div>
            
        </section>
    );
}
