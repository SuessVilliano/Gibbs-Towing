
import React from 'react';
import { Truck, Zap, Lock, RefreshCcw, ShieldCheck, MapPin, Phone, Mail, Clock } from 'lucide-react';

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

export const SERVICES = [
  { name: "Load Shift", icon: <RefreshCcw size={20} />, description: "Professional re-balancing and securing of shifted cargo." },
  { name: "Load Transfer", icon: <Truck size={20} />, description: "Efficient cargo transfer between trailers or locations." },
  { name: "Jumpstart", icon: <Zap size={20} />, description: "High-power jumpstarts for heavy-duty commercial rigs." },
  { name: "Lock Outs", icon: <Lock size={20} />, description: "Damage-free vehicle entry services." },
  { name: "Pull Starts", icon: <Zap size={20} />, description: "Specialized pull start assistance for stubborn engines." },
  { name: "Bobtail", icon: <Truck size={20} />, description: "Towing for solo tractor units." },
  { name: "Combo", icon: <Truck size={20} />, description: "Full tractor-trailer combination towing." },
  { name: "Basic Winching", icon: <ShieldCheck size={20} />, description: "Safe recovery from off-road or difficult positions." },
  { name: "Decking", icon: <Truck size={20} />, description: "Stacking and transporting multiple chassis or trailers." },
  { name: "Rotator Recovery", icon: <RefreshCcw size={20} />, description: "Heavy recovery utilizing advanced rotator equipment (2hr min)." },
];
