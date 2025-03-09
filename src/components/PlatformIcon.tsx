"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faTwitter,
  faVimeo,
  faInstagram,
  faFacebook,
  faLinkedin,
  faGithub,
  faTiktok,
  faUnsplash,
  faDiscord,
  faTwitch,
  faPinterest,
  faReddit,
  faSnapchat,
  faSpotify,
  faSteam,
  faTelegram,
  faTumblr,
  faWhatsapp,
  faWikipediaW,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { detectPlatform, getPlatformColor } from "@/utils/urlUtils";

interface PlatformIconProps {
  url: string;
  size?: "sm" | "md" | "lg";
}

export default function PlatformIcon({ url, size = "md" }: PlatformIconProps) {
  const platform = detectPlatform(url);
  const bgColorClass = getPlatformColor(platform);

  // Size classes
  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-10 h-10 text-base",
  };

  // Get the appropriate icon
  const getIcon = () => {
    switch (platform) {
      case "youtube":
        return faYoutube;
      case "twitter":
        return faTwitter;
      case "vimeo":
        return faVimeo;
      case "instagram":
        return faInstagram;
      case "facebook":
        return faFacebook;
      case "linkedin":
        return faLinkedin;
      case "github":
        return faGithub;
      case "tiktok":
        return faTiktok;
      case "unsplash":
        return faUnsplash || faGlobe; // Fallback if not available
      case "discord":
        return faDiscord;
      case "twitch":
        return faTwitch;
      case "pinterest":
        return faPinterest;
      case "reddit":
        return faReddit;
      case "snapchat":
        return faSnapchat;
      case "spotify":
        return faSpotify;
      case "steam":
        return faSteam;
      case "telegram":
        return faTelegram;
      case "tumblr":
        return faTumblr;
      case "whatsapp":
        return faWhatsapp;
      case "wikipedia":
        return faWikipediaW || faGlobe; // Fallback if not available
      case "google":
        return faGoogle;
      default:
        return faGlobe;
    }
  };

  return (
    <div
      className={`${sizeClasses[size]} ${bgColorClass} rounded-full flex items-center justify-center text-white`}
    >
      <FontAwesomeIcon icon={getIcon()} />
    </div>
  );
}
