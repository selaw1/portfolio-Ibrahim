import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const coachingTeams = [
  {
    name: 'Al Jaleel Club',
    role: 'Head Coach',
    location: 'Irbid, Jordan',
    period: '2016',
    ageGroup: 'U-14',
    players: '20+',
    winRate: '20%',
    flag: '🇯🇴',
    highlight: false,
  },
  {
    name: 'Kufr Yoba Club',
    role: 'Head Coach',
    location: 'Irbid, Jordan',
    period: '2018 – Present',
    ageGroup: 'U14, U16, U18',
    players: '150',
    winRate: '55%',
    flag: '🇯🇴',
    highlight: false,
  },
  {
    name: 'Jordan National Team for Schools (Girls)',
    role: 'Assistant Coach',
    location: 'Amman, Jordan',
    period: '2025',
    ageGroup: 'U-16',
    players: '12+',
    winRate: '100%',
    flag: '🇯🇴',
    highlight: true,
  },
  {
    name: 'Promising Falcons — Jordan Olympic Committee',
    role: 'Head Coach & Technical Supervisor, All North Centers',
    location: 'North Jordan',
    period: '2023 – Present',
    ageGroup: 'U-12',
    players: '200+',
    winRate: '—',
    flag: '🇯🇴',
    highlight: true,
  },
  {
    name: 'Power Team',
    role: 'Head Coach',
    location: 'Amman, Jordan',
    period: '2025',
    ageGroup: 'U-16',
    players: '12+',
    winRate: '40%',
    flag: '🇯🇴',
    highlight: false,
  },
];

const philosophyPillars = [
  {
    label: 'Technical Excellence',
    detail: 'Mastery of fundamentals, systems, and game-situational intelligence.',
    accent: 'hsl(var(--primary))',
  },
  {
    label: 'Mental Resilience',
    detail: 'Training athletes to perform under pressure and bounce back from adversity.',
    accent: 'hsl(var(--accent))',
  },
  {
    label: 'Character Development',
    detail: 'Building people of discipline, accountability, and leadership off the court.',
    accent: '#f59e0b',
  },
];

