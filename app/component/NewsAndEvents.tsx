import React, { useState } from "react";
import { X, CalendarDays, ArrowUpRight } from "lucide-react";

interface NewsCard {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  details: string;
}

const newsData: NewsCard[] = [
  {
    id: 1,
    date: "21 June 2025",
    title: "শোক সংবাদ",
    excerpt:
      "Purabi General Insurance-এর পক্ষ থেকে গভীর শোক ও সমবেদনা প্রকাশ।",
    imageUrl: "/news2.png",
    details:
      "Purabi General Insurance Co. Ltd.-এর পক্ষ থেকে শোকসন্তপ্ত পরিবার ও স্বজনদের প্রতি গভীর সমবেদনা জানানো হচ্ছে। এই অংশে প্রকৃত শোক সংবাদ, সংশ্লিষ্ট ব্যক্তির নাম এবং অনুমোদিত বিবরণ যুক্ত করুন।",
  },
  {
    id: 2,
    date: "21 June 2025",
    title: "শোক সংবাদ",
    excerpt:
      "শোকসন্তপ্ত পরিবার ও স্বজনদের প্রতি আমাদের আন্তরিক সমবেদনা।",
    imageUrl: "/news2.png",
    details:
      "এই অংশে সংশ্লিষ্ট শোক সংবাদের সম্পূর্ণ ও যাচাইকৃত তথ্য যুক্ত করুন। প্রকৃত তথ্য ছাড়া কোনো ব্যক্তির নাম বা ঘটনার বিবরণ প্রকাশ করবেন না।",
  },
  {
    id: 3,
    date: "21 June 2025",
    title: "Notice (28 March, 2022)",
    excerpt:
      "কোম্পানির বিজ্ঞপ্তি ও প্রয়োজনীয় ঘোষণা সম্পর্কে বিস্তারিত তথ্য।",
    imageUrl: "/news1.jpg",
    details:
      "এখানে মূল বিজ্ঞপ্তির সম্পূর্ণ লেখা, প্রকাশের তারিখ এবং প্রযোজ্য নির্দেশনা যুক্ত করুন। বর্তমানে এটি একটি demo description; মূল বিজ্ঞপ্তির সঙ্গে মিলিয়ে তথ্য আপডেট করতে হবে।",
  },
];

const NewsAndEvents: React.FC = () => {
  const [selectedNews, setSelectedNews] = useState<NewsCard | null>(null);

  return (
    <section className="w-full bg-white px-4 py-16 font-sans md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <span className="h-[2px] w-6 bg-red-600" />

            <span className="text-xs font-bold uppercase tracking-widest text-red-600">
              NEWS &amp; EVENTS
            </span>

            <span className="h-[2px] w-6 bg-red-600" />
          </div>

          <h2 className="mb-3 text-2xl font-extrabold uppercase tracking-wide text-gray-900 md:text-4xl">
            Stay Updated With the Latest Happenings
          </h2>

          <p className="mx-auto max-w-2xl text-xs text-gray-500 md:text-sm">
            Stay updated with our latest news, events, and initiatives at
            Purabi General Insurance. Join us in protecting your future!
          </p>
        </div>

        {/* News Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {newsData.map((item) => (
            <article
              key={item.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
            >
              {/* Card Image */}
              <div className="h-52 w-full overflow-hidden p-3">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full rounded-xl object-cover"
                  loading="lazy"
                />
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-6 pt-2">
                <div>
                  <div className="mb-3 flex items-center text-xs text-gray-500">
                    <CalendarDays
                      size={14}
                      className="mr-2 text-gray-400"
                    />
                    <span>{item.date}</span>
                  </div>

                  <h3 className="mb-2 line-clamp-1 text-lg font-bold text-gray-900">
                    {item.title}
                  </h3>

                  <p className="mb-6 text-xs leading-relaxed text-gray-500">
                    {item.excerpt}
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedNews(item)}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#B2432B] px-6 py-2.5 text-xs font-medium text-white transition-colors duration-200 hover:bg-[#963722] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A03822] focus-visible:ring-offset-2"
                    aria-label={`Read more about ${item.title}`}
                  >
                    Read More
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* News Details Modal */}
      {selectedNews && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4"
          onClick={() => setSelectedNews(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="news-modal-title"
            className="relative my-8 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedNews(null)}
              aria-label="Close news details"
              className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 text-gray-700 shadow transition hover:bg-gray-100"
            >
              <X size={22} />
            </button>

            {/* Modal Image */}
            <img
              src={selectedNews.imageUrl}
              alt={selectedNews.title}
              className="h-56 w-full object-cover sm:h-72"
            />

            {/* Modal Content */}
            <div className="p-6 sm:p-8">
              <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
                <CalendarDays size={17} />
                <span>{selectedNews.date}</span>
              </div>

              <h2
                id="news-modal-title"
                className="text-2xl font-bold text-gray-900 sm:text-3xl"
              >
                {selectedNews.title}
              </h2>

              <p className="mt-5 whitespace-pre-line text-sm leading-7 text-gray-600 sm:text-base">
                {selectedNews.details}
              </p>

              <button
                type="button"
                onClick={() => setSelectedNews(null)}
                className="mt-7 rounded-lg bg-[#A03822] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#852e1b]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default NewsAndEvents;