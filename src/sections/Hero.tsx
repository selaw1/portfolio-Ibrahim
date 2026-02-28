import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '19+',  label: 'Years Playing' },
  { value: '11+',  label: 'Years Coaching' },
  { value: '15+',  label: 'Championships' },
  { value: '500+', label: 'Games Played' },
];

export default function Hero() {
  const sectionRef   = useRef<HTMLElement>(null);
  const bgTextRef    = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const eyebrowRef   = useRef<HTMLDivElement>(null);
  const nameRef      = useRef<HTMLDivElement>(null);
  const subtitleRef  = useRef<HTMLDivElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const scrollRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      // Giant background text slides in
      tl.fromTo(bgTextRef.current,
        { opacity: 0, x: 120 },
        { opacity: 1, x: 0, duration: 1.4, ease: 'power4.out' }
      );

      // Image pops in
      tl.fromTo(imageWrapRef.current,
        { opacity: 0, scale: 0.85, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=1.0'
      );

      // Eyebrow
      tl.fromTo(eyebrowRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.5'
      );

      // Name lines stagger
      tl.fromTo(nameRef.current?.children ?? [],
        { opacity: 0, y: 50, skewY: 3 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.8, ease: 'power4.out', stagger: 0.12 },
        '-=0.4'
      );

      // Subtitle
      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      );

      // Stats
      tl.fromTo(statsRef.current?.children ?? [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.08 },
        '-=0.3'
      );

      // CTA
      tl.fromTo(ctaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.2'
      );

      // Scroll indicator
      tl.fromTo(scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.1'
      );

      // Parallax on bg text
      gsap.to(bgTextRef.current, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'hsl(var(--background))' }}
    >
      {/* ── Noise texture ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
        }}
      />

      {/* ── Glow blobs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            width: '600px', height: '600px',
            top: '-10%', right: '-5%',
            background: 'radial-gradient(circle, hsl(var(--primary)/0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '400px', height: '400px',
            bottom: '0%', left: '-8%',
            background: 'radial-gradient(circle, hsl(var(--accent)/0.1) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* ── BIG background typography ── */}
      <div
        ref={bgTextRef}
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none leading-none"
        style={{
          opacity: 0,
          fontSize: 'clamp(120px, 18vw, 260px)',
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 900,
          fontStyle: 'italic',
          color: 'transparent',
          WebkitTextStroke: '1px hsl(var(--primary)/0.07)',
          whiteSpace: 'nowrap',
          zIndex: 0,
        }}
      >
        ALNASER
      </div>

      {/* ── Top decorative line ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px"
        style={{
          height: '80px',
          background: 'linear-gradient(to bottom, transparent, hsl(var(--primary)/0.4))',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-24 pb-20">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">

          {/* Left: text content */}
          <div>
            {/* Eyebrow */}
            <div ref={eyebrowRef} className="flex items-center gap-3 mb-8" style={{ opacity: 0 }}>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                style={{ background: 'hsl(var(--primary)/0.1)', border: '1.5px solid hsl(var(--primary)/0.2)' }}
              >
                🏀
              </div>
              <span
                className="text-xs font-bold tracking-[0.3em] uppercase"
                style={{ color: 'hsl(var(--primary))', fontFamily: "'DM Mono', monospace" }}
              >
                Player · Coach · Leader
              </span>
            </div>

            {/* Name */}
            <div ref={nameRef} className="mb-6 overflow-hidden">
              <div
                className="block leading-[0.9] tracking-tight"
                style={{
                  opacity: 0,
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 900,
                  fontSize: 'clamp(52px, 9vw, 120px)',
                  color: 'hsl(var(--foreground))',
                }}
              >
                Ibrahim
              </div>
              <div
                className="block leading-[0.9] tracking-tight"
                style={{
                  opacity: 0,
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 900,
                  fontSize: 'clamp(52px, 9vw, 120px)',
                  WebkitTextStroke: '2px hsl(var(--primary))',
                  color: 'transparent',
                }}
              >
                Alnaser
              </div>
            </div>

            {/* Subtitle */}
            <div ref={subtitleRef} className="flex items-center gap-4 mb-10" style={{ opacity: 0 }}>
              <div className="h-px w-10" style={{ background: 'hsl(var(--primary)/0.4)' }} />
              <p
                className="text-base sm:text-lg"
                style={{
                  color: 'hsl(var(--muted-foreground))',
                  fontFamily: "'Lora', Georgia, serif",
                  fontStyle: 'italic',
                }}
              >
                Professional Basketball Player &amp; Coach, Jordan
              </p>
            </div>

            {/* Stats row */}
            <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="py-4 px-3 rounded-xl text-center"
                  style={{
                    opacity: 0,
                    background: 'hsl(var(--muted)/0.5)',
                    border: '1px solid hsl(var(--border))',
                  }}
                >
                  <div
                    className="font-bold leading-none mb-1"
                    style={{
                      fontSize: 'clamp(22px, 3.5vw, 36px)',
                      color: i % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--accent))',
                      fontFamily: "'Playfair Display', Georgia, serif",
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="text-[10px] leading-tight"
                    style={{ color: 'hsl(var(--muted-foreground))', fontFamily: "'DM Mono', monospace" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-4" style={{ opacity: 0 }}>
              <a
                href="#about"
                onClick={(e) => scrollTo(e, '#about')}
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
                style={{
                  background: 'hsl(var(--primary))',
                  boxShadow: '0 4px 24px -8px hsl(var(--primary)/0.5)',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '13px',
                  letterSpacing: '0.05em',
                }}
              >
                Explore My Journey
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1v12M1 7l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              <a
                href="#gallery"
                onClick={(e) => scrollTo(e, '#gallery')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold transition-all duration-300 hover:scale-[1.03]"
                style={{
                  border: '1.5px solid hsl(var(--border))',
                  color: 'hsl(var(--foreground))',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '13px',
                  letterSpacing: '0.05em',
                  background: 'transparent',
                }}
              >
                View Gallery
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M9 4l3 3-3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right: profile image */}
          <div ref={imageWrapRef} className="flex justify-center lg:justify-end" style={{ opacity: 0 }}>
            <div className="relative">
              {/* Outer decorative ring */}
              <div
                className="absolute rounded-full"
                style={{
                  inset: '-16px',
                  border: '1px solid hsl(var(--primary)/0.15)',
                  borderRadius: '50%',
                }}
              />
              <div
                className="absolute rounded-full"
                style={{
                  inset: '-36px',
                  border: '1px dashed hsl(var(--primary)/0.08)',
                  borderRadius: '50%',
                }}
              />

              {/* Image */}
              <div
                className="relative overflow-hidden"
                style={{
                  width: 'clamp(240px, 28vw, 360px)',
                  height: 'clamp(240px, 28vw, 360px)',
                  borderRadius: '50%',
                  border: '3px solid hsl(var(--primary)/0.3)',
                  boxShadow: '0 24px 80px -20px hsl(var(--primary)/0.35)',
                }}
              >
                <img
                  src="/gallery13.jpeg"
                  alt="Ibrahim Alnaser"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                {/* Subtle overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(160deg, transparent 50%, hsl(var(--primary)/0.15) 100%)' }}
                />
              </div>

              {/* Jersey badge */}
              <div
                className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full flex items-center justify-center shadow-xl"
                style={{
                  background: 'hsl(var(--primary))',
                  border: '3px solid hsl(var(--background))',
                }}
              >
                <span
                  className="text-white font-bold text-lg"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  #15
                </span>
              </div>

              {/* Floating stat chip */}
              <div
                className="absolute -left-6 top-1/4 px-3 py-2 rounded-xl shadow-lg"
                style={{
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  boxShadow: '0 8px 24px -8px rgba(0,0,0,0.15)',
                }}
              >
                <div
                  className="text-lg font-bold"
                  style={{ color: 'hsl(var(--primary))', fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1 }}
                >
                  15+
                </div>
                <div
                  className="text-[10px] mt-0.5"
                  style={{ color: 'hsl(var(--muted-foreground))', fontFamily: "'DM Mono', monospace" }}
                >
                  Titles
                </div>
              </div>

              {/* Floating stat chip 2 */}
              <div
                className="absolute -right-8 top-1/3 px-3 py-2 rounded-xl shadow-lg"
                style={{
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  boxShadow: '0 8px 24px -8px rgba(0,0,0,0.15)',
                }}
              >
                <div
                  className="text-lg font-bold"
                  style={{ color: 'hsl(var(--accent))', fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1 }}
                >
                  FIBA
                </div>
                <div
                  className="text-[10px] mt-0.5"
                  style={{ color: 'hsl(var(--muted-foreground))', fontFamily: "'DM Mono', monospace" }}
                >
                  Certified
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        style={{ opacity: 0 }}
        onClick={(e) => scrollTo(e as any, '#about')}
      >
        <span
          className="text-[10px] tracking-[0.25em] uppercase"
          style={{ color: 'hsl(var(--muted-foreground))', fontFamily: "'DM Mono', monospace" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-10"
          style={{ background: 'linear-gradient(to bottom, hsl(var(--primary)/0.5), transparent)', animation: 'pulse 2s infinite' }}
        />
      </div>

      {/* ── Bottom decorative rule ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, hsl(var(--border)) 30%, hsl(var(--border)) 70%, transparent)' }}
      />
    </section>
  );
}