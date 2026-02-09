import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar, Users, Award, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const coachingTeams = [
  {
    name: 'Jordan National Youth Team',
    role: 'Assistant Coach',
    location: 'Amman, Jordan',
    period: '2020 - Present',
    ageGroup: 'U-18',
    achievements: [
      'Qualified for Arab Youth Championship (2022, 2024)',
      'Developed 15+ players who advanced to senior teams',
      'Implemented modern training methodologies',
      'Bronze medal at regional tournament 2023',
    ],
    stats: {
      players: '25+',
      wins: '65%',
      tournaments: '8',
    },
  },
  {
    name: 'Orthodox Club',
    role: 'Head Coach',
    location: 'Amman, Jordan',
    period: '2017 - 2020',
    ageGroup: 'Senior Team',
    achievements: [
      'Led team to First Division championship (2019)',
      'Promoted to Premier League',
      'Improved team performance by 40%',
      'Coach of the Year nominee (2019)',
    ],
    stats: {
      players: '18',
      wins: '68%',
      tournaments: '12',
    },
  },
  {
    name: 'Al-Ahli Basketball Academy',
    role: 'Youth Coach',
    location: 'Irbid, Jordan',
    period: '2015 - 2017',
    ageGroup: 'U-16',
    achievements: [
      'Built successful youth development program',
      'Regional youth championship winners (2016)',
      '20+ players promoted to senior teams',
      'Focus on fundamental skills and discipline',
    ],
    stats: {
      players: '40+',
      wins: '62%',
      tournaments: '15',
    },
  },
  {
    name: 'Community Basketball Programs',
    role: 'Volunteer Coach & Mentor',
    location: 'Various, Jordan',
    period: '2013 - Present',
    ageGroup: 'All Ages',
    achievements: [
      'Provided free coaching to underprivileged youth',
      'Organized community basketball camps',
      'Mentored 100+ young players',
      'Promoted basketball as tool for development',
    ],
    stats: {
      players: '100+',
      wins: 'N/A',
      tournaments: '20+',
    },
  },
];

export default function ClubsCoaching() {
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
                { opacity: 0, y: 50, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', delay: i * 0.1 }
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
      id="clubs-coaching"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-white dark:bg-brand-black overflow-hidden transition-colors"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.01]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30m-20 0a20 20 0 1 0 40 0a20 20 0 1 0 -40 0' stroke='%23ff6b35' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 
            ref={headlineRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6"
          >
            Coaching <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-brand-yellow">Experience</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Building champions through mentorship, strategy, and dedication
          </p>
        </div>

        {/* Coaching Positions Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 mb-16">
          {coachingTeams.map((team, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-accent/5 to-brand-yellow/5 dark:from-accent/10 dark:to-brand-yellow/10 rounded-2xl p-6 lg:p-8 border-2 border-accent/20 hover:border-accent/40 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/20 h-full">
                
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl lg:text-3xl font-serif font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {team.name}
                    </h3>
                    <div className="flex items-center gap-2 text-accent font-semibold mb-1">
                      <Users className="w-4 h-4" />
                      <span>{team.role}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        {team.ageGroup}
                      </span>
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-accent to-brand-yellow rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Location & Period */}
                <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span>{team.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-yellow" />
                    <span>{team.period}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-white/60 dark:bg-brand-dark-gray/60 rounded-xl border border-border">
                  <div className="text-center">
                    <div className="text-xl font-bold text-accent">{team.stats.players}</div>
                    <div className="text-xs text-muted-foreground">Players</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-brand-yellow">{team.stats.wins}</div>
                    <div className="text-xs text-muted-foreground">Win Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">{team.stats.tournaments}</div>
                    <div className="text-xs text-muted-foreground">Events</div>
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-accent" />
                    Achievements
                  </h4>
                  <ul className="space-y-2">
                    {team.achievements.map((achievement, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent/10 to-transparent rounded-tr-2xl pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Coaching Philosophy */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-r from-accent/10 via-brand-yellow/10 to-primary/10 dark:from-accent/20 dark:via-brand-yellow/20 dark:to-primary/20 rounded-3xl p-8 lg:p-12 border-2 border-accent/20">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-accent to-brand-yellow rounded-2xl flex items-center justify-center shadow-lg">
              <Users className="w-7 h-7 text-white" />
            </div>
            
            <h3 className="text-2xl lg:text-3xl font-serif font-bold text-center text-foreground mb-6 pt-4">
              Coaching Philosophy
            </h3>
            
            <p className="text-lg text-muted-foreground text-center leading-relaxed mb-4">
              My coaching approach centers on three pillars: <span className="text-accent font-semibold">technical excellence</span>, 
              <span className="text-brand-yellow font-semibold"> mental resilience</span>, and 
              <span className="text-primary font-semibold"> character development</span>. I believe every player has unique potential that can be unlocked through personalized guidance and unwavering support.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 bg-white/50 dark:bg-brand-dark-gray/50 rounded-xl">
                <div className="text-3xl font-bold text-accent mb-2">200+</div>
                <div className="text-sm text-muted-foreground">Players Coached</div>
              </div>
              <div className="text-center p-4 bg-white/50 dark:bg-brand-dark-gray/50 rounded-xl">
                <div className="text-3xl font-bold text-brand-yellow mb-2">8+</div>
                <div className="text-sm text-muted-foreground">Championships</div>
              </div>
              <div className="text-center p-4 bg-white/50 dark:bg-brand-dark-gray/50 rounded-xl">
                <div className="text-3xl font-bold text-primary mb-2">11+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 text-accent/5 dark:text-accent/10">
        <Users className="w-32 h-32 animate-float" />
      </div>
      <div className="absolute bottom-20 left-10 text-brand-yellow/5 dark:text-brand-yellow/10">
        <Award className="w-28 h-28 animate-float" style={{ animationDelay: '1s' }} />
      </div>
    </section>
  );
}
