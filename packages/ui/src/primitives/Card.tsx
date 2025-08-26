import type { HTMLAttributes, PropsWithChildren } from "react";
import { clsx } from "clsx";

type Props = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export function Card({ className, ...rest }: Props) {
  return <div className={clsx("poody-card", className)} {...rest} />;
}

