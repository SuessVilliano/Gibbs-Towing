
import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  MapPin,
  ChevronRight,
  Shield,
  Star,
  Award,
  Truck,
  Menu,
  X,
  Youtube,
  Clock,
  Sun,
  Moon,
  Globe,
  ChevronDown,
  ChevronUp,
  Camera,
  ExternalLink,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND, SERVICES, FAQS, FLEET_IMAGES } from './constants';
import TruckAnimation from './components/TruckAnimation';
import ChatBot from './components/ChatBot';
import FleetGallery from './components/FleetGallery';
import AdminPanel from './components/AdminPanel';
import { GalleryImage } from './types';

// Structured Data preserved for SEO Authority
const StructuredData = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoTowingService",
    "name": BRAND.name,
    "image": "https://images.unsplash.com/photo-1605218427368-35b0185e4d2e?q=80&w=1200",
    "telephone": BRAND.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2884 Martin Luther King Drive",
      "addressLocality": "Atlanta",
      "addressRegion": "GA",
      "postalCode": "30311",
      "addressCountry": "US"
    },
    "url": `https://${BRAND.website}`,
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "priceRange": "$$$",
    "description": "Enterprise heavy duty towing, load shifts, and commercial recovery logistics. Multi-state coverage.",
    "areaServed": ["Georgia", "Southeast US", "Nationwide Logistics"]
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
};

const FadeInSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const Nav: React.FC<{ darkMode: boolean; toggleTheme: () => void; onOpenGallery: () => void }> = ({ darkMode, toggleTheme, onOpenGallery }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const handleGalleryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onOpenGallery();
    setMobileOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled || mobileOpen ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-red-700 flex items-center justify-center rounded-sm shadow-md">
            <Truck className="text-white" size={24} />
          </div>
          <div className="flex flex-col">
            <span className={`font-brand font-black text-xl tracking-tighter italic leading-none ${scrolled || mobileOpen ? 'text-zinc-900 dark:text-white' : 'text-white'}`}>GIBBS</span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-red-600 -mt-1">Logistics & Recovery</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest items-center ${scrolled ? 'text-zinc-800 dark:text-zinc-200' : 'text-zinc-200'}`}
        >
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-red-600 transition-colors">Capability</a>
          <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="hover:text-red-600 transition-colors">Services</a>
          <button onClick={handleGalleryClick} className="hover:text-red-600 transition-colors flex items-center gap-1">Our Fleet</button>
          <a href="#locations" onClick={(e) => handleNavClick(e, 'locations')} className="hover:text-red-600 transition-colors">Coverage</a>
          <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')} className="hover:text-red-600 transition-colors">FAQ</a>

          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={`tel:${BRAND.phone}`}
            className="bg-red-700 hover:bg-red-800 px-6 py-3 rounded-full flex items-center gap-2 text-white transition-all shadow-red-900/20 shadow-lg"
          >
            <Phone size={14} /> Request Dispatch
          </motion.a>
        </motion.div>

        <div className="flex items-center gap-4 md:hidden">
          <button onClick={toggleTheme} className={`p-2 rounded-full ${scrolled || mobileOpen ? 'text-zinc-900 dark:text-white' : 'text-white'}`}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className={`transition-colors p-2 ${scrolled || mobileOpen ? 'text-zinc-900 dark:text-white' : 'text-white'}`}>
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Anchored Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-[64px] bg-black/40 backdrop-blur-sm z-[-1]"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-white/10 p-6 flex flex-col gap-6 shadow-2xl overflow-hidden rounded-b-2xl"
            >
              <div className="flex flex-col gap-1">
                <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-xl font-brand font-bold text-zinc-900 dark:text-white p-4 border-b border-zinc-100 dark:border-white/5 uppercase tracking-tighter italic hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">Operations Capability</a>
                <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="text-xl font-brand font-bold text-zinc-900 dark:text-white p-4 border-b border-zinc-100 dark:border-white/5 uppercase tracking-tighter italic hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">Portfolio of Services</a>
                <button onClick={handleGalleryClick} className="w-full text-left text-xl font-brand font-bold text-zinc-900 dark:text-white p-4 border-b border-zinc-100 dark:border-white/5 uppercase tracking-tighter italic hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors flex items-center justify-between">
                  <span>Our Heavy Fleet</span>
                  <Camera size={20} className="text-red-600" />
                </button>
                <a href="#locations" onClick={(e) => handleNavClick(e, 'locations')} className="text-xl font-brand font-bold text-zinc-900 dark:text-white p-4 border-b border-zinc-100 dark:border-white/5 uppercase tracking-tighter italic hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">Geographic Coverage</a>
                <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')} className="text-xl font-brand font-bold text-zinc-900 dark:text-white p-4 uppercase tracking-tighter italic hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">Operations FAQ</a>
              </div>

              <div className="space-y-4 pt-2">
                <a href={`tel:${BRAND.phone}`} className="bg-red-700 flex items-center justify-center gap-3 py-5 rounded-xl font-brand font-black text-xl text-white uppercase tracking-tight italic shadow-xl">
                  <Phone size={24} /> Dispatch Hotline
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HeroImage = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="absolute inset-0 z-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-800 overflow-hidden">
      {/* Actual Gibbs Truck - Positioned prominently */}
      <motion.img
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        src="/images/gibbs-hero-truck.png"
        alt="Gibbs Heavy-Duty Tow Truck"
        className={`absolute right-0 top-1/2 -translate-y-1/2 h-[70%] w-auto object-contain transition-opacity duration-1000 ${loaded ? 'opacity-90' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
      />
      {/* Dramatic lighting overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
      {/* Subtle grid pattern for depth */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(227, 27, 35, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(227, 27, 35, 0.3) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>
    </div>
  );
};

const Hero: React.FC<{ onOpenGallery: () => void }> = ({ onOpenGallery }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <HeroImage />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block border-l-4 border-red-700 pl-4 py-2 bg-white/5 backdrop-blur-md rounded-r-lg"
          >
            <p className="text-red-500 font-bold uppercase tracking-[0.4em] text-xs">Southeast Logistics & Recovery Operations</p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-brand font-black italic tracking-tighter leading-[0.9] uppercase text-white"
          >
            Built for Complex <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Jobs Anywhere</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-zinc-300 text-lg md:text-xl font-bold tracking-widest uppercase border-l-2 border-white/20 pl-6 py-2"
          >
            Multi-State • Long-Distance • Commercial • Load Shifts • Recovery • Logistics Support
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:row gap-6 pt-4"
          >
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={`tel:${BRAND.phone}`}
              className="bg-red-700 hover:bg-red-600 text-white px-10 py-5 rounded-sm font-brand font-black text-xl italic tracking-tight uppercase flex items-center justify-center gap-3 transition-colors shadow-2xl"
            >
              Request Dispatch
            </motion.a>
            <div className="flex flex-col justify-center">
              <span className="text-zinc-500 text-[10px] uppercase font-black tracking-widest">Headquarters: Georgia</span>
              <span className="text-white text-xs uppercase font-bold tracking-widest">Operating Nationwide</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white dark:bg-black relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
        <FadeInSection>
          <div className="relative group">
            <div className="aspect-video bg-zinc-900 rounded-sm overflow-hidden relative shadow-2xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1596525725091-64d50c60815e?q=80&w=800&auto=format&fit=crop"
                alt="Gibbs Heavy Logistics"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-3xl font-brand font-black uppercase italic tracking-tighter">Gibbs Standard</h3>
                <p className="text-xs uppercase tracking-[0.3em] text-red-600 font-bold">Enterprise Capability</p>
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 bg-zinc-900 border border-white/10 p-8 text-white hidden lg:block">
              <div className="text-5xl font-brand font-black text-red-600">24/7</div>
              <div className="text-[10px] uppercase font-bold tracking-widest">Global Logistics Support</div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-red-600 font-bold uppercase tracking-widest text-sm italic">Commercial Recovery Logistics</p>
              <h2 className="text-4xl md:text-6xl font-brand font-black italic uppercase text-zinc-900 dark:text-white leading-[0.9]">Southeast Authority <br /> <span className="text-gradient-red">National Reach</span></h2>
            </div>

            <div className="space-y-6 text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
              <p>
                Gibbs Towing & Recovery provides heavy-duty towing, recovery, and load-shift logistics for commercial clients across Georgia, the Southeast, and nationwide when the job requires it.
              </p>
              <p>
                Our team supports fleets, auctions, logistics providers, and infrastructure contracts with rapid response and scalable capability. We handle the scope, safety, and logistics that others cannot.
              </p>
            </div>

            <div className="flex items-center gap-10">
              <div className="flex flex-col">
                <span className="text-3xl font-brand font-black text-zinc-900 dark:text-white">HQ</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-red-600">GEORGIA</span>
              </div>
              <div className="h-10 w-px bg-zinc-200 dark:bg-zinc-800"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-brand font-black text-zinc-900 dark:text-white">OPS</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-red-600">NATIONWIDE</span>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

const Coverage: React.FC = () => (
  <section id="locations" className="py-24 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
    <div className="container mx-auto px-6">
      <FadeInSection>
        <div className="bg-zinc-900 rounded-sm p-12 md:p-20 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <Globe size={300} className="text-white" />
          </div>
          <div className="relative z-10 max-w-3xl space-y-8">
            <h2 className="text-4xl md:text-6xl font-brand font-black italic uppercase text-white leading-none">Service Coverage</h2>
            <p className="text-zinc-400 text-xl leading-relaxed">
              Headquartered in Georgia, Gibbs responds across the Southeast and supports long-distance, multi-state, and specialty recovery operations nationwide when the scope, safety, and logistics align.
            </p>
            <div className="flex flex-wrap gap-4">
              {["Georgia", "Florida", "Alabama", "Tennessee", "North Carolina", "South Carolina", "Mississippi", "Nationwide Contractual"].map((loc, i) => (
                <span key={i} className="px-4 py-2 border border-white/10 rounded-full text-zinc-500 text-xs font-bold uppercase tracking-widest">{loc}</span>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  </section>
);

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-white dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-6">
        <FadeInSection>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-4">
              <p className="text-red-600 font-bold uppercase tracking-widest text-sm">Operations Portfolio</p>
              <h2 className="text-4xl md:text-6xl font-brand font-black italic uppercase text-zinc-900 dark:text-white">Commercial <span className="text-zinc-400 dark:text-zinc-500">Logistics Response</span></h2>
            </div>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((s, i) => (
            <FadeInSection key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                className="group p-8 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 hover:border-red-600/50 transition-all duration-300 rounded-sm h-full flex flex-col"
              >
                <div className="text-red-600 mb-6">{s.icon}</div>
                <h3 className="text-xl font-brand font-bold uppercase mb-4 text-zinc-900 dark:text-white leading-tight">{s.name}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-8">{s.description}</p>
                <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-white/5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-600">Enterprise Standard Service</span>
                </div>
              </motion.div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (idx: number) => setOpenIndex(openIndex === idx ? null : idx);

  return (
    <section id="faq" className="py-24 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 border-t border-zinc-100 dark:border-white/5">
      <div className="container mx-auto px-6 max-w-4xl">
        <FadeInSection>
          <div className="text-center space-y-4 mb-16">
            <p className="text-red-600 font-bold uppercase tracking-widest text-sm">Contract Intelligence</p>
            <h2 className="text-4xl md:text-5xl font-brand font-black italic uppercase text-zinc-900 dark:text-white">Dispatch Operations</h2>
          </div>
        </FadeInSection>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <FadeInSection key={i} delay={i * 0.1}>
              <div className="border border-zinc-200 dark:border-white/10 rounded-sm overflow-hidden bg-white dark:bg-zinc-900 shadow-sm">
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <span className="font-bold text-zinc-900 dark:text-white text-lg pr-4">{faq.question}</span>
                  {openIndex === i ? <ChevronUp className="text-red-600 shrink-0" /> : <ChevronDown className="text-zinc-400 shrink-0" />}
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-200 dark:border-white/5 mt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2 space-y-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-red-700 flex items-center justify-center rounded-sm">
                <Truck className="text-white" size={20} />
              </div>
              <div className="flex flex-col">
                <span className="font-brand font-black text-2xl tracking-tighter italic leading-none text-zinc-900 dark:text-white">GIBBS</span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-red-600 -mt-0.5">Logistics & Recovery</span>
              </div>
            </div>
            <p className="text-zinc-600 dark:text-zinc-500 text-lg max-w-md leading-relaxed">
              Providing enterprise-grade heavy-duty recovery and logistics response 24/7 across the Southeast and Nationwide commercial corridors.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <a href={BRAND.socials.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-zinc-100 dark:bg-zinc-900 rounded-sm text-zinc-700 dark:text-white hover:text-red-600 transition-colors group border border-transparent hover:border-red-600/30">
                <Youtube size={24} />
                <span className="text-xs font-bold uppercase tracking-widest">Gibbs Media Channel</span>
              </a>
              <a href={BRAND.socials.googleReview} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-zinc-100 dark:bg-zinc-900 rounded-sm text-zinc-700 dark:text-white hover:border-yellow-500/50 transition-all border border-transparent group">
                <Star size={24} className="text-yellow-500 fill-yellow-500" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">Review Logistics</span>
                  <span className="text-xs font-brand font-bold uppercase">Google Profile</span>
                </div>
              </a>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="font-brand font-bold uppercase text-xs tracking-[0.3em] text-red-600">Command Center</h4>
            <div className="space-y-6 text-zinc-600 dark:text-zinc-400 text-sm">
              <p className="flex items-start gap-4"><MapPin size={20} className="text-zinc-400 shrink-0" /> {BRAND.address}</p>
              <p className="flex items-center gap-4 text-xl font-brand font-black text-zinc-900 dark:text-white"><Phone size={24} className="text-red-600 shrink-0" /> {BRAND.phone}</p>
              <p className="flex items-center gap-4 uppercase font-black text-xs tracking-widest bg-red-600/10 text-red-600 px-4 py-2 w-fit rounded-full"><Clock size={16} /> Dispatch Operational 24/7</p>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="font-brand font-bold uppercase text-xs tracking-[0.3em] text-red-600">Company Links</h4>
            <div className="flex flex-col gap-4 text-zinc-600 dark:text-zinc-400 text-sm font-bold uppercase tracking-widest">
              <a href="#about" className="hover:text-red-600 transition-colors">Operations Capability</a>
              <a href="#services" className="hover:text-red-600 transition-colors">Portfolio of Services</a>
              <a href="#locations" className="hover:text-red-600 transition-colors">Geographic Coverage</a>
              <a href={`tel:${BRAND.phone}`} className="hover:text-red-600 transition-colors">Request Dispatch</a>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-white/5 pt-12 text-center">
          <p className="text-zinc-500 dark:text-zinc-600 text-[10px] uppercase tracking-[0.4em] font-bold">
            © 2024 Gibbs Towing & Recovery Logistics. Enterprise Heavy Duty Support. Georgia Headquarters.
          </p>
        </div>
      </div>
      <TruckAnimation />
    </footer>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [fleetImages, setFleetImages] = useState<GalleryImage[]>(FLEET_IMAGES);

  // Check for admin URL on mount
  useEffect(() => {
    const checkAdminAccess = () => {
      if (window.location.pathname === '/admin-fleet-2024' || window.location.hash === '#admin-fleet-2024') {
        setAdminOpen(true);
      }
    };
    checkAdminAccess();

    // Listen for hash changes
    window.addEventListener('hashchange', checkAdminAccess);
    return () => window.removeEventListener('hashchange', checkAdminAccess);
  }, []);

  // Load fleet images from JSON file
  useEffect(() => {
    const loadFleetImages = async () => {
      try {
        const response = await fetch('/fleet-data.json');
        if (response.ok) {
          const data = await response.json();
          if (data.images && Array.isArray(data.images)) {
            setFleetImages(data.images);
          }
        }
      } catch (error) {
        console.log('Using default fleet images');
      }
    };
    loadFleetImages();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleUpdateFleetImages = (newImages: GalleryImage[]) => {
    setFleetImages(newImages);
    // In a real implementation, this would save to backend/file system
    // For now, we'll just update the state
    console.log('Fleet images updated:', newImages);
  };

  return (
    <div className={`min-h-screen selection:bg-red-700 selection:text-white transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-white'}`}>
      <StructuredData />
      <Nav darkMode={darkMode} toggleTheme={() => setDarkMode(!darkMode)} onOpenGallery={() => setGalleryOpen(true)} />
      <main>
        <Hero onOpenGallery={() => setGalleryOpen(true)} />
        <About />
        <Services />
        <Coverage />
        <FAQ />

        <section className="bg-red-700 py-16 relative overflow-hidden group">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
            <div className="text-white space-y-4">
              <h2 className="text-4xl md:text-5xl font-brand font-black italic uppercase leading-[0.8]">Ready for <br />Scale Recovery.</h2>
              <p className="text-white/70 uppercase text-xs tracking-[0.3em] font-bold">Southeast Authority | Multi-State Dispatch | Professional Recovery</p>
            </div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`tel:${BRAND.phone}`}
              className="bg-white text-red-700 font-brand font-black text-3xl italic px-14 py-8 rounded-sm shadow-2xl flex items-center gap-6"
            >
              <Phone size={32} /> {BRAND.phone}
            </motion.a>
          </div>
        </section>
      </main>
      <Footer />
      <ChatBot />
      <FleetGallery isOpen={galleryOpen} onClose={() => setGalleryOpen(false)} images={fleetImages} />
      <AdminPanel
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        onUpdate={handleUpdateFleetImages}
        currentImages={fleetImages}
      />
    </div>
  );
}

export default App;
