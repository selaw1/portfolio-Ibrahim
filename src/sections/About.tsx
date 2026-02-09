import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, Trophy, Target, Heart, Shield, Users, TrendingUp, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const coachRef = useRef<HTMLDivElement>(null);

  const playerHighlights = [
    { icon: Trophy, title: 'Championship Mindset', desc: 'Proven winner with multiple championships and tournament victories' },
    { icon: Target, title: 'Consistent Performer', desc: 'Known for clutch performances and leadership on the court' },
    { icon: Heart, title: 'Team Player', desc: 'Strong team chemistry builder and motivator' },
    { icon: Shield, title: 'Defensive Excellence', desc: 'Outstanding defensive skills and court awareness' },
  ];

  const coachHighlights = [
    { icon: Users, title: 'Player Development', desc: 'Expert in developing young talent and maximizing player potential' },
    { icon: TrendingUp, title: 'Strategic Planning', desc: 'Advanced tactical knowledge and game strategy expertise' },
    { icon: Award, title: 'Proven Success', desc: 'Track record of coaching teams to championships' },
    { icon: Heart, title: 'Mentorship', desc: 'Dedicated to building character both on and off the court' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline animation
      ScrollTrigger.create({
        trigger: headlineRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            headlineRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
          );
        },
        once: true
      });

      // Player section
      ScrollTrigger.create({
        trigger: playerRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.fromTo(
            playerRef.current,
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }
          );
        },
        once: true
      });

      // Coach section
      ScrollTrigger.create({
        trigger: coachRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.fromTo(
            coachRef.current,
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }
          );
        },
        once: true
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-white dark:bg-brand-black overflow-hidden transition-colors"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.01]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--primary)) 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 
            ref={headlineRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6"
          >
            My <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-brand-yellow">Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A dual passion for basketball - excelling as a player and inspiring as a coach
          </p>
        </div>

        {/* Split Design - Player & Coach */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* PLAYER SECTION */}
          <div 
            ref={playerRef}
            className="relative group flex"
          >
            {/* Card */}
            <div className="relative bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-3xl p-8 lg:p-10 border border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 w-full">{/* Content */}
              
              {/* Icon Badge */}
              <div className="absolute -top-6 left-8 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <User className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <div className="pt-6 space-y-6">
                <div>
                  <h3 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-2">
                    The Player
                  </h3>
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <Trophy className="w-5 h-5" />
                    <span>19+ Years on the Court</span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                  With nearly two decades of professional basketball experience, I've competed at the highest levels across Jordan and the region. My journey has been defined by dedication, perseverance, and an unwavering commitment to excellence.
                </p>

                {/* Highlights Grid */}
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  {playerHighlights.map((item, i) => (
                    <div 
                      key={i}
                      className="flex gap-3 p-4 rounded-xl bg-white/60 dark:bg-brand-dark-gray/60 border border-border hover:border-primary/50 transition-all duration-300 hover:translate-x-1"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm mb-1">
                          {item.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-primary">500+</div>
                    <div className="text-xs text-muted-foreground">Games</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-accent">15+</div>
                    <div className="text-xs text-muted-foreground">Titles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-brand-yellow">10+</div>
                    <div className="text-xs text-muted-foreground">Teams</div>
                  </div>
                </div>
              </div>

              {/* Decorative element */}
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary/10 to-transparent rounded-tl-full"></div>
            </div>
          </div>

          {/* COACH SECTION */}
          <div 
            ref={coachRef}
            className="relative group flex"
          >
            {/* Card */}
            <div className="relative bg-gradient-to-br from-accent/5 to-brand-yellow/5 dark:from-accent/10 dark:to-brand-yellow/10 rounded-3xl p-8 lg:p-10 border border-accent/20 hover:border-accent/40 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/20 w-full">{/* Content */}
              
              {/* Icon Badge */}
              <div className="absolute -top-6 left-8 w-16 h-16 bg-gradient-to-br from-accent to-brand-yellow rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <div className="pt-6 space-y-6">
                <div>
                  <h3 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-2">
                    The Coach
                  </h3>
                  <div className="flex items-center gap-2 text-accent font-semibold">
                    <Award className="w-5 h-5" />
                    <span>11+ Years Coaching Excellence</span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                  Coaching is more than teaching the game - it's about building character, instilling discipline, and unlocking potential. Over the past decade, I've mentored countless players, from youth leagues to competitive teams.
                </p>

                {/* Highlights Grid */}
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  {coachHighlights.map((item, i) => (
                    <div 
                      key={i}
                      className="flex gap-3 p-4 rounded-xl bg-white/60 dark:bg-brand-dark-gray/60 border border-border hover:border-accent/50 transition-all duration-300 hover:translate-x-1"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-brand-yellow flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm mb-1">
                          {item.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-accent">200+</div>
                    <div className="text-xs text-muted-foreground">Players</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-brand-yellow">8+</div>
                    <div className="text-xs text-muted-foreground">Championships</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-primary">5+</div>
                    <div className="text-xs text-muted-foreground">Teams</div>
                  </div>
                </div>
              </div>

              {/* Decorative element */}
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-accent/10 to-transparent rounded-tl-full"></div>
            </div>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="mt-16 lg:mt-20 text-center">
          <blockquote className="text-xl lg:text-2xl font-serif italic text-muted-foreground max-w-3xl mx-auto">
            "Basketball is more than a game - it's a journey of discipline, teamwork, and constant growth."
          </blockquote>
          <p className="mt-4 text-primary font-semibold">— Ibrahim Alnaser</p>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-10 right-10 w-20 h-20 border-r-2 border-t-2 border-primary/10 rounded-tr-3xl" />
      <div className="absolute bottom-10 left-10 w-20 h-20 border-l-2 border-b-2 border-accent/10 rounded-bl-3xl" />
    </section>
  );
}
