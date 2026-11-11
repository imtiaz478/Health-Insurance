
import { Link } from "react-router";

const PlanBoard = () => {
  return (
    <section
      className="relative flex min-h-[320px] w-full items-center bg-[#A03822] bg-cover bg-center px-4 py-10 sm:px-6 md:px-16"
      style={{ backgroundImage: "url('/plan.jpg')" }}
      aria-label="Health Insurance"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content Card */}
      <div className="relative z-10 w-full max-w-3xl rounded-2xl border border-white/30 bg-white/20 p-6 shadow-lg backdrop-blur-md sm:p-8 md:p-10">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-5 inline-flex flex-wrap items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-xs font-medium text-white sm:text-sm"
        >
          <Link
            to="/"
            className="transition-colors hover:text-orange-200 hover:underline"
          >
            Home
          </Link>

          <span aria-hidden="true">&gt;</span>

          <span aria-current="page">Health Insurance</span>
        </nav>

        {/* Heading */}
        <h1 className="text-2xl font-normal leading-tight text-white sm:text-3xl md:text-4xl">
          Choose The Best{" "}
          <span className="font-bold">Health Insurance</span> Plan For Yourself
          And Your Family
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/90 sm:text-base">
          Explore health insurance coverage options designed to help protect
          you and your family.
        </p>
      </div>
    </section>
  );
};

export default PlanBoard;
