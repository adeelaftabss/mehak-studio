import {
  PenTool,
  Printer,
  FileText,
  Briefcase,
  Sparkles,
  Search,
  Megaphone,
  GraduationCap,
  Send,
  HardDrive,
  Mail,
  FileSignature,
  Languages,
  Type,
  Shapes,
  Image,
  Wand2,
  Sparkle,
  History,
  Bot,
  AtSign,
} from "lucide-react";

const iconMap = {
  PenTool,
  Printer,
  FileText,
  Instagram: AtSign,
  AtSign,
  Briefcase,
  Sparkles,
  Search,
  Megaphone,
  GraduationCap,
  Send,
  HardDrive,
  Mail,
  FileSignature,
  Languages,
  Type,
  Shapes,
  Image,
  Wand2,
  Sparkle,
  History,
  Bot,
};

// Resolve a service.icon string (from siteConfig) to its lucide component.
// Falls back to Sparkles if the name isn't found.
export function getServiceIcon(name) {
  return iconMap[name] || Sparkles;
}
