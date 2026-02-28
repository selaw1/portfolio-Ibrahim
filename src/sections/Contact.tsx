import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const contacts = [
  {
    label: 'Phone',
    detail: '+962 79 809 7308',
    href: 'tel:+962798097308',
    icon: '📞',
    accent: 'hsl(var(--primary))',
    external: false,
  },
  {
    label: 'Email',
    detail: 'ibrahim.alnaser@gmail.com',
    href: 'mailto:ibrahim.alnaser@gmail.com',
    icon: '✉️',
    accent: 'hsl(var(--accent))',
    external: false,
  },
  {
    label: 'Instagram',
    detail: '@ibrahim_alnaser.15',
    href: 'https://www.instagram.com/ibrahim_alnaser.15',
    icon: '📸',
    accent: '#e1306c',
    external: true,
  },
];

export default function Contact() {
  const sectionRef  = useRef<HTMLElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const headRef     = useRef<HTMLDivElement>(null);
  const cardsRef    = useRef<(HTMLAnchorElement | null)[]>([]);
  const ctaRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [eyebrowRef.current, headRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power4.out',
          scrollTrigger: { trigger: eyebrowRef.current, start: 'top 84%', once: true },
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', delay: i * 0.1,
              scrollTrigger: { trigger: card, start: 'top 88%', once: true } }
          );
        }
      });

      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 90%', once: true } }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 lg:py-40 overflow-hidden"
      style={{ background: 'hsl(var(--background))' }}
    >
      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
        }}
      />

      {/* Glow blobs */}
      <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)', transform: 'translate(30%,-30%)' }} />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)', transform: 'translate(-30%,30%)' }} />

      {/* Big ghost text */}
      <div
        className="pointer-events-none absolute right-0 bottom-0 select-none leading-none opacity-[0.025]"
        style={{
          fontSize: 'clamp(80px, 14vw, 200px)',
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 900,
          fontStyle: 'italic',
          color: 'transparent',
          WebkitTextStroke: '1.5px hsl(var(--primary))',
          whiteSpace: 'nowrap',
          transform: 'translate(5%, 15%)',
        }}
      >
        CONNECT
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative">

        {/* ── Header ── */}
        <div className="mb-20 lg:mb-28">
          <div ref={eyebrowRef} className="flex items-center gap-4 mb-5" style={{ opacity: 0 }}>
            <div className="h-px w-10" style={{ background: 'hsl(var(--primary)/0.5)' }} />
            <span
              className="text-xs font-bold tracking-[0.3em] uppercase"
              style={{ color: 'hsl(var(--primary))', fontFamily: "'DM Mono', monospace" }}
            >
              Contact
            </span>
          </div>

          <div ref={headRef} style={{ opacity: 0 }}>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <h2
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.88] tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'hsl(var(--foreground))' }}
              >
                Let's
                <br />
                <span style={{ WebkitTextStroke: '2px hsl(var(--primary))', color: 'transparent' }}>
                  Connect
                </span>
              </h2>
              <p
                className="text-base leading-relaxed max-w-sm"
                style={{ color: 'hsl(var(--muted-foreground))', fontFamily: "'Lora', Georgia, serif" }}
              >
                Interested in coaching sessions, training programs, or collaborations? Reach out — I'd love to hear from you.
              </p>
            </div>
          </div>
        </div>

        {/* ── Contact cards ── */}
        <div className="grid sm:grid-cols-3 gap-5 mb-16">
          {contacts.map((c, i) => (
            <a
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              href={c.href}
              target={c.external ? '_blank' : undefined}
              rel={c.external ? 'noopener noreferrer' : undefined}
              className="group relative rounded-2xl p-6 sm:p-7 transition-all duration-400"
              style={{
                opacity: 0,
                background: 'hsl(var(--muted)/0.4)',
                border: '1.5px solid hsl(var(--border))',
                textDecoration: 'none',
              }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: c.accent + '15',
                  border: `1.5px solid ${c.accent}30`,
                }}
              >
                {c.icon}
              </div>

              {/* Label */}
              <p
                className="text-[10px] font-bold tracking-widest uppercase mb-1"
                style={{ color: c.accent, fontFamily: "'DM Mono', monospace" }}
              >
                {c.label}
              </p>

              {/* Detail */}
              <p
                className="text-sm font-medium leading-snug break-all"
                style={{ color: 'hsl(var(--foreground))', fontFamily: "'DM Mono', monospace" }}
              >
                {c.detail}
              </p>

              {/* Arrow */}
              <div
                className="absolute top-6 right-6 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
                style={{ background: c.accent + '20', border: `1px solid ${c.accent}30` }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ color: c.accent }}>
                  <path d="M2 8L8 2M8 2H3M8 2v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Hover inset glow */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ boxShadow: `inset 0 0 0 1px ${c.accent}25` }}
              />
            </a>
          ))}
        </div>

        {/* ── Primary CTA ── */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl"
          style={{ opacity: 0, background: 'hsl(var(--muted)/0.4)', border: '1.5px solid hsl(var(--border))' }}>

          <div>
            <p
              className="text-xs font-bold tracking-widest uppercase mb-1"
              style={{ color: 'hsl(var(--primary))', fontFamily: "'DM Mono', monospace" }}
            >
              Fastest response
            </p>
            <p
              className="text-lg font-bold"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'hsl(var(--foreground))' }}
            >
              Drop me a direct email
            </p>
            <p
              className="text-sm mt-0.5"
              style={{ color: 'hsl(var(--muted-foreground))', fontFamily: "'Lora', Georgia, serif", fontStyle: 'italic' }}
            >
              I reply within 24 hours
            </p>
          </div>

          <a
            href="mailto:ibrahim.alnaser@gmail.com"
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-xl shrink-0"
            style={{
              background: 'hsl(var(--primary))',
              boxShadow: '0 4px 24px -8px hsl(var(--primary)/0.5)',
              fontFamily: "'DM Mono', monospace",
              fontSize: '13px',
              letterSpacing: '0.05em',
            }}
          >
            Send Email
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* ── Location + footer rule ── */}
        <div className="mt-16 flex items-center gap-4">
          <div className="h-px flex-1" style={{ background: 'hsl(var(--border))' }} />
          <p
            className="text-xs px-4 shrink-0 flex items-center gap-1.5"
            style={{ color: 'hsl(var(--muted-foreground))', fontFamily: "'DM Mono', monospace" }}
          >
            <span>📍</span> Irbid, Jordan
          </p>
          <div className="h-px flex-1" style={{ background: 'hsl(var(--border))' }} />
        </div>

      </div>
    </section>
  );
}