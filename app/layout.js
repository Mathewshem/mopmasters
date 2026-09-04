import { Baloo_2, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-baloo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "MopMasters Cleaning Services | Professional Cleaning in Nairobi, Kenya",
  description:
    "MopMasters Cleaning Services delivers trusted residential, office, deep and move-in/move-out cleaning across Nairobi, Kenya. Book a spotless clean today.",
  keywords: [
    "cleaning services Nairobi",
    "office cleaning Kenya",
    "house cleaning Nairobi",
    "MopMasters",
    "deep cleaning Kenya",
  ],
  openGraph: {
    title: "MopMasters Cleaning Services",
    description:
      "Trusted residential and commercial cleaning services in Nairobi, Kenya.",
    locale: "en_KE",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${baloo.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
