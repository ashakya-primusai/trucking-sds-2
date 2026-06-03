import Image from "next/image";
import Link from "next/link";
import enroutLogo from "@/assets/enrout_logo.png";
import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "h-14 w-auto",
  md: "h-16 sm:h-[4.5rem] w-auto",
  lg: "h-[4.5rem] sm:h-[5.5rem] w-auto",
} as const;

type LogoProps = {
  className?: string;
  size?: keyof typeof sizeClasses;
};

export function Logo({ className, size = "md" }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center shrink-0", className)}
      aria-label="Enrout AI home"
    >
      <Image
        src={enroutLogo}
        alt="Enrout AI"
        className={cn(sizeClasses[size], "object-contain object-left")}
        priority
      />
    </Link>
  );
}