export default function ClubsCoaching() {
  const sectionRef  = useRef<HTMLElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const headRef     = useRef<HTMLDivElement>(null);
  const cardsRef    = useRef<(HTMLDivElement | null)[]>([]);
  const philRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header cascade
      gsap.fromTo(
        [eyebrowRef.current, headRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power4.out',
          scrollTrigger: { trigger: eyebrowRef.current, start: 'top 84%', once: true },
        }
      );

      // Cards
      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: i * 0.09,
              scrollTrigger: { trigger: card, start: 'top 87%', once: true } }
          );
        }
      });

      // Philosophy block
      if (philRef.current) {
        gsap.fromTo(philRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: philRef.current, start: 'top 86%', once: true } }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="clubs-coaching"
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

      {/* Diagonal accent */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute"
          style={{
            top: '-10%', right: '-5%',
            width: '50%', height: '120%',
            background: 'hsl(var(--accent)/0.03)',
            transform: 'skewX(8deg)',
          }}
        />
      </div>

      {/* Glow blobs */}
      <div className="pointer-events-none absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)', transform: 'translate(-30%, -30%)' }} />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)', transform: 'translate(30%, 30%)' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative">

        {/* ── Header ── */}
        <div className="mb-20 lg:mb-28">
          <div ref={eyebrowRef} className="flex items-center gap-4 mb-5" style={{ opacity: 0 }}>
            <div className="h-px w-10" style={{ background: 'hsl(var(--accent)/0.6)' }} />
            <span
              className="text-xs font-bold tracking-[0.3em] uppercase"
              style={{ color: 'hsl(var(--accent))', fontFamily: "'DM Mono', monospace" }}
            >
              Coaching Career
            </span>
          </div>

          <div ref={headRef} style={{ opacity: 0 }}>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <h2
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.88] tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'hsl(var(--foreground))' }}
              >
                Coaching
                <br />
                <span style={{ WebkitTextStroke: '2px hsl(var(--accent))', color: 'transparent' }}>
                  Experience
                </span>
              </h2>
              <p
                className="text-base leading-relaxed max-w-sm"
                style={{ color: 'hsl(var(--muted-foreground))', fontFamily: "'Lora', Georgia, serif" }}
              >
                From youth academies to national programs — building champions through mentorship, strategy, and relentless dedication.
              </p>
            </div>
          </div>
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid sm:grid-cols-2 gap-5 mb-20 lg:mb-28">
          {coachingTeams.map((team, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group relative rounded-2xl p-6 sm:p-7 transition-all duration-400"
              style={{
                opacity: 0,
                background: team.highlight ? 'hsl(var(--card))' : 'hsl(var(--muted)/0.4)',
                border: `1.5px solid ${team.highlight ? 'hsl(var(--accent)/0.35)' : 'hsl(var(--border))'}`,
                boxShadow: team.highlight ? '0 8px 40px -16px hsl(var(--accent)/0.25)' : 'none',
                // Last card spans full width if odd total
                gridColumn: i === coachingTeams.length - 1 && coachingTeams.length % 2 !== 0 ? 'span 2' : undefined,
              }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex-1 min-w-0">
                  {/* Role */}
                  <p
                    className="text-[10px] font-bold tracking-widest uppercase mb-1.5"
                    style={{ color: 'hsl(var(--accent))', fontFamily: "'DM Mono', monospace" }}
                  >
                    {team.role}
                  </p>

                  {/* Team name */}
                  <h3
                    className="text-xl sm:text-2xl font-bold leading-snug mb-1"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      color: 'hsl(var(--foreground))',
                    }}
                  >
                    {team.name}
                  </h3>

                  {/* Age group */}
                  <p
                    className="text-sm"
                    style={{ color: 'hsl(var(--primary))', fontFamily: "'DM Mono', monospace", opacity: 0.85 }}
                  >
                    {team.ageGroup}
                  </p>
                </div>

                {/* Flag */}
                <span className="text-2xl leading-none shrink-0 mt-1">{team.flag}</span>
              </div>

              {/* Meta row */}
              <div
                className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4 text-xs"
                style={{ color: 'hsl(var(--muted-foreground))', fontFamily: "'DM Mono', monospace" }}
              >
                <span>📍 {team.location}</span>
                <span>🗓 {team.period}</span>
              </div>

              {/* Divider */}
              <div className="h-px mb-4" style={{ background: 'hsl(var(--border))' }} />

              {/* Stats pills */}
              <div className="flex flex-wrap gap-2">
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: 'hsl(var(--accent)/0.1)',
                    color: 'hsl(var(--accent))',
                    border: '1px solid hsl(var(--accent)/0.2)',
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  <span>👤</span>
                  <span>{team.players} players</span>
                </div>
                {team.winRate !== '—' && (
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{
                      background: 'hsl(var(--primary)/0.1)',
                      color: 'hsl(var(--primary))',
                      border: '1px solid hsl(var(--primary)/0.2)',
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    <span>📈</span>
                    <span>{team.winRate} win rate</span>
                  </div>
                )}
              </div>

              {/* Hover inset glow */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ boxShadow: 'inset 0 0 0 1px hsl(var(--accent)/0.2)' }}
              />
            </div>
          ))}
        </div>

        {/* ── Coaching Philosophy ── */}
        <div ref={philRef} style={{ opacity: 0 }}>
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-10" style={{ background: 'hsl(var(--primary)/0.5)' }} />
            <span
              className="text-xs font-bold tracking-[0.3em] uppercase"
              style={{ color: 'hsl(var(--primary))', fontFamily: "'DM Mono', monospace" }}
            >
              Philosophy
            </span>
          </div>

          <div className="grid lg:grid-cols-[1fr_1px_1fr] gap-0 items-start">
            {/* Left: quote */}
            <div className="lg:pr-12 pb-10 lg:pb-0">
              <div
                className="text-7xl leading-none mb-4 select-none"
                style={{ color: 'hsl(var(--accent)/0.1)', fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                "
              </div>
              <p
                className="text-xl sm:text-2xl leading-snug mb-6"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: 'italic',
                  color: 'hsl(var(--foreground)/0.85)',
                }}
              >
                Every player has unique potential that can be unlocked through personalized guidance and unwavering support.
              </p>
              <div className="flex items-center gap-3">
                <div className="h-px w-10" style={{ background: 'hsl(var(--accent)/0.4)' }} />
                <span
                  className="text-xs font-bold tracking-wider"
                  style={{ color: 'hsl(var(--accent))', fontFamily: "'DM Mono', monospace" }}
                >
                  Ibrahim Alnaser
                </span>
              </div>

              {/* Summary stats */}
              <div className="grid grid-cols-2 gap-3 mt-8">
                {[
                  { value: '400+', label: 'Players Coached', color: 'hsl(var(--accent))' },
                  { value: '11+',  label: 'Years Coaching',  color: 'hsl(var(--primary))' },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl text-center"
                    style={{ background: 'hsl(var(--muted)/0.5)', border: '1px solid hsl(var(--border))' }}
                  >
                    <div
                      className="text-3xl font-bold"
                      style={{ color: s.color, fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {s.value}
                    </div>
                    <div
                      className="text-xs mt-1"
                      style={{ color: 'hsl(var(--muted-foreground))', fontFamily: "'DM Mono', monospace" }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vertical divider */}
            <div
              className="hidden lg:block w-px mx-auto"
              style={{
                alignSelf: 'stretch',
                background: 'linear-gradient(to bottom, transparent, hsl(var(--accent)/0.3) 20%, hsl(var(--border)) 50%, hsl(var(--primary)/0.3) 80%, transparent)',
              }}
            />

            {/* Mobile divider */}
            <div className="lg:hidden h-px w-full mb-10"
              style={{ background: 'linear-gradient(to right, transparent, hsl(var(--border)), transparent)' }} />

            {/* Right: three pillars */}
            <div className="lg:pl-12 space-y-5">
              {philosophyPillars.map((p, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 group/pillar"
                >
                  <div
                    className="mt-1 w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold"
                    style={{
                      background: p.accent + '18',
                      border: `1.5px solid ${p.accent}33`,
                      color: p.accent,
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h4
                      className="font-bold text-base mb-1"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'hsl(var(--foreground))' }}
                    >
                      {p.label}
                    </h4>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'hsl(var(--muted-foreground))', fontFamily: "'Lora', Georgia, serif" }}
                    >
                      {p.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Footer rule ── */}
        <div className="mt-20 flex items-center gap-4">
          <div className="h-px flex-1" style={{ background: 'hsl(var(--border))' }} />
          <p
            className="text-xs px-4 shrink-0"
            style={{ color: 'hsl(var(--muted-foreground))', fontFamily: "'DM Mono', monospace" }}
          >
            11+ years · 5 programs · Jordan & beyond
          </p>
          <div className="h-px flex-1" style={{ background: 'hsl(var(--border))' }} />
        </div>

      </div>
    </section>
  );
}