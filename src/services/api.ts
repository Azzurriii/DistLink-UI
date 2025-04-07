import toast from "react-hot-toast";

interface ShortUrlResponse {
  shortCode: string;
  originalUrl: string;
  userId: string | null;
  createdAt: string;
  expiresAt: string;
  clicks: number;
  newUrl: string;
}

interface CreateUrlParams {
  originalUrl: string;
  expiration: string;
}

export interface StoredUrl extends ShortUrlResponse {
  id: string;
}

const BASE_URL = "https://distl.space";
const GUEST_LINKS_KEY = "shortenedUrls";
const GUEST_CREATED_COUNT_KEY = "guestLinksCreatedCount";

export const shortenUrl = async (
  params: CreateUrlParams
): Promise<ShortUrlResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/urls`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Failed to shorten URL" }));
      console.error("API Error:", errorData);
      throw new Error(errorData.message || "Failed to shorten URL");
    }

    return await response.json();
  } catch (error) {
    console.error("Error shortening URL:", error);
    toast.error(error instanceof Error ? error.message : String(error));
    throw error;
  }
};

// Manage URLs in localStorage for non-logged-in users
export const storeUrlInLocalStorage = (
  urlData: ShortUrlResponse
): StoredUrl => {
  try {
    const storedUrls = getUrlsFromLocalStorage();
    const newId = `local-${Date.now()}`;
    const newUrl: StoredUrl = { ...urlData, id: newId };

    const updatedUrls = [newUrl, ...storedUrls];
    localStorage.setItem(GUEST_LINKS_KEY, JSON.stringify(updatedUrls));
    return newUrl;
  } catch (error) {
    console.error("Error storing URL in localStorage:", error);
    toast.error("Could not save link locally.");
    throw error; // Rethrow to indicate failure
  }
};

export const getUrlsFromLocalStorage = (): StoredUrl[] => {
  if (typeof window === "undefined") return []; // Avoid server-side errors
  try {
    const storedUrls = localStorage.getItem(GUEST_LINKS_KEY);
    return storedUrls ? JSON.parse(storedUrls) : [];
  } catch (error) {
    console.error("Error getting URLs from localStorage:", error);
    // Optionally clear corrupted data
    // localStorage.removeItem(GUEST_LINKS_KEY);
    return [];
  }
};

export const removeUrlFromLocalStorage = (id: string): void => {
  if (typeof window === "undefined") return;
  try {
    const storedUrls = getUrlsFromLocalStorage();
    const updatedUrls = storedUrls.filter((url) => url.id !== id);
    localStorage.setItem(GUEST_LINKS_KEY, JSON.stringify(updatedUrls));
  } catch (error) {
    console.error("Error removing URL from localStorage:", error);
  }
};

// --- LocalStorage Management for Guest Link *Created* Count ---

export const getGuestLinksCreatedCount = (): number => {
  if (typeof window === "undefined") return 0;
  try {
    const count = localStorage.getItem(GUEST_CREATED_COUNT_KEY);
    const parsedCount = count ? parseInt(count, 10) : 0;
    return isNaN(parsedCount) ? 0 : parsedCount;
  } catch (error) {
    console.error("Error getting guest links created count:", error);
    return 0;
  }
};

const setGuestLinksCreatedCount = (count: number): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(GUEST_CREATED_COUNT_KEY, count.toString());
  } catch (error) {
    console.error("Error setting guest links created count:", error);
  }
};

export const incrementGuestLinksCreatedCount = (): void => {
  const currentCount = getGuestLinksCreatedCount();
  setGuestLinksCreatedCount(currentCount + 1);
};

export const resetGuestLinksCreatedCount = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(GUEST_CREATED_COUNT_KEY);
};
