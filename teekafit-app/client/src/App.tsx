import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { useState } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import TeekafitShell from "./components/TeekafitShell";
import TeekafitSplashScreen from "./components/TeekafitSplashScreen";
import { ThemeProvider } from "./contexts/ThemeContext";
import Dashboard from "./pages/Dashboard";
import ExerciseLibrary from "./pages/ExerciseLibrary";
import Nutrition from "./pages/Nutrition";
import Workouts from "./pages/Workouts";

function Router() {
  // Auth isn't wired up yet (no OAuth env configured in this environment) —
  // these screens are open, mock-data demos. See todo.md for the roadmap.
  return (
    <TeekafitShell>
      <Switch>
        <Route path={"/"} component={Dashboard} />
        <Route path={"/workouts"} component={Workouts} />
        <Route path={"/nutrition"} component={Nutrition} />
        <Route path={"/exercises"} component={ExerciseLibrary} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </TeekafitShell>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          {showSplash ? (
            <TeekafitSplashScreen onFinish={() => setShowSplash(false)} />
          ) : (
            <Router />
          )}
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
