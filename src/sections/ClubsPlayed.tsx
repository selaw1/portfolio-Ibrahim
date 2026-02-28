import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clubs = [
  {
    name: 'AL-Jaleel Club',
    position: 'Center / Power Forward',
    location: 'Irbid, Jordan',
    period: '2007 – 2009',
    league: 'Jordan Basketball Federation — Youth League',
    achievements: ['Team Top Scorer', 'Team Top Rebounder'],
    games: '100+',
    flag: '🇯🇴',
  },
  {
    name: 'Jordan National Team (U16, U18)',
    position: 'Center / Power Forward',
    location: 'Jordan',
    period: '2009 – 2010',
    league: 'Jordan Basketball Federation — Youth League',
    achievements: [
      '2nd Place — WABA Championship (2009 U16)',
      '5th Place — Asia Championship (2009 U16)',
      '1st Place — Arab Championship (2010)',
    ],
    games: '50+',
    flag: '🇯🇴',
    highlight: true,
  },
  {
    name: 'ASU Club',
    position: 'Center / Power Forward',
    location: 'Amman, Jordan',
    period: '2010',
    league: 'Jordan Basketball Federation — Youth League',
    achievements: ['Foundation for professional career'],
    games: '25+',
    flag: '🇯🇴',
  },
  {
    name: 'Gaza Hashem Club',
    position: 'Power Forward',
    location: 'Jerash, Jordan',
    period: '2013',
    league: 'Jordan Basketball Federation — First Division',
    achievements: [
      'Regional championship winner (2013)',
      '1st Place in the league (2013)',
      'One of the Top 3 Scorers in the league',
    ],
    games: '9+',
    flag: '🇯🇴',
  },
  {
    name: 'AL-Jaleel Club',
    position: 'Center / Power Forward',
    location: 'Irbid, Jordan',
    period: '2010 – 2012, 2014 – 2016',
    league: 'Jordan Basketball Federation — Premier League',
    achievements: ['Team Top Scorer', 'Team Top Rebounder'],
    games: '150+',
    flag: '🇯🇴',
  },
  {
    name: 'Jordan University National Team',
    position: 'Center / Power Forward',
    location: 'Amman, Jordan',
    period: '2013',
    league: 'Arab University League',
    achievements: ['1st Place — Arab University League (2013)'],
    games: '7+',
    flag: '🇯🇴',
    highlight: true,
  },
  {
    name: 'Der Abi Saed Club',
    position: 'Power Forward',
    location: 'Irbid, Jordan',
    period: '2015',
    league: 'Jordan Basketball Federation — First Division',
    achievements: ['1st Place in the league (2015)'],
    games: '5+',
    flag: '🇯🇴',
    highlight: false,
  },
  {
    name: 'De La Salle Jerusalem Club',
    position: 'Power Forward',
    location: 'Jerusalem, Palestine',
    period: '2017',
    league: 'Palestine Basketball Federation — Premier League',
    achievements: ['International playing experience across borders'],
    games: '15+',
    flag: '🇵🇸',
  },
  {
    name: 'Al-Ahli Club',
    position: 'Power Forward',
    location: 'Amman, Jordan',
    period: '2018 – 2019',
    league: 'Jordan Basketball Federation — Premier League',
    achievements: ['Regional championship winner (2018)', 'Rising star award recipient'],
    games: '25+',
    flag: '🇯🇴',
  },
  {
    name: 'Orthodox Ramallah Club',
    position: 'Power Forward',
    location: 'Ramallah, Palestine',
    period: '2019',
    league: 'Palestine Basketball Federation — Premier League',
    achievements: ['5th place in national championship (2019)'],
    games: '15+',
    flag: '🇵🇸',
  },
  {
    name: 'Kufr Yoba Club',
    position: 'Power Forward',
    location: 'Irbid, Jordan',
    period: '2019 – 2020, 2022',
    league: 'Jordan Basketball Federation — Premier League',
    achievements: [
      '3rd place in national championship (2020)',
      'Developed game IQ and leadership',
    ],
    games: '50+',
    flag: '🇯🇴',
  },
  {
    name: 'Kufr Rakeb Club',
    position: 'Power Forward',
    location: 'Irbid, Jordan',
    period: '2021',
    league: 'Jordan Basketball Federation — First Division',
    achievements: ['Top Scorer in the league (2021)', '3rd Place in the league (2021)'],
    games: '5+',
    flag: '🇯🇴',
    highlight: true,
  },
  {
    name: 'Shabab Bushra Club',
    position: 'Power Forward',
    location: 'Irbid, Jordan',
    period: '2024 - 2025',
    league: 'Jordan Basketball Federation — Premier Division',
    achievements: [
      'Developed game IQ and leadership',
    ],
    games: '40+',
    flag: '🇯🇴',
  },
];

