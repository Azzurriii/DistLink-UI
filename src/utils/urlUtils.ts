type SupportedPlatform =
  | "youtube"
  | "twitter"
  | "vimeo"
  | "instagram"
  | "facebook"
  | "linkedin"
  | "google"
  | "tiktok"
  | "unsplash"
  | "discord"
  | "twitch"
  | "pinterest"
  | "reddit"
  | "snapchat"
  | "spotify"
  | "steam"
  | "telegram"
  | "tumblr"
  | "twitch"
  | "whatsapp"
  | "wikipedia"
  | "github"
  | "default";

export const detectPlatform = (url: string): SupportedPlatform => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    if (hostname.includes("youtube.com") || hostname.includes("youtu.be")) {
      return "youtube";
    } else if (hostname.includes("twitter.com") || hostname.includes("x.com")) {
      return "twitter";
    } else if (hostname.includes("vimeo.com")) {
      return "vimeo";
    } else if (hostname.includes("instagram.com")) {
      return "instagram";
    } else if (
      hostname.includes("facebook.com") ||
      hostname.includes("fb.com")
    ) {
      return "facebook";
    } else if (hostname.includes("linkedin.com")) {
      return "linkedin";
    } else if (hostname.includes("github.com")) {
      return "github";
    } else if (hostname.includes("tiktok.com")) {
      return "tiktok";
    } else if (hostname.includes("unsplash.com")) {
      return "unsplash";
    } else if (hostname.includes("discord.com")) {
      return "discord";
    } else if (hostname.includes("twitch.tv")) {
      return "twitch";
    } else if (hostname.includes("pinterest.com")) {
      return "pinterest";
    } else if (hostname.includes("reddit.com")) {
      return "reddit";
    } else if (hostname.includes("snapchat.com")) {
      return "snapchat";
    } else if (hostname.includes("spotify.com")) {
      return "spotify";
    } else if (hostname.includes("steamcommunity.com")) {
      return "steam";
    } else if (hostname.includes("telegram.me") || hostname.includes("t.me")) {
      return "telegram";
    } else if (hostname.includes("tumblr.com")) {
      return "tumblr";
    } else if (hostname.includes("whatsapp.com")) {
      return "whatsapp";
    } else if (hostname.includes("wikipedia.org")) {
      return "wikipedia";
    } else if (hostname.includes("google.com")) {
      return "google";
    } else {
      return "default";
    }
  } catch (error) {
    console.error(`Error parsing URL in detectPlatform: ${url}`, error);
    return "default";
  }
};

export const getPlatformColor = (platform: SupportedPlatform): string => {
  switch (platform) {
    case "youtube":
      return "bg-red-600";
    case "twitter":
      return "bg-blue-400";
    case "vimeo":
      return "bg-blue-600";
    case "instagram":
      return "bg-pink-500";
    case "facebook":
      return "bg-blue-600";
    case "linkedin":
      return "bg-blue-700";
    case "github":
      return "bg-gray-800";
    case "tiktok":
      return "bg-black";
    case "unsplash":
      return "bg-gray-900";
    case "discord":
      return "bg-blue-600";
    case "twitch":
      return "bg-purple-600";
    case "pinterest":
      return "bg-red-600";
    case "reddit":
      return "bg-orange-600";
    case "snapchat":
      return "bg-yellow-500";
    case "spotify":
      return "bg-green-600";
    case "steam":
      return "bg-black";
    case "telegram":
      return "bg-blue-600";
    case "tumblr":
      return "bg-gray-900";
    case "whatsapp":
      return "bg-green-600";
    case "wikipedia":
      return "bg-blue-600";
    case "google":
      return "bg-red-600";
    default:
      return "bg-gray-500";
  }
};
