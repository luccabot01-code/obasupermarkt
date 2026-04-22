"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  const isSm = size === "sm"

  const trackClass = isSm
    ? "box-border h-7 min-h-7 w-[46px] min-w-[46px] max-w-[46px]"
    : "box-border h-8 min-h-8 w-[54px] min-w-[54px] max-w-[54px]"

  const thumbClass = isSm
    ? "h-[22px] w-[22px] translate-x-0 data-[state=checked]:translate-x-[20px]"
    : "h-[26px] w-[26px] translate-x-0 data-[state=checked]:translate-x-[24px]"

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer relative inline-flex shrink-0 cursor-pointer items-center justify-start rounded-full border border-black/10 bg-zinc-200/95 p-[2px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.07)] outline-none transition-colors duration-200 ease-out",
        "after:absolute after:-inset-x-2.5 after:-inset-y-2 after:content-['']",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/45",
        "aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/25",
        "data-[state=checked]:border-emerald-600/25 data-[state=checked]:bg-emerald-500 data-[state=checked]:shadow-[inset_0_1px_1px_rgba(255,255,255,0.22)]",
        "dark:border-white/12 dark:bg-zinc-600 dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)] dark:data-[state=checked]:border-emerald-400/25 dark:data-[state=checked]:bg-emerald-600",
        "data-disabled:cursor-not-allowed data-disabled:opacity-45",
        trackClass,
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block shrink-0 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.2),0_0_0_1px_rgba(0,0,0,0.04)] transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
          "data-[state=checked]:shadow-[0_2px_6px_rgba(0,0,0,0.16),0_0_0_1px_rgba(0,0,0,0.05)]",
          "dark:bg-zinc-50 dark:shadow-[0_1px_3px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.08)]",
          thumbClass
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
