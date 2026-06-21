import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Eyebrow from "../ui/Eyebrow";
import { groupServicesByCategory } from "../../utils/groupServices";

const groups = groupServicesByCategory();

export default function WhatWeDo() {
  return (
    <section className="bg-surface">
      <div className="container-px mx-auto max-w-7xl py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">What We Do</Eyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold text-ink sm:text-4xl">
            A wide range of services for individuals and businesses
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/55">
            At Mehak Studio, we offer services across eight focus areas — each
            backed by the same attention to detail.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col rounded-2xl border border-ink/10 bg-white p-6"
            >
              <h3 className="font-display text-sm font-semibold text-ink">
                {group.category}
              </h3>
              <ul className="mt-3 flex-1 space-y-1.5">
                {group.items.map((item) => (
                  <li key={item.slug} className="text-xs leading-relaxed text-ink/55">
                    {item.title}
                  </li>
                ))}
              </ul>
              <Link
                to={`/services?category=${encodeURIComponent(group.category)}`}
                className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-secondary hover:underline"
              >
                View services <ArrowUpRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
