
import React from 'react';

export interface ServiceItem {
  name: string;
  description: string;
  icon: React.ReactNode;
}

export interface Location {
  name: string;
  address?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface GalleryImage {
  url: string;
  title: string;
}
