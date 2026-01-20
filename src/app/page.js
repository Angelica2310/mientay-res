import Hero from "@/components/Hero";
import HeroBreakImage from "@/components/HeroBreak";
import OurStory from "@/components/OurStory";
import HeroSlideshow from "@/components/Slideshow";

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
      <HeroBreakImage />
      <OurStory />
    </div>
  );
}
