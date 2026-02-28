import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: '/gallery1.jpeg', alt: 'Playing', category: 'Playing' },
  { src: '/gallery2.jpeg', alt: 'Playing', category: 'Playing' },
  { src: '/gallery3.jpeg', alt: 'Championship Victory', category: 'Achievements' },
  { src: '/profile_pic.jpeg', alt: 'Playing', category: 'Playing' },
  { src: '/gallery4.jpeg', alt: 'Playing', category: 'Playing' },
  { src: '/gallery5.jpeg', alt: 'Coaching', category: 'Coaching' },
  { src: '/gallery6.jpeg', alt: 'Coaching', category: 'Coaching' },
  { src: '/gallery7.jpeg', alt: 'Coaching', category: 'Coaching' },
  { src: '/gallery8.jpeg', alt: 'Playing', category: 'Playing' },
  { src: '/gallery9.jpeg', alt: 'Playing', category: 'Playing' },
  { src: '/gallery10.jpeg', alt: 'Playing', category: 'Playing' },
  { src: '/gallery11.jpeg', alt: 'Playing', category: 'Playing' },
  { src: '/gallery12.jpeg', alt: 'Playing', category: 'Playing' },
  { src: '/gallery13.jpeg', alt: 'Playing', category: 'Playing' },
  { src: '/gallery14.jpeg', alt: 'Playing', category: 'Playing' },
  { src: '/gallery15.jpeg', alt: 'Playing', category: 'Playing' },
  { src: '/gallery16.jpeg', alt: 'Coaching', category: 'Coaching' },
  { src: '/gallery17.jpeg', alt: 'Playing', category: 'Playing' },
  { src: '/gallery18.jpeg', alt: 'Playing', category: 'Playing' },
  { src: '/gallery19.jpeg', alt: 'Coaching', category: 'Coaching' },
  { src: '/gallery20.jpeg', alt: 'Coaching', category: 'Coaching' },
  { src: '/gallery21.jpeg', alt: 'Coaching', category: 'Coaching' },
  { src: '/gallery22.jpeg', alt: 'Coaching', category: 'Coaching' },
];

const CATEGORIES = ['All', 'Playing', 'Coaching', 'Achievements'];

