
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
  Facebook,
  Instagram,
  Linkedin,
  Clock,
  Sun,
  Moon,
  Globe,
  ChevronDown,
  ChevronUp,
  Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND, SERVICES, FAQS, FLEET_IMAGES, HERO_IMAGE } from './constants';
import TruckAnimation from './components/TruckAnimation';
import ChatBot from './components/ChatBot';
import FleetGallery from './components/FleetGallery';

// --- SEO: JSON-LD Structured Data ---
const StructuredData = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoTowingService",
    "name": BRAND.name,
    "image": `https://gibbs-towing.vercel.app${HERO_IMAGE}`,
    "telephone": BRAND.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2884 Martin Luther King Drive",
      "addressLocality": "Atlanta",
      "addressRegion": "GA",
      "postalCode": "30311",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 33.753746,
      "longitude": -84.386330
    },
    "url": `https://${BRAND.website}`,
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "priceRange": "$$$",
    "description": "Elite heavy duty towing, ATL load shifts, and commercial recovery in Atlanta, GA and Alabama. NTTS Atlanta approved.",
    "areaServed": ["Atlanta", "Franklin", "Alabama"],
    "sameAs": [
        "https://www.facebook.com/GibbsTowing",
        "https://www.instagram.com/GibbsTowing"
    ]
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

