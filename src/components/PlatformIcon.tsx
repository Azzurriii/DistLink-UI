"use client";

import { detectPlatform, getPlatformColor } from '@/utils/urlUtils';
import { 
  FaYoutube, 
  FaTwitter, 
  FaVimeo, 
  FaInstagram, 
  FaFacebook, 
  FaLinkedin, 
  FaGithub, 
  FaTiktok, 
  FaGlobe 
} from 'react-icons/fa';
import { SiUnsplash } from 'react-icons/si';

interface PlatformIconProps {
  url: string;
  className?: string;
}

export default function PlatformIcon({ url, className = '' }: PlatformIconProps) {
  const platform = detectPlatform(url);
  const bgColor = getPlatformColor(platform);
  
  return (
    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${bgColor} ${className}`}>
      {renderIcon(platform)}
    </div>
  );
}

function renderIcon(platform: ReturnType<typeof detectPlatform>) {
  switch (platform) {
    case 'youtube':
      return <FaYoutube className="w-3 h-3 text-white" />;
    case 'twitter':
      return <FaTwitter className="w-3 h-3 text-white" />;
    case 'vimeo':
      return <FaVimeo className="w-3 h-3 text-white" />;
    case 'instagram':
      return <FaInstagram className="w-3 h-3 text-white" />;
    case 'facebook':
      return <FaFacebook className="w-3 h-3 text-white" />;
    case 'linkedin':
      return <FaLinkedin className="w-3 h-3 text-white" />;
    case 'github':
      return <FaGithub className="w-3 h-3 text-white" />;
    case 'tiktok':
      return <FaTiktok className="w-3 h-3 text-white" />;
    case 'unsplash':
      return <SiUnsplash className="w-3 h-3 text-white" />;
    default:
      return <FaGlobe className="w-3 h-3 text-white" />;
  }
} 