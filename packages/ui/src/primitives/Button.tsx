import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { forwardRef } from "react";
import { clsx } from "clsx";

type Props = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
    asChild?: boolean;
  }
>;

export const Button = Object.assign(
  forwardRef<HTMLButtonElement, Props>(function Button(
    { className, variant = "primary", size = "md", asChild, children, ...rest },
    ref
  ) {
    const classes = clsx(
      "inline-flex items-center justify-center rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2",
      variant === "primary" && "bg-pink-600 text-white hover:bg-pink-700",
      variant === "secondary" && "bg-yellow-400 text-slate-900 hover:bg-yellow-500",
      variant === "ghost" && "bg-transparent text-pink-700 hover:bg-pink-100",
      size === "sm" && "h-8 px-3 text-sm",
      size === "md" && "h-10 px-4 text-base",
      size === "lg" && "h-12 px-6 text-lg",
      className
    );
    if (asChild) {
      return (
        <button ref={ref} className={classes} {...rest}>
          {children}
        </button>
      );
    }
    return (
      <button ref={ref} className={classes} {...rest}>
        {children}
      </button>
    );
  }),
  { displayName: "Button" }
);

