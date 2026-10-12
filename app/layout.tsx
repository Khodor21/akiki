import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
// import { ShopProvider } from "@/app/context/ShopContext"; // Adjust path to your context
import Navbar from "@/components/Navbar";
import BottomNavbar from "@/components/BottomNavbar";
// import Footer from "@/components/Footer"; // Assuming you have this
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Mahally Store",
    template: "%s | Mahally",
  },
  description: "Premium e-commerce experience",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // MOCK: Replace with your actual store settings fetch
  const storeSettings = {
    isMiniPlan: false,
    storeName: "My Premium Store",
    logoUrl: "", // Add URL if available
    promoText: "Free shipping on orders over $50",
  };

  return (
    <html lang="en" dir="ltr" className="h-full">
      <body
        className={`${inter.className} flex flex-col min-h-screen text-zinc-900`}
      >
        {/* <ShopProvider> */}
        {/* Dynamic Top Navbar */}
        <Navbar
          storeName={storeSettings.storeName}
          logoUrl={storeSettings.logoUrl}
          promoText={storeSettings.promoText}
          isMini={storeSettings.isMiniPlan}
        />

        {/* Main Content Area */}
        {/* <main className="flex-grow relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-24 md:pb-12"> */}
        {children}
        {/* </main> */}

        {/* Footer rendering based on plan */}
        {/* <Footer isMini={storeSettings.isMiniPlan} /> */}

        {/* Mobile Bottom Navigation (Hidden on Desktop) */}
        {!storeSettings.isMiniPlan && <BottomNavbar />}
        {/* </ShopProvider> */}
      </body>
    </html>
  );
}
