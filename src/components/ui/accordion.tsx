import * as React from "react";
import { cn } from "@/lib/utils";

const Accordion = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div className="mx-auto max-w-lg">
    <div
      ref={ref}
      className={cn("divide-y divide-gray-100", className)}
      {...props}
    />
  </div>
));
Accordion.displayName = "Accordion";

const AccordionHeader = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <summary
    ref={ref}
    className="flex cursor-pointer list-none items-center justify-between py-4 font-medium text-secondary-900 group-open:text-primary-500"
    {...props}
  >
    <div className="text-sm ml-2 flex items-center grow">{props.children}</div>
    <div className="mr-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="block h-5 w-5 group-open:hidden"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="hidden h-5 w-5 group-open:block"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
      </svg>
    </div>
  </summary>
));
AccordionHeader.displayName = "AccordionHeader";

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("pb-4 text-secondary-500", className)}
    {...props}
  />
));
AccordionContent.displayName = "AccordionContent";

const AccordionItem = React.forwardRef<
  HTMLDetailsElement,
  React.DetailsHTMLAttributes<HTMLDetailsElement>
>(({ className, open, ...props }, ref) => (
  <details
    ref={ref}
    className={cn("group", className)}
    open={open}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

export { Accordion, AccordionHeader, AccordionItem, AccordionContent };