// Lightbox Component
function Lightbox({
  image,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  image: (typeof galleryImages)[0];
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.95)' }}
      onClick={onClose}
    >
      {/* Counter */}
      <div
        className="absolute top-6 left-1/2 -translate-x-1/2 text-white/50 font-mono text-sm tracking-widest"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-6 text-white/60 hover:text-white transition-colors text-3xl leading-none z-10"
        aria-label="Close"
      >
        ×
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 sm:left-8 text-white/50 hover:text-white transition-all text-4xl leading-none z-10 hover:scale-110"
        aria-label="Previous"
      >
        ‹
      </button>

      {/* Image */}
      <div
        className="relative max-w-[90vw] max-h-[85vh] mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
          style={{ boxShadow: '0 0 80px rgba(0,0,0,0.8)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent rounded-b-lg">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-1"
            style={{ background: 'hsl(var(--primary))', color: 'white', fontFamily: "'DM Mono', monospace" }}
          >
            {image.category}
          </span>
          <p className="text-white font-medium">{image.alt}</p>
        </div>
      </div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 sm:right-8 text-white/50 hover:text-white transition-all text-4xl leading-none z-10 hover:scale-110"
        aria-label="Next"
      >
        ›
      </button>
    </div>
  );
}

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeFilter === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeFilter);

  // Animate items in when filter changes
  useEffect(() => {
    imagesRef.current.forEach((el) => {
      if (el) {
        gsap.set(el, { opacity: 0, y: 20 });
      }
    });
    const timeout = setTimeout(() => {
      imagesRef.current.forEach((el, i) => {
        if (el) {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
            delay: i * 0.04,
          });
        }
      });
    }, 30);
    return () => clearTimeout(timeout);
  }, [activeFilter]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : 0));
  const nextImage = () => setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : 0));

  return (
    <>
      <section
        id="gallery"
        ref={sectionRef}
        className="relative py-24 lg:py-36 overflow-hidden"
        style={{ background: 'hsl(var(--background))' }}
      >
        {/* Noise texture overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />

        {/* Top accent line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px"
          style={{
            height: '80px',
            background: 'linear-gradient(to bottom, transparent, hsl(var(--primary)/0.5))',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative">

          {/* ── Header ── */}
          <div ref={headlineRef} className="mb-16 lg:mb-20">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="h-px flex-1 max-w-[60px]"
                style={{ background: 'hsl(var(--primary)/0.4)' }}
              />
              <span
                className="text-xs font-bold tracking-[0.25em] uppercase"
                style={{
                  color: 'hsl(var(--primary))',
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                Visual Archive
              </span>
            </div>

            {/* Main headline */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <h2
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tight"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: 'hsl(var(--foreground))',
                }}
              >
                The
                <br />
                <span
                  style={{
                    WebkitTextStroke: '2px hsl(var(--primary))',
                    color: 'transparent',
                  }}
                >
                  Gallery
                </span>
              </h2>
              <p
                className="text-sm sm:text-base max-w-xs leading-relaxed"
                style={{ color: 'hsl(var(--muted-foreground))' }}
              >
                Moments from the court — player achievements, coaching highlights, and victories worth remembering.
              </p>
            </div>
          </div>

          {/* ── Filter Tabs ── */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  background:
                    activeFilter === cat
                      ? 'hsl(var(--primary))'
                      : 'hsl(var(--muted))',
                  color:
                    activeFilter === cat
                      ? 'white'
                      : 'hsl(var(--muted-foreground))',
                  border: activeFilter === cat
                    ? '1.5px solid hsl(var(--primary))'
                    : '1.5px solid hsl(var(--border))',
                  transform: activeFilter === cat ? 'scale(1.04)' : 'scale(1)',
                }}
              >
                {cat}
                {activeFilter === cat && (
                  <span
                    className="ml-2 text-xs opacity-70 font-normal"
                  >
                    {filtered.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* ── Responsive Grid ── */}
          <div
            className="grid gap-3 sm:gap-4"
            style={{
              gridTemplateColumns: 'repeat(2, 1fr)',
            }}
          >
            {/* Mobile: simple 2-col uniform grid */}
            <style>{`
              @media (min-width: 640px) {
                .gallery-grid {
                  grid-template-columns: repeat(4, 1fr) !important;
                }
              }
              @media (max-width: 639px) {
                .gallery-grid .feature-card {
                  grid-column: span 1 !important;
                  grid-row: span 1 !important;
                }
                .gallery-grid .wide-card {
                  grid-column: span 2 !important;
                  grid-row: span 1 !important;
                }
              }
            `}</style>
            <div
              className="gallery-grid col-span-2 grid gap-3 sm:gap-4"
              style={{
                gridTemplateColumns: 'repeat(2, 1fr)',
              }}
            >
              {filtered.map((image, i) => {
                const mod = i % 7;
                const spanClass =
                  mod === 0
                    ? 'feature-card sm:col-span-2 sm:row-span-2'
                    : mod === 3
                    ? 'wide-card sm:col-span-2'
                    : 'col-span-1';

                const heightStyle =
                  mod === 0
                    ? { height: 'clamp(240px, 36vw, 480px)' }
                    : mod === 3
                    ? { height: 'clamp(160px, 18vw, 260px)' }
                    : mod === 2 || mod === 5
                    ? { height: 'clamp(180px, 22vw, 320px)' }
                    : { height: 'clamp(160px, 18vw, 260px)' };

                return (
                  <div
                    key={`${activeFilter}-${i}`}
                    ref={(el) => { imagesRef.current[i] = el; }}
                    className={`relative overflow-hidden rounded-2xl cursor-pointer group ${spanClass}`}
                    style={{
                      ...heightStyle,
                      opacity: 0,
                      background: 'hsl(var(--muted))',
                    }}
                    onClick={() => openLightbox(i)}
                  >
                    <GalleryCardInner image={image} index={i} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Count indicator ── */}
          <div
            className="mt-10 flex items-center justify-center gap-3"
            style={{ color: 'hsl(var(--muted-foreground))' }}
          >
            <div className="h-px w-12" style={{ background: 'hsl(var(--border))' }} />
            <span
              className="text-xs tracking-widest uppercase"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {filtered.length} images
            </span>
            <div className="h-px w-12" style={{ background: 'hsl(var(--border))' }} />
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <Lightbox
          image={filtered[lightboxIndex]}
          index={lightboxIndex}
          total={filtered.length}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  );
}

// Inner card content extracted to avoid ref conflicts
function GalleryCardInner({ image, index }: { image: (typeof galleryImages)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="w-full h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700"
        style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
      />

      {/* Gradient */}
      <div
        className="absolute inset-0 transition-opacity duration-400"
        style={{
          background: 'linear-gradient(160deg, transparent 30%, rgba(0,0,0,0.75) 100%)',
          opacity: hovered ? 1 : 0.35,
        }}
      />

      {/* Category */}
      <div
        className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-[10px] font-bold tracking-wider uppercase"
        style={{
          background: 'hsl(var(--primary)/0.85)',
          backdropFilter: 'blur(8px)',
          fontFamily: "'DM Mono', monospace",
        }}
      >
        {image.category}
      </div>

      {/* Index badge */}
      <div
        className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-[10px]"
        style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: 'rgba(255,255,255,0.7)',
          fontFamily: "'DM Mono', monospace",
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Caption */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4 transition-all duration-400"
        style={{
          transform: hovered ? 'translateY(0)' : 'translateY(12px)',
          opacity: hovered ? 1 : 0,
        }}
      >
        <p className="text-white font-semibold text-sm leading-snug">{image.alt}</p>
        <p
          className="text-white/40 text-xs mt-0.5"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          click to expand
        </p>
      </div>

      {/* Expand icon */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(6px)',
            border: '1.5px solid rgba(255,255,255,0.3)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2h5M2 2v5M14 14h-5M14 14v-5M2 2l5 5M14 14l-5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}