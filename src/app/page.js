import Hero from "@/components/Hero";
import HeroBreakImage from "@/components/HeroBreak";
import OurStory from "@/components/OurStory";
import ReviewsSection from "@/components/Reviews";
import HeroSlideshow from "@/components/Slideshow";
import Visit from "@/components/Visit";
import BambooTable from "@/components/BambooTable";

export const metadata = {
  title: "Mien Tay | Authentic Vietnamese Restaurant in Shoreditch",
  description:
    "Mien Tay is an authentic family-run Vietnamese restaurant in Shoreditch, serving traditional Southwest Vietnamese comfort food in a warm, modern setting.",
};

export default function Home() {
  return (
    <div>
      <div className="relative">
        <HeroSlideshow />
      </div>
      <Hero />
      {/* <HeroBreakImage /> */}
      <BambooTable />
      <OurStory />
      <ReviewsSection />
      <Visit />
    </div>
  );
}
