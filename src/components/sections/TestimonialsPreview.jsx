import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Star } from "lucide-react";
import Eyebrow from "../ui/Eyebrow";
import { testimonials } from "../../data/testimonials";

import "swiper/css";
import "swiper/css/pagination";

export default function TestimonialsPreview() {
  return (
    <section className="bg-white">
      <div className="container-px mx-auto max-w-7xl py-20 lg:py-28">
        <div className="mx-auto max-w-xl text-center">
          <Eyebrow className="justify-center">What Clients Say</Eyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold text-ink sm:text-4xl">
            Trusted by businesses and individuals alike
          </h2>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="mt-12 pb-12"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <figure className="flex h-full flex-col rounded-2xl border border-ink/10 bg-surface p-6">
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink/70">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-5 border-t border-ink/10 pt-4">
                  <p className="font-display text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-ink/50">{t.role}</p>
                </figcaption>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
