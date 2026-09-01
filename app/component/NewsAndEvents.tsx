import React from 'react';

interface NewsCard {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  imageUrl: string;
}

const newsData: NewsCard[] = [
  {
    id: 1,
    date: '21 June 2025',
    title: 'শোক সংবাদ',
    excerpt: 'Praesent viverra augue assumenda mauris molestie sed vitae, rutrum inventore ullamcorper...',
    imageUrl: '/assets/news2.png',
  },
  {
    id: 2,
    date: '21 June 2025',
    title: 'শোক সংবাদ',
    excerpt: 'Praesent viverra augue assumenda mauris molestie sed vitae, rutrum inventore ullamcorper...',
    imageUrl: '/assets/news2.png',
  },
  {
    id: 3,
    date: '21 June 2025',
    title: 'Notice (28 March, 2022)',
    excerpt: 'Praesent viverra augue assumenda mauris molestie sed vitae, rutrum inventore ullamcorper...',
    imageUrl: '/assets/news1.jpg',
  },
];

const NewsAndEvents: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-6 h-[2px] bg-red-600"></span>
            <span className="text-xs uppercase tracking-widest text-red-600 font-bold">
              NEWS &amp; EVENTS
            </span>
            <span className="w-6 h-[2px] bg-red-600"></span>
          </div>

          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 uppercase tracking-wide mb-3">
            STAY UPDATED WITH THE LATEST HAPPENINGS
          </h2>

          <p className="text-xs md:text-sm text-gray-500 max-w-2xl mx-auto">
            Stay updated with our latest news, events, and initiatives at Purabi General Insurance. Join us in protecting your future!
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              {/* Card Image */}
              <div className="h-52 w-full overflow-hidden p-3">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* Card Body */}
              <div className="p-6 pt-2 flex-1 flex flex-col justify-between">
                <div>
                  {/* Date */}
                  <div className="flex items-center text-xs text-gray-500 mb-3">
                    <svg
                      className="w-3.5 h-3.5 mr-1 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span>{item.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                    {item.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-gray-500 leading-relaxed mb-6">
                    {item.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  {/* Button */}
                  <button className="bg-[#B2432B] hover:bg-[#963722] text-white text-xs font-medium py-2.5 px-6 rounded-lg transition-colors duration-200">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default NewsAndEvents;