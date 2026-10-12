import Link from "next/link";

// تعريف الأقسام مع مسارات الصور المطابقة لملفاتك والأسماء كما في الـ Navbar
const CATEGORIES = [
  {
    title: "Kayali",
    image: "/assets/Categories/Kayali.jpg",
    href: "/category/kayali",
  },
  {
    title: "French Breeze",
    image: "/assets/Categories/French Breeze.jpg",
    href: "/category/french-breeze",
  },
  {
    title: "Burberry",
    image: "/assets/Categories/Burberry Her.jpg",
    href: "/category/burberry",
  },
  {
    title: "Gucci",
    image: "/assets/Categories/Gucci.jpg",
    href: "/category/gucci",
  },
  {
    title: "Tom Ford",
    image: "/assets/Categories/Tom Ford.jpg",
    href: "/category/tom-ford",
  },
  {
    title: "Lattafa & Arabic Niche",
    image: "/assets/Categories/Lattafa.jpg",
    href: "/category/lattafa-and-arabic-niche",
  },
];

export default function CategoryGrid() {
  return (
    <section className="w-full py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* عنوان القسم (اختياري، يمكنك إزالته إذا لم تكن بحاجة إليه) */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 tracking-tight">
            Shop by Brand
          </h2>
        </div>

        {/* 
          الشبكة (Grid): 
          - mobile-first: grid-cols-3 (3 أقسام في السطر على الهاتف)
          - شاشات التابلت (md): grid-cols-3 أو أكثر حسب الرغبة
          - شاشات الديسكتوب (lg): grid-cols-6 (كلها في سطر واحد)
        */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {CATEGORIES.map((category, index) => (
            <Link
              key={index}
              href={category.href}
              className="group relative block w-full overflow-hidden rounded-xl bg-zinc-100 aspect-[3/4]"
            >
              {/* صورة القسم */}
              <img
                src={category.image}
                alt={category.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />

              {/* طبقة الظل المتدرج (Overlay) لضمان قراءة النص */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

              {/* عنوان القسم في الزاوية اليسرى السفلية */}
              <div className="absolute bottom-0 left-0 w-full p-2.5 md:p-4">
                <h3 className="text-white font-medium text-[11px] leading-tight sm:text-sm md:text-base drop-shadow-md">
                  {category.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
