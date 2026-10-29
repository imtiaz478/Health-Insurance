
import type { Route } from "./+types/blogs";
import { ArrowUpRight, CalendarDays } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Blogs | Purabi General Insurance" },
    {
      name: "description",
      content: "Insurance news, helpful tips, and updates from Purabi General Insurance.",
    },
  ];
}

const blogPosts = [
  {
    id: 1,
    category: "Insurance Tips",
    title: "Why Is Insurance Important for Your Financial Security?",
    description:
      "Learn how suitable insurance coverage can help individuals and businesses manage unexpected financial risks.",
    date: "Insurance Guide",
  },
  {
    id: 2,
    category: "Health Insurance",
    title: "Understanding Health Insurance Coverage",
    description:
      "Explore important things to understand when comparing health insurance plans and medical coverage.",
    date: "Health Guide",
  },
  {
    id: 3,
    category: "Business Protection",
    title: "Protecting Your Business Against Unexpected Risks",
    description:
      "Discover how businesses can assess property, equipment, and operational risks when considering insurance.",
    date: "Business Guide",
  },
];

export default function Blogs() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[#FAF3F0] px-4 py-16 text-center sm:py-20">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#A03822]">
          News & Insights
        </p>

        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-5xl">
          Our Blogs
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
          Explore insurance guides, helpful information, and insights to help
          you make more informed decisions.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
            >
              <span className="w-fit rounded-full bg-[#FAF3F0] px-3 py-1 text-xs font-semibold text-[#A03822]">
                {post.category}
              </span>

              <div className="mt-5 flex items-center gap-2 text-xs text-gray-500">
                <CalendarDays size={15} />
                <span>{post.date}</span>
              </div>

              <h2 className="mt-4 text-xl font-bold leading-snug text-gray-900">
                {post.title}
              </h2>

              <p className="mt-3 flex-1 text-sm leading-7 text-gray-600">
                {post.description}
              </p>

              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#A03822]">
                <span>Insurance Insights</span>
                <ArrowUpRight size={17} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
