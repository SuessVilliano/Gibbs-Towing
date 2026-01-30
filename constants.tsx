
import React from 'react';
import { Truck, Zap, Lock, RefreshCcw, ShieldCheck, MapPin, Phone, Mail, Clock, HelpCircle } from 'lucide-react';
import { GalleryImage } from './types';

export const BRAND = {
  name: "Gibbs Towing & Recovery",
  owner: "James Gibbs",
  phone: "678-508-9243",
  address: "2884 Martin Luther King Drive Atlanta GA 30311",
  email: "dispatch@atlantatowing247.com",
  website: "Atlantatowing247.com",
  locations: ["Atlanta, GA", "Franklin, GA", "Alabama"],
  primaryColor: "#E31B23",
};

// SEO Optimized Services
export const SERVICES = [
  { name: "ATL Load Shift Correction", icon: <RefreshCcw size={20} />, description: "Professional re-balancing and securing of shifted cargo for DOT compliance in Atlanta." },
  { name: "ATL Trans Load Services", icon: <Truck size={20} />, description: "Efficient cargo transfer between trailers or locations to get you back on the road fast." },
  { name: "ATL Heavy Duty Jumpstart", icon: <Zap size={20} />, description: "High-power 12/24V jumpstarts for commercial rigs and heavy equipment." },
  { name: "Commercial Lock Outs", icon: <Lock size={20} />, description: "Damage-free vehicle entry services for semi-trucks and fleet vehicles." },
  { name: "Pull Starts", icon: <Zap size={20} />, description: "Specialized pull start assistance for stubborn engines." },
  { name: "Bobtail Towing", icon: <Truck size={20} />, description: "Towing for solo tractor units to repair shops or terminals." },
  { name: "ATL Big Rig Towing", icon: <Truck size={20} />, description: "Full tractor-trailer combination towing across Georgia." },
  { name: "Winching & Recovery", icon: <ShieldCheck size={20} />, description: "Safe recovery from off-road, mud, or difficult positions." },
  { name: "Decking/Undecking", icon: <Truck size={20} />, description: "Stacking and transporting multiple chassis or trailers." },
  { name: "Rotator Service", icon: <RefreshCcw size={20} />, description: "Heavy recovery utilizing advanced rotator equipment (2hr min)." },
];

export const FAQS = [
  {
    question: "What areas do you service for ATL heavy duty towing?",
    answer: "We provide elite heavy duty towing and recovery services throughout Atlanta, GA, Franklin, GA, and extended service areas into Alabama. Our fleet is positioned for rapid response across these major commercial corridors."
  },
  {
    question: "Do you handle ATL shifted loads and cargo transfers?",
    answer: "Yes, we specialize in ATL load shifts and ATL Trans load services. If your load has shifted or you need a transfer to a new trailer due to damage, our team has the equipment to handle it safely and get you back in compliance."
  },
  {
    question: "Is your commercial truck towing dispatch available 24/7?",
    answer: "Absolutely. Gibbs Towing & Recovery operates 24 hours a day, 7 days a week, 365 days a year. We understand that breakdowns don't stick to a schedule."
  },
  {
    question: "Do you have rotator capabilities for big rigs?",
    answer: "Yes, we operate heavy-duty rotators capable of handling complex recoveries, overturns, and heavy lifting scenarios. Note that rotator services typically have a 2-hour minimum."
  },
  {
    question: "Can you tow both the tractor and the trailer?",
    answer: "Yes, we offer 'Combo Towing' and ATL Big Rig Towing services to tow the full combination unit, ensuring your entire rig gets to the destination safely."
  }
];

// --- IMAGE HOSTING INSTRUCTIONS ---
// The best way to ensure images load 100% of the time is to host them in your project.
// 1. Create a folder named 'images' inside your 'public' folder.
// 2. Add your fleet photos there (e.g., 'wrecker1.jpg', 'rotator.jpg').
// 3. Update the URLs below to point to them (e.g., url: '/images/wrecker1.jpg').
// ----------------------------------

export const FLEET_IMAGES: GalleryImage[] = [
  { 
    url: "https://images.unsplash.com/photo-1605218427368-35b0185e4d2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", 
    title: "Heavy Duty Wrecker Fleet" 
  },
  { 
    url: "https://images.unsplash.com/photo-1596525725091-64d50c60815e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", 
    title: "Night Operations & Recovery" 
  },
  { 
    url: "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", 
    title: "ATL Load Shifts" 
  },
  { 
    url: "https://images.unsplash.com/photo-1588625997631-f1945db5977a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", 
    title: "Rotator Service" 
  },
  { 
    url: "https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", 
    title: "Heavy Transport" 
  },
  { 
    url: "https://images.unsplash.com/photo-1626868840292-669c5e552c65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", 
    title: "Professional Dispatch" 
  },
  { 
    url: "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", 
    title: "NTTS Atlanta Dispatch" 
  }
];
