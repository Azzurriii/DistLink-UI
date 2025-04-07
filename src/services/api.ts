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
  let response: Response;
  try {
    response = await fetch(`${BASE_URL}/urls`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
  } catch (networkError) {
    console.error("Network error fetching URL:", networkError);
    const message = "Network error. Please check your connection.";
    toast.error(message);
    throw new Error(message);
  }

  // Check if response status indicates failure
  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;
    try {
      // Try to parse the error response body for a specific message
      const errorData = await response.json();
      console.error("API Error Response Body:", errorData); // Log for debugging
      // Use the server's message if available
      if (errorData && typeof errorData.message === "string") {
        errorMessage = errorData.message;
      }
    } catch (parsingError) {
      console.error("Failed to parse error response JSON:", parsingError);
    }

    toast.error(errorMessage);
    throw new Error(errorMessage);
  }

  try {
    const successData = await response.json();
    return successData;
  } catch (parsingError) {
    console.error("Failed to parse success response JSON:", parsingError);
    const message = "Received an invalid response from the server.";
    toast.error(message);
    throw new Error(message);
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
