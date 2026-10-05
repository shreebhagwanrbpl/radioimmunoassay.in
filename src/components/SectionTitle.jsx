export default function SectionTitle({
  badge,
  title,
  description,
  center = false,
  dark = false,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
}) {
  return (
    <div
      className={`${center ? "text-center mx-auto" : ""} max-w-3xl ${className}`}
    >
      {/* Badge */}
      {badge && (
        <div
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold shadow-sm mb-4 sm:mb-5 ${
            dark
              ? "border border-teal-400/30 bg-teal-500/10 text-teal-300 backdrop-blur-sm"
              : "border border-slate-200 bg-white text-slate-700"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              dark ? "bg-teal-400 animate-pulse" : "bg-teal-600"
            }`}
          ></span>
          {badge}
        </div>
      )}

      {/* Title */}
      <h2
        className={`text-3xl sm:text-4xl lg:text-[42px] font-extrabold leading-tight tracking-tight ${
          dark ? "!text-white" : "!text-slate-900"
        } ${titleClassName}`}
      >
        {title}
      </h2>

      {/* Divider */}
      <div
        className={`mt-4 sm:mt-5 h-1 w-16 sm:w-20 rounded-full ${
          dark ? "bg-teal-400" : "bg-teal-600"
        } ${center ? "mx-auto" : ""}`}
      />

      {/* Description */}
      {description && (
        <p
          className={`mt-4 sm:mt-5 text-sm sm:text-base md:text-lg leading-relaxed ${
            center ? "mx-auto" : ""
          } max-w-2xl ${dark ? "!text-slate-300" : "!text-slate-600"} ${descriptionClassName}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}