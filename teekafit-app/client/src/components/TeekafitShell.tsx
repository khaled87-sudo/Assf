import { cn } from "@/lib/utils";
import { Dumbbell, Flame, LayoutGrid, UtensilsCrossed } from "lucide-react";
import { Link, useLocation } from "wouter";

const TABS = [
  { path: "/", label: "الرئيسية", icon: LayoutGrid },
  { path: "/workouts", label: "التمارين", icon: Dumbbell },
  { path: "/nutrition", label: "التغذية", icon: UtensilsCrossed },
  { path: "/exercises", label: "المكتبة", icon: Flame },
] as const;

/**
 * Mobile-first shell for the Teekafit demo screens: dark brand background +
 * bottom tab bar. Deliberately not gated behind useAuth() yet — login isn't
 * configured in this environment, and the auth/profile flow is still a
 * separate roadmap item (see teekafit-app/todo.md).
 */
export default function TeekafitShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col" dir="rtl">
      <header className="flex items-center justify-between px-5 py-4 border-b border-zinc-900">
        <span className="text-lg font-bold tracking-wide">
          Teeka<span className="text-lime-400">fit</span>
        </span>
        <span className="text-xs text-zinc-500 uppercase tracking-widest">
          Discipline • Drive • Results
        </span>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">{children}</main>

      <nav className="fixed bottom-0 inset-x-0 border-t border-zinc-900 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/80">
        <div className="mx-auto max-w-md grid grid-cols-4">
          {TABS.map(tab => {
            const isActive = location === tab.path;
            const Icon = tab.icon;
            return (
              <Link
                key={tab.path}
                href={tab.path}
                className={cn(
                  "flex flex-col items-center gap-1 py-3 text-xs transition-colors",
                  isActive
                    ? "text-lime-400"
                    : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                <Icon className="h-5 w-5" />
                {tab.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
