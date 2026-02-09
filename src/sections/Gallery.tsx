import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Image as ImageIcon, ZoomIn } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Placeholder images - will be replaced with actual photos
const galleryImages = [
  {
    src: '/placeholder-gallery.svg',
    alt: 'Basketball Game Action 1',
    category: 'Playing',
  },
  {
    src: '/placeholder-gallery.svg',
    alt: 'Coaching Session 1',
    category: 'Coaching',
  },
  {
    src: '/placeholder-gallery.svg',
    alt: 'Championship Victory',
    category: 'Achievements',
  },
  {
    src: '/placeholder-gallery.svg',
    alt: 'Team Photo 1',
    category: 'Playing',
  },
  {
    src: '/placeholder-gallery.svg',
    alt: 'Training Session',
    category: 'Coaching',
  },
  {
    src: '/placeholder-gallery.svg',
    alt: 'Award Ceremony',
    category: 'Achievements',
  },
  {
    src: '/placeholder-gallery.svg',
    alt: 'Basketball Game Action 2',
    category: 'Playing',
  },
  {
    src: '/placeholder-gallery.svg',
    alt: 'Youth Development',
    category: 'Coaching',
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

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

      // Images stagger animation
      imagesRef.current.forEach((image, i) => {
        if (image) {
          ScrollTrigger.create({
            trigger: image,
            start: 'top 90%',
            onEnter: () => {
              gsap.fromTo(
                image,
                { opacity: 0, scale: 0.8, y: 30 },
                { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: (i % 4) * 0.1 }
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
      id="gallery"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-br from-brand-light-bg to-white dark:from-brand-dark-gray dark:to-brand-black overflow-hidden transition-colors"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.01]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(30deg, hsl(var(--primary)) 12%, transparent 12.5%, transparent 87%, hsl(var(--primary)) 87.5%, hsl(var(--primary))), linear-gradient(150deg, hsl(var(--primary)) 12%, transparent 12.5%, transparent 87%, hsl(var(--primary)) 87.5%, hsl(var(--primary)))',
          backgroundSize: '80px 140px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 
            ref={headlineRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-brand-yellow">Gallery</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Moments captured from the court - player achievements, coaching highlights, and memorable victories
          </p>
        </div>

        {/* Gallery Grid - Masonry Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryImages.map((image, i) => (
            <div
              key={i}
              ref={(el) => { imagesRef.current[i] = el; }}
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-brand-dark-gray border-2 border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer"
              style={{
                // Varying heights for masonry effect
                height: i % 5 === 0 ? '320px' : i % 3 === 0 ? '280px' : '240px',
              }}
            >
              {/* Image */}
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-primary/90 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
                  {image.category}
                </div>

                {/* Zoom Icon */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100">
                  <ZoomIn className="w-7 h-7 text-white" />
                </div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white font-medium text-sm">{image.alt}</p>
                </div>
              </div>

              {/* Decorative corner gradient */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-16 max-w-2xl mx-auto text-center">
          <div className="relative bg-gradient-to-r from-primary/10 via-accent/10 to-brand-yellow/10 dark:from-primary/20 dark:via-accent/20 dark:to-brand-yellow/20 rounded-2xl p-8 border-2 border-primary/20">
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
              <ImageIcon className="w-6 h-6 text-white" />
            </div>
            
            <p className="text-muted-foreground leading-relaxed pt-2">
              <span className="text-primary font-semibold">Note:</span> This gallery will be updated with actual photos showcasing my basketball journey. 
              Each image will tell a story of dedication, teamwork, and passion for the game.
            </p>
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 border-4 border-primary/10 rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-20 left-10 w-24 h-24 border-4 border-accent/10 rounded-full animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
    </section>
  );
}
