import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Users, Award, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Profile image entrance
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.5, rotate: -10 },
        { opacity: 1, scale: 1, rotate: 0, duration: 1.2, ease: 'elastic.out(1, 0.6)' }
      );

      // Name entrance
      tl.fromTo(
        nameRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );

      // Stats stagger
      tl.fromTo(
        statsRef.current?.children || [],
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.5)', stagger: 0.1 },
        '-=0.4'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-brand-light-bg to-brand-cream dark:from-brand-black dark:via-brand-dark-gray dark:to-black transition-colors"
    >
      {/* Basketball Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-brand-yellow/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-10">
          
          {/* Profile Image - Centered Round */}
          <div
            ref={imageRef}
            className="relative group"
          >
            {/* Animated rings around image */}
            <div className="absolute inset-0 -m-2 rounded-full bg-gradient-to-tr from-primary via-accent to-brand-yellow opacity-75 blur-md group-hover:blur-lg transition-all duration-500 animate-pulse" />
            <div className="absolute inset-0 -m-4 rounded-full border-2 border-primary/30 animate-spin-slow" style={{ animationDuration: '20s' }} />
            <div className="absolute inset-0 -m-8 rounded-full border border-accent/20 animate-spin-slow" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
            
            {/* Image container */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-white dark:border-brand-dark-gray shadow-2xl shadow-primary/30">
              <img
                src="/profile_pic.jpeg"
                alt="Ibrahim Alnaser Basketball Player & Coach"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Jersey Number Badge */}
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-brand-dark-gray group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl font-bold text-white">#15</span>
            </div>
          </div>

          {/* Name */}
          <div className="text-center space-y-3">
            <h1
              ref={nameRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-brand-yellow">
                Ibrahim Alnaser
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium">
              Professional Basketball Player & Coach
            </p>
          </div>

          {/* Career Stats */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full max-w-4xl"
          >
            {[
              { icon: Trophy, number: '19+', label: 'Years Playing', color: 'from-primary to-accent' },
              { icon: Users, number: '11+', label: 'Years Coaching', color: 'from-accent to-brand-yellow' },
              { icon: Award, number: '15+', label: 'Championships', color: 'from-brand-yellow to-primary' },
              { icon: Trophy, number: '500+', label: 'Games Played', color: 'from-primary to-accent' },
            ].map((stat, i) => (
              <div
                key={i}
                className="relative group p-6 rounded-2xl bg-white/80 dark:bg-brand-dark-gray/80 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20"
              >
                {/* Background gradient effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative z-10 flex flex-col items-center space-y-2">
                  <stat.icon className="w-8 h-8 text-primary mb-1 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary to-accent">
                    {stat.number}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground font-medium text-center">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="pt-6">
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, '#about')}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full overflow-hidden hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">Explore My Journey</span>
              <ChevronDown className="w-5 h-5 relative z-10 group-hover:translate-y-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-8 animate-bounce">
            <ChevronDown className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-primary/20 rounded-tl-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-primary/20 rounded-br-3xl" />
      
      {/* Basketball icon decorations */}
      <div className="absolute top-10 right-10 text-primary/10 dark:text-primary/5">
        <Trophy className="w-24 h-24 animate-float" />
      </div>
      <div className="absolute bottom-10 left-10 text-accent/10 dark:text-accent/5">
        <Award className="w-20 h-20 animate-float" style={{ animationDelay: '1s' }} />
      </div>
    </section>
  );
}
