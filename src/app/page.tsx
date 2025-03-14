import Header from "../components/Header";
import LinkShortener from "../components/LinkShortener";
import LinksTable from "../components/LinksTable";
import ShortenButton from "../components/ShortenButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <Header />
        <LinkShortener />
        <ShortenButton />
        <LinksTable />
      </div>
    </div>
  );
}
