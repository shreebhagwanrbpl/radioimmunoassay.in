import { ArrowUpRight } from "lucide-react";

export default function ServiceCard({
  icon,
  title,
  description,
  loading = false,
}) {

  if (loading) {
    return (
      <div className="bg-white rounded-[30px] p-8 border border-slate-100 card-shadow animate-pulse">
        <div className="w-16 h-16 rounded-[22px] bg-slate-200 mb-6"></div>

        <div className="h-8 bg-slate-200 rounded mb-4"></div>

        <div className="space-y-3">
          <div className="h-4 bg-slate-200 rounded"></div>
          <div className="h-4 bg-slate-200 rounded w-11/12"></div>
          <div className="h-4 bg-slate-200 rounded w-8/12"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="group rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-slate-300 hover:shadow-2xl">

      {/* Icon */}
      <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-slate-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-slate-900 group-hover:text-white">
        {icon}
      </div>

      {/* Title */}
      <h3 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
        {title}
      </h3>

      {/* Divider */}
      <div className="mb-5 h-1 w-14 rounded-full bg-slate-300 transition-all duration-300 group-hover:w-20 group-hover:bg-slate-700" />

      {/* Description */}
      <p className="leading-8 text-slate-600">
        {description}
      </p>

    </div>
  );
}