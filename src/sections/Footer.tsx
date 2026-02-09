import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Mail, Phone, Trophy } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Playing Career', href: '#clubs-played' },
  { label: 'Coaching', href: '#clubs-coaching' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Phone, label: 'Phone', href: 'tel:+962798097308' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/ibrahim_alnaser.15' },
  { icon: Mail, label: 'Email', href: 'mailto:ibrahim.alnaser@gmail.com' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTriggers: ScrollTrigger[] = [];

      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: footerRef.current,
          start: 'top 90%',
          onEnter: () => {
            gsap.fromTo(
              contentRef.current,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
            );
          },
          once: true
        })
      );

      return () => {
        scrollTriggers.forEach(st => st.kill());
      };
    }, footerRef);

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
    <footer
      ref={footerRef}
      className="relative py-12 bg-card border-t border-border transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={contentRef} className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-6 h-6 text-primary" />
              <span className="text-xl font-serif font-bold text-foreground">Ibrahim Alnaser</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Professional basketball player and certified coach dedicated to excellence on and off the court.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="w-10 h-10 rounded-full bg-secondary hover:bg-primary/10 flex items-center justify-center hover:text-primary transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Ibrahim Alnaser. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Professional Basketball Player & Coach | <span className="hidden sm:inline">Based in Amman, Jordan</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
