import { Suspense } from "react";
import { notFound } from "next/navigation";

// Importing your section components (adjust paths as needed)
// import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
// import Sections from "@/components/Sections";
// import Features from "@/components/Features";
// import Testimonial from "@/components/Testimonial";

// MOCK DATA FUNCTION: Replace this with your actual backend fetch later
async function getDynamicStoreData() {
  return {
    store: {
      id: "store_123",
      store_name: "Mahally Demo",
    },
    settings: {
      category_display_style: "grid",
    },
    products: [], // For Mini plan
  };
}

export default async function StorePage() {
  const data = await getDynamicStoreData();

  if (!data || !data.store) {
    return notFound();
  }

  const { store, settings, products } = data;

  // ===== STARTER PLAN LAYOUT (DEFAULT) =====
  return (
    <div className="flex flex-col gap-12 md:gap-16 relative w-full">
      <CategorySection />
      {/* <section className="w-full rounded-2xl overflow-hidden bg-white shadow-sm border border-zinc-100">
        <HeroSection storeId={store.id} />
      </section>
      <Suspense
        fallback={
          <div className="h-64 w-full animate-pulse bg-zinc-100 rounded-2xl border border-zinc-200" />
        }
      >
        <Sections storeId={store.id} />
      </Suspense>

      <section className="w-full">
        <Features />
      </section>

      <section className="w-full">
        <Testimonial />
      </section> */}
    </div>
  );
}
