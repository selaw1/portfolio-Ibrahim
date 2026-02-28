import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const certificates = [
  {
    title: 'FIBA Level 1 Coaching Certificate',
    issuer: 'FIBA / World Association of Basketball Coaches',
    year: '2025',
    tag: 'International',
    description:
      'Globally recognized certification covering the full coaching spectrum — leadership, player development, offensive and defensive tactics, game preparation, and post-game analysis. Delivered through FIBA\'s WABC framework, the program equips coaches to work effectively at competitive levels within any national basketball system.',
    icon: '🏅',
    accent: 'from-amber-400 to-orange-500',
    accentSolid: '#f59e0b',
  },
  {
    title: 'Jordan Basketball Federation Coaching License',
    issuer: 'Jordan Basketball Federation',
    year: '2018',
    tag: 'National License',
    description:
      'Official national coaching license authorizing professional coaching at all competitive levels within Jordan. Validates expertise in basketball methodology, team management, and athlete preparation as recognized by the JBF and the Arab Basketball Federation.',
    icon: '📋',
    accent: 'from-sky-400 to-blue-600',
    accentSolid: '#38bdf8',
  },
  {
    title: 'Canadian Program for Preparing Coaches (NCCP)',
    issuer: 'Jordan Olympic Committee — in partnership with the Coaching Association of Canada',
    year: '2024',
    tag: 'Olympic Committee',
    description:
      'Completion of the National Coaching Certification Program (NCCP) — a world-leading coach education framework developed in Canada and delivered in Jordan by the Jordan Olympic Committee. The multi-stage program covers coaching competencies, sport safety, athlete-centred practice, and long-term athlete development.',
    icon: '🍁',
    accent: 'from-red-400 to-rose-600',
    accentSolid: '#f87171',
  },
  {
    title: 'International Basketball Coaching Clinic',
    issuer: 'Turkey Basketball Federation',
    year: '2020',
    tag: 'International Clinic',
    description:
      'Intensive international clinic hosted by the Turkey Basketball Federation, covering elite-level coaching methodologies, modern offensive and defensive systems, and best practices from top European basketball programs. Provided direct exposure to international coaching philosophies and cross-cultural basketball development.',
    icon: '🌍',
    accent: 'from-emerald-400 to-teal-600',
    accentSolid: '#34d399',
  },
];

