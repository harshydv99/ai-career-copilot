import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

export type Language = "en" | "hi" | "es" | "fr";

interface LanguageSelectorProps {
  value: Language;
  onChange: (value: Language) => void;
}

const languages: { value: Language; label: string; nativeLabel: string }[] = [
  { value: "en", label: "English", nativeLabel: "English" },
  { value: "hi", label: "Hindi", nativeLabel: "हिन्दी" },
  { value: "es", label: "Spanish", nativeLabel: "Español" },
  { value: "fr", label: "French", nativeLabel: "Français" },
];

export const LanguageSelector = ({ value, onChange }: LanguageSelectorProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[140px] h-9 glass-card border-border/50">
        <Globe className="w-4 h-4 mr-2 text-muted-foreground" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-card border-border">
        {languages.map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            <span className="flex items-center gap-2">
              <span>{lang.label}</span>
              <span className="text-muted-foreground text-xs">({lang.nativeLabel})</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
