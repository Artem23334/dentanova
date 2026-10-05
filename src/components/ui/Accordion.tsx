"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

export type AccordionItem = { question: string; answer: string };

/** Accessible accordion (button + region, aria-expanded/controls). One item open at a time. */
export function Accordion({ items, defaultOpen = 0 }: { items: AccordionItem[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <div className="divide-y divide-line rounded-3xl border border-line bg-white shadow-soft">
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-b${i}`;
        const panelId = `${baseId}-p${i}`;
        return (
          <div key={item.question}>
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-[1.02rem] font-semibold text-navy-900 transition hover:text-azure-600 sm:px-8 sm:py-6"
              >
                <span>{item.question}</span>
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line transition duration-300",
                    isOpen && "rotate-180 border-navy-900 bg-navy-900 text-white",
                  )}
                >
                  <Icon name="chevronDown" className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-6 pb-6 sm:px-8"
            >
              <p className="max-w-3xl leading-relaxed text-ink-muted">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
