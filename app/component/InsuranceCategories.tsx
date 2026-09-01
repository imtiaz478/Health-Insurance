import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/pagination";

// Category Data Interface
interface CategoryCard {
  id: number;
  title: string;
  description: string;
  iconUrl: string;
  link: string;
}

const categoriesData: CategoryCard[] = [
  {
    id: 1,
    title: "FIRE INSURANCE",
    description:
      "With our Fire insurance policies, you can choose from various coverage options that protect your property, equipment,",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/785/785116.png", // Fire Icon
    link: "#",
  },
  {
    id: 2,
    title: "HEALTH INSURANCE",
    description:
      "With our Health insurance policies, you can choose from various coverage options that protect your property, equipment,",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png", // Health Icon
    link: "#",
  },
  {
    id: 3,
    title: "MOTOR INSURANCE",
    description:
      "Motor Car insurance provides comprehensive protection for your vehicles, covering accidents, theft.",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3202/3202926.png", // Motor Icon
    link: "#",
  },
  {
    id: 4,
    title: "MARINE INSURANCE",
    description:
      "We offer comprehensive coverage for your vessels, cargo, and goods against physical damage.",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2942/2942816.png", // Marine Icon
    link: "#",
  },
  {
    id: 5,
    title: "ENGINEERING INSURANCE",
    description:
      "Comprehensive protection for plant, machinery, and construction projects against damage or breakdown.",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1063/1063196.png", // Engineering Icon
    link: "#",
  },
];

const InsuranceCategories: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white w-full overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight uppercase">
          CATEGORIES OF INSURANCE
        </h2>

        {/* Section Description */}
        <p className="mt-4 text-xs sm:text-sm text-gray-600 max-w-4xl mx-auto leading-relaxed">
          At SIPLC, we exceed customer expectations by being available both physically and virtually on their preferred channels. As a leading general insurer in Bangladesh, we are committed to continuous development and improvement, ensuring every citizen can access insurance benefits without hindrance
        </p>

        {/* Swiper Slider Container */}
        <div className="mt-12 relative pb-6">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            className="mySwiper !py-6"
          >
            {categoriesData.map((item) => (
              <SwiperSlide key={item.id} className="h-full">
                <div className="relative bg-[#FAF3F0] rounded-2xl p-6 flex flex-col items-center text-center h-[340px] justify-between transition-all duration-300 hover:shadow-lg">
                  
                  {/* Icon */}
                  <div className="w-20 h-20 flex items-center justify-center mt-2">
                    <img
                      src={item.iconUrl}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="space-y-3">
                    <h3 className="font-extrabold text-gray-900 text-sm tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed px-2 line-clamp-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Circular Arrow Button */}
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
                    <a
                      href={item.link}
                      className="w-11 h-11 bg-[#A03822] hover:bg-[#852e1b] rounded-full flex items-center justify-center text-white transition-transform duration-200 hover:scale-110 shadow-md"
                    >
                      <ArrowUpRight size={20} />
                    </a>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* See More Button */}
        <div className="mt-8">
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-[#A03822] hover:bg-[#852e1b] text-white font-semibold text-sm px-8 py-3.5 rounded-md transition-all shadow-sm"
          >
            <span>See More</span>
            <ArrowUpRight size={18} />
          </a>
        </div>

      </div>
    </section>
  );
};

export default InsuranceCategories;