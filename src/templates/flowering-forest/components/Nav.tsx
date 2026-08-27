import { memo } from "react";

export const Nav = memo(function Nav({
  active,
  sections,
  onGo,
  visible,
}: {
  active: string;
  sections: readonly string[];
  onGo: (id: string) => void;
  visible: boolean;
}) {
  return (
    <nav className={`pointer-events-none fixed right-4 top-1/2 z-50 -translate-y-1/2 transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}>
      <ul className="pointer-events-auto flex flex-col gap-3">
        {sections.map((id) => (
          <li key={id}>
            <button
              aria-label={`Go to ${id}`}
              onClick={() => onGo(id)}
              className={`block h-2 w-2 rounded-full transition-all duration-500 ease-in-out ${
                active === id ? "h-6 ff-shadow-ice" : "hover:opacity-80"
              }`}
              style={{ backgroundColor: active === id ? "var(--ff-700)" : "rgba(27,183,166,0.55)" }}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
});
