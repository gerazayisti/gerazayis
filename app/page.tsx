import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import AnnouncementsBand from "@/components/AnnouncementsBand";
import StudentSpacePanel from "@/components/StudentSpacePanel";
import DepartmentsCarousel from "@/components/DepartmentsCarousel";
import FormationsSearch from "@/components/FormationsSearch";
import ResearchSection from "@/components/ResearchSection";
import AboutCard from "@/components/AboutCard";
import DistinctionsStrip from "@/components/DistinctionsStrip";
import SiteFooter from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <StatsStrip />
        <AnnouncementsBand />
        <StudentSpacePanel />
        <DepartmentsCarousel />
        <FormationsSearch />
        <ResearchSection />
        <AboutCard />
        <DistinctionsStrip />
      </main>
      <SiteFooter />
    </>
  );
}
