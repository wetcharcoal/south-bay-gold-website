import { useEffect, useRef, useState } from 'react';

export function DiamondsHero({ title }: { title: string }) {
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [reduceMotion, setReduceMotion] = useState(
        () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    );
    const [videoFailed, setVideoFailed] = useState(false);

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
        if (!section || !video || reduceMotion || videoFailed) return;

        video.muted = true;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    void video.play().catch(() => {
                        // Autoplay can be blocked; the first frame stays visible.
                    });
                } else {
                    video.pause();
                }
            },
            { threshold: 0.15 },
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, [reduceMotion, videoFailed]);

    return (
        <section
            ref={sectionRef}
            className="relative flex h-[35vh] items-center justify-center overflow-hidden bg-black"
            aria-label={title}
        >
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                {videoFailed ? null : (
                    <video
                        ref={videoRef}
                        className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover object-center"
                        autoPlay={!reduceMotion}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        onError={() => setVideoFailed(true)}
                    >
                        <source src="/assets/diamonds.mp4" type="video/mp4" />
                    </video>
                )}
                <div className="absolute inset-0 bg-black/50" />
            </div>
            <div className="relative z-10 flex flex-col items-center px-4 text-center text-4xl md:text-6xl">
                <h1 className="font-bold leading-none tracking-tight text-primary drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)]">
                    {title}
                </h1>
                <div className="mt-[0.2em] flex h-[0.75em] items-center gap-[0.2em]">
                    <img
                        src="/assets/GIA-logo.png"
                        alt="GIA"
                        className="h-full w-auto"
                    />
                    <span className="text-[0.38em] font-medium leading-none text-primary drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                        certified gemologists
                    </span>
                </div>
            </div>
        </section>
    );
}
