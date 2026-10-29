
import React from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

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
      "Protect your property, buildings, equipment, and other insured assets against covered fire-related losses.",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/785/785116.png",
    link: "#",
  },
  {
    id: 2,
    title: "HEALTH INSURANCE",
    description:
      "Explore health insurance solutions designed to help you manage eligible medical expenses and healthcare needs.",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png",
    link: "/health-insurance",
  },
  {
    id: 3,
    title: "MOTOR INSURANCE",
    description:
      "Explore protection options for your vehicle against covered accidents, damage, and other insured risks.",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3202/3202926.png",
    link: "#",
  },
  {
    id: 4,
    title: "MARINE INSURANCE",
    description:
      "Explore insurance options for eligible vessels, cargo, and goods against covered marine-related risks.",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2942/2942816.png",
    link: "#",
  },
  {
    id: 5,
    title: "ENGINEERING INSURANCE",
    description:
      "Explore coverage options for eligible machinery, equipment, and construction projects against insured risks.",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1063/1063196.png",
    link: "#",
  },
];

const InsuranceCategories: React.FC = () => {
  return (
    <section className="w-full overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        {/* Section Title */}
        <h2 className="text-2xl font-extrabold uppercase tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
          Categories of Insurance
        </h2>

        {/* Section Description */}
        <p className="mx-auto mt-4 max-w-4xl text-xs leading-relaxed text-gray-600 sm:text-sm">
          At Purabi General Insurance Co. Ltd., we are committed to providing
          reliable insurance solutions for individuals and businesses across
          Bangladesh. Our goal is to help protect your health, property,
          vehicles, and business through suitable insurance coverage.
        </p>

        {/* Insurance Category Slider */}
        <div className="relative mt-12 pb-6">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
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
                <div className="relative flex h-[340px] flex-col items-center justify-between rounded-2xl bg-[#FAF3F0] p-6 text-center transition-all duration-300 hover:shadow-lg">
                  {/* Category Icon */}
                  <div className="mt-2 flex h-20 w-20 items-center justify-center">
                    <img
                      src={item.iconUrl}
                      alt={`${item.title} icon`}
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  {/* Category Details */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-extrabold tracking-wide text-gray-900">
                      {item.title}
                    </h3>

                    <p className="line-clamp-4 px-2 text-xs leading-relaxed text-gray-600">
                      {item.description}
                    </p>
                  </div>

                  {/* Category Link */}
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
                    {item.link.startsWith("/") ? (
                      <Link
                        to={item.link}
                        aria-label={`Learn more about ${item.title}`}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#A03822] text-white shadow-md transition-all duration-200 hover:scale-110 hover:bg-[#852e1b]"
                      >
                        <ArrowUpRight size={20} />
                      </Link>
                    ) : (
                      <a
                        href={item.link}
                        aria-label={`Learn more about ${item.title}`}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#A03822] text-white shadow-md transition-all duration-200 hover:scale-110 hover:bg-[#852e1b]"
                      >
                        <ArrowUpRight size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* See More */}
        <div className="mt-8">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 rounded-md bg-[#A03822] px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#852e1b]"
          >
            <span>See More</span>
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InsuranceCategories;
