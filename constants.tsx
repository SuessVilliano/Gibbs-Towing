
import React from 'react';
import { Truck, Zap, Lock, RefreshCcw, ShieldCheck, MapPin, Phone, Mail, Clock, HelpCircle } from 'lucide-react';
import { GalleryImage } from './types';

export const BRAND = {
  name: "Gibbs Towing & Recovery",
  phone: "678-508-9243",
  address: "2884 Martin Luther King Drive Atlanta GA 30311",
  email: "dispatch@atlantatowing247.com",
  website: "Atlantatowing247.com",
  locations: ["Headquartered in Georgia", "Serving the Southeast", "Nationwide Logistics Support"],
  primaryColor: "#E31B23",
  socials: {
    youtube: "https://www.youtube.com/@GibbsTowingATL",
    googleReview: "https://share.google/LcroLnLbyFyfHuc6C"
  }
};

// Enterprise Optimized Services
export const SERVICES = [
  { name: "Commercial Load Shift Logistics", icon: <RefreshCcw size={20} />, description: "Specialized re-balancing and cargo securement for DOT compliance and long-haul logistics safety." },
  { name: "Multi-State Trans Load Response", icon: <Truck size={20} />, description: "Rapid cargo transfer response between vehicles or facilities to maintain supply chain continuity." },
  { name: "Heavy Fleet Response", icon: <Zap size={20} />, description: "Mission-critical 12/24V high-amperage assistance for commercial fleets and equipment." },
  { name: "Fleet Asset Access", icon: <Lock size={20} />, description: "Damage-free rapid entry for commercial semi-tractors and logistics vehicles." },
  { name: "Engine Restart Assistance", icon: <Zap size={20} />, description: "Professional pull-start and mechanical restart support for diesel units." },
  { name: "Specialty Transport", icon: <Truck size={20} />, description: "Safe transport for individual power units and heavy equipment to designated facilities." },
  { name: "Heavy-Duty Logistics Recovery", icon: <Truck size={20} />, description: "Comprehensive tractor-trailer combo recovery for interstate and local logistics." },
  { name: "Tactical Winching", icon: <ShieldCheck size={20} />, description: "Precision recovery from off-road or compromised positions with high-capacity equipment." },
  { name: "Asset Decking/Undecking", icon: <Truck size={20} />, description: "Strategic stacking and transport management for fleet chassis and trailer systems." },
  { name: "Rotator Recovery Response", icon: <RefreshCcw size={20} />, description: "Advanced heavy recovery managed by high-capacity rotator systems for complex logistics scenarios." },
];

export const FAQS = [
  {
    question: "What is your geographic coverage for commercial recovery?",
    answer: "Gibbs Towing & Recovery is headquartered in Georgia and serves as a primary response team for the entire Southeast. We also support long-distance, multi-state, and nationwide logistics operations for specialty contracts."
  },
  {
    question: "How do you manage load shifts and cargo transfers?",
    answer: "We specialize in commercial load shifts and multi-state trans load logistics. Our team manages the entire process from balancing to DOT compliance, ensuring fleet assets remain operational and legal."
  },
  {
    question: "Is your dispatch operational for nationwide contracts?",
    answer: "Our dispatch center is operational 24/7, 365 days a year. We provide dedicated logistics support for fleet managers and contract partners across state lines."
  },
  {
    question: "What recovery equipment is available for complex jobs?",
    answer: "We maintain a high-end fleet including advanced rotators and heavy-duty wreckers capable of complex recoveries, infrastructure support, and multi-unit transport management."
  }
];

export const FLEET_IMAGES: GalleryImage[] = [
  { url: "https://images.unsplash.com/photo-1605218427368-35b0185e4d2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", title: "Heavy Logistics Fleet" },
  { url: "https://images.unsplash.com/photo-1596525725091-64d50c60815e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", title: "Commercial Recovery" },
  { url: "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", title: "Supply Chain Recovery" },
  { url: "https://images.unsplash.com/photo-1588625997631-f1945db5977a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", title: "Advanced Rotator Systems" },
  { url: "https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", title: "Nationwide Transport" },
  { url: "https://images.unsplash.com/photo-1626868840292-669c5e552c65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", title: "Command & Control" },
  { url: "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", title: "Operations HQ" }
];
