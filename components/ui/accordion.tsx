"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"
import { Plus } from "lucide-react"

import { cn } from "@/lib/utils"

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-gray-200 last:border-b-0", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger flex flex-1 items-center justify-between gap-6 py-6 text-left text-[16px] font-medium text-gray-900 outline-none transition-colors hover:text-gray-600 focus-visible:ring-2 focus-visible:ring-gray-300",
          className
        )}
        {...props}
      >
        {children}
        <span className="relative flex size-6 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors group-hover/accordion-trigger:border-gray-300 group-data-[state=open]/accordion-trigger:border-gray-900 group-data-[state=open]/accordion-trigger:text-gray-900">
          <Plus className="size-3.5 transition-transform duration-200 group-data-[state=open]/accordion-trigger:rotate-45" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("max-w-2xl pb-6 pr-10 text-[15px] leading-relaxed text-gray-600", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