export default function Certificates() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }

      // Cards stagger
      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 60, rotateX: 8 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.7,
              ease: 'power3.out',
              delay: i * 0.1,
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                once: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className="relative py-28 lg:py-40 overflow-hidden"
      style={{ background: 'hsl(var(--background))' }}
    >
      {/* Architectural background grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          // backgroundImage: `
          //   linear-gradient(hsl(var(--border)/0.4) 1px, transparent 1px),
          //   linear-gradient(90deg, hsl(var(--border)/0.4) 1px, transparent 1px)
          // `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      {/* Glowing orb */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(ellipse, hsl(var(--primary)) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative">

        {/* ── Header ── */}
        <div ref={headerRef} className="mb-20 lg:mb-28">
          {/* Eyebrow line */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12" style={{ background: 'hsl(var(--primary)/0.5)' }} />
            <span
              className="text-xs font-bold tracking-[0.3em] uppercase"
              style={{
                color: 'hsl(var(--primary))',
                fontFamily: "'DM Mono', monospace",
              }}
            >
              Credentials
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <h2
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.88] tracking-tight"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: 'hsl(var(--foreground))',
              }}
            >
              Certified.
              <br />
              <span
                style={{
                  WebkitTextStroke: '2px hsl(var(--primary))',
                  color: 'transparent',
                }}
              >
                Recognized.
              </span>
            </h2>

            <p
              className="text-base leading-relaxed max-w-sm"
              style={{
                color: 'hsl(var(--muted-foreground))',
                fontFamily: "'Lora', Georgia, serif",
              }}
            >
              A collection of internationally and nationally recognized coaching certifications — each one a step toward coaching excellence.
            </p>
          </div>
        </div>

        {/* ── Certificate Cards ── */}
        <div className="space-y-5">
          {certificates.map((cert, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{ opacity: 0 }}
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
            >
              {/* Card base */}
              <div
                className="relative flex flex-col sm:flex-row sm:items-center gap-6 p-6 sm:p-8 transition-all duration-500"
                style={{
                  background:
                    activeIndex === i
                      ? 'hsl(var(--card))'
                      : 'hsl(var(--muted)/0.4)',
                  border: `1.5px solid ${activeIndex === i ? cert.accentSolid + '55' : 'hsl(var(--border))'}`,
                  borderRadius: '16px',
                  boxShadow: activeIndex === i
                    ? `0 0 0 1px ${cert.accentSolid}22, 0 20px 60px -20px ${cert.accentSolid}33`
                    : 'none',
                }}
              >
                {/* Left: Number + accent bar */}
                <div className="flex items-center gap-5 shrink-0">
                  {/* Accent left border */}
                  <div
                    className="hidden sm:block w-1 rounded-full transition-all duration-500"
                    style={{
                      height: activeIndex === i ? '72px' : '40px',
                      background: `linear-gradient(to bottom, ${cert.accentSolid}, transparent)`,
                      opacity: activeIndex === i ? 1 : 0.35,
                    }}
                  />

                  {/* Index number */}
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0 text-lg font-bold transition-all duration-300"
                    style={{
                      background: activeIndex === i
                        ? `${cert.accentSolid}22`
                        : 'hsl(var(--muted))',
                      color: activeIndex === i
                        ? cert.accentSolid
                        : 'hsl(var(--muted-foreground))',
                      fontFamily: "'DM Mono', monospace",
                      border: `1.5px solid ${activeIndex === i ? cert.accentSolid + '44' : 'hsl(var(--border))'}`,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Center: Content */}
                <div className="flex-1 min-w-0">
                  {/* Top row: tag + year */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase"
                      style={{
                        background: `${cert.accentSolid}18`,
                        color: cert.accentSolid,
                        fontFamily: "'DM Mono', monospace",
                        border: `1px solid ${cert.accentSolid}33`,
                      }}
                    >
                      {cert.tag}
                    </span>
                    <span
                      className="text-xs"
                      style={{
                        color: 'hsl(var(--muted-foreground))',
                        fontFamily: "'DM Mono', monospace",
                      }}
                    >
                      {cert.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-lg sm:text-xl font-bold leading-snug mb-1 transition-colors duration-300"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      color: activeIndex === i
                        ? 'hsl(var(--foreground))'
                        : 'hsl(var(--foreground)/0.85)',
                    }}
                  >
                    {cert.title}
                  </h3>

                  {/* Issuer */}
                  <p
                    className="text-sm"
                    style={{
                      color: cert.accentSolid,
                      fontFamily: "'DM Mono', monospace",
                      opacity: 0.85,
                    }}
                  >
                    {cert.issuer}
                  </p>

                  {/* Expandable description */}
                  <div
                    className="overflow-hidden transition-all duration-500"
                    style={{
                      maxHeight: activeIndex === i ? '200px' : '0px',
                      opacity: activeIndex === i ? 1 : 0,
                      marginTop: activeIndex === i ? '14px' : '0px',
                    }}
                  >
                    <div
                      className="h-px mb-4"
                      style={{ background: `${cert.accentSolid}30` }}
                    />
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        color: 'hsl(var(--muted-foreground))',
                        fontFamily: "'Lora', Georgia, serif",
                      }}
                    >
                      {cert.description}
                    </p>
                  </div>
                </div>

                {/* Right: Expand toggle */}
                <div
                  className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 self-start sm:self-center mt-1 sm:mt-0"
                  style={{
                    background: activeIndex === i
                      ? `${cert.accentSolid}22`
                      : 'hsl(var(--muted))',
                    border: `1.5px solid ${activeIndex === i ? cert.accentSolid + '44' : 'hsl(var(--border))'}`,
                    transform: activeIndex === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    style={{ color: activeIndex === i ? cert.accentSolid : 'hsl(var(--muted-foreground))' }}
                  >
                    <path
                      d="M6 1v10M1 6h10"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Hover glow layer */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-400 opacity-0 group-hover:opacity-100"
                style={{
                  boxShadow: `inset 0 0 0 1px ${cert.accentSolid}22`,
                }}
              />
            </div>
          ))}
        </div>

        {/* ── Footer note ── */}
        <div className="mt-16 flex items-center gap-4">
          <div className="h-px flex-1" style={{ background: 'hsl(var(--border))' }} />
          <p
            className="text-xs text-center px-4 shrink-0"
            style={{
              color: 'hsl(var(--muted-foreground))',
              fontFamily: "'DM Mono', monospace",
            }}
          >
            All certifications current & in good standing
          </p>
          <div className="h-px flex-1" style={{ background: 'hsl(var(--border))' }} />
        </div>
      </div>
    </section>
  );
}