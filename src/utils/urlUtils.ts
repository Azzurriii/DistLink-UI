type SupportedPlatform = 
  | 'youtube' 
  | 'twitter' 
  | 'vimeo' 
  | 'instagram' 
  | 'facebook' 
  | 'linkedin' 
  | 'github' 
  | 'tiktok'
  | 'unsplash'
  | 'default';

export const detectPlatform = (url: string): SupportedPlatform => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    
    if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
      return 'youtube';
    } else if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
      return 'twitter';
    } else if (hostname.includes('vimeo.com')) {
      return 'vimeo';
    } else if (hostname.includes('instagram.com')) {
      return 'instagram';
    } else if (hostname.includes('facebook.com') || hostname.includes('fb.com')) {
      return 'facebook';
    } else if (hostname.includes('linkedin.com')) {
      return 'linkedin';
    } else if (hostname.includes('github.com')) {
      return 'github';
    } else if (hostname.includes('tiktok.com')) {
      return 'tiktok';
    } else if (hostname.includes('unsplash.com')) {
      return 'unsplash';
    } else {
      return 'default';
    }
  } catch (error) {
    return 'default';
  }
};

export const getPlatformColor = (platform: SupportedPlatform): string => {
  switch (platform) {
    case 'youtube':
      return 'bg-red-600';
    case 'twitter':
      return 'bg-blue-400';
    case 'vimeo':
      return 'bg-blue-600';
    case 'instagram':
      return 'bg-pink-500';
    case 'facebook':
      return 'bg-blue-600';
    case 'linkedin':
      return 'bg-blue-700';
    case 'github':
      return 'bg-gray-800';
    case 'tiktok':
      return 'bg-black';
    case 'unsplash':
      return 'bg-gray-900';
    default:
      return 'bg-gray-500';
  }
}; 