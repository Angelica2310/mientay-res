import { Playfair_Display, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import ScrollToTop from "@/components/ScrollToTop";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Mien Tay restaurant in Shoreditch, London",
    template: "%s | Mien Tay Shoreditch",
  },
  description:
    "Authentic Vietnamese restaurant in Shoreditch. Mien Tay serves traditional Southwest Vietnamese dishes, perfect for casual dining, groups, and private events.",
  icons: {
    icon: [{ url: "/favicon.ico" }], // 48 x 48 px
    apple: [{ url: "/apple-touch-icon.png" }], // 180 x 180 px
    themeColor: "#0e0f0f",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${nunito.variable} min-h-screen flex flex-col`}
      >
        <div
          id="mt-ssr-loader"
          className="fixed inset-0 z-[70] flex items-center justify-center"
        >
          <div className="absolute inset-0">
            <img
              src="/loading-image.jpg"
              alt="Mien Tay interior"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
          </div>
          <div className="relative flex flex-col items-center gap-3">
            <img
              src="/logo.png"
              alt="Mien Tay"
              className="h-14 w-auto drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]"
            />
            <p className="text-xs tracking-[0.22em] text-white/80 uppercase">
              Shoreditch
            </p>
            <div className="loader" />
          </div>
        </div>
        <PageLoader />
        <header className="absolute top-0 left-0 right-0 z-50">
          <Navbar />
        </header>
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
