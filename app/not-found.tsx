import Link from "next/link";

export default function NotFound() {
  return (
    <section className="px-5 py-24 md:px-8 md:py-32 lg:px-10">
      <div className="mx-auto max-w-[900px]">
        <div className="callout-panel text-center">
          <p className="eyebrow">Not found</p>
          <h1 className="section-title mt-4">That page is not available right now.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[1rem] leading-8 text-[var(--ink-muted)]">
            Use the links below to return home or go straight to contact.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="/" className="button-primary">
              Return home
            </Link>
            <Link href="/contact" className="button-secondary">
              Contact the team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
