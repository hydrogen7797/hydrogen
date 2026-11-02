import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PatchyLauncher } from "@/components/layout/PatchyLauncher";
import { HeroStage } from "@/components/home/HeroStage";
import { MobileIntroBusiness } from "@/components/home/MobileIntroBusiness";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { ClientInterview } from "@/components/home/ClientInterview";
import { DesignPlatforms } from "@/components/home/DesignPlatforms";
import { LatestActivities } from "@/components/home/LatestActivities";
import { Updates } from "@/components/home/Updates";
import { Company } from "@/components/home/Company";
import { Careers } from "@/components/home/Careers";
import { GetInTouch } from "@/components/home/GetInTouch";

export default function Home() {
  return (
    <div id="top">
      <a
        href="#main-content"
        className="fixed top-4 left-4 z-[60] -translate-y-16 bg-white px-3 py-2 text-sm transition-transform focus-visible:translate-y-0"
      >
        本文へ移動
      </a>
      <Header />
      <main id="main-content">
        <HeroStage />
        <MobileIntroBusiness />
        <FeaturedWork />
        <ClientInterview />
        <DesignPlatforms />
        <LatestActivities />
        <Updates />
        <Company />
        <Careers />
        <GetInTouch />
      </main>
      <Footer />
      <PatchyLauncher />
    </div>
  );
}
