import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
        <span
          className="font-display text-[110px] font-black leading-none tracking-[-0.04em] md:text-[160px]"
          style={{
            background: "var(--grad-warm)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </span>
        <h1 className="t-h2 mt-4 text-text-1">Cette page n&apos;existe pas.</h1>
        <p className="body-md mt-3 max-w-md">
          Le lien est peut-être cassé, ou la page a été déplacée.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-void-0 transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Retour à l&apos;accueil
        </Link>
      </main>
    </>
  );
}
