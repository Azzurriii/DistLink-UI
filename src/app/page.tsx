"use client";

import { useAuth } from "@/context/AuthContext";
import Header from "../components/Header";
import LinkShortener from "../components/LinkShortener";
import LinksTable from "../components/LinksTable";
import ShortenButton from "../components/ShortenButton";
import NavigationTabs from "../components/NavigationTabs";
import TableActions from "../components/TableActions";

export default function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <Header />
        <LinkShortener isLoggedIn={isLoggedIn} />

        {!isLoggedIn && <ShortenButton />}

        {isLoggedIn && (
          <>
            <NavigationTabs />
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">History</h2>
              <TableActions />
            </div>
          </>
        )}
        <LinksTable />
      </div>
    </div>
  );
}
