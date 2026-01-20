import { Playfair_Display, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavBar";

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
        <header className="absolute top-0 left-0 right-0 z-50">
          <Navbar />
        </header>
        {children}
      </body>
    </html>
  );
}