const Nav: React.FC<{ darkMode: boolean; toggleTheme: () => void }> = ({ darkMode, toggleTheme }) => {
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

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-white dark:bg-black py-3 shadow-lg' : 'bg-transparent py-6'}`}>
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
            <span className={`font-brand font-black text-xl tracking-tighter italic leading-none ${scrolled ? 'text-zinc-900 dark:text-white' : 'text-white'}`}>GIBBS</span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-red-600 -mt-1">Towing & Recovery</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest items-center ${scrolled ? 'text-zinc-800 dark:text-zinc-200' : 'text-zinc-200'}`}
        >
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-red-600 transition-colors">About</a>
          <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="hover:text-red-600 transition-colors">Services</a>
          <a href="#locations" onClick={(e) => handleNavClick(e, 'locations')} className="hover:text-red-600 transition-colors">Locations</a>
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
            <Phone size={14} /> {BRAND.phone}
          </motion.a>
        </motion.div>

        <div className="flex items-center gap-4 md:hidden">
            <button onClick={toggleTheme} className={`p-2 rounded-full ${scrolled ? 'text-zinc-900 dark:text-white' : 'text-white'}`}>
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className={`${scrolled ? 'text-zinc-900 dark:text-white' : 'text-white'}`}>
                {mobileOpen ? <X /> : <Menu />}
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-zinc-950 border-t border-white/10 p-6 flex flex-col gap-6 shadow-2xl z-50">
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-lg font-brand text-white active:text-red-500">About Us</a>
          <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="text-lg font-brand text-white active:text-red-500">Services</a>
          <a href="#locations" onClick={(e) => handleNavClick(e, 'locations')} className="text-lg font-brand text-white active:text-red-500">Locations</a>
          <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')} className="text-lg font-brand text-white active:text-red-500">FAQ</a>
          <a href={`tel:${BRAND.phone}`} className="bg-red-700 text-center py-4 rounded-xl font-bold text-white uppercase tracking-widest shadow-lg">
            Call Dispatch Now
          </a>
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC<{ onOpenGallery: () => void }> = ({ onOpenGallery }) => {
  const [truckLoaded, setTruckLoaded] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
        {/* Red accent glow - hidden on mobile to prevent crashes */}
        <div className="hidden md:block absolute bottom-0 right-0 w-[600px] h-[400px] bg-red-600/10 blur-3xl rounded-full"></div>
      </div>

      {/* Hero Truck Image */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: truckLoaded ? 1 : 0, x: truckLoaded ? 0 : 100 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute -right-10 md:right-0 bottom-10 md:bottom-20 w-[90%] md:w-[60%] lg:w-[55%] h-auto z-5 pointer-events-none"
      >
        <img
          src={HERO_IMAGE}
          alt="Gibbs Towing Heavy Duty Wrecker"
          onLoad={() => setTruckLoaded(true)}
          className="w-full h-auto object-contain md:drop-shadow-[0_0_40px_rgba(227,27,35,0.3)]"
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-xl lg:max-w-2xl space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block border-l-4 border-red-700 pl-4 py-2 bg-zinc-900/80 rounded-r-lg"
          >
            <p className="text-red-500 font-bold uppercase tracking-[0.3em] text-sm">ATL Heavy Duty Towing</p>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-brand font-black italic tracking-tighter leading-[0.9] uppercase text-white drop-shadow-2xl"
          >
            ATL Big Rig <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Recovery</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-zinc-200 text-lg md:text-xl font-light leading-relaxed max-w-md"
          >
            Commercial truck towing and ATL load shifts specialists. Providing 24/7 heavy duty towing, winch outs, and trans load services across Georgia.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={`tel:${BRAND.phone}`}
              className="bg-red-700 hover:bg-red-600 text-white px-10 py-5 rounded-sm font-brand font-black text-xl italic tracking-tight uppercase flex items-center justify-center gap-3 transition-colors shadow-2xl shadow-red-900/30"
            >
              <Phone className="animate-pulse" /> Call Dispatch
            </motion.a>
            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenGallery}
              className="border border-white/30 text-white px-10 py-5 rounded-sm font-brand font-black text-xl italic tracking-tight uppercase flex items-center justify-center gap-3 transition-colors bg-zinc-900/80 hover:bg-zinc-800"
            >
              Our Fleet <Camera size={20} />
            </motion.button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-12 left-12 hidden md:flex flex-col items-center gap-2 p-6 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl"
      >
         <Star className="text-yellow-500 fill-yellow-500" size={32} />
         <span className="text-xs font-bold uppercase tracking-widest text-center text-white">NTTS Atlanta<br/>Approved</span>
      </motion.div>
    </section>
  );
};

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white dark:bg-black relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <FadeInSection>
          <div className="relative group">
            <div className="aspect-[4/5] bg-zinc-200 dark:bg-zinc-900 rounded-sm overflow-hidden relative shadow-2xl">
              <img
                src="/images/owner.jpg"
                alt="James Gibbs - Owner of Gibbs Towing" 
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                  <div className="border-l-4 border-red-600 pl-4">
                      <h3 className="text-2xl font-brand font-bold uppercase">{BRAND.owner}</h3>
                      <p className="text-sm text-zinc-300 uppercase tracking-widest">NTTS Atlanta Gibbs Towing</p>
                  </div>
              </div>
            </div>
            {/* Overlay Stats */}
            <div className="absolute -top-6 -right-6 bg-red-700 p-8 rounded-sm text-white shadow-xl z-10">
              <div className="text-4xl font-brand font-black">24/7</div>
              <div className="text-xs uppercase tracking-widest font-bold">ATL Heavy Duty</div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-red-600 font-bold uppercase tracking-widest text-sm">Ntts Atlanta Gibbs Towing</p>
              <h2 className="text-4xl md:text-6xl font-brand font-black italic uppercase text-zinc-900 dark:text-white">ATL Big Rig <br/> <span className="text-gradient-red">Towing Pros</span></h2>
            </div>
            
            <div className="space-y-6 text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
              <p>
                Founded by <strong>James Gibbs</strong>, Gibbs Towing & Recovery stands as the premier choice for <strong>ATL heavy duty</strong> service. We specialize in complex <strong>ATL load shifts</strong> and <strong>Commercial truck towing</strong> across the region.
              </p>
              <p>
                Whether it's a <strong>ATL Trans load</strong> service or a simple pull start, our fleet of black and red wreckers is ready. We are the trusted name for <strong>NTTS Atlanta Gibbs Towing</strong>.
              </p>
            </div>

            {/* Contact Details Card */}
            <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-lg border-l-4 border-red-600 shadow-md hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
               <div className="grid gap-4">
                  <div className="flex items-start gap-3">
                      <div className="bg-red-600/10 p-2 rounded text-red-600"><MapPin size={20} /></div>
                      <div>
                          <p className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold">Headquarters</p>
                          <p className="text-zinc-900 dark:text-white font-semibold text-lg">{BRAND.address}</p>
                      </div>
                  </div>
                  <div className="flex items-start gap-3">
                      <div className="bg-red-600/10 p-2 rounded text-red-600"><Phone size={20} /></div>
                      <div>
                          <p className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold">Direct Dispatch</p>
                          <a href={`tel:${BRAND.phone}`} className="text-zinc-900 dark:text-white font-semibold text-lg hover:text-red-600 transition-colors">{BRAND.phone}</a>
                      </div>
                  </div>
               </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <FadeInSection>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-4">
              <p className="text-red-600 font-bold uppercase tracking-widest text-sm">Our Expertise</p>
              <h2 className="text-4xl md:text-6xl font-brand font-black italic uppercase text-zinc-900 dark:text-white">ATL Trans Load <span className="text-zinc-400 dark:text-zinc-500">& Recovery</span></h2>
            </div>
            <p className="max-w-md text-zinc-600 dark:text-zinc-500 text-sm">
              From ATL load shifts to complex rotator recovery, our fleet is equipped with the latest technology to handle any scenario.
            </p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((s, i) => (
            <FadeInSection key={i} delay={i * 0.1}>
              <motion.div 
                whileHover={{ y: -10 }}
                className="group p-8 bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 hover:border-red-600/30 transition-all duration-300 relative overflow-hidden shadow-lg hover:shadow-2xl dark:shadow-none rounded-sm h-full"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 group-hover:text-red-600 transition-all transform scale-150 -translate-y-4 translate-x-4 text-zinc-900 dark:text-white">
                  {s.icon}
                </div>
                <div className="text-red-600 mb-4 bg-red-600/10 w-fit p-3 rounded-lg">
                  {s.icon}
                </div>
                <h3 className="text-xl font-brand font-bold uppercase mb-3 text-zinc-900 dark:text-white">{s.name}</h3>
                <p className="text-zinc-600 dark:text-zinc-500 text-sm leading-relaxed">{s.description}</p>
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
    <section id="faq" className="py-24 bg-white dark:bg-black transition-colors duration-300 border-t border-zinc-100 dark:border-white/5">
      <div className="container mx-auto px-6 max-w-4xl">
         <FadeInSection>
            <div className="text-center space-y-4 mb-16">
              <p className="text-red-600 font-bold uppercase tracking-widest text-sm">Common Questions</p>
              {/* Removed "AEO" as requested */}
              <h2 className="text-4xl md:text-5xl font-brand font-black italic uppercase text-zinc-900 dark:text-white">Dispatch <span className="text-zinc-400 dark:text-zinc-600">Intelligence</span></h2>
            </div>
         </FadeInSection>

         <div className="space-y-4">
           {FAQS.map((faq, i) => (
             <FadeInSection key={i} delay={i * 0.1}>
               <div className="border border-zinc-200 dark:border-white/10 rounded-lg overflow-hidden bg-zinc-50 dark:bg-zinc-900">
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
                       <div className="p-6 pt-0 text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-200 dark:border-white/5 mt-2">
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

const Locations: React.FC = () => {
  return (
    <section id="locations" className="py-24 bg-zinc-100 dark:bg-zinc-950 transition-colors duration-300">
      <div className="container mx-auto px-6">
         <FadeInSection>
           <div className="text-center space-y-4 mb-16">
              <p className="text-red-600 font-bold uppercase tracking-widest text-sm">Where we operate</p>
              <h2 className="text-4xl md:text-6xl font-brand font-black italic uppercase text-zinc-900 dark:text-white">Service <span className="text-zinc-400 dark:text-zinc-500">Network</span></h2>
           </div>
         </FadeInSection>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BRAND.locations.map((loc, i) => (
              <FadeInSection key={i} delay={i * 0.2}>
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="bg-white dark:bg-zinc-900 p-10 border border-zinc-200 dark:border-white/5 text-center group hover:bg-red-700 transition-all duration-300 shadow-xl rounded-sm h-full flex flex-col items-center justify-center"
                >
                  <MapPin className="mx-auto mb-6 text-red-600 group-hover:text-white transition-colors" size={40} />
                  <h3 className="text-2xl font-brand font-bold uppercase text-zinc-900 dark:text-white group-hover:text-white">{loc}</h3>
                  <p className="text-zinc-500 mt-4 group-hover:text-white/80 transition-colors uppercase text-[10px] tracking-[0.2em]">Ready for Dispatch</p>
                </motion.div>
              </FadeInSection>
            ))}
         </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  const handleFooterScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white dark:bg-black pt-20 border-t border-zinc-200 dark:border-white/10 transition-colors duration-300">
      <div className="container mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-700 flex items-center justify-center rounded-sm">
                <Truck className="text-white" size={18} />
              </div>
              <div className="flex flex-col">
                <span className="font-brand font-black text-lg tracking-tighter italic leading-none text-zinc-900 dark:text-white">GIBBS</span>
                <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-red-600 -mt-0.5">Towing & Recovery</span>
              </div>
            </div>
            <p className="text-zinc-600 dark:text-zinc-500 text-sm max-w-sm">
              Providing elite heavy-duty recovery services 24/7 across Georgia and Alabama. NTTS Atlanta Gibbs Towing is your partner for the heavy lifting.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-zinc-700 dark:text-white hover:text-red-600 transition-colors"><Facebook size={18} /></a>
              <a href="#" className="p-2 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-zinc-700 dark:text-white hover:text-red-600 transition-colors"><Instagram size={18} /></a>
              <a href="#" className="p-2 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-zinc-700 dark:text-white hover:text-red-600 transition-colors"><Linkedin size={18} /></a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-brand font-bold uppercase text-xs tracking-widest text-zinc-900 dark:text-white">Contact Info</h4>
            <div className="space-y-4 text-zinc-600 dark:text-zinc-500 text-sm">
              <p className="flex items-start gap-3"><MapPin size={16} className="text-red-600 shrink-0" /> {BRAND.address}</p>
              <p className="flex items-center gap-3"><Phone size={16} className="text-red-600 shrink-0" /> {BRAND.phone}</p>
              <p className="flex items-center gap-3 font-bold text-zinc-900 dark:text-white"><Clock size={16} className="text-red-600 shrink-0" /> 24/7 EMERGENCY</p>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-brand font-bold uppercase text-xs tracking-widest text-zinc-900 dark:text-white">Quick Links</h4>
            <div className="flex flex-col gap-3 text-zinc-600 dark:text-zinc-500 text-sm">
              <a href="#about" onClick={(e) => handleFooterScroll(e, 'about')} className="hover:text-red-600 dark:hover:text-white transition-colors">Our Story</a>
              <a href="#services" onClick={(e) => handleFooterScroll(e, 'services')} className="hover:text-red-600 dark:hover:text-white transition-colors">Our Services</a>
              <a href="#locations" onClick={(e) => handleFooterScroll(e, 'locations')} className="hover:text-red-600 dark:hover:text-white transition-colors">Service Areas</a>
              <a href={`tel:${BRAND.phone}`} className="hover:text-red-600 dark:hover:text-white transition-colors">Instant Dispatch</a>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-white/5 pt-8 flex flex-col md:row justify-between items-center gap-4">
          <p className="text-zinc-500 dark:text-zinc-600 text-[10px] uppercase tracking-widest">
            © 2024 Gibbs Towing & Recovery. All rights reserved. Professional Heavy Duty Recovery.
          </p>
          <div className="flex gap-6 text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-600">
            <a href="#" className="hover:text-zinc-900 dark:hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>

      <TruckAnimation />
    </footer>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [galleryOpen, setGalleryOpen] = useState(false);

  // Initialize theme based on preference or default to dark
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen selection:bg-red-700 selection:text-white transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-white'}`}>
      <StructuredData />
      <Nav darkMode={darkMode} toggleTheme={toggleTheme} />
      <main>
        <Hero onOpenGallery={() => setGalleryOpen(true)} />
        <About />
        <Services />
        <FAQ />
        <Locations />
        
        {/* Call To Action Persistent */}
        <section className="bg-red-700 py-12 relative overflow-hidden group">
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="text-white">
              <h2 className="text-3xl font-brand font-black italic uppercase leading-none">Stranded? Get Moving <span className="underline decoration-black/20">Right Now</span>.</h2>
              <p className="text-white/70 mt-2 uppercase text-xs tracking-widest font-bold">24/7 Heavy Duty Dispatch Available Across The Network</p>
            </div>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`tel:${BRAND.phone}`} 
              className="bg-white text-red-700 font-brand font-black text-2xl italic px-12 py-6 rounded-sm shadow-xl flex items-center gap-4"
            >
              <Phone size={28} /> {BRAND.phone}
            </motion.a>
          </div>
        </section>
      </main>
      <Footer />
      <ChatBot />
      
      {/* Fleet Gallery Modal */}
      <FleetGallery 
        isOpen={galleryOpen} 
        onClose={() => setGalleryOpen(false)} 
        images={FLEET_IMAGES} 
      />
    </div>
  );
}

export default App;