const summaryStats = [
  { value: '500+',  label: 'Total Games' },
  { value: '15+',   label: 'Championships' },
  { value: '16.8',  label: 'Avg PPG' },
  { value: '8.5',   label: 'Avg RPG' },
];

export default function ClubsPlayed() {
  const sectionRef  = useRef<HTMLElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const headRef     = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef     = useRef<HTMLDivElement>(null);
  const cardsRef    = useRef<(HTMLDivElement | null)[]>([]);

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

      // Summary stats
      statsRef.current.forEach((el, i) => {
        if (el) {
          gsap.fromTo(el,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', delay: i * 0.08,
              scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
          );
        }
      });

      // Timeline line draw
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleY: 0, transformOrigin: 'top center' },
          { scaleY: 1, duration: 2, ease: 'power2.inOut',
            scrollTrigger: { trigger: lineRef.current, start: 'top 80%', once: true } }
        );
      }

      // Cards
      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
            { opacity: 1, x: 0, duration: 0.75, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 87%', once: true } }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="clubs-played"
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
        style={{ background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative">

        {/* ── Header ── */}
        <div className="mb-20 lg:mb-28">
          <div ref={eyebrowRef} className="flex items-center gap-4 mb-5" style={{ opacity: 0 }}>
            <div className="h-px w-10" style={{ background: 'hsl(var(--primary)/0.5)' }} />
            <span
              className="text-xs font-bold tracking-[0.3em] uppercase"
              style={{ color: 'hsl(var(--primary))', fontFamily: "'DM Mono', monospace" }}
            >
              Playing Career
            </span>
          </div>

          <div ref={headRef} style={{ opacity: 0 }}>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <h2
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.88] tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'hsl(var(--foreground))' }}
              >
                Clubs I've
                <br />
                <span style={{ WebkitTextStroke: '2px hsl(var(--primary))', color: 'transparent' }}>
                  Played For
                </span>
              </h2>
              <p
                className="text-base leading-relaxed max-w-sm"
                style={{ color: 'hsl(var(--muted-foreground))', fontFamily: "'Lora', Georgia, serif" }}
              >
                A career spanning Jordan, Palestine, and regional competitions — built one game at a time.
              </p>
            </div>
          </div>
        </div>

        {/* ── Summary Stats Bar ── */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-20 lg:mb-28 p-5 rounded-2xl"
          style={{ background: 'hsl(var(--muted)/0.5)', border: '1px solid hsl(var(--border))' }}
        >
          {summaryStats.map((s, i) => (
            <div
              key={i}
              ref={(el) => { statsRef.current[i] = el; }}
              className="text-center py-2"
              style={{ opacity: 0 }}
            >
              <div
                className="text-3xl sm:text-4xl font-bold"
                style={{
                  color: i % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--accent))',
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
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

        {/* ── Timeline ── */}
        <div className="relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-px"
            style={{
              top: 0, bottom: 0,
              background: 'linear-gradient(to bottom, transparent, hsl(var(--primary)/0.4) 10%, hsl(var(--border)) 50%, hsl(var(--accent)/0.4) 90%, transparent)',
            }}
          />

          <div className="space-y-8 lg:space-y-12">
            {clubs.map((club, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  ref={(el) => { cardsRef.current[i] = el; }}
                  className="relative grid lg:grid-cols-2 lg:gap-16 items-start"
                  style={{ opacity: 0 }}
                >
                  {/* Timeline dot */}
                  <div
                    className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-6 w-4 h-4 rounded-full items-center justify-center z-10"
                    style={{
                      background: club.highlight ? 'hsl(var(--primary))' : 'hsl(var(--background))',
                      border: `2px solid ${club.highlight ? 'hsl(var(--primary))' : 'hsl(var(--border))'}`,
                      boxShadow: club.highlight ? '0 0 12px hsl(var(--primary)/0.5)' : 'none',
                    }}
                  >
                    {club.highlight && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>

                  {/* Card — alternates sides on desktop */}
                  <div className={`${isLeft ? 'lg:col-start-1' : 'lg:col-start-2'} group`}>
                    <div
                      className="relative rounded-2xl p-6 sm:p-7 transition-all duration-400"
                      style={{
                        background: club.highlight
                          ? 'hsl(var(--card))'
                          : 'hsl(var(--muted)/0.4)',
                        border: `1.5px solid ${club.highlight ? 'hsl(var(--primary)/0.35)' : 'hsl(var(--border))'}`,
                        boxShadow: club.highlight
                          ? '0 8px 40px -16px hsl(var(--primary)/0.25)'
                          : 'none',
                      }}
                    >
                      {/* Top row */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex-1 min-w-0">
                          {/* League */}
                          <p
                            className="text-[10px] font-bold tracking-widest uppercase mb-1.5"
                            style={{
                              color: 'hsl(var(--primary))',
                              fontFamily: "'DM Mono', monospace",
                            }}
                          >
                            {club.league}
                          </p>

                          {/* Club name */}
                          <h3
                            className="text-xl sm:text-2xl font-bold leading-snug mb-1"
                            style={{
                              fontFamily: "'Playfair Display', Georgia, serif",
                              color: 'hsl(var(--foreground))',
                            }}
                          >
                            {club.name}
                          </h3>

                          {/* Position */}
                          <p
                            className="text-sm"
                            style={{
                              color: 'hsl(var(--accent))',
                              fontFamily: "'DM Mono', monospace",
                              opacity: 0.85,
                            }}
                          >
                            {club.position}
                          </p>
                        </div>

                        {/* Flag + games badge */}
                        <div className="shrink-0 flex flex-col items-center gap-1.5">
                          <span className="text-2xl leading-none">{club.flag}</span>
                          <div
                            className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                            style={{
                              background: 'hsl(var(--muted))',
                              color: 'hsl(var(--muted-foreground))',
                              fontFamily: "'DM Mono', monospace",
                              border: '1px solid hsl(var(--border))',
                            }}
                          >
                            {club.games} games
                          </div>
                        </div>
                      </div>

                      {/* Meta row */}
                      <div
                        className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4 text-xs"
                        style={{ color: 'hsl(var(--muted-foreground))', fontFamily: "'DM Mono', monospace" }}
                      >
                        <span>📍 {club.location}</span>
                        <span>🗓 {club.period}</span>
                      </div>

                      {/* Divider */}
                      <div className="h-px mb-4" style={{ background: 'hsl(var(--border))' }} />

                      {/* Achievements */}
                      <ul className="space-y-2">
                        {club.achievements.map((a, j) => (
                          <li key={j} className="flex items-start gap-2.5">
                            <div
                              className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ background: club.highlight ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))' }}
                            />
                            <span
                              className="text-sm leading-snug"
                              style={{
                                color: 'hsl(var(--muted-foreground))',
                                fontFamily: "'Lora', Georgia, serif",
                              }}
                            >
                              {a}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Hover glow */}
                      <div
                        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                        style={{ boxShadow: 'inset 0 0 0 1px hsl(var(--primary)/0.2)' }}
                      />
                    </div>
                  </div>

                  {/* Empty cell for alternating layout */}
                  <div className={`hidden lg:block ${isLeft ? 'lg:col-start-2' : 'lg:col-start-1'}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Footer line ── */}
        <div className="mt-20 flex items-center gap-4">
          <div className="h-px flex-1" style={{ background: 'hsl(var(--border))' }} />
          <p
            className="text-xs px-4 shrink-0"
            style={{ color: 'hsl(var(--muted-foreground))', fontFamily: "'DM Mono', monospace" }}
          >
            19+ years · 11 clubs · 2 federations
          </p>
          <div className="h-px flex-1" style={{ background: 'hsl(var(--border))' }} />
        </div>

      </div>
    </section>
  );
}