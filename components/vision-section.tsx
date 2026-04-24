import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function VisionSection() {
  return (
    <section className="px-5 py-16 md:px-8 md:py-28 lg:px-10 bg-white">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <SectionHeading
            eyebrow="Vision"
            title="WPC is the future of sustainable architecture."
            body="WPC combines engineering precision with environmental responsibility."
          />
          <div className="mt-16 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="space-y-10">
              <div>
                <h3 className="font-display text-3xl md:text-4xl text-[var(--ink-strong)] tracking-tight">Technical Superiority</h3>
                <p className="mt-5 text-[1.14rem] leading-relaxed text-[var(--ink-muted)]">
                  Traditional timber absorbs moisture, attracts termites, and requires constant upkeep. 
                  EcoAashirwad high-density WPC combines natural fiber strength with polymer resilience. 
                  The result is 100% waterproof, termite-proof material that maintains its integrity for decades.
                </p>
              </div>
              <div className="pl-8 border-l-2 border-[var(--accent-red)]">
                <p className="font-display text-2xl text-[var(--ink-strong)]">Environmental Mandate</p>
                <p className="mt-3 text-[1.08rem] leading-relaxed text-[var(--ink-muted)]">
                  By utilizing recycled wood-fiber content and precision polymers, we reduce the need for virgin timber. 
                  We save forests while delivering a superior building substrate.
                </p>
              </div>
            </div>

            <div className="surface-panel !bg-[var(--surface-ground)] shadow-sm px-8 py-10 lg:px-12 lg:py-14">
              <h3 className="font-display text-3xl md:text-3xl text-[var(--ink-strong)] tracking-tight">Approved Excellence</h3>
              <p className="mt-5 text-[1.12rem] leading-relaxed text-[var(--ink-muted)]">
                Our products align with national environmental standards for modern green infrastructure.
              </p>
              <ul className="mt-10 space-y-6">
                <li className="flex gap-5">
                  <div className="h-2 w-2 mt-2.5 rounded-full bg-[var(--accent-red)] shrink-0" />
                  <p className="text-[1.08rem] text-[var(--ink-primary)] leading-relaxed">
                    <strong className="text-[var(--ink-strong)]">CPWD Approved:</strong> Specifically recognized as a high-performance alternative to conventional timber in green building projects.
                  </p>
                </li>
                <li className="flex gap-5">
                  <div className="h-2 w-2 mt-2.5 rounded-full bg-[var(--accent-red)] shrink-0" />
                  <p className="text-[1.08rem] text-[var(--ink-primary)] leading-relaxed">
                    <strong className="text-[var(--ink-strong)]">Circular Economy:</strong> Endorsed by MoEF guidelines for recycling waste into durable, long-life architectural solutions.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
