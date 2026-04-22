"use client";

import { useId, useState } from "react";
import { Clock, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type FooterHoursRow = {
  dayKey: number;
  dayLabel: string;
  timeLabel: string;
  closed: boolean;
};

type Props = {
  heading: string;
  rows: FooterHoursRow[];
};

function HoursRowList({ rows, compact }: { rows: FooterHoursRow[]; compact?: boolean }) {
  return (
    <ul className={compact ? "space-y-0.5" : "space-y-1"}>
      {rows.map((row) => (
        <li key={row.dayKey}>
          <div
            className={cn(
              "group flex items-center justify-between gap-2 rounded-lg transition-colors hover:bg-white/60 dark:hover:bg-white/5",
              compact
                ? "px-2 py-1.5 sm:gap-3 sm:rounded-xl sm:px-3 sm:py-2 md:px-3.5 md:py-2.5"
                : "gap-3 rounded-xl px-3 py-2.5 sm:px-3.5 sm:py-2.5",
            )}
          >
            <span
              className={cn(
                "min-w-0 text-left font-medium text-slate-600 group-hover:text-slate-800 dark:text-slate-400 dark:group-hover:text-slate-200",
                compact
                  ? "text-[11px] leading-tight sm:text-[13px] md:text-sm"
                  : "text-[13px] sm:text-sm",
              )}
            >
              {row.dayLabel}
            </span>
            <span
              className={cn(
                "shrink-0 tabular-nums tracking-tight",
                compact ? "text-[11px] sm:text-[13px] md:text-sm" : "text-[13px] sm:text-sm",
                row.closed
                  ? "font-medium text-slate-400 dark:text-slate-500"
                  : "font-medium text-slate-700 dark:text-slate-300",
              )}
            >
              {row.timeLabel}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function FooterBusinessHoursSection({ heading, rows }: Props) {
  const [open, setOpen] = useState(false);
  const listId = useId();
  const summaryId = useId();

  return (
    <>
      {/* Masaüstü: her zaman açık; JS / viewport bağımlılığı yok */}
      <div className="relative hidden px-4 pb-3 pt-4 sm:px-5 sm:pb-4 sm:pt-5 lg:block">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 via-emerald-600/10 to-transparent shadow-inner ring-1 ring-emerald-500/25 dark:from-emerald-400/15 dark:ring-emerald-400/20">
            <Clock className="h-5 w-5 text-emerald-700 dark:text-emerald-400" strokeWidth={1.5} aria-hidden />
          </div>
          <div className="min-w-0 text-left">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
              {heading}
            </p>
          </div>
        </div>
        <HoursRowList rows={rows} />
      </div>

      {/* Mobil: başlığa basınca liste açılır — kompakt */}
      <div className="relative px-3 pb-2 pt-3 sm:px-5 sm:pb-4 sm:pt-5 lg:hidden">
        <button
          type="button"
          id={summaryId}
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((v) => !v)}
          className="mb-2 flex w-full min-w-0 items-center gap-2.5 text-left sm:mb-4 sm:gap-3"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 via-emerald-600/10 to-transparent shadow-inner ring-1 ring-emerald-500/25 sm:h-11 sm:w-11 sm:rounded-2xl dark:from-emerald-400/15 dark:ring-emerald-400/20">
            <Clock className="h-4 w-4 text-emerald-700 sm:h-5 sm:w-5 dark:text-emerald-400" strokeWidth={1.5} aria-hidden />
          </div>
          <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-[10px] sm:tracking-[0.22em] dark:text-slate-500">
              {heading}
            </p>
            <ChevronDown
              className={cn(
                "h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 sm:h-5 sm:w-5",
                open && "rotate-180",
              )}
              strokeWidth={1.75}
              aria-hidden
            />
          </div>
        </button>

        <div
          className={cn(
            "grid min-h-0 transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
            open ? "grid-rows-[minmax(0,1fr)]" : "grid-rows-[0fr]",
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <div
              id={listId}
              role="region"
              aria-labelledby={summaryId}
              className={cn(
                "transition-opacity duration-300 ease-out motion-reduce:transition-none",
                open ? "opacity-100" : "pointer-events-none opacity-0",
              )}
              aria-hidden={!open}
            >
              <HoursRowList rows={rows} compact />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
