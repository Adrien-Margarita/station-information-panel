export default function BadgeRetard({ retard = 0 }) {
  const late = Number(retard) > 0;
  return (
    <span
      className={
        "px-2 py-0.5 rounded-full text-sm font-semibold border " +
        (late
          ? "bg-red-700/80 border-red-400 text-rose-100"
          : "bg-emerald-800/80 border-emerald-400 text-emerald-100")
      }
      aria-label={late ? `${retard} minute(s) de retard` : "à l'heure"}
    >
      {late ? `+${retard} min` : "à l'heure"}
    </span>
  );
}
