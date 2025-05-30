"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Header from "../components/Header";
import LinkShortener from "../components/LinkShortener";
import LinksTable from "../components/LinksTable";
import NavigationTabs from "../components/NavigationTabs";
import TableActions from "../components/TableActions";
import { getUrlsFromLocalStorage, StoredUrl } from "@/services/api";

interface LinkItem {
  id: string;
  shortLink: string;
  originalLink: string;
  clicks: number;
  status: string;
  date: string;
}

export default function Home() {
  const { isLoggedIn } = useAuth();
  const [links, setLinks] = useState<LinkItem[]>([]);

  useEffect(() => {
    loadLinks();
  }, []);

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Invalid Date";
      }
      const month = date.toLocaleString("default", { month: "short" });
      const day = date.getDate();
      const year = date.getFullYear();
      return `${month} - ${day} - ${year}`;
    } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return "Error Date";
    }
  };

  const loadLinks = () => {
    const localStoredLinks: StoredUrl[] = getUrlsFromLocalStorage();

    const formattedLinks: LinkItem[] = localStoredLinks.map((item) => ({
      id: item.id,
      shortLink: item.newUrl,
      originalLink: item.originalUrl,
      clicks: item.clicks,
      status: new Date(item.expiresAt) > new Date() ? "Active" : "Expired",
      date: formatDate(item.createdAt),
    }));
    setLinks(formattedLinks);
  };

  const handleLinksUpdated = () => {
    loadLinks();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <Header />
        <LinkShortener
          isLoggedIn={isLoggedIn}
          onLinkShortened={handleLinksUpdated}
        />

        {isLoggedIn && (
          <>
            <NavigationTabs />
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">History</h2>
              <TableActions />
            </div>
          </>
        )}
        <LinksTable links={links} onLinksUpdated={handleLinksUpdated} />
      </div>
    </div>
  );
}
