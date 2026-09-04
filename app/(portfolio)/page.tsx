import PortfolioContent from "@/components/PortfolioContent";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  return (
    <main className="min-h-screen">
      <PortfolioContent />
    </main>
  );
}