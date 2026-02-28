import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const playerStats = [
  { value: '500+', label: 'Games Played' },
  { value: '19+',  label: 'Years on Court' },
  { value: '15+',  label: 'Championships' },
  { value: '8+',   label: 'Teams' },
];

const coachStats = [
  { value: '200+', label: 'Players Developed' },
  { value: '11+',  label: 'Seasons Coached' },
  { value: '4+',   label: 'Teams Coached' },
  { value: 'FIBA', label: 'Certified' },
];

const playerTraits = [
  { label: 'Championship Mindset',   detail: 'Multiple titles across Jordan & the region' },
  { label: 'Defensive Excellence',   detail: 'Known for court awareness & lockdown defense' },
  { label: 'Clutch Performer',        detail: 'Consistently delivers in high-pressure moments' },
  { label: 'Team Leader',             detail: 'Builds chemistry and drives collective success' },
];

const coachTraits = [
  { label: 'Player Development',     detail: 'Unlocks the ceiling of every athlete\'s potential' },
  { label: 'Tactical Vision',         detail: 'Advanced game-planning & real-time adjustments' },
  { label: 'Youth Mentorship',        detail: 'Building character on and off the court' },
  { label: 'Proven Track Record',    detail: 'Consistent results from youth to professional' },
];

export default function About() {
  const sectionRef    = useRef<HTMLElement>(null);
  const eyebrowRef    = useRef<HTMLDivElement>(null);
  const headRef       = useRef<HTMLDivElement>(null);
  const playerRef     = useRef<HTMLDivElement>(null);
  const coachRef      = useRef<HTMLDivElement>(null);
  const dividerRef    = useRef<HTMLDivElement>(null);
  const quoteRef      = useRef<HTMLDivElement>(null);
  const statsRefs     = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Eyebrow + headline cascade
      gsap.fromTo(
        [eyebrowRef.current, headRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power4.out',
          scrollTrigger: { trigger: eyebrowRef.current, start: 'top 84%', once: true },
        }
      );

      // Player card
      gsap.fromTo(playerRef.current,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: playerRef.current, start: 'top 80%', once: true } }
      );

      // Divider line draw
      gsap.fromTo(dividerRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, duration: 1.2, ease: 'power3.inOut',
          scrollTrigger: { trigger: dividerRef.current, start: 'top 80%', once: true } }
      );

      // Coach card
      gsap.fromTo(coachRef.current,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.1,
          scrollTrigger: { trigger: coachRef.current, start: 'top 80%', once: true } }
      );

      // Stats count-up feel
      statsRefs.current.forEach((el, i) => {
        if (el) {
          gsap.fromTo(el,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: i * 0.07,
              scrollTrigger: { trigger: el, start: 'top 90%', once: true } }
          );
        }
      });

      // Quote
      gsap.fromTo(quoteRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: quoteRef.current, start: 'top 88%', once: true } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 lg:py-40 overflow-hidden"
      style={{ background: 'hsl(var(--background))' }}
    >
      {/* ── Textured background ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
        }}
      />

      {/* ── Diagonal background accent ── */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute"
          style={{
            top: '-10%', left: '-5%',
            width: '55%', height: '120%',
            background: 'hsl(var(--primary)/0.03)',
            transform: 'skewX(-8deg)',
          }}
        />
      </div>

      {/* ── Glow blobs ── */}
      <div className="pointer-events-none absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)', transform: 'translate(-30%, -30%)' }} />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)', transform: 'translate(30%, 30%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">

        {/* ── Header ── */}
        <div className="mb-20 lg:mb-28">
          <div ref={eyebrowRef} className="flex items-center gap-4 mb-5" style={{ opacity: 0 }}>
            <div className="h-px w-10" style={{ background: 'hsl(var(--primary)/0.5)' }} />
            <span
              className="text-xs font-bold tracking-[0.3em] uppercase"
              style={{ color: 'hsl(var(--primary))', fontFamily: "'DM Mono', monospace" }}
            >
              The Journey
            </span>
          </div>

          <div ref={headRef} style={{ opacity: 0 }}>
            <h2
              className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.85] tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'hsl(var(--foreground))' }}
            >
              Player.
              <br />
              <span style={{ WebkitTextStroke: '2px hsl(var(--primary))', color: 'transparent' }}>
                Coach.
              </span>
              <br />
              <span
                className="text-3xl sm:text-4xl lg:text-5xl font-normal italic"
                style={{ color: 'hsl(var(--muted-foreground))', fontFamily: "'Lora', Georgia, serif" }}
              >
                One story.
              </span>
            </h2>
          </div>
        </div>

        {/* ── Dual Panel Layout ── */}
        <div className="grid lg:grid-cols-[1fr_2px_1fr] gap-0 lg:gap-0 items-start">

          {/* ── PLAYER ── */}
          <div ref={playerRef} style={{ opacity: 0 }} className="pb-12 lg:pb-0 lg:pr-12">
            {/* Role label */}
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                style={{ background: 'hsl(var(--primary)/0.12)', border: '1.5px solid hsl(var(--primary)/0.25)' }}
              >
                🏀
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase font-bold" style={{ color: 'hsl(var(--primary))', fontFamily: "'DM Mono', monospace" }}>
                  Role 01
                </p>
                <h3
                  className="text-2xl font-bold leading-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'hsl(var(--foreground))' }}
                >
                  The Player
                </h3>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-2 mb-8 p-4 rounded-2xl"
              style={{ background: 'hsl(var(--muted)/0.5)', border: '1px solid hsl(var(--border))' }}>
              {playerStats.map((s, i) => (
                <div
                  key={i}
                  ref={(el) => { statsRefs.current[i] = el; }}
                  className="text-center"
                  style={{ opacity: 0 }}
                >
                  <div
                    className="text-xl sm:text-2xl font-bold"
                    style={{ color: 'hsl(var(--primary))', fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="text-[10px] mt-0.5 leading-tight"
                    style={{ color: 'hsl(var(--muted-foreground))', fontFamily: "'DM Mono', monospace" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Bio */}
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: 'hsl(var(--muted-foreground))', fontFamily: "'Lora', Georgia, serif" }}
            >
              With nearly two decades of professional basketball, I've competed at the highest levels across Jordan and the wider region. My career has been defined by an relentless drive to win, adapt, and lead — earning championships while earning the trust of teammates and coaches alike.
            </p>

            {/* Trait list */}
            <ul className="space-y-3">
              {playerTraits.map((t, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 group/trait"
                >
                  <div
                    className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 transition-transform duration-300 group-hover/trait:scale-150"
                    style={{ background: 'hsl(var(--primary))' }}
                  />
                  <div>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: 'hsl(var(--foreground))', fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {t.label}
                    </span>
                    <span className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      {' '}— {t.detail}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Divider ── */}
          <div
            ref={dividerRef}
            className="hidden lg:block w-px mx-auto"
            style={{
              height: '100%',
              minHeight: '480px',
              background: 'linear-gradient(to bottom, transparent, hsl(var(--primary)/0.4) 20%, hsl(var(--border)) 50%, hsl(var(--accent)/0.4) 80%, transparent)',
            }}
          />

          {/* Mobile divider */}
          <div className="lg:hidden h-px w-full my-12"
            style={{ background: 'linear-gradient(to right, transparent, hsl(var(--border)), transparent)' }} />

          {/* ── COACH ── */}
          <div ref={coachRef} style={{ opacity: 0 }} className="pt-0 lg:pt-0 lg:pl-12">
            {/* Role label */}
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                style={{ background: 'hsl(var(--accent)/0.12)', border: '1.5px solid hsl(var(--accent)/0.25)' }}
              >
                📋
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase font-bold" style={{ color: 'hsl(var(--accent))', fontFamily: "'DM Mono', monospace" }}>
                  Role 02
                </p>
                <h3
                  className="text-2xl font-bold leading-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'hsl(var(--foreground))' }}
                >
                  The Coach
                </h3>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-2 mb-8 p-4 rounded-2xl"
              style={{ background: 'hsl(var(--muted)/0.5)', border: '1px solid hsl(var(--border))' }}>
              {coachStats.map((s, i) => (
                <div
                  key={i}
                  ref={(el) => { statsRefs.current[i + 4] = el; }}
                  className="text-center"
                  style={{ opacity: 0 }}
                >
                  <div
                    className="text-xl sm:text-2xl font-bold"
                    style={{ color: 'hsl(var(--accent))', fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="text-[10px] mt-0.5 leading-tight"
                    style={{ color: 'hsl(var(--muted-foreground))', fontFamily: "'DM Mono', monospace" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Bio */}
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: 'hsl(var(--muted-foreground))', fontFamily: "'Lora', Georgia, serif" }}
            >
              Coaching is more than drawing plays on a whiteboard — it's about seeing what a player can become before they see it themselves. Over 11+ seasons I've worked with youth academies, club teams, and professional rosters, building cultures of discipline, trust, and relentless improvement.
            </p>

            {/* Trait list */}
            <ul className="space-y-3">
              {coachTraits.map((t, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 group/trait"
                >
                  <div
                    className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 transition-transform duration-300 group-hover/trait:scale-150"
                    style={{ background: 'hsl(var(--accent))' }}
                  />
                  <div>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: 'hsl(var(--foreground))', fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {t.label}
                    </span>
                    <span className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      {' '}— {t.detail}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Quote ── */}
        <div ref={quoteRef} style={{ opacity: 0 }} className="mt-24 lg:mt-32 relative">
          {/* Big decorative quote mark */}
          <div
            className="absolute -top-8 left-0 text-8xl sm:text-9xl leading-none pointer-events-none select-none"
            style={{ color: 'hsl(var(--primary)/0.08)', fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            "
          </div>

          <div className="relative text-center max-w-3xl mx-auto px-8">
            <blockquote
              className="text-xl sm:text-2xl lg:text-3xl leading-snug mb-6"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: 'italic',
                color: 'hsl(var(--foreground)/0.8)',
              }}
            >
              Basketball is more than a game — it's a journey of discipline, teamwork, and constant growth.
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12" style={{ background: 'hsl(var(--primary)/0.4)' }} />
              <p
                className="text-sm font-bold tracking-wider"
                style={{ color: 'hsl(var(--primary))', fontFamily: "'DM Mono', monospace" }}
              >
                Ibrahim Alnaser
              </p>
              <div className="h-px w-12" style={{ background: 'hsl(var(--primary)/0.4)' }} />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}