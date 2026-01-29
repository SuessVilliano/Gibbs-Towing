
import React, { useState, useEffect } from 'react';
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
  Globe
} from 'lucide-react';
import { BRAND, SERVICES } from './constants';
import TruckAnimation from './components/TruckAnimation';
import ChatBot from './components/ChatBot';

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
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-red-700 flex items-center justify-center rounded-sm shadow-md">
            <Truck className="text-white" size={24} />
          </div>
          <div className="flex flex-col">
            <span className={`font-brand font-black text-xl tracking-tighter italic leading-none ${scrolled ? 'text-zinc-900 dark:text-white' : 'text-white'}`}>GIBBS</span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-red-600 -mt-1">Towing & Recovery</span>
          </div>
        </div>

        <div className={`hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest items-center ${scrolled ? 'text-zinc-800 dark:text-zinc-200' : 'text-zinc-200'}`}>
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-red-600 transition-colors">About</a>
          <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="hover:text-red-600 transition-colors">Services</a>
          <a href="#locations" onClick={(e) => handleNavClick(e, 'locations')} className="hover:text-red-600 transition-colors">Locations</a>
          
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a href={`tel:${BRAND.phone}`} className="bg-red-700 hover:bg-red-800 px-6 py-3 rounded-full flex items-center gap-2 text-white transition-all transform hover:scale-105 shadow-red-900/20 shadow-lg">
            <Phone size={14} /> {BRAND.phone}
          </a>
        </div>

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
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-white/10 p-6 flex flex-col gap-6 animate-in slide-in-from-top-4 shadow-2xl">
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-lg font-brand text-zinc-900 dark:text-white">About Us</a>
          <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="text-lg font-brand text-zinc-900 dark:text-white">Services</a>
          <a href="#locations" onClick={(e) => handleNavClick(e, 'locations')} className="text-lg font-brand text-zinc-900 dark:text-white">Locations</a>
          <a href={`tel:${BRAND.phone}`} className="bg-red-700 text-center py-4 rounded-xl font-bold text-white uppercase tracking-widest shadow-lg">
            Call Dispatch Now
          </a>
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC = () => {
  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 bg-zinc-900">
        {/* Updated to a reliable Red Heavy Duty Truck image */}
        <img 
          src="https://images.unsplash.com/photo-1605218439506-6df6c91a0300?q=80&w=1920&auto=format&fit=crop" 
          alt="Gibbs Heavy Duty Red Truck" 
          className="w-full h-full object-cover"
        />
        {/* Dark Mode Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-100 via-zinc-100/40 to-transparent dark:from-black dark:via-black/80 dark:to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 via-zinc-100/60 to-transparent dark:from-black dark:via-black/40 dark:to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl space-y-8">
          <div className="inline-block border-l-4 border-red-700 pl-4 py-2 bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-r-lg">
            <p className="text-red-700 dark:text-red-600 font-bold uppercase tracking-[0.3em] text-sm">Premier Recovery Solutions</p>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-brand font-black italic tracking-tighter leading-[0.9] uppercase text-zinc-900 dark:text-white">
            Heavy Duty <br />
            <span className="text-gradient-red">Commercial Recovery</span>
          </h1>

          <p className="text-zinc-700 dark:text-zinc-200 text-lg md:text-xl font-light leading-relaxed max-w-xl bg-white/30 dark:bg-black/50 p-4 rounded-lg backdrop-blur-sm">
            Atlanta's most trusted elite towing fleet. Providing white-glove service for heavy-duty commercial, rotators, and specialized cargo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a 
              href={`tel:${BRAND.phone}`}
              className="bg-red-700 hover:bg-red-600 text-white px-10 py-5 rounded-sm font-brand font-black text-xl italic tracking-tight uppercase flex items-center justify-center gap-3 transition-all group shadow-xl"
            >
              <Phone className="group-hover:animate-bounce" /> Call Dispatch
            </a>
            <a 
              href="#services"
              onClick={scrollToServices}
              className="border border-zinc-900 dark:border-white/20 hover:bg-zinc-900 hover:text-white dark:hover:bg-white/10 text-zinc-900 dark:text-white px-10 py-5 rounded-sm font-brand font-black text-xl italic tracking-tight uppercase flex items-center justify-center gap-3 transition-all"
            >
              Our Fleet <ChevronRight />
            </a>
          </div>
        </div>
      </div>

      {/* Floating Badge */}
      <div className="absolute bottom-12 right-12 hidden lg:flex flex-col items-center gap-2 p-6 bg-white/80 dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-2xl animate-bounce shadow-2xl">
         <Star className="text-yellow-500 fill-yellow-500" size={32} />
         <span className="text-xs font-bold uppercase tracking-widest text-center text-zinc-900 dark:text-white">Top Rated<br/>Recovery 2024</span>
      </div>
    </section>
  );
};

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white dark:bg-black relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative group">
          <div className="aspect-[4/5] bg-zinc-200 dark:bg-zinc-900 rounded-sm overflow-hidden relative shadow-2xl">
            {/* Using a placeholder since actual image is missing */}
            <img 
              src="https://placehold.co/400x500/E31B23/FFFFFF?text=James+Gibbs" 
              alt="James Gibbs - Owner" 
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                <div className="border-l-4 border-red-600 pl-4">
                    <h3 className="text-2xl font-brand font-bold uppercase">{BRAND.owner}</h3>
                    <p className="text-sm text-zinc-300 uppercase tracking-widest">Owner & Lead Operator</p>
                </div>
            </div>
          </div>
          {/* Overlay Stats */}
          <div className="absolute -top-6 -right-6 bg-red-700 p-8 rounded-sm text-white shadow-xl z-10">
            <div className="text-4xl font-brand font-black">24/7</div>
            <div className="text-xs uppercase tracking-widest font-bold">Uninterrupted</div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-red-600 font-bold uppercase tracking-widest text-sm">Who We Are</p>
            <h2 className="text-4xl md:text-6xl font-brand font-black italic uppercase text-zinc-900 dark:text-white">Built For <br/>The <span className="text-gradient-red">Toughest</span> Jobs</h2>
          </div>
          
          <div className="space-y-6 text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
            <p>
              Founded by <strong>James Gibbs</strong>, Gibbs Towing & Recovery stands as a beacon of reliability in the Atlanta metropolitan area and beyond. We don't just move vehicles; we rescue businesses and livelihoods.
            </p>
            <p>
              Our professional approach means we treat every client with the utmost respect. Whether it's a multi-million dollar cargo load or a critical tractor-trailer jumpstart, we arrive on scene with the right equipment and the right attitude.
            </p>
          </div>

          {/* Contact Details Card */}
          <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-lg border-l-4 border-red-600 shadow-md">
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
                <div className="flex items-start gap-3">
                    <div className="bg-red-600/10 p-2 rounded text-red-600"><Globe size={20} /></div>
                    <div>
                        <p className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold">Online Portal</p>
                        <p className="text-zinc-900 dark:text-white font-semibold text-lg">{BRAND.website}</p>
                    </div>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-4">
            <div className="flex gap-4 items-center">
               <Shield className="text-red-600 shrink-0" size={32} />
               <div>
                 <h4 className="font-bold uppercase text-xs tracking-widest text-zinc-900 dark:text-white mb-1">Fully Licensed</h4>
                 <p className="text-zinc-500 text-[10px]">Licensed & Insured for all heavy duty ops.</p>
               </div>
            </div>
            <div className="flex gap-4 items-center">
               <Award className="text-red-600 shrink-0" size={32} />
               <div>
                 <h4 className="font-bold uppercase text-xs tracking-widest text-zinc-900 dark:text-white mb-1">Expert Operators</h4>
                 <p className="text-zinc-500 text-[10px]">WreckMaster certified recovery specialists.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <p className="text-red-600 font-bold uppercase tracking-widest text-sm">Our Expertise</p>
            <h2 className="text-4xl md:text-6xl font-brand font-black italic uppercase text-zinc-900 dark:text-white">Specialized <span className="text-zinc-400 dark:text-zinc-500">Services</span></h2>
          </div>
          <p className="max-w-md text-zinc-600 dark:text-zinc-500 text-sm">
            From basic winching to complex rotator recovery, our fleet is equipped with the latest technology to handle any scenario.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((s, i) => (
            <div key={i} className="group p-8 bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 hover:border-red-600/30 transition-all duration-500 relative overflow-hidden shadow-lg hover:shadow-2xl dark:shadow-none rounded-sm">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 group-hover:text-red-600 transition-all transform scale-150 -translate-y-4 translate-x-4 text-zinc-900 dark:text-white">
                {s.icon}
              </div>
              <div className="text-red-600 mb-4 bg-red-600/10 w-fit p-3 rounded-lg">
                {s.icon}
              </div>
              <h3 className="text-xl font-brand font-bold uppercase mb-3 text-zinc-900 dark:text-white">{s.name}</h3>
              <p className="text-zinc-600 dark:text-zinc-500 text-sm leading-relaxed">{s.description}</p>
            </div>
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
         <div className="text-center space-y-4 mb-16">
            <p className="text-red-600 font-bold uppercase tracking-widest text-sm">Where we operate</p>
            <h2 className="text-4xl md:text-6xl font-brand font-black italic uppercase text-zinc-900 dark:text-white">Service <span className="text-zinc-400 dark:text-zinc-500">Network</span></h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BRAND.locations.map((loc, i) => (
              <div key={i} className="bg-white dark:bg-zinc-900 p-10 border border-zinc-200 dark:border-white/5 text-center group hover:bg-red-700 transition-all duration-300 shadow-xl rounded-sm">
                <MapPin className="mx-auto mb-6 text-red-600 group-hover:text-white transition-colors" size={40} />
                <h3 className="text-2xl font-brand font-bold uppercase text-zinc-900 dark:text-white group-hover:text-white">{loc}</h3>
                <p className="text-zinc-500 mt-4 group-hover:text-white/80 transition-colors uppercase text-[10px] tracking-[0.2em]">Ready for Dispatch</p>
              </div>
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
              Providing elite heavy-duty recovery services 24/7 across Georgia and Alabama. We handle the heavy lifting so you don't have to.
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
      <Nav darkMode={darkMode} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Services />
        <Locations />
        
        {/* Call To Action Persistent */}
        <section className="bg-red-700 py-12 relative overflow-hidden group">
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="text-white">
              <h2 className="text-3xl font-brand font-black italic uppercase leading-none">Stranded? Get Moving <span className="underline decoration-black/20">Right Now</span>.</h2>
              <p className="text-white/70 mt-2 uppercase text-xs tracking-widest font-bold">24/7 Heavy Duty Dispatch Available Across The Network</p>
            </div>
            <a href={`tel:${BRAND.phone}`} className="bg-white text-red-700 font-brand font-black text-2xl italic px-12 py-6 rounded-sm shadow-xl hover:scale-105 transition-transform flex items-center gap-4">
              <Phone size={28} /> {BRAND.phone}
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

export default App;
