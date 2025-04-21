import CoverflowCarousel from "@/components/CoverflowCarousel";
import SDGCardGrid from "@/components/SDGCardGrid";
import SdgGroupedLayout from "@/components/SdgGroupedLayout";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <div>
      <CoverflowCarousel bgColor="bg-green-100" intervalMs={2000} />;
      <SDGCardGrid></SDGCardGrid>
      <SdgGroupedLayout></SdgGroupedLayout>
      <SiteFooter></SiteFooter>
    </div>
  );
}
