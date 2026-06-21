import { FaWhatsapp } from "react-icons/fa";
import { business } from "../../data/siteConfig";

export default function WhatsAppButton() {
  const url = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(
    business.whatsappDefaultMessage
  )}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Mehak Studio on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 ease-[var(--ease-premium)] hover:scale-110 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <FaWhatsapp size={28} />
      <span className="absolute h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" />
    </a>
  );
}
