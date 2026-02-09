import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar, Trophy, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const clubs = [
  {
    name: 'Shabab Al-Hussein',
    position: 'Center / Power Forward',
    location: 'Amman, Jordan',
    period: '2018 - Present',
    league: 'Jordan Basketball Federation - Premier League',
    achievements: [
      'Led team to 3 championship victories',
      'Top scorer in 2020 season',
      'Selected for All-Star team 4 consecutive years',
      'Team captain since 2021',
    ],
    stats: {
      games: '150+',
      ppg: '18.5',
      rpg: '9.2',
    },
  },
  {
    name: 'Orthodox Club',
    position: 'Power Forward',
    location: 'Amman, Jordan',
    period: '2015 - 2018',
    league: 'Jordan Basketball Federation - First Division',
    achievements: [
      'Helped secure promotion to Premier League',
      'Division MVP in 2017 season',
      'Led team in rebounds and blocks',
      'Consistent double-double performer',
    ],
    stats: {
      games: '120+',
      ppg: '16.8',
      rpg: '10.5',
    },
  },
  {
    name: 'Al-Ahli Club',
    position: 'Forward',
    location: 'Irbid, Jordan',
    period: '2010 - 2015',
    league: 'Jordan Basketball Federation',
    achievements: [
      'Regional championship winner (2012)',
      'Rising star award recipient',
      'Team\'s leading scorer in 2014',
      'Selected for national youth team',
    ],
    stats: {
      games: '140+',
      ppg: '14.2',
      rpg: '7.8',
    },
  },
  {
    name: 'Youth Development',
    position: 'Various Positions',
    location: 'Amman, Jordan',
    period: '2005 - 2010',
    league: 'Youth Basketball League',
    achievements: [
      'Multiple youth tournament championships',
      'Developed fundamental skills and game IQ',
      'Selected for regional all-star teams',
      'Foundation for professional career',
    ],
    stats: {
      games: '90+',
      ppg: '12.5',
      rpg: '6.3',
    },
  },
];

export default function ClubsPlayed() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      // Cards stagger animation
      cardsRef.current.forEach((card, i) => {
        if (card) {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 85%',
            onEnter: () => {
              gsap.fromTo(
                card,
                { opacity: 0, x: i % 2 === 0 ? -50 : 50, rotateY: i % 2 === 0 ? -5 : 5 },
                { opacity: 1, x: 0, rotateY: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.1 }
              );
            },
            once: true
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="clubs-played"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-br from-brand-light-bg to-brand-cream dark:from-brand-dark-gray dark:to-brand-black overflow-hidden transition-colors"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 50px, hsl(var(--primary)) 50px, hsl(var(--primary)) 51px)',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 
            ref={headlineRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6"
          >
            Clubs <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">I've Played For</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A journey through competitive basketball across Jordan's premier leagues
          </p>
        </div>

        {/* Summary Stats */}
        <div className="mb-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white dark:bg-brand-dark-gray rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-sm text-muted-foreground">Total Games</div>
          </div>
          <div className="text-center p-6 bg-white dark:bg-brand-dark-gray rounded-xl border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg">
            <div className="text-3xl lg:text-4xl font-bold text-accent mb-2">15+</div>
            <div className="text-sm text-muted-foreground">Championships</div>
          </div>
          <div className="text-center p-6 bg-white dark:bg-brand-dark-gray rounded-xl border border-border hover:border-brand-yellow/50 transition-all duration-300 hover:shadow-lg">
            <div className="text-3xl lg:text-4xl font-bold text-brand-yellow mb-2">16.8</div>
            <div className="text-sm text-muted-foreground">Avg PPG</div>
          </div>
          <div className="text-center p-6 bg-white dark:bg-brand-dark-gray rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">8.5</div>
            <div className="text-sm text-muted-foreground">Avg RPG</div>
          </div>
        </div>

        {/* Timeline of Clubs */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-accent to-brand-yellow" />

          {/* Clubs Cards */}
          <div className="space-y-12 lg:space-y-16">
            {clubs.map((club, i) => (
              <div
                key={i}
                ref={(el) => { cardsRef.current[i] = el; }}
                className={`relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  i % 2 === 0 ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot (Hidden on mobile) */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-full border-4 border-white dark:border-brand-black shadow-lg z-10" />

                {/* Card */}
                <div className={`${i % 2 === 0 ? 'lg:col-start-1' : 'lg:col-start-2'}`}>
                  <div className="group relative bg-white dark:bg-brand-dark-gray rounded-2xl p-6 lg:p-8 border-2 border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2">
                    
                    {/* Club Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl lg:text-3xl font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {club.name}
                        </h3>
                        <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                          <Trophy className="w-4 h-4" />
                          <span>{club.position}</span>
                        </div>
                        <p className="text-sm text-muted-foreground italic">{club.league}</p>
                      </div>
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Trophy className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{club.stats.games}</div>
                        <div className="text-xs text-muted-foreground">Games</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent">{club.stats.ppg}</div>
                        <div className="text-xs text-muted-foreground">PPG</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-brand-yellow">{club.stats.rpg}</div>
                        <div className="text-xs text-muted-foreground">RPG</div>
                      </div>
                    </div>

                    {/* Location & Period */}
                    <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{club.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-accent" />
                        <span>{club.period}</span>
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {club.achievements.map((achievement, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Hover gradient effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className={`hidden lg:block ${i % 2 === 0 ? 'lg:col-start-2' : 'lg:col-start-1'}`} />
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}
