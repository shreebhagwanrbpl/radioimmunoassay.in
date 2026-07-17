export default function SectionTitle({
  badge,
  title,
  description,
  center = false,
}) {
  return (
    <div
      className={`${center ? "text-center mx-auto" : ""
        } max-w-3xl`}
    >
      {/* Badge */}
      {badge && (
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-slate-500"></span>
          {badge}
        </div>
      )}

      {/* Title */}
      <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-slate-900">
        {title}
      </h2>

      {/* Divider */}
      <div
        className={`mt-6 h-1 w-20 rounded-full bg-slate-300 ${center ? "mx-auto" : ""
          }`}
      />

      {/* Description */}
      <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl">
        {description}
      </p>
    </div>
  );
}