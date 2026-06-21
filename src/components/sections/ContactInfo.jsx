import { FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { business } from "../../data/siteConfig";
import Button from "../ui/Button";

export default function ContactInfo() {
  const whatsappUrl = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(
    business.whatsappDefaultMessage
  )}`;

  return (
    <div className="space-y-6">
      {/* Details card */}
      <div className="rounded-2xl border border-ink/10 bg-white p-6 sm:p-8">
        <h3 className="font-display text-lg font-semibold text-ink">Get in Touch</h3>
        <ul className="mt-5 space-y-4 text-sm">
          <li className="flex items-start gap-3">
            <FiMapPin className="mt-0.5 shrink-0 text-primary" size={18} />
            <span className="text-ink/70">
              {business.address.line2}, {business.address.city}, {business.address.country}
            </span>
          </li>
          <li className="flex items-center gap-3">
            <FiPhone className="shrink-0 text-primary" size={18} />
            <a href={`tel:${business.phone.replace(/\s/g, "")}`} className="text-ink/70 hover:text-secondary">
              {business.phone}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <FiMail className="shrink-0 text-primary" size={18} />
            <a href={`mailto:${business.email}`} className="break-all text-ink/70 hover:text-secondary">
              {business.email}
            </a>
          </li>
          <li className="flex items-start gap-3">
            <FiClock className="mt-0.5 shrink-0 text-primary" size={18} />
            <span className="text-ink/70">
              Mon – Sat, 10:00 AM – 7:00 PM (PKT)
            </span>
          </li>
        </ul>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href={whatsappUrl} variant="primary" className="flex-1">
            <FaWhatsapp size={18} /> WhatsApp Us
          </Button>
          <Button href={business.address.mapsDirectionsUrl} variant="outline" className="flex-1">
            Get Directions
          </Button>
        </div>
      </div>

      {/* Map */}
      <div className="overflow-hidden rounded-2xl border border-ink/10">
        <iframe
          title="Mehak Studio location map"
          src={business.address.mapsEmbedUrl}
          width="100%"
          height="280"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* QR code */}
      <div className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-white p-6">
        <img
          src="/brand/location-qr.png"
          alt="QR code linking to Mehak Studio's Google Maps location"
          className="h-24 w-24 shrink-0 rounded-lg border border-ink/10"
        />
        <div>
          <h4 className="font-display text-sm font-semibold text-ink">Scan for directions</h4>
          <p className="mt-1 text-xs leading-relaxed text-ink/55">
            Point your phone's camera at this code to open our location in
            Google Maps.
          </p>
        </div>
      </div>
    </div>
  );
}
