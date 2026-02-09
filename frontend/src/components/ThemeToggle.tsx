import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="relative w-9 h-9">
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-9 h-9 overflow-hidden"
    >
      <Sun 
        className={`h-5 w-5 text-foreground transition-all duration-500 ease-out absolute ${
          theme === "dark" 
            ? "rotate-90 scale-0 opacity-0" 
            : "rotate-0 scale-100 opacity-100"
        }`}
      />
      <Moon 
        className={`h-5 w-5 text-foreground transition-all duration-500 ease-out absolute ${
          theme === "dark" 
            ? "rotate-0 scale-100 opacity-100" 
            : "-rotate-90 scale-0 opacity-0"
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
